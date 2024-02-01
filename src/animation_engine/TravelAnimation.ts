import { LineString, Position, distance, point } from '@turf/turf';
import { IAnimationUIOptions } from '~/components/AnimationView';
import { DirectionsInput, TravelFormData } from '~/utility/models';
import { getAnimationConfig, pathDecoder } from '~/utility/utils';
import { AnimationController, IAnimationConfig } from './AnimationController';
import { Threebox } from 'threebox-plugin';
import { Map } from 'maplibre-gl';
import { TextAnimation } from './TextAnimation';
import { Object3D } from 'three';
import ResourceLoader from './ResourceLoader';
import { CarModels, PlaneModels } from './utility/enums';
import RouteGenerator from '~/managers/RouteGenerator';
import { EasingFunctions } from './easing';
import { getScaleFromZoom } from './utility/utils';

export class TravelAnimation {
  travelArray!: TravelFormData[];
  modelSize!: number;
  videoLength!: number;
  animationOptions!: IAnimationUIOptions;
  animationControllers!: AnimationController[];
  tb!: typeof Threebox;
  map!: Map;
  modelRef!: Object3D;
  carModelRef!: Object3D;
  planeModelEnum!: string;
  lineStringArr!: Position[];
  dispatch: any;
  currentTravelIndex!: number;
  playPauseState!: boolean;
  loading!: boolean;
  handleLoadingChange: any;
  carModelEnum!: string;
  isViewTravel: boolean;
  callbackOnAnimationEnd: () => void;

  DEFAULT_ANIMATION_TOTAL_TIME = 15;
  showMarker: boolean = true;

  constructor(
    travelArray: TravelFormData[],
    map: Map,
    tb: typeof Threebox,
    planeModelEnum: string,
    carModelEnum: string,
    videoLength: number,
    modelSize: number,
    currentTravelIndex: number,
    playPauseState: boolean,
    handleLoadingChange: any,
    isViewTravel: boolean,
    callbackOnAnimationEnd: () => void,
  ) {
    this.travelArray = travelArray;
    this.map = map;
    this.tb = tb;
    this.planeModelEnum = planeModelEnum;
    this.carModelEnum = carModelEnum;
    this.videoLength = videoLength;
    this.modelSize = modelSize;
    this.animationControllers = [];
    this.lineStringArr = [];
    this.currentTravelIndex = currentTravelIndex;
    this.playPauseState = playPauseState;
    this.loading = false;
    this.handleLoadingChange = handleLoadingChange;
    this.isViewTravel = isViewTravel;
    this.callbackOnAnimationEnd = callbackOnAnimationEnd;
  }

  async setShowOriginMarker(currentIndex: number, currentData: number[][]) {
    if (currentIndex > 0 && currentIndex < this.travelArray.length) {
      let nextPointPath = await pathDecoder(this.travelArray[currentIndex - 1]);
      let showMarker;
      const point1 = point(currentData[0]);
      const point2 = point(nextPointPath[nextPointPath.length - 1]);
      const distanceBetweenPoints = distance(point1, point2);

      if (distanceBetweenPoints >= 0.001 || currentIndex === 0) {
        showMarker = true;
      } else {
        showMarker = false;
      }

      return showMarker;
    }
    return null;
  }

  async startAnimation() {
    let currentIndex = this.currentTravelIndex;
    let currentPoint = this.travelArray[currentIndex];

    var from = point(currentPoint.departure.location?.coordinates as Position);
    var to = point(currentPoint.arrival.location?.coordinates as Position);

    let dist: number = distance(from, to);

    let config = getAnimationConfig(dist, currentPoint.selectedTransport);

    let minZoom = this.map.getMinZoom();
    let maxZoom = this.map.getMaxZoom();

    this.animationOptions = {
      animationPoints: this.travelArray,
      animated: true,
      UIConfig: {
        // planeSize: config!.modelSize * this.modelSize,
        modelScale: getScaleFromZoom(
          config!.mapZoom >= minZoom
            ? config!.mapZoom <= maxZoom
              ? config!.mapZoom
              : maxZoom
            : minZoom,
        ),
        uiScale: this.modelSize,
        curveSpeed: config!.curveSpeed,
        animationDuration: this.DEFAULT_ANIMATION_TOTAL_TIME / this.videoLength,
        curveHeight: config!.mapCurveHeight,
        cameraZoom:
          config!.mapZoom >= minZoom
            ? config!.mapZoom <= maxZoom
              ? config!.mapZoom
              : maxZoom
            : minZoom,
        mapPitch: config!.mapPitch,
        mapBearing: config!.mapBearing,
        planeGrow: config!.modelGrowthPercentage,
      },
      data: this.lineStringArr,
    } as IAnimationUIOptions;

    let currentData = await pathDecoder(this.travelArray[currentIndex]);

    const onAnimationComplete = async () => {
      if (this.travelArray.length > 1) {
        console.log('TESTT', this.isViewTravel);
        if (currentIndex === this.travelArray.length - 1) {
          if (!this.isViewTravel) {
            currentIndex = 0;
          } else {
            console.log('Animation ended');
            if (this.callbackOnAnimationEnd) {
              setTimeout(() => {
                this.callbackOnAnimationEnd();
              }, 3000);
            }
            return;
          }
        } else currentIndex += 1;

        if (currentIndex === 0) {
          this.clearPathMesh();
        }

        currentPoint = this.travelArray[currentIndex];

        from = point(currentPoint.departure.location?.coordinates as Position);
        to = point(currentPoint.arrival.location?.coordinates as Position);

        dist = distance(from, to);
        config = getAnimationConfig(dist, currentPoint.selectedTransport);

        this.animationOptions = {
          animationPoints: this.travelArray,
          animated: true,
          UIConfig: {
            // planeSize: config!.modelSize * this.modelSize,
            modelScale: getScaleFromZoom(
              config!.mapZoom >= minZoom
                ? config!.mapZoom <= maxZoom
                  ? config!.mapZoom
                  : maxZoom
                : minZoom,
            ),
            uiScale: this.modelSize,
            curveSpeed: config!.curveSpeed,
            animationDuration:
              this.DEFAULT_ANIMATION_TOTAL_TIME / this.videoLength,
            curveHeight: config!.mapCurveHeight,
            cameraZoom:
              config!.mapZoom >= minZoom
                ? config!.mapZoom <= maxZoom
                  ? config!.mapZoom
                  : maxZoom
                : minZoom,
            mapPitch: config!.mapPitch,
            mapBearing: config!.mapBearing,
            planeGrow: config!.modelGrowthPercentage,
          },
        } as IAnimationUIOptions;

        currentData = await pathDecoder(currentPoint);

        this.showMarker = (await this.setShowOriginMarker(
          currentIndex,
          currentData,
        )) as boolean;

        this.animationControllers[currentIndex]?.startAnimation(
          this.travelArray,
          currentPoint,
          {
            duration: this.animationOptions!.UIConfig.animationDuration * 1000,
            animatePath: this.animationOptions!.animated,
            arcHeightScale: 200.0,
            UIConfig: this.animationOptions!.UIConfig,
            onCompleteCallback: () => {
              if (currentIndex <= this.travelArray.length - 1)
                onAnimationComplete();
            },
          } as IAnimationConfig,
          currentData,
          this.currentTravelIndex,
          this.showMarker,
        );
      }
    };

    const animateNextPoint = async () => {
      currentPoint = this.travelArray[currentIndex];
      currentData = await pathDecoder(currentPoint);

      this.animationControllers[currentIndex]?.startAnimation(
        this.travelArray,
        currentPoint,
        {
          duration: this.animationOptions!.UIConfig.animationDuration * 1000,
          animatePath: this.animationOptions!.animated,
          arcHeightScale: 200.0,
          UIConfig: this.animationOptions!.UIConfig,
          onCompleteCallback: () => {
            if (this.travelArray.length > 1) onAnimationComplete();
            else if (this.isViewTravel) {
              console.log('Animation ended');
              if (this.callbackOnAnimationEnd) {
                setTimeout(() => {
                  this.callbackOnAnimationEnd();
                }, 3000);
              }
              return;
            } else if (!this.isViewTravel) {
              setTimeout(() => {
                this.startAnimation();
              }, 1500);
            }
          },
        } as IAnimationConfig,
        currentData,
        this.currentTravelIndex,
        this.showMarker,
      );
    };

    this.clearPathMesh();

    animateNextPoint();
  }

  clearPathMesh() {
    for (const controller of this.animationControllers) {
      controller.clearMarkerandText();
      let mesh = controller.getPathMeshObj();
      if (mesh) this.tb.remove(mesh);
    }
  }

  cleanupAnimation() {
    if (this.animationControllers.length > 0) {
      for (const controller of this.animationControllers) {
        controller.cleanup();
      }

      console.log('clear from travel animation');
      // this.tb.clear();

      // Reset any state variables or resources used in the animation
      this.animationControllers = [];
      this.lineStringArr = [];
    }
  }

  getAnimCtrls() {
    return this.animationControllers;
  }

  showTextTransition() {
    const textAnimate = new TextAnimation('Just Dev It', this.tb);
    const plane = textAnimate.loadText();
    const centerlanglat = this.map.getCenter();
    const centerlanglatarray = centerlanglat.toArray();
    const centerPosition = this.tb.projectToWorld(centerlanglatarray);

    // centerPosition.z = -800;
    plane.position.copy(centerPosition);
    this.tb.add(plane);
  }

  async loadModel(options: any, onProgress: (progress: number) => void) {
    const resourceManager = ResourceLoader.getInstance();

    return new Promise<Object3D>(async (resolve, reject) => {
      try {
        const model = await resourceManager.loadModels(
          options,
          (loadedModel) => {
            // Call the onLoad callback when the model is loaded

            loadedModel.visible = false;
            loadedModel.up.set(0, 0, 1);
            loadedModel.scale.set(0, 0, 0);

            this.tb.add(loadedModel);
            resolve(loadedModel);
          },
          (progressEvent) => {
            // Call the onProgress callback with the loading progress
            if (onProgress) {
              onProgress((progressEvent.loaded / progressEvent.total) * 100);
            }
          },
          (errorEvent) => {
            // Call the onError callback if there's an error loading the model
            console.error('Error loading model:', errorEvent);
            reject(errorEvent);
          },
        );
      } catch (error) {
        console.error('Error loading model:', error);
        reject(error);
      }
    });
  }

  async setupModelResources() {
    const scale = 1300;
    const options = {
      modelEnum: this.planeModelEnum.toString(),
      scale: { x: scale, y: scale, z: scale },
      anchor: 'center',
      // units: 'meters',
      //   rotation: { x: 90, y: 180, z: 0 },
    };

    const carOpt = {
      modelEnum: this.carModelEnum.toString(),
      scale: { x: scale, y: scale, z: scale },
      anchor: 'auto',
      // units: 'meters',
      //   rotation: { x: 90, y: 180, z: 0 },
    };

    try {
      const [modelRef, carModelRef] = await Promise.all([
        this.loadModel(options, (progress) => {}),
        this.loadModel(carOpt, (progress) => {}),
      ]);

      this.modelRef = modelRef;
      this.carModelRef = carModelRef;
    } catch (error) {
      console.error('Error loading models:', error);
    }
  }

  setupAnimation() {
    this.loading = true;
    this.handleLoadingChange(this.loading);
    this.setupModelResources().then(() => {
      this.loading = false;
      this.handleLoadingChange(this.loading);

      if (this.travelArray.length > 0) {
        if (this.animationControllers.length === 0) {
          for (let i = 0; i < this.travelArray.length; i += 1) {
            if (this.travelArray[i].selectedTransport === 'Plane') {
              this.animationControllers[i] = new AnimationController(
                this.map as Map,
                i,
                this.modelRef as Object3D,
              );
            } else if (this.travelArray[i].selectedTransport === 'Car') {
              this.animationControllers[i] = new AnimationController(
                this.map as Map,
                i,
                this.carModelRef as Object3D,
              );
            }
          }
        } else {
          for (let i = 0; i < this.travelArray.length; i += 1) {
            if (this.travelArray[i].selectedTransport === 'Plane') {
              this.animationControllers[i].updateModel(
                this.modelRef as Object3D,
              );
            } else if (this.travelArray[i].selectedTransport === 'Car') {
              this.animationControllers[i].updateModel(
                this.carModelRef as Object3D,
              );
            }
          }
        }

        this.startAnimation();
      }
    });
  }
}
