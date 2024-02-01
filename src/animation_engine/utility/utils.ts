import {
  point,
  Position,
  distance,
  LineString,
  lineString,
  lineChunk,
  lineSlice,
  lineSliceAlong,
} from '@turf/turf';
import {
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  LineBasicMaterial,
  MeshBasicMaterial,
  Vector2,
  Vector3,
} from 'three';
import { MeshLineGeometry, MeshLineMaterial } from '../MeshLine';
import { Easing, EasingFunctions } from '../easing';
import { Threebox } from 'threebox-plugin';
import { CustomEase } from 'gsap/all';

export function generate2DLineData(
  origin: Position,
  destination: Position,
  numPoints: number,
): Position[] {
  const points: Position[] = [];

  // Extract the latitude and longitude of the origin and destination
  const lat1 = origin[1];
  const lon1 = origin[0];
  const lat2 = destination[1];
  const lon2 = destination[0];

  // Calculate the differences between destination and origin
  const latDiff = (lat2 - lat1) / numPoints;
  const lonDiff = (lon2 - lon1) / numPoints;

  // Calculate and store the points
  for (let i = 0; i <= numPoints; i++) {
    const lat = lat1 + i * latDiff;
    const lon = lon1 + i * lonDiff;
    points.push([lon, lat]);
  }

  return points;
}

export function calculateDistanceInKilometers(
  coord1: Position,
  coord2: Position,
) {
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;

  const earthRadiusKm = 6371; // Earth's radius in kilometers

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadiusKm * c;

  return distance;
}

export function calculatePointsBetweenCoordinates(
  origin: Position,
  destination: Position,
  pointDensityInMeters: number,
) {
  const distanceInKilometers = calculateDistanceInKilometers(
    origin,
    destination,
  );
  const numPoints = Math.ceil(
    (distanceInKilometers * 1000) / pointDensityInMeters,
  ); // Convert distance to meters

  return numPoints; // Round up to the nearest integer
}

// 3DLine Functions

export function generate3DLineData(
  coordinates: Position[],
  selectedTransport: string,
  tb: typeof Threebox,
) {
  let arc3DPoints: number[][] = [];

  if (coordinates.length === 2 && selectedTransport === 'Car') {
    const origin = coordinates[0];
    const destination = coordinates[1];
    const pointDensityInMeters = 100; // Adjust this value for your desired point density

    const numPoints = calculatePointsBetweenCoordinates(
      origin,
      destination,
      pointDensityInMeters,
    );

    const interpolationFact = numPoints - 1;
    //   //const x = origin[0] + t * (destination[0] - origin[0]); and const y = origin[1] + t * (destination[1] - origin[1]);:
    //   //These lines calculate the x and y coordinates for each point.It's a linear interpolation between the x and y coordinates of the "origin" and "destination."
    //   //As t increases from 0 to 1, the point moves progressively from the "origin" to the "destination" along the x and y axes.
    for (let i = 0; i < numPoints; i++) {
      const t = i / interpolationFact;
      const x = origin[0] + t * (destination[0] - origin[0]);
      const y = origin[1] + t * (destination[1] - origin[1]);
      const z = 0;

      arc3DPoints.push([x, y, z]);
    }
  } else {
    for (let index = 0; index < coordinates.length; index++) {
      const coord = coordinates[index];
      // const easedValue = Easing.easeInOutQuad(index, 0, maxZ, halfSize);
      arc3DPoints.push([coord[0], coord[1], 0]);
    }
    // arc3DPoints = addInterpolatedPoints(coordinates, []);
  }

  const arc3DWorldVec3Array: Vector3[] = [];

  for (let i = 0; i < arc3DPoints.length; i++) {
    const dest = tb.projectToWorld(arc3DPoints[i]);
    arc3DWorldVec3Array.push(new Vector3(dest.x, dest.y, dest.z));
  }

  return arc3DWorldVec3Array;
}

function addInterpolatedPoints(
  coords: Position[],
  arc3DPoints: number[][],
): number[][] {
  const pointDensityInMeters = 100; // Adjust this value for your desired point density

  for (let i = 0; i < coords.length - 1; i++) {
    const startPoint = point(coords[i]);
    const endPoint = point(coords[i + 1]);
    const dist = distance(startPoint, endPoint) * 1000; // Convert distance to meters

    if (dist > 0 && dist <= pointDensityInMeters) {
      arc3DPoints.push([coords[i][0], coords[i][1], 0]);
      arc3DPoints.push([coords[i + 1][0], coords[i + 1][1], 0]);
    } else if (dist > pointDensityInMeters) {
      const line = lineString([coords[i], coords[i + 1]]);
      const interpolatedPoints = lineChunk(line, 0.1);

      interpolatedPoints.features.forEach((point: any) => {
        arc3DPoints.push(
          point.geometry.coordinates[0],
          point.geometry.coordinates[1],
        );
      });
    }
  }

  return arc3DPoints;
}

function copyStartingValue(arr: Vector3[], length: number) {
  if (arr.length === 0 || length <= 0) {
    return []; // Return an empty array if the input array is empty or length is non-positive
  }

  const startingValue = arr[0]; // Get the starting value of the input array
  const copiedArray = Array(length).fill(startingValue); // Create a new array with the starting value repeated for the specified length
  return copiedArray;
}

export function generate3DLine(
  coordinates: Position[],
  arcHeightMultiplier: number,
  selectedTransport: string,
  tb: typeof Threebox,
  shouldAnimatePath: boolean,
) {
  const arc3DWorldVec3Array = generate3DLineData(
    coordinates,
    selectedTransport,
    tb,
  );

  const pathCurve = new CatmullRomCurve3(arc3DWorldVec3Array);

  const dynamicPath = copyStartingValue(
    pathCurve.points,
    pathCurve.points.length,
  );

  let pathGeometry = new MeshLineGeometry();
  // pathGeometry.setPoints(pathCurve.getSpacedPoints(arc3DWorldVec3Array.length));

  pathGeometry.setPoints(pathCurve.points);

  if (shouldAnimatePath) {
    pathGeometry.setDrawRange(0, 0);
  }

  let material;

  var color = new Color('#FE7138');
  var hex = color.getHex();

  material = new MeshLineMaterial({
    color: hex,
    lineWidth: 5,
    resolution: new Vector2(window.innerWidth, window.innerHeight),
  });

  material.color.convertSRGBToLinear();

  // material.color.setHex(0xfe7100);
  material.transparent = true;

  return {
    material,
    pathCurve,
    pathGeometry,
    dynamicPath,
  };
}

// 3DArc functions
export function generate3DArcData(
  start: Position,
  end: Position,
  arcHeightMultiplier: number,
  segments: number,
  tb: typeof Threebox,
) {
  var from = point(start);
  var to = point(end);

  const dist = distance(from, to);

  let line2DPoints: Position[] = [];
  let lineDistance = dist;

  const steps = segments;
  line2DPoints = generate2DLineData(start, end, steps);

  let arc3DPoints: number[][] = [];
  let maxZ = arcHeightMultiplier * lineDistance;
  const halfSize = line2DPoints.length / 2;

  // Generate first half of the arc i.e from zero to highest point in the middle
  for (let index = 0; index < line2DPoints.length / 2; index++) {
    const coord = line2DPoints[index];
    const easedValue = Easing.easeInOutQuad(index, 0, maxZ, halfSize);
    arc3DPoints.push([coord[0], coord[1], easedValue]);
  }

  //Generate the second half of the arc i.e from the highest point in the middle to zero
  let reverseIndex = 1;
  for (
    let index = Math.ceil(line2DPoints.length / 2);
    index < line2DPoints.length;
    index++
  ) {
    const coord = line2DPoints[index];

    const easedValue =
      arc3DPoints[Math.floor(line2DPoints.length / 2) - reverseIndex];
    if (easedValue) arc3DPoints.push([coord[0], coord[1], easedValue[2]]);

    reverseIndex += 1;
  }

  const arc3DWorldVec3Array: Vector3[] = [];

  for (let i = 0; i < arc3DPoints.length; i++) {
    const dest = tb.projectToWorld(arc3DPoints[i]);
    arc3DWorldVec3Array.push(new Vector3(dest.x, dest.y, dest.z));
  }

  return arc3DWorldVec3Array;
}

export function generate3DArc(
  start: Position,
  end: Position,
  arcHeightMultiplier: number,
  segments: number,
  shouldAnimatePath: boolean,
  tb: typeof Threebox,
) {
  const arc3DWorldVec3Array = generate3DArcData(
    start,
    end,
    arcHeightMultiplier,
    segments,
    tb,
  );

  const pathCurve = new CatmullRomCurve3(arc3DWorldVec3Array);

  let pathGeometry = new MeshLineGeometry();
  pathGeometry.setPoints(pathCurve.getSpacedPoints(arc3DWorldVec3Array.length));

  if (shouldAnimatePath) {
    pathGeometry.setDrawRange(0, 0);
  }

  var color = new Color('#FE7138');
  var hex = color.getHex();

  const material = new MeshLineMaterial({
    color: hex,
    lineWidth: 5,
    resolution: new Vector2(window.innerWidth, window.innerHeight),
  });
  material.color.convertSRGBToLinear();
  material.transparent = true;

  return {
    material,
    pathCurve,
    pathGeometry,
    dynamicPath: [],
    distances: [],
  };
}

const devmode = false;
const easingFunction = CustomEase.create("custom", "M0,0 C0,0 0.07,0.607 0.089,0.659 0.102,0.695 0.12,0.786 0.129,0.82 0.141,0.871 0.175,0.884 0.2,0.9 0.22,0.912 0.275,0.955 0.334,0.977 0.349,0.982 0.419,0.991 0.498,0.996 0.499,0.998 0.622,0.998 0.665,0.999 0.668,0.999 0.755,0.99985 0.755,0.99985 0.808,0.9999 1,0.9999 1,1 ");
function mapRange(input: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  // Ensure input is within the specified range
  input = Math.min(Math.max(input, inMin), inMax);

  // Map the input range to the output range
  const inputRange: number = inMax - inMin;
  const outputRange: number = outMax - outMin;
  
  const inputScale = (input - inMin) / inputRange; // Input values are normalized to 0-1 range
  if (devmode) console.log('inputscale: ', inputScale);
  const easedInputScale = easingFunction(inputScale)
  if (devmode) console.log('custom:', easedInputScale);

  return outMax - (easedInputScale) * outputRange + outMin;
}

export function getScaleFromZoom(zoom: number) {
  // const zoom = this.map.getZoom();

  const inputValue = zoom; // Replace with your input value
  const inputMin = 1; // Max min zoom goes under inputmin max
  const inputMax = 17;
  const outputMin = 0.0000125; // Dont change output values
  const outputMax = 4;
  const convertedValue = mapRange(
    inputValue,
    inputMin,
    inputMax,
    outputMin,
    outputMax,
  );

  if (devmode) console.log('converted: ', convertedValue);

  return convertedValue;
}
