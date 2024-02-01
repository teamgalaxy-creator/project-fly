import { CatmullRomCurve3, Line, Mesh } from 'three';
import { Threebox } from 'threebox-plugin';
import MapLibreGL, { Map, Marker } from 'maplibre-gl';
import { TravelFormData } from '~/utility/models';
import { generate3DLine } from './utility/utils';
import { pathDecoder } from '~/utility/utils';

class StaticTravelVisualizer {
  markers: Marker[] = [];
  pathMeshes: Mesh[] = [];
  tb: typeof Threebox;
  map!: Map;
  visualizePath: boolean = false;
  shouldAnimatePath: boolean = false;
  selectedTransport: string = ''; // Add the actual type for selectedTransport
  pathCurve!: CatmullRomCurve3;
  cameraMovingToOrigin: boolean | undefined;
  constructor(map: Map) {
    if (!map) return;
    this.map = map;
    this.tb = (window as any).tb;
    this.cameraMovingToOrigin = false;
  }

  calculateBearing(
    originLngLat: [number, number],
    destinationLngLat: [number, number],
  ): number {
    const originLat = originLngLat[1];
    const originLng = originLngLat[0];
    const destLat = destinationLngLat[1];
    const destLng = destinationLngLat[0];

    // Convert latitude and longitude from degrees to radians
    const lat1 = (originLat * Math.PI) / 180;
    const lon1 = (originLng * Math.PI) / 180;
    const lat2 = (destLat * Math.PI) / 180;
    const lon2 = (destLng * Math.PI) / 180;

    // Calculate the difference in longitude
    const deltaLon = lon2 - lon1;

    // Calculate the bearing using the atan2 function
    const y = Math.sin(deltaLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);
    let initialBearing = Math.atan2(y, x);

    // Convert the bearing from radians to degrees
    initialBearing = (initialBearing * 180) / Math.PI;

    // Normalize the bearing to be in the range [0, 360)
    if (initialBearing < 0) {
      initialBearing += 360;
    }

    return initialBearing;
  }

  createCustomMarker(
    coordinates: [number, number],
    index: number,
    category: string,
    type: 'origin' | 'destination',
    travelData: TravelFormData,
    TravelArray: TravelFormData[],
    handleMarkerClick: {
      (travelData: TravelFormData[], index: number, currentMarker: any): void;
    },
  ) {
    let markerType = 'map'; // Default markerType
    if (category === '✈️ Airport') {
      markerType = 'airport';
    } else if (category === '🏨 Hotel') {
      markerType = 'hotel';
    } else if (category === '🍽️ Restaurant') {
      markerType = 'map';
    } else if (category === '🏠 Home') {
      markerType = 'map';
    } else if (category === '🛒Point of Attraction') {
      markerType = 'map';
    } else if (category === 'Other') {
      markerType = 'map';
    }

    const customIcon = `
      <img src='./icons/${markerType}Marker.png'></img>
    `;

    // Create a custom marker using an HTML element (e.g., your SVG icon)
    const customMarker = document.createElement('div');
    customMarker.innerHTML = customIcon;
    customMarker.classList.add('custom-popup');

    const anchor = 'bottom'; // Replace with actual values

    const marker = new MapLibreGL.Marker({
      element: customMarker,
      anchor: anchor,
    })
      .setLngLat(coordinates)
      .addTo(this.map);
    let originDataArray: any = [];

    if (type === 'origin') {
      if (index > 0) {
        originDataArray = [TravelArray[index - 1], travelData];
        marker
          .getElement()
          .setAttribute('data-travel-data', JSON.stringify(originDataArray));
      } else {
        // For i == 0, store travelData as-is
        originDataArray = [travelData];
        marker
          .getElement()
          .setAttribute('data-travel-data', JSON.stringify(originDataArray));
      }

      marker.getElement().setAttribute('data-marker-index', index.toString());
      marker.getElement().setAttribute('current-marker', 'origin');
    } else {
      // For destination markers, save travelData.arrival
      originDataArray = [travelData];
      marker
        .getElement()
        .setAttribute('data-travel-data', JSON.stringify(originDataArray));
      marker.getElement().setAttribute('data-marker-index', index.toString());
      marker.getElement().setAttribute('current-marker', 'destination');
    }

    marker.getElement().addEventListener('click', () => {
      const currentMarker = marker.getElement().getAttribute('current-marker');
      const markerTravelData = marker
        .getElement()
        .getAttribute('data-travel-data');
      const markerIndex = parseInt(
        marker.getElement().getAttribute('data-marker-index') || '-1',
        10,
      );

      // Parse the JSON back into an object
      const parsedTravelData = JSON.parse(markerTravelData || '{}');

      // Call the provided handleMarkerClickCallback function with the travelData
      handleMarkerClick(parsedTravelData, markerIndex, currentMarker);
    });

    return marker;
  }

  createMiddleMarker(
    coordinates: any,
    travelData: TravelFormData,
    bearing: number,
  ): void {
    const middlePointlngLat = this.tb.unprojectFromWorld(coordinates);

    const middleImgSrc =
      travelData.selectedTransport === 'Plane'
        ? './icons/planeTransport.svg'
        : './icons/carTransport.svg';
    const middleIcon =
      travelData.selectedTransport === 'Car'
        ? `
      <img src=${middleImgSrc} style = ' transform: scaleY(-1);) ' ></img>
    `
        : `
    <img src=${middleImgSrc} style = ' transform: rotate(${bearing}deg);) ' ></img>
  `;
    const middleMarker = document.createElement('div');
    middleMarker.innerHTML = middleIcon;
    middleMarker.classList.add('custom-popup');

    const marker = new MapLibreGL.Marker({ element: middleMarker })
      .setLngLat(middlePointlngLat)
      .addTo(this.map);

    //Add the marker in this array so that we can delete them on the next click.
    this.markers.push(marker);
  }

  clearTravel(): void {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].remove();
    }
    this.markers = [];

    // Remove pathMeshes from the scene and clear the array
    for (let i = 0; i < this.pathMeshes.length; i++) {
      this.tb.remove(this.pathMeshes[i]);
    }
    this.pathMeshes = [];
    // this.tb.clear();
    console.log('static visulaizer');

    this.map.dragRotate.enable();
    this.map.repaint = true;
    this.visualizePath = false;
  }

  async visualizeTravel(
    travelArray: TravelFormData[],
    handleMarkerClick: (
      travelData: TravelFormData[],
      index: number,
      currentMarker: any,
    ) => void,
  ) {
    this.clearTravel();
    this.map.dragRotate.disable();
    let lineData: any;

    for (let i = 0; i < travelArray.length; i++) {
      const travelData = travelArray[i];
      const coordinates = {
        origin: travelData.departure.location?.coordinates,
        destination: travelData.arrival.location?.coordinates,
      };

      lineData = await pathDecoder(travelArray[i]);

      const originMarker = this.createCustomMarker(
        coordinates.origin as [number, number],
        i,
        travelData.departure.category,
        'origin',
        travelData,
        travelArray,
        handleMarkerClick,
      );

      this.markers.push(originMarker);

      // For all but the last travel item, create a destination marker
      if (i + 1 === travelArray.length) {
        // Create destination marker
        const destinationMarker = this.createCustomMarker(
          coordinates.destination as [number, number],
          i,
          travelData.arrival.category,
          'destination',
          travelData,
          travelArray,
          handleMarkerClick,
        );

        // Push destination marker to the markers array
        this.markers.push(destinationMarker);
      }

      this.shouldAnimatePath = false;
      this.visualizePath = true;

      let coordinatesData;
      if (lineData.length === 0) {
        coordinatesData = [
          coordinates.origin as [number, number],
          coordinates.destination as [number, number],
        ];
      } else {
        coordinatesData = lineData;
      }

      const { material, pathCurve, pathGeometry } = generate3DLine(
        coordinatesData,
        0,
        this.selectedTransport,
        this.tb,
        this.shouldAnimatePath,
      );
      // material.color.set('#FE7138');
      const pathMesh = new Mesh(pathGeometry, material);
      this.pathMeshes.push(pathMesh);
      console.log('path meshes array', this.pathMeshes);
      const PointlngLat = this.tb.unprojectFromWorld(
        pathCurve.getPointAt(0.98),
      );

      const bearing = this.calculateBearing(
        PointlngLat,
        // coordinates.origin as [number, number],
        coordinates.destination as [number, number],
      );

      // Create the marker in the middle of the curved path depending on what mode of travel we have selected.
      this.createMiddleMarker(pathCurve.getPointAt(0.5), travelData, bearing);

      this.pathCurve = pathCurve;
      this.tb.add(pathMesh);
    }

    this.tb.update();
  }
}

export { StaticTravelVisualizer };
