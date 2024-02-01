import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '~/supabase/supabaseClient';
import { TravelFormData } from '~/utility/models';
import useStyles from './styles';
import { useSelector } from '~/redux/reducers';
import { AnimationController } from '~/animation_engine/AnimationController';
import maplibregl, { LngLatBounds, LngLatLike, Map } from 'maplibre-gl';
import mapStyles from '../AnimationView/mapStyles';
import { Threebox } from 'threebox-plugin';
import Stats from 'stats.js';
import { TravelAnimation } from '~/animation_engine/TravelAnimation';
import VideoControls from '../VideoControls';
import AttributionControl from '../AttributionControl';
import FrameRateControl from '../AnimationView/frameControl';
import { StaticTravelVisualizer } from '~/animation_engine/StaticTravelVisualizer';
import { Position } from '@turf/turf';
import { CircularProgress, Fab } from '@mui/material';
import { Icon } from '@iconify/react';
import { Loader } from '@googlemaps/js-api-loader';
import { loadHDRI } from '~/utility/utils';
import ActionsCreator from '~/redux/actions';
import { useDispatch } from '~/redux/store';

const getMapStyle = (styles: any, index: number) => {
  let style = styles[index].isURL
    ? styles[index].URL
    : (styles[index] as unknown as maplibregl.StyleSpecification);

  return style;
};

export default function ViewTravel() {
  const location = useLocation();
  const classes = useStyles();
  const tb = useRef<typeof Threebox>();
  const [zoom] = useState(2.0);
  const map = useRef<Map>();
  const [lat] = useState(45.92);
  const [lng] = useState(6.87);
  const visualizelineStringArr = useRef<Array<Position[]>>([]);
  const isViewTravel = true;
  const [travelPoints, setTravelPoints] = useState<TravelFormData[]>([]);
  const [modelSize, setModelSize] = useState(0);
  const [videoLength, setVideoLength] = useState(0);
  const [planeModelEnum, setplaneModelEnum] = useState('');
  const [carModelEnum, setcarModelEnum] = useState('');
  const [mapStyleIndex, setMapStyleIndex] = useState(null);
  const [travelLoader, setTravelLoader] = useState(true);

  const [fullscreenState, setFullScreenState] = useState<boolean>();
  const [fullScreenStateforIcon, setFullScreenStateforIcon] =
    useState<boolean>(false);
  const fullscreenStateRef = useRef(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const queryParams = new URLSearchParams(location.search);
  const animationControllers = useRef<AnimationController[]>([]);
  const travelVisualizer = useRef<StaticTravelVisualizer>();
  const encodingRef = useRef<any>();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600); // Detect initial screen width
  const isMounted = useRef(true);
  const dispatch = useDispatch();
  const [animationEnded, setAnimationEnded] = useState(true);
  const stats1 = new Stats();
  stats1.showPanel(0);
  stats1!.dom.style.cssText =
    'position:absolute;top:0px;left:0px; z-index: 100;';
  const stats2 = new Stats();
  stats2.showPanel(1);
  stats2!.dom.style.cssText =
    'position:absolute;top:0px;left:80px; z-index: 100;';
  const stats3 = new Stats();
  stats3.showPanel(2);
  stats3!.dom.style.cssText =
    'position:absolute;top:0px;left:160px; z-index: 100;';

  const travelAnimation = useRef<TravelAnimation>();
  const handleAnimationEnd = () => {
    // Set playPauseState to true when animation ends
    setAnimationEnded(true);
    dispatch(ActionsCreator.setPlayPauseState(!playPauseState));
  };
  const currentTravelIndex = useSelector(
    (state) => state.AnimationReducers.currentTravelIndex,
  );

  const playPauseState = useSelector(
    (state) => state.AnimationReducers.playPauseState,
  );

  const encodedTourID = queryParams.get('tourID');

  const tourID = decodeTourID(Number(encodedTourID));

  function decodeTourID(encodedTourID: number) {
    return (encodedTourID - 100010) / 9;
  }

  async function getTravelItinerary(tourID: number) {
    await setupGoogle();

    const { data } = await supabase
      .from('Publish Travel')
      .select(
        'travelPoints,model,video_length,model_size,map_style_index,car_model',
      )
      .eq('id', tourID);

    return data;
  }

  useEffect(() => {
    getTravelItinerary(tourID).then((data: any) => {
      setTravelLoader(false);
      if (isMounted.current) {
        setTravelPoints(data[0].travelPoints);
        setModelSize(data[0].model_size);
        setVideoLength(data[0].video_length);
        setplaneModelEnum(data[0].model);
        setcarModelEnum(data[0].car_model);
        setMapStyleIndex(data[0].map_style_index);
      }
    });

    if (document.documentElement.requestFullscreen!) setFullScreenState(true);
    else setFullScreenState(false);
  }, [tourID]);

  const content3DLayer = {
    id: 'custom-threebox-model',
    type: 'custom',
    renderingMode: '3d',
    render: () => {
      // let date = new Date();//new Date(2020, 7, 14, 0, 39);
      // tb.setSunlight(date, origin); //set Sun light for the given datetime and lnglat
      if (tb.current) tb.current.update();
      // animate();
      for (const obj in animationControllers.current) {
        (animationControllers.current[obj] as any).animate();
      }

      // stats1.update();
      // stats2.update();
      // stats3.update();
    },
  };

  useEffect(() => {
    if (!map.current && mapStyleIndex !== null) {
      map.current = new maplibregl.Map({
        container: mapContainer.current as HTMLElement,
        style: getMapStyle(mapStyles, mapStyleIndex),
        center: [lng, lat],
        attributionControl: false,
        zoom: zoom,
        antialias: true,
        minZoom: isMobile ? 0.25 : 1.25,
        maxPitch: 80,
        interactive: false,
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

      return () => {
        if (isMounted.current) {
          console.log('tb current clear in view travel');
          tb.current.clear();
          animationControllers.current = [];
        }
      };
    }
  }, [mapStyleIndex]);

  useEffect(() => {
    if (animationEnded) {
      travelVisualizer.current = new StaticTravelVisualizer(map.current!);
      if (travelPoints.length > 0) {
        visualizelineStringArr.current = [];

        if (visualizelineStringArr.current) {
          travelVisualizer.current?.visualizeTravel(
            travelPoints,
            handleMarkerClick,
          );
          const padding = window.innerWidth * 0.2;
          const paddingH = window.innerHeight * 0.2;

          const bounds = new LngLatBounds(
            travelPoints[0].departure.location?.coordinates as LngLatLike,
            travelPoints[0].departure.location?.coordinates as LngLatLike,
          );

          // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
          for (const coord of travelPoints) {
            bounds.extend(coord.arrival.location?.coordinates as LngLatLike);
          }

          if (isMobile) {
            map.current?.fitBounds(bounds, {
              padding: {
                top: padding,
                bottom: padding,
                left: paddingH,
                right: paddingH,
              },
            });
          } else {
            console.log('fitblounds');

            map.current?.fitBounds(bounds, {
              padding: {
                top: paddingH,
                bottom: paddingH,
                left: padding,
                right: padding,
              },
            });
          }
        }
        setAnimationEnded(false);
      }
    }
  }, [mapStyleIndex]);

  const [loading, setLoading] = useState(false);

  const handleLoadingChange = (newLoadingState: boolean) => {
    setLoading(newLoadingState);
  };

  useEffect(() => {
    if (playPauseState) {
      travelAnimation.current = new TravelAnimation(
        travelPoints,
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

    return () => {
      if (travelAnimation.current && isMounted.current && !playPauseState) {
        map.current?.setZoom(zoom);
        travelAnimation.current.cleanupAnimation();
      }
    };
  }, [playPauseState]);

  const handleMarkerClick = (
    travelData: TravelFormData[],
    index: number,
    currentMarker: string | null,
  ) => {
    let lastIndex = travelData.length - 1;
    if (currentMarker === 'origin') {
      // setCurrentPointData(travelData[lastIndex].departure);
    } else {
      // setCurrentPointData(travelData[lastIndex].arrival);
    }
    // setCurrentPointData(currentPointData , );

    // dispatch(ActionsCreator.openPopUP(true));
  };

  async function setupGoogle() {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
      version: 'weekly',
      authReferrerPolicy: 'origin',
    });

    encodingRef.current = await loader.importLibrary('geometry');
  }

  useEffect(() => {
    if (travelVisualizer.current && playPauseState) {
      travelVisualizer.current?.clearTravel();
      console.log('Cleaup called');
    }
  }, [playPauseState]);

  if (tourID === undefined) {
    return <div>No tour ID provided</div>;
  }

  const handleFullScreenToggle = () => {
    if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .then(() => {
          setFullScreenStateforIcon(false);
          console.log(
            'Document Exited from Full screen mode',
            fullscreenStateRef.current,
          );
        })
        .catch((err) => console.error(err));
    } else {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().then(() => {
          setFullScreenStateforIcon(true);

          console.log(
            'Document Entered Full screen mode',
            fullscreenStateRef.current,
          );
        });
      }
    }
    // if (!isRecording)
    // dispatch(ActionsCreator.setFullscreenAnimationMode(!fullscreenMode));
  };

  // useEffect(() => {
  //   if (props.isVideoPopupMap && !travelVisualizer.current)
  //     travelVisualizer.current = new StaticTravelVisualizer(map.current!);
  //   if (travelArray.length > 0) {
  //     visualizelineStringArr.current = [];
  //     asyncVisualizeEffect().then(() => {
  //       if (visualizelineStringArr.current) {
  //         travelVisualizer.current?.visualizeTravel(
  //           travelArray,
  //           handleMarkerClick,
  //           visualizelineStringArr.current,
  //         );
  //       }
  //     });

  //     if (map.current) {
  //       const bounds = new LngLatBounds(
  //         travelArray[0].departure.location?.coordinates as LngLatLike,
  //         travelArray[0].departure.location?.coordinates as LngLatLike,
  //       );

  //       // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
  //       for (const coord of travelArray) {
  //         bounds.extend(coord.arrival.location?.coordinates as LngLatLike);
  //       }
  //       if (props.isVideoPopupMap)
  //         map.current.fitBounds(bounds, {
  //           padding: 50,
  //         });
  //     }
  //   } else {
  //     travelVisualizer.current?.clearTravel();
  //   }
  // }, [travelArray, mapStyleIndex]);

  // if (travelLoader) {
  //   return (
  //     <CircularProgress
  //       size={40}
  //       thickness={4}
  //       style={{ position: 'absolute', top: '50%', left: '50%' }}
  //     />
  //   );
  // }

  return (
    <div>
      <div className={classes.mapsMainContainer} ref={mapContainer} />
      <AttributionControl placement={true}></AttributionControl>

      {loading && (
        <div className={classes.loadingScreen}>
          <CircularProgress size={40} thickness={4} />
        </div>
      )}

      {fullscreenState && playPauseState && (
        <Fab
          className={classes.topRightFab}
          color="primary"
          aria-label="Add"
          onClick={handleFullScreenToggle}
        >
          <Icon
            // icon="material-symbols:fullscreen"
            icon={
              fullScreenStateforIcon
                ? 'tdesign:fullscreen-exit'
                : 'material-symbols:fullscreen'
            }
            color="black"
            width="40"
            height="40"
          />
        </Fab>
      )}

      {travelPoints.length > 0 && (
        <>{!playPauseState ? <VideoControls /> : null}</>
      )}
    </div>
  );
}
