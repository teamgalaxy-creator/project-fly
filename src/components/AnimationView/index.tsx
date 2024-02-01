import React, { useRef, useState, useEffect } from 'react';
import maplibregl, { LngLatBounds, LngLatLike, Marker } from 'maplibre-gl';
import FrameRateControl from './frameControl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './style.css';
import useStyles from './styles';
import mapStyles from './mapStyles';
import { useSelector } from '~/redux/reducers';
import ActionsCreator from '~/redux/actions';
import { Loader } from '@googlemaps/js-api-loader';

import {
  AnimationController,
  IAnimationUIConfig,
} from '~animation_engine/AnimationController';
import Stats from 'stats.js';
import { TravelFormData, FormData, DirectionsInput } from '~/utility/models';
import PointScheduleFormContainer from '~/containers/PointScheduleFormContainer';

import { Position } from '@turf/turf';
import { Threebox } from 'threebox-plugin';

import { useDispatch } from '~/redux/store';
import {
  LinearProgress,
  Box,
  Typography,
  CircularProgress,
  LinearProgressProps,
} from '@mui/material';
import { StaticTravelVisualizer } from '~/animation_engine/StaticTravelVisualizer';
import { TravelAnimation } from '~/animation_engine/TravelAnimation';
import ResourceLoader from '~/animation_engine/ResourceLoader';
import { PlaneModels, CarModels } from '~/animation_engine/utility/enums';

import AttributionControl from '../AttributionControl';
import RouteGenerator from '~/managers/RouteGenerator';
import {
  loadHDRI,
  pathDecoder,
  // setUserIDFromTokenStorage,
} from '~/utility/utils';
import { useNavigate } from 'react-router-dom';
import MapView from '../MainPageUi/MapWelcome';

interface AnimationViewProps {
  isVideoPopupMap: boolean;
}

// This interface will be removed later as the current UI is only for testing
export interface IAnimationUIOptions {
  animationPoints: TravelFormData[];
  animated: any;
  secDest: any;
  UIConfig: IAnimationUIConfig;
  data: Position[];
}

const getMapStyle = (styles: any[], index: number) => {
  let style = styles[index].isURL
    ? styles[index].URL
    : (styles[index] as unknown as maplibregl.StyleSpecification);

  return style;
};

// const resourceManager = ResourceLoader.getInstance();

// console.log(resourceManager, 'resource');

// Initialize stats outside of the component
// const stats1 = new Stats();
// stats1.showPanel(0); // Panel 0 = fps
// stats1.domElement.style.cssText = 'position:absolute;top:0px;right:240px;';
// document.body.appendChild(stats1.domElement);

// const stats2 = new Stats();
// stats2.showPanel(1); // Panel 0 = fps
// stats2.domElement.style.cssText = 'position:absolute;top:0px;right:80px;';
// document.body.appendChild(stats2.domElement);

// const stats3 = new Stats();
// stats3.showPanel(2); // Panel 0 = fps
// stats3.domElement.style.cssText = 'position:absolute;top:0px;right:160px;';
// document.body.appendChild(stats3.domElement);

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number },
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const AnimationView = (props: AnimationViewProps) => {
  // Maplibre
  const mapContainer = useRef<HTMLDivElement>(null);
  const isViewTravel = false;

  const map = useRef<maplibregl.Map>();
  const [lat] = useState(45.92);
  // const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [lng] = useState(6.87);
  const [zoom] = useState(2.0);
  const mapStyleIndex: any = useSelector(
    (state: any) => state.MapReducers.mapStyleIndex,
  );
  const logoContainer = useRef(null);

  // Canvas recodring variables
  const captureStreamRef = useRef();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600); // Detect initial screen width
  const handleAnimationEnd = () => {
    // Set playPauseState to true when animation ends
    dispatch(ActionsCreator.setPlayPauseState(playPauseState));
  };
  const fullscreenMode: boolean = useSelector(
    (state: any) => state.MapReducers.fullscreenMode,
  );

  const classes = useStyles({
    fullscreenMode: fullscreenMode,
    scheduleSectionState: false,
  });

  const travelArray: TravelFormData[] = useSelector(
    (state: any) => state.MapReducers.pointsArray,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const animationControllers = useRef<AnimationController[]>([]);

  // const stats1 = new Stats();
  // stats1.showPanel(0);
  // stats1.domElement.style.cssText =
  //   'position:absolute;top:0px;left:0px; z-index: 100;';
  // const stats2 = new Stats();
  // stats2.showPanel(1);
  // stats2.domElement.style.cssText =
  //   'position:absolute;top:0px;left:80px; z-index: 100;';
  // const stats3 = new Stats();
  // stats3.showPanel(2);
  // stats3.domElement.style.cssText =
  //   'position:absolute;top:0px;left:160px; z-index: 100;';

  const planeModelEnum: string = useSelector(
    (state: any) => state.MapReducers.planeModelEnum,
  );

  const userID: any = useSelector((state: any) => state.MapReducers.userID);

  const carModelEnum: string = useSelector(
    (state: any) => state.MapReducers.carModelEnum,
  );

  const visualizelineStringArr = useRef<Array<Position[]>>([]);

  const tb = useRef<typeof Threebox>();

  const htmlCanvas = useRef<HTMLDivElement>(null);

  const [selectedTravelData, setTravelData] = useState<
    TravelFormData[] | undefined
  >();
  const [currentPointData, setCurrentPointData] = useState<
    FormData | undefined
  >();

  const videoLength: any = useSelector(
    (state: any) => state.MapReducers.videoLength,
  );

  const modelSize: any = useSelector(
    (state: any) => state.MapReducers.modelSize,
  );

  const isRecording: boolean = useSelector(
    (state: any) => state.MapReducers.isRecording,
  );

  const currentTravelIndex = useSelector(
    (state) => state.AnimationReducers.currentTravelIndex,
  );

  const playPauseState = useSelector(
    (state) => state.AnimationReducers.playPauseState,
  );

  const handleMarkerClick = (
    travelData: TravelFormData[],
    index: number,
    currentMarker: string | null,
  ) => {
    let lastIndex = travelData.length - 1;
    if (currentMarker === 'origin') {
      setCurrentPointData(travelData[lastIndex].departure);
    } else {
      setCurrentPointData(travelData[lastIndex].arrival);
    }
    // setCurrentPointData(currentPointData , );
    setTravelData(travelData);
    dispatch(ActionsCreator.openPopUP(true));
  };

  // Plane Animation Controller
  const travelVisualizer = useRef<StaticTravelVisualizer>();
  const travelAnimation = useRef<TravelAnimation>();

  const content3DLayer = {
    id: 'custom-threebox-model',
    type: 'custom',
    renderingMode: '3d',
    render: () => {
      if (tb.current) tb.current.update();

      for (const obj in animationControllers.current) {
        (animationControllers.current[obj] as any).animate();
      }
    },
  };

  useEffect(() => {
    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current as HTMLElement,
        attributionControl: false,
        style: getMapStyle(mapStyles, mapStyleIndex),
        center: [lng, lat],
        zoom: zoom,
        antialias: true,
        maxPitch: 80,
        minZoom: isMobile ? 0.25 : 1.25,
        interactive: props.isVideoPopupMap ? true : false,
        maplibreLogo: false,
        preserveDrawingBuffer: true,
      });

      tb.current = (window as any).tb = new Threebox(
        map.current,
        map.current.getCanvas().getContext('webgl'),
        {
          defaultLights: false,
        },
      );
      console.log('load HDRI');

      loadHDRI(tb.current);

      // const frameControl = new FrameRateControl();
      // map.current.addControl(frameControl);

      map.current.on('load', function () {
        map.current?.addLayer(content3DLayer as any);
      });

      if (!props.isVideoPopupMap) {
        map.current.on('render', function () {
          if (!map.current) return;

          if (captureStreamRef.current) {
            // console.log(mediaRecorderRef.current?.videoBitsPerSecond);
            // captureStreamRef.current.getVideoTracks()[0].requestFrame();
          }
        });
        // });
      }

      // if (!props.isVideoPopupMap) {
      //   map.current.addControl(new maplibregl.FullscreenControl());
      // }
      if (props.isVideoPopupMap && !fullscreenMode) {
        map.current.addControl(
          new maplibregl.NavigationControl({
            visualizePitch: true,
            showZoom: true,
            showCompass: false,
          }),
          'top-right',
        );
      }
    }

    return () => {
      ('destroying');
      // console.log('tb current clear in animation view')
      tb.current.clear();
      animationControllers.current = [];
    };
  }, []);

  const handleLoadingChange = (newLoadingState: boolean) => {
    setLoading(newLoadingState);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Tab is not visible, perform cleanup
        if (travelAnimation.current) {
          travelAnimation.current.cleanupAnimation();
        }
      } else if (!props.isVideoPopupMap) {
        // Tab is visible and video popup map is not active, create animation
        travelAnimation.current = new TravelAnimation(
          travelArray,
          map.current!,
          tb.current,
          planeModelEnum,
          carModelEnum,
          videoLength,
          modelSize,
          currentTravelIndex,
          playPauseState,
          handleLoadingChange,
          isViewTravel,
          handleAnimationEnd,
        );

        travelAnimation.current.setupAnimation();
        animationControllers.current = travelAnimation.current.getAnimCtrls();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    handleVisibilityChange();
    // Cleanup function to be called when the component unmounts or when the dependencies change
    return () => {
      if (travelAnimation.current) {
        // console.log('componet unmount');
        travelAnimation.current.cleanupAnimation();
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [
    props.isVideoPopupMap,
    videoLength,
    modelSize,
    planeModelEnum,
    carModelEnum,
    currentTravelIndex,
    fullscreenMode,
    travelArray,
    playPauseState,
  ]);

  useEffect(() => {
    if (props.isVideoPopupMap && !travelVisualizer.current) {
      travelVisualizer.current = new StaticTravelVisualizer(map.current!);
      console.log('travelvisualizer running');
    }

    if (travelArray.length > 0) {
      visualizelineStringArr.current = [];
      if (visualizelineStringArr.current) {
        travelVisualizer.current?.visualizeTravel(
          travelArray,
          handleMarkerClick,
        );
      }

      if (map.current) {
        const bounds = new LngLatBounds(
          travelArray[0].departure.location?.coordinates as LngLatLike,
          travelArray[0].departure.location?.coordinates as LngLatLike,
        );

        const padding = window.innerWidth * 0.2;
        const paddingH = window.innerHeight * 0.2;

        for (const coord of travelArray) {
          bounds.extend(coord.arrival.location?.coordinates as LngLatLike);
        }

        if (props.isVideoPopupMap)
          map.current.fitBounds(bounds, {
            padding: {
              top: paddingH,
              bottom: paddingH,
              left: padding,
              right: padding,
            },
          });
      }
    } else {
      travelVisualizer.current?.clearTravel();
    }
  }, [travelArray, mapStyleIndex]);

  useEffect(() => {
    map.current?.setStyle(getMapStyle(mapStyles, mapStyleIndex));

    console.log(111);
  }, [mapStyleIndex]);

  useEffect(() => {
    if (map.current)
      map.current.once('styledata', function () {
        if (map.current?.getLayer('custom-threebox-model')) {
          map.current.removeLayer('custom-threebox-model');
        }
        map.current?.addLayer(content3DLayer as any);
      });
  }, [mapStyleIndex]);

  useEffect(() => {
    if (isRecording) {
      const startTime = new Date().getTime();

      const timer = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);

        const totalDuration =
          (10 / videoLength) * animationControllers.current.length +
          animationControllers.current.length * 5;

        const newProgress = (elapsedSeconds / totalDuration) * 100;

        if (newProgress >= 100) {
          clearInterval(timer);
          // setProgress(100);
        } else {
          // setProgress(newProgress);
        }
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [videoLength, isRecording]);

  // useEffect(() => {
  //   const mapElement = mapContainer.current;
  //   if (mapElement) {
  //     mapElement.appendChild(stats1.domElement);
  //     mapElement.appendChild(stats2.domElement);
  //     mapElement.appendChild(stats3.domElement);
  //   }

  //   return () => {
  //     if (mapElement) {
  //       mapElement.removeChild(stats1.domElement);
  //       mapElement.removeChild(stats2.domElement);
  //       mapElement.removeChild(stats3.domElement);
  //     }
  //   };
  // }, []);

  return (
    <div className="body" style={{ position: 'relative' }} ref={htmlCanvas}>
      {loading && (
        <div className={classes.loadingScreen}>
          <CircularProgress size={40} thickness={4} />
        </div>
      )}
      {props.isVideoPopupMap ? (
        <>
          <div className={classes.mapsMainContainer} ref={mapContainer}>
            {/* <Box className={classes.watermark} >
          <img src="/logoVizualTravel.svg" alt="Logo" />
        </Box> */}
          </div>
          <AttributionControl placement={false}></AttributionControl>

        </>
      ) : (
        <>
          <div
            className={
              // fullscreenMode
              // ? classes.fullScreenmapsVideoPopupContainer
              classes.mapsVideoPopupContainer
            }
            ref={mapContainer}
          >
            {/* <Box
              className={
                fullscreenMode ? classes.watermarkFullscreen : classes.watermark
              }
            >
              <img src="/logoVizualTravel.svg" alt="Logo" />
            </Box> */}
          </div>
          {fullscreenMode ? (
            <div>
              <MapView />
              <AttributionControl placement={true}></AttributionControl>

            </div>

          ) : (
            <></>
          )}
        </>
      )}

      {/* <div
        className={`${classes.overlay} ${
          isRecording ? classes.showOverlay : ''
        }`}
      >
        <div className={classes.infoMessage}>
          <h2 className={classes.title}>Rendering in Progress</h2>
          <p className={classes.message}>
            Please keep this window open and active on your screen, it may take
            a few minutes
          </p>
          <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progress} />
          </Box>
        </div>
        <Button color="primary" variant="contained" onClick={cancelRecording}>
          Cancel
        </Button>
      </div> */}

      <PointScheduleFormContainer
        travelData={selectedTravelData as TravelFormData[]}
        currentPointData={currentPointData as FormData}
      />

    </div>
  );
};

export default AnimationView;
