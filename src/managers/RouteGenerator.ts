import { Loader } from '@googlemaps/js-api-loader';
import { Position, distance, lineString, nearestPointOnLine } from '@turf/turf';
import { CatmullRomCurve3, Vector3 } from 'three';
import { DirectionsInput } from '~/utility/models';

type LineString = { type: string; coordinates: number[][] };

interface DirectionsResult {
  [placeIdPair: string]: string;
}

interface LngLatCache {
  [placeIdPair: string]: any;
}

export default class RouteGenerator {
  private directionsCache: DirectionsResult = {};
  private lnglatCache: string[] = [];
  private lnglat: LngLatCache = {};
  private tb = (window as any).tb;
  private loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
    version: 'weekly',
    authReferrerPolicy: 'origin',
  });

  private static instance: RouteGenerator;

  private constructor() {}

  public static getInstance(): RouteGenerator {
    if (!RouteGenerator.instance) {
      RouteGenerator.instance = new RouteGenerator();
    }
    return RouteGenerator.instance;
  }

  calculateDistance(point1: any, point2: any) {
    return distance([point1.lng(), point1.lat()], [point2.lng(), point2.lat()]);
  }

  findClosestPointOnPath(points: any, path: any) {
    let closestIndex = 0;

    const highResPoint = [points.lng(), points.lat()];

    const lineStr = path.map((point: google.maps.LatLng) => [
      point.lng(),
      point.lat(),
    ]);

    const distance = nearestPointOnLine(lineString(lineStr), highResPoint);

    console.log(distance);
    let cordinate = distance.geometry.coordinates;

    closestIndex = distance.properties.index as number;

    return closestIndex;
  }

  public async getDirections({
    origin,
    destination,
  }: DirectionsInput): Promise<string> {
    const placeIdPair = this.getPlaceIdPair(
      origin.placeId,
      destination.placeId,
    );

    await this.loader.importLibrary('places');

    if (this.directionsCache[placeIdPair]) {
      this.lnglatCache.push(this.lnglat[placeIdPair]);
      return this.directionsCache[placeIdPair];
    } else {
      console.log('does not exists');
    }

    return new Promise<string>((resolve, reject) => {
      const directionsService = new google.maps.DirectionsService();
      const request = {
        origin: { placeId: origin.placeId },
        destination: { placeId: destination.placeId },
        travelMode: google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          if (result!.routes && result!.routes.length > 0) {
            const route = result!.routes[0];
            if (route.overview_path) {
              const overviewPath = route.overview_path;

              let steps = result?.routes[0].legs[0].steps;
              let allPoints: any = [];

              for (let step of steps!) {
                let path = step.path;
                allPoints = allPoints.concat(path);
              }

              // Calculate the number of points (5 percent) in the high-res array
              const highResPointsCount = Math.floor(allPoints.length * 0.05);

              // Extract the first and last 5 percent of points from the high-res array
              const highResStartPoints = allPoints.slice(0, highResPointsCount);
              const highResEndPoints = allPoints.slice(-highResPointsCount);

              const highResStart =
                highResStartPoints[highResStartPoints.length - 1];
              const highResEnd = highResEndPoints[0];

              // let minStartIndex = 0;
              // let minEndIndex = overviewPath.length - 1;
              // let minStartDiff = this.calculateDistance(
              //   highResStart,
              //   overviewPath[0],
              // );
              // let minEndDiff = this.calculateDistance(
              //   highResEnd,
              //   overviewPath[overviewPath.length - 1],
              // );

              // Finding the closest points in the low-res array to high-res start and end points
              // for (let index = 0; index < overviewPath.length; index += 1) {
              //   const startDiff = this.calculateDistance(
              //     highResStart,
              //     overviewPath[index],
              //   );
              //   const endDiff = this.calculateDistance(
              //     highResEnd,
              //     overviewPath[index],
              //   );

              //   if (startDiff < minStartDiff) {
              //     minStartDiff = startDiff;
              //     minStartIndex = index;
              //   }

              //   if (endDiff < minEndDiff) {
              //     minEndDiff = endDiff;
              //     minEndIndex = index;
              //   }
              // }

              const minStartIndex = this.findClosestPointOnPath(
                highResStart,
                overviewPath,
              );

              const minEndIndex = this.findClosestPointOnPath(
                highResEnd,
                overviewPath,
              );

              const newOverviewPath = overviewPath.slice(
                minStartIndex + 1,
                minEndIndex + 1,
              );

              const lineStr = newOverviewPath.map(
                (point: google.maps.LatLng) => [point.lng(), point.lat()],
              );

              // getSpacedPoints for Equispaced Low Res Points
              let arc3DPoints: number[][] = [];

              for (let index = 0; index < lineStr.length; index++) {
                const coord = lineStr[index];
                // const easedValue = Easing.easeInOutQuad(index, 0, maxZ, halfSize);
                arc3DPoints.push([coord[0], coord[1], 0]);
              }

              const arc3DWorldVec3Array: Vector3[] = [];

              for (let i = 0; i < arc3DPoints.length; i++) {
                const dest = this.tb.projectToWorld(arc3DPoints[i]);
                arc3DWorldVec3Array.push(new Vector3(dest.x, dest.y, dest.z));
              }

              const pathCurve = new CatmullRomCurve3(arc3DWorldVec3Array);

              const pointsLength =
                highResStartPoints.length + highResEndPoints.length;

              const equiSpacedPoints = pathCurve.getSpacedPoints(pointsLength);

              let path = [];

              for (let i = 0; i < equiSpacedPoints.length; i++) {
                const dest = this.tb.unprojectFromWorld(equiSpacedPoints[i]);
                path.push([dest[0], dest[1]]);
              }

              const equiSpacedPath = path.map(
                (point: Position) => new google.maps.LatLng(point[1], point[0]),
              );

              equiSpacedPath.splice(0, 0, ...highResStartPoints);
              equiSpacedPath.push(...highResEndPoints);

              // const start = newOverviewPath[0];
              // const end = newOverviewPath[newOverviewPath.length - 1];
              // const totalDistance = distance(
              //   [start.lng(), start.lat()],
              //   [end.lng(), end.lat()],
              // );

              // let numberOfPoints = Math.round(
              //   Math.log(totalDistance + 1) * 2000,
              // );

              // const interpolatedPath: google.maps.LatLng[] =
              //   this.interpolateAlongLine(newOverviewPath, numberOfPoints);

              const encodePath =
                google.maps.geometry.encoding.encodePath(equiSpacedPath);

              this.directionsCache[placeIdPair] = encodePath;

              resolve(encodePath);
            } else {
              resolve('');
            }
          } else {
            resolve('');
          }
        } else {
          resolve('');
        }
      });
    });
  }

  interpolateAlongLine(
    newOverviewPath: google.maps.LatLng[],
    numberOfPoints: number,
  ): google.maps.LatLng[] {
    const interpolatedPoints: google.maps.LatLng[] = [];

    for (let i = 0; i < numberOfPoints; i++) {
      const index = (i / (numberOfPoints - 1)) * (newOverviewPath.length - 1);
      const lowerIndex = Math.floor(index);
      const upperIndex = Math.ceil(index);

      const weight = index - lowerIndex;
      const interpolatedLng =
        newOverviewPath[lowerIndex].lng() +
        weight *
          (newOverviewPath[upperIndex].lng() -
            newOverviewPath[lowerIndex].lng());
      const interpolatedLat =
        newOverviewPath[lowerIndex].lat() +
        weight *
          (newOverviewPath[upperIndex].lat() -
            newOverviewPath[lowerIndex].lat());

      interpolatedPoints.push(
        new google.maps.LatLng(interpolatedLat, interpolatedLng),
      );
    }

    return interpolatedPoints;
  }

  public async decodePath(value: string): Promise<LineString> {
    const geometry = await this.loader.importLibrary('geometry');

    const path = geometry.encoding.decodePath(value);

    const lineString: LineString = {
      type: 'LineString',
      coordinates: path.map((point: google.maps.LatLng) => [
        point.lng(),
        point.lat(),
      ]),
    };

    return lineString;
  }

  private getPlaceIdPair(startPlaceId: string, endPlaceId: string): string {
    return `${startPlaceId}_${endPlaceId}`;
  }
}
