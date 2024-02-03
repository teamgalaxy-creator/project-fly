import {
  BufferGeometry,
  AmbientLight,
  BoxGeometry,
  CatmullRomCurve3,
  Color,
  DefaultLoadingManager,
  DirectionalLight,
  DirectionalLightHelper,
  EquirectangularReflectionMapping,
  Event,
  Line,
  HemisphereLight,
  HemisphereLightHelper,
  LinearFilter,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  PMREMGenerator,
  PointLight,
  Quaternion,
  WebGLRenderTarget,
  Vector3,
} from 'three';
import { TravelFormData } from '~/utility/models';
import { point, Position, distance } from '@turf/turf';
import { EasingFunctions } from './easing';
import { MeshLineGeometry } from './MeshLine/index';
import { LngLat, LngLatBounds, LngLatLike, Map } from 'maplibre-gl';
import { Threebox } from 'threebox-plugin';
import { gsap, CSSPlugin } from 'gsap';
import { MarkerAnimation } from './MarkerAnimation';
import { HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import {
  generate3DLine,
  generate3DArc,
  getScaleFromZoom,
} from './utility/utils';

export interface IAnimationUIConfig {
  modelScale: number;
  curveSpeed: number;
  animationDuration: number;
  curveHeight: number;
  cameraZoom: number;
  mapPitch: number;
  mapBearing: number;
  planeGrow: number;
  uiScale: number;
}

export interface IAnimationConfig {
  duration: number; // Time in milliseconds
  animatePath: boolean;
  arcHeightScale: number;
  UIConfig: IAnimationUIConfig;
  onCompleteCallback: (() => void) | undefined;
}

gsap.registerPlugin(CSSPlugin);

const STREET_LEVEL_ZOOM = 15;
class AnimationController {
  markerAnimations: MarkerAnimation[] = [];
  animationStartTime = 0;
  animationEndTime = 0;
  animationDuration = 0;
  destinationZoom = true;
  originZoom = true;
  isAnimationExpired: boolean | undefined;
  material: any;
  shouldAnimatePath = true;
  onAnimationCompleteCallback: (() => void) | undefined;
  animationConfig!: IAnimationConfig;
  origin!: Position;
  destination!: Position;
  modelMaxScale!: number;
  arcHeight: number | undefined;
  pathCurve!: CatmullRomCurve3;
  pathGeometry!: BufferGeometry;
  pathMesh: any;
  tb: typeof Threebox;
  map!: Map;
  model!: Object3D<Event>;
  index!: number;
  cameraZoom!: number;
  selectedTransport!: string;
  dist!: number;
  originMarkerInstance!: MarkerAnimation;
  destinationMarkerInstance!: MarkerAnimation;
  travelIndex!: number;
  dynamicPath!: Vector3[];
  distancesArr!: number[];
  vectorArray!: Vector3[];
  prevIndex: number = 0;
  handleAnimationState: any;

  constructor(map: Map, index: number, model: Object3D, handleAnimationState?: any) {
    if (!map) return;
    this.map = map;
    this.tb = (window as any).tb;
    this.index = index;
    if (model) this.model = model;
    this.pathGeometry = new BufferGeometry();
    this.handleAnimationState = handleAnimationState;
  }

  updateModel(model: Object3D) {
    if (this.tb) {
      // Remove previous model from the scene
      if (this.model) {
        this.tb.remove(this.model);
      }

      // Add the new model to the scene
      this.tb.add(model);

      // Update the current model reference
      this.model = model;
    }
  }

  getPathMeshObj() {
    return this.pathMesh;
  }

  clearMarkerandText() {
    for (let markerInstance of this.markerAnimations) {
      markerInstance.cleanup();
    }

    this.markerAnimations = [];
  }

  cleanup() {
    this.tb.remove(this.model);
    this.clearMarkerandText();
    let mesh = this.getPathMeshObj();
    if (mesh) this.tb.remove(mesh);
  }

  async startAnimation(
    travelArray: TravelFormData[],
    travelPoint: TravelFormData,
    animationConfig: IAnimationConfig,
    lineData: Position[],
    currentTravelIndex: number,
    showOriginMarker: boolean,
  ) {
    if (this.pathMesh) this.tb.remove(this.pathMesh);

    this.origin = travelPoint.departure.location?.coordinates as Position;
    this.destination = travelPoint.arrival.location?.coordinates as Position;
    this.animationConfig = animationConfig;

    this.travelIndex = currentTravelIndex;

    this.selectedTransport = travelPoint.selectedTransport;
    this.animationDuration = animationConfig.duration;

    this.arcHeight = animationConfig.UIConfig.curveHeight;

    if (!lineData) lineData = [this.origin, this.destination];

    var from = point(this.origin);
    var to = point(this.destination);

    this.dist = distance(from, to);

    const obj =
      this.selectedTransport === 'Plane'
        ? generate3DArc(
          this.origin,
          this.destination,
          this.arcHeight,
          1000,
          this.shouldAnimatePath,
          this.tb,
        )
        : this.selectedTransport === 'Car'
          ? generate3DLine(
            lineData as Position[],
            animationConfig.arcHeightScale,
            this.selectedTransport,
            this.tb,
            this.shouldAnimatePath,
          )
          : null;

    this.pathCurve = obj?.pathCurve as CatmullRomCurve3;
    this.material = obj?.material;
    this.pathGeometry = obj?.pathGeometry as BufferGeometry;

    if (this.selectedTransport === 'Car') {
      this.dynamicPath = obj?.dynamicPath as Vector3[];
    }

    this.pathMesh = new Mesh(this.pathGeometry, this.material);

    var originCoordinates = this.pathCurve.getPointAt(0);
    this.originMarkerInstance = new MarkerAnimation(
      this.map,
      travelPoint.departure.location?.text as string,
      'Departure',
      travelPoint.departure.dateTime,
      originCoordinates,
      this.tb,
      this.index,
    );

    var destinationCoordinates = this.pathCurve.getPointAt(1);
    this.destinationMarkerInstance = new MarkerAnimation(
      this.map,
      travelPoint.arrival.location?.text as string,
      'Arrival',
      travelPoint.arrival.dateTime,
      destinationCoordinates,
      this.tb,
      this.index,
    );

    this.markerAnimations.push(
      this.originMarkerInstance,
      this.destinationMarkerInstance,
    );

    this.cameraZoom = this.animationConfig.UIConfig.cameraZoom;
    this.modelMaxScale = animationConfig.UIConfig.modelScale;
    console.log('max scale: ', this.modelMaxScale);

    const firstPointLngLat = this.tb.unprojectFromWorld(
      this.pathCurve.points[0],
    );
    const bounds = new LngLatBounds(firstPointLngLat, firstPointLngLat);
    for (let index = 1; index < this.pathCurve.points.length; index++) {
      const point = this.pathCurve.points[index];
      const lnglat = this.tb.unprojectFromWorld(point);
      bounds.extend(lnglat);
    }
    const cameraConfigForBounds = this.map.cameraForBounds(bounds);
    if (cameraConfigForBounds) {
      this.cameraZoom =
        cameraConfigForBounds && cameraConfigForBounds.zoom
          ? cameraConfigForBounds.zoom
          : this.cameraZoom;
      this.modelMaxScale =
        getScaleFromZoom(this.cameraZoom) *
        2 *
        animationConfig.UIConfig.uiScale;
      // scale this.modelMaxScale according to UI scale
      console.log(
        'changing from ',
        this.cameraZoom,
        ' to ',
        cameraConfigForBounds.zoom,
        this.modelMaxScale,
      );
    } else {
      this.modelMaxScale =
        animationConfig.UIConfig.modelScale * animationConfig.UIConfig.uiScale;
    }
    // else this.modelMaxScale = this.jsonscale * uiscale

    this.model.scale.set(
      this.modelMaxScale,
      this.modelMaxScale,
      this.modelMaxScale,
    );

    const att_pos = this.pathGeometry.getAttribute('position');

    this.vectorArray = this.float32ArrayToVector3Array(att_pos.array);

    this.prevIndex = 0;

    this.tb.add(this.pathMesh);

    const modelLngLatPos = this.tb.unprojectFromWorld(originCoordinates);
    const animationStartCenter = [modelLngLatPos[0], modelLngLatPos[1]];
    const animationStartZoom =
      this.selectedTransport === 'Plane' ? this.cameraZoom : STREET_LEVEL_ZOOM;
    this.map.flyTo({
      center: animationStartCenter as LngLatLike,
      bearing: this.animationConfig.UIConfig.mapBearing,
      pitch: this.animationConfig.UIConfig.mapPitch,
      zoom: animationStartZoom,
      duration: 3000,
      essential: true,
    });

    let { lng, lat } = this.map.getCenter();
    const point1 = point([lng, lat]);
    const point2 = point(animationStartCenter);
    const distanceBetweenPoints = distance(point1, point2);

    const animateOrigin = async () => {
      console.log('animate origin');

      if (this.markerAnimations.length > 0) {
        // if (this.index === this.travelIndex || this.index === 0) {
        await this.markerAnimations[0].setup(showOriginMarker);
        console.log('marker 0 start');
        // this.handleAnimationState({
        //   type: 'origin',
        //   state: 'start',
        // });
        this.markerAnimations[0].playAnimation(this.selectedTransport, () => {
          console.log('marker 0 end');
          // this.handleAnimationState({
          //   type: 'destination',
          //   state: 'end',
          // });
          this.startPlaneAnimation();
        });
      }
    };
    if (
      Math.abs(this.map.getZoom() - animationStartZoom) <= 0.25 &&
      distanceBetweenPoints <= 0.0001
    ) {
      console.log('case 1');
      animateOrigin();
    } else {
      this.map.once('zoomend', animateOrigin);
    }
  }

  startPlaneAnimation() {
    if (!this.model.visible) {
      this.model.visible = true;
    }

    let position = this.pathCurve.getPointAt(0);
    this.model.position.set(position.x - 1, position.y, position.z);
    let nextPosition = this.pathCurve.getPointAt(0.01);
    const worldPos = this.pathMesh.localToWorld(nextPosition);
    this.model.lookAt(worldPos);

    this.model.scale.set(0, 0, 0);

    const now = Date.now();
    this.animationStartTime = now;
    this.animationEndTime = now + this.animationDuration;
    this.isAnimationExpired = false;

    this.onAnimationCompleteCallback = async () => {
      if (this.animationConfig.onCompleteCallback) {
        let lastPos = this.pathCurve.getPointAt(1);

        const carPos = this.tb.unprojectFromWorld(lastPos);

        if (this.markerAnimations.length > 0)
          await this.markerAnimations[1].setup(true);

        this.model.visible = false;
        if (this.selectedTransport === 'Car') {
          this.map.flyTo({
            center: carPos,
            bearing: this.animationConfig.UIConfig.mapBearing,
            pitch: this.animationConfig.UIConfig.mapPitch,
            zoom: STREET_LEVEL_ZOOM,
            duration: 500,
            easing: EasingFunctions.linear,
            essential: true,
          });
        }

        const runOnEndMarkerAnimations = async () => {
          if (this.markerAnimations.length > 0) {
            await this.markerAnimations[1].setup(true);
            this.markerAnimations[0].removeTextAnimation(() => { });
            this.markerAnimations[1].playAnimation(
              this.selectedTransport,
              () => {
                this.markerAnimations[1]?.removeTextAnimation(() => {
                  this.animationConfig.onCompleteCallback!();
                });
              },
            );
          }
        };
        this.model.visible = false;
        if (this.selectedTransport === 'Car') {
          this.map.once('zoomend', () => {
            runOnEndMarkerAnimations();
          });
        } else {
          if (this.markerAnimations.length > 0)
            console.log('CHECK WHY THIS ISNT WORKING');
          this.markerAnimations[0].removeTextAnimation(() => { });
          this.markerAnimations[1].playAnimation(this.selectedTransport, () => {
            this.markerAnimations[1]?.removeTextAnimation(() => {
              this.animationConfig.onCompleteCallback!();
            });
          });
        }

        // setTimeout(() => {
        // this.markerAnimations[1]?.removeTextAnimation(() => {
        //   this.animationConfig.onCompleteCallback!();
        // });
        // }, 2000);
        // setTimeout(() => {
        //   this.animationConfig.onCompleteCallback!();
        // }, 2000);
      }
    };
  }

  updatePathGeometry(
    position: any,
    timeProgress: number,
    pathPoints: Vector3[],
  ) {
    if (pathPoints.length === 0) {
      return [];
    }

    let length = this.pathCurve.getLength();
    let len = this.pathCurve.getLengths(pathPoints.length - 1);

    const distance = length * timeProgress;

    let closestDistance = Number.POSITIVE_INFINITY;
    let closestSpatialDistance = Number.POSITIVE_INFINITY;
    let closestIndex = -1;

    for (let i = 0; i < pathPoints.length; i++) {
      const dist = len[i];
      const distanceDiff = Math.abs(distance - dist);
      const d = position.distanceTo(pathPoints[i]);

      if (distanceDiff < closestDistance || d < closestSpatialDistance) {
        closestDistance = distanceDiff;
        closestSpatialDistance = d;
        closestIndex = i;
      }
    }

    this.prevIndex = closestIndex;

    const newArray = [
      ...pathPoints.slice(0, closestIndex + 1),
      ...new Array(pathPoints.length - closestIndex - 1).fill(position),
    ];

    return newArray;
  }

  float32ArrayToVector3Array(float32Array: any) {
    const vector3Array = [];
    for (let i = 0; i < float32Array.length; i += 3) {
      const x = float32Array[i];
      const y = float32Array[i + 1];
      const z = float32Array[i + 2];
      vector3Array.push(new Vector3(x, y, z));
    }
    return vector3Array;
  }

  calculateDistances(pointsArray: Vector3[]) {
    if (pointsArray.length <= 1) {
      return []; // If the array has less than 2 elements, return an empty array
    }

    const distances = [0]; // Initialize with distance 0 for the first element
    let cumulativeDistance = 0;

    for (let i = 1; i < pointsArray.length; i++) {
      const dist = pointsArray[i - 1].distanceTo(pointsArray[i]); // Calculate distance between current and previous Vector3 elements
      cumulativeDistance += dist; // Accumulate the distance

      distances.push(cumulativeDistance); // Push the accumulated distance to the distances array
    }

    return distances;
  }

  animate() {
    for (let i = 0; i < this.markerAnimations.length; i++) {
      this.markerAnimations[i]?.update();
    }

    if (!this.isAnimationExpired) {
      const now = Date.now();
      const timeElapsed = now - this.animationStartTime;
      if (now <= this.animationEndTime) {
        let timeProgress = timeElapsed / this.animationDuration;

        if (this.selectedTransport === 'Plane')
          timeProgress = EasingFunctions.easeInOutCubic(timeProgress);

        if (this.selectedTransport === 'Car')
          timeProgress = EasingFunctions.easeInOutQuad(timeProgress);

        // if (this.selectedTransport === 'Car')
        //   timeProgress = EasingFunctions.customCarEase(timeProgress);

        let position = this.pathCurve.getPointAt(timeProgress);
        this.model.position.set(position.x, position.y, position.z);

        let timeProgressForNextPoint =
          timeProgress + 0.00001 > 1 ? timeProgress : timeProgress + 0.00001;

        const modelLngLatPos = this.tb.unprojectFromWorld(position);

        let q1 = new Quaternion().copy(this.model.quaternion);
        let nextPosition = this.pathCurve.getPointAt(timeProgressForNextPoint);

        if (this.selectedTransport === 'Car') {
          this.map.flyTo({
            center: modelLngLatPos,
            bearing: this.animationConfig.UIConfig.mapBearing,
            pitch: this.animationConfig.UIConfig.mapPitch,
            zoom: this.cameraZoom,
            duration: 100,
            easing: EasingFunctions.linear,
            essential: true,
          });
        } else {
          this.map.flyTo({
            center: modelLngLatPos,
            essential: true,
            bearing: this.animationConfig.UIConfig.mapBearing,
            pitch: this.animationConfig.UIConfig.mapPitch,
            zoom: this.cameraZoom,
            easing: EasingFunctions.linear,
            duration: 100,
          });
        }

        const worldPos = this.pathMesh.localToWorld(nextPosition);

        this.model.lookAt(worldPos);
        let q2 = new Quaternion().copy(this.model.quaternion);
        this.model.quaternion.slerpQuaternions(q1, q2, 0.9);

        if (this.shouldAnimatePath) {
          const att_pos = this.pathGeometry.getAttribute('position');

          this.dynamicPath = this.updatePathGeometry(
            position,
            timeProgress,
            this.vectorArray,
          );

          let i = 0;
          const len = att_pos.count;
          while (i < len) {
            const v = this.dynamicPath[i];
            att_pos.setX(i, v.x);
            att_pos.setY(i, v.y);
            att_pos.setZ(i, v.z);
            i += 1;
          }
          att_pos.needsUpdate = true;

          // this.pathGeometry.setDrawRange(
          //   0,
          //   timeProgress * this.pathGeometry.index!.count,
          // );

          this.pathGeometry.setDrawRange(0, Infinity);

          const minScale = 0;
          const maxScale = this.modelMaxScale; // Set this value accordingly

          const planeGrowPrecentage =
            this.animationConfig.UIConfig.planeGrow / 100;
          const planeShrinkPrecentage =
            (100 - this.animationConfig.UIConfig.planeGrow) / 100;

          let currentScale: any;

          if (timeProgress <= planeGrowPrecentage) {
            // Smoothly grow to maxScale during the first 30%
            currentScale =
              minScale +
              (maxScale - minScale) * (timeProgress / planeGrowPrecentage);
          } else if (timeProgress <= planeShrinkPrecentage) {
            // Maintain maxScale between 30% and 70%
            currentScale = maxScale;
          } else {
            // Smoothly shrink back to minScale from 70% to the end
            currentScale =
              maxScale -
              (maxScale - minScale) *
              ((timeProgress - planeShrinkPrecentage) / planeGrowPrecentage);
          }
          // Apply the calculated scale to this.model
          this.model.scale.set(currentScale, currentScale, currentScale);
        }
      } else {
        this.isAnimationExpired = true;
        if (this.onAnimationCompleteCallback)
          this.onAnimationCompleteCallback();
        // this.handleAnimationState({
        //   type: 'origin',
        //   state: 'end',
        // })
      }
    }

    this.map.repaint = true;
  }
}

export { AnimationController };
