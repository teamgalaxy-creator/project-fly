// Add interface/types here which are to be used in multiple places

import { Position } from '@turf/turf';
import { LngLatLike } from 'maplibre-gl';

// For Example, the Travel Data Array alongwith object can be initialized here and then reused in every componentexport type TravelFormData = {
export type TravelFormData = {
  arrival: {
    location: Options | null;
    dateTime: Date | null;
    category: string;
    timezone: string;
  };
  departure: {
    location: Options | null;
    dateTime: Date | null;
    category: string;
    timezone: string;
  };
  selectedTransport: string;
  encodedPath: string;
};

export type TravelHistoryData = {
  UUID: string;
  id: number;
  created_at: string;
  travelPoints: TravelFormData[];
};

export type PublishHistoryData = {
  id: number;
  travelPoints: TravelFormData[];
};

export type FormData = {
  location: Options | null;
  dateTime: Date | null;
  category: string;
  timezone: string;
};

export type FormDataProps = {
  arrival: FormData;
  departure: FormData;
  selectedTransport: string;
  encodedPath: string;
};
export interface Options {
  value: string;
  label: string;
  text: string;
  code: string;
  city: string;
  country: string;
  coordinates: LngLatLike | Position;
  timezone: string;
  placeId: string;
}
export type ConfigurationProps = AnimationProps & {
  type: string;
  distanceRange: {
    minDist: number;
    maxDist: number;
  };
};

export type ModelConfigProps = {
  [modelType: string]: {
    name: string;
    path: string;
    UIname: string;
  };
};

export interface DirectionsInput {
  origin: {
    placeId: string;
  };
  destination: {
    placeId: string;
  };
}

export interface AnimationProps {
  mapCurveHeight: number;
  mapPitch: number;
  mapBearing: number;
  mapZoom: number;
  modelSize: number;
  modelGrowthPercentage: number;
  curveSpeed: number;
}
