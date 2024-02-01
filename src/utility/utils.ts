import {
  AnimationProps,
  ConfigurationProps,
  DirectionsInput,
  TravelFormData,
  TravelHistoryData,
} from '~models';
import tzlookup from 'tz-lookup';
import ActionsCreator from '~/redux/actions';
import {
  carZoomConfiguration,
  planeZoomConfiguration,
} from '~/components/AnimationView/animation.config';
import { Position } from '@turf/turf';
import RouteGenerator from '~/managers/RouteGenerator';

import { Threebox } from 'threebox-plugin';
import {
  AmbientLight,
  EquirectangularReflectionMapping,
  UnsignedByteType,
} from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { supabase } from '~/supabase/supabaseClient';

export function isEditingAllowed(
  index: number,
  travelItem: TravelFormData[],
): boolean {
  const isFirstIndex = index === 0;
  const isLastIndex = index === travelItem.length - 1;

  return isFirstIndex || isLastIndex;
}

export function loadHDRI(tb: typeof Threebox) {
  // let tb : typeof Threebox;
  // console.log('hdri loading in utils');

  const light = new AmbientLight(0x404040, 3); // soft white light
  tb.add(light);

  let envMap: any;
  let hdrCubeMap = new RGBELoader()
    .setDataType(UnsignedByteType)
    .setPath('./hdr/')
    .load('industrial_sunset_puresky_2k.hdr', () => {
      hdrCubeMap.mapping = EquirectangularReflectionMapping;
      tb.scene.environment = hdrCubeMap;
      envMap = hdrCubeMap;
    });
}

export function calculateTravelTime(
  departureDateTime: Date | null,
  arrivalDateTime: Date | null,
): string {
  let travelTime = '';
  if (departureDateTime && arrivalDateTime) {
    const diffInMilliseconds =
      arrivalDateTime.getTime() - departureDateTime.getTime();
    const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor(
      (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
    );
    travelTime = `${hours}h ${minutes}m`;
  }
  return travelTime;
}

export const lookupTimezone = (latitude: any, longitude: any) => {
  const timezone = tzlookup(latitude, longitude);
  return timezone;
};

export function convertTZ(date: any, tzString: any) {
  return new Date(
    (typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {
      timeZone: tzString,
    }),
  );
}

export function timezoneDate(location: any, date: any) {
  if (location && date) {
    const coordinates = location.coordinates as Position;

    const timezone = lookupTimezone(coordinates[1], coordinates[0]);

    return convertTZ(date, timezone); // Tue Apr 20 2012 17:10:30 GMT+0700 (Western Indonesia Time)
  }
}

export function formattTime(dateTime: Date | null): string {
  if (dateTime) {
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    return `${formattedHours}:${minutes} ${period}`;
  }
  return '';
}

export function formatTime(dateTime: Date | null | undefined): string {
  if (dateTime) {
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    return `${formattedHours}:${minutes} ${period}`;
  }
  return '';
}

export function getAnimationConfig(distance: number, option: string) {
  let configArray: ConfigurationProps[] = [];

  if (option === 'Plane') {
    configArray = planeZoomConfiguration;
  } else if (option === 'Car') {
    configArray = carZoomConfiguration;
  }

  if (configArray) {
    for (const config of configArray) {
      const { minDist, maxDist } = config.distanceRange;
      if (distance >= minDist && distance <= maxDist) {
        return {
          mapCurveHeight: config.mapCurveHeight,
          mapPitch: config.mapPitch,
          mapBearing: config.mapBearing,
          mapZoom: config.mapZoom,
          modelSize: config.modelSize,
          modelGrowthPercentage: config.modelGrowthPercentage,
          curveSpeed: config.curveSpeed,
        } as AnimationProps;
      }
    }
  }
  return null;
}

export function addOrUpdateTravelData(
  travelHistoryData: TravelHistoryData[], // Assuming this is the correct type for travelHistoryData
  currentIndex: number,
  currentHistoryID: number,
  travelPoints: any, // You should replace "any" with the correct type
  email: string, // You should use the correct type for email
  userId: string,
  setLoading: (value: boolean) => void, // Assuming setLoading takes a boolean argument
  setSuccessMessage: (message: string) => void, // Assuming setSuccessMessage takes a string argument
  setSuccessSnackbarOpen: (isOpen: boolean) => void, // Assuming setSuccessSnackbarOpen takes a boolean argument
  dispatch: any, // You should replace "any" with the correct type
) {
  if (travelHistoryData.length > 0 && currentHistoryID !== -1) {
    if (travelHistoryData[currentIndex].id === currentHistoryID) {
      // Update existing travel history
      ActionsCreator.updateTravelToHistoryAndDispatch(
        travelPoints.current,
        currentHistoryID,
      )
        .then((data) => {
          setLoading(false);
          console.log('Operation successful:', data);
          setSuccessMessage('Saved Successfully');
          setSuccessSnackbarOpen(true);
          setTimeout(() => {
            dispatch(ActionsCreator.setTravelFormSaveState(true));
            dispatch(ActionsCreator.openModifyTravelForm(false));
            dispatch(ActionsCreator.openTravelItinerary(true));
            dispatch(ActionsCreator.setTravelHistoryIndex(0));
          }, 500);
        })
        .catch((error) => {
          // Handle error with the 'error' returned
          console.error('Error:', error);
          setLoading(false);
        });
    }
  } else {
    // Add new travel history
    ActionsCreator.addTravelToHistoryAndDispatch(
      travelPoints.current,
      email,
      userId,
    )
      .then((data) => {
        setLoading(false);
        console.log('Operation successful:', data);
        setSuccessMessage('Saved Successfully');
        setSuccessSnackbarOpen(true);
        setTimeout(() => {
          dispatch(ActionsCreator.setTravelFormSaveState(true));
          dispatch(ActionsCreator.openTravelForm(false));
        }, 1000);
      })
      .catch((error) => {
        // Handle error with the 'error' returned
        console.error('Error:', error);
        setLoading(false);
      });
  }
}

export const fetchAndStoreUserID = async (dispatch: any) => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Error fetching user ID:', error.message);
      return null;
    }

    if (data.session?.user) {
      const user = data.session?.user;

      dispatch(ActionsCreator.setUserID(user.id));
      dispatch(ActionsCreator.setUserEmail(user.email as string));
      dispatch(ActionsCreator.setUserName(user.user_metadata.full_name));

      if (user.user_metadata?.profile_picture)
        dispatch(
          ActionsCreator.setUserProfileImageURL(
            user.user_metadata.profile_picture,
          ),
        );

      return user.id;
    } else {
      // User is not authenticated
      console.warn('User is not authenticated');
      return null;
    }
  } catch (error: any) {
    console.error('Error fetching user ID:', error.message);
    return null;
  }
};

export async function pathDecoder(travelData: TravelFormData) {
  let decodedPath = [];
  let dataLineString = [] as number[][];
  let data;

  const routeGenerator = RouteGenerator.getInstance();

  if (travelData.selectedTransport === 'Car') {
    if (!travelData.encodedPath) {
      data = await routeGenerator.getDirections({
        origin: {
          coordinates: travelData.departure.location?.coordinates as Position,
          placeId: travelData.departure.location?.placeId as string,
        },
        destination: {
          coordinates: travelData.arrival.location?.coordinates as Position,
          placeId: travelData.arrival.location?.placeId as string,
        },
      } as DirectionsInput);
    } else {
      data = travelData.encodedPath;
    }

    const lineString = await routeGenerator.decodePath(data);

    if (!data)
      dataLineString = [
        travelData.departure.location?.coordinates as Position,
        travelData.arrival.location?.coordinates as Position,
      ];
    else dataLineString = lineString.coordinates;
  } else if (travelData.selectedTransport === 'Plane') {
    dataLineString = [
      travelData.departure.location?.coordinates as Position,
      travelData.arrival.location?.coordinates as Position,
    ];
  }

  return dataLineString;
}

export async function setEncodedPaths(travelData: TravelFormData) {
  let updatedTravelPoints!: any;
  const routeGenerator = RouteGenerator.getInstance();

  if (travelData.selectedTransport === 'Car') {
    try {
      let data: any = travelData.encodedPath;

      // Assuming routeGenerator.getDirections returns a Promise resolving to encodedPath
      if (!data) {
        data = await routeGenerator.getDirections({
          origin: {
            placeId: travelData.departure.location?.placeId as string,
          },
          destination: {
            placeId: travelData.arrival.location?.placeId as string,
          },
        } as DirectionsInput);
      }

      // Create a new object based on travelData with updated encodedPath
      const updatedTravelData = {
        ...travelData,
        encodedPath: data,
      };

      // Push the updatedTravelData to the updatedTravelPoints array
      updatedTravelPoints = updatedTravelData;
    } catch (error) {
      // Handle error if getting directions fails for a specific travelData
      console.error('Error getting directions:', error);
    }
  } else if (travelData.selectedTransport === 'Plane') {
    updatedTravelPoints = travelData;
  }

  return updatedTravelPoints;
}
