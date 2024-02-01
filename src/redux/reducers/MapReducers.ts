import * as Types from '../actionTypes';
import { TravelFormData, TravelHistoryData } from '../../utility/models';

type JSONEdit = {
  mapCurveHeight: number;
  mapPitch: number;
  mapBearing: number;
  mapZoom: number;
  modelSize: number;
  modelGrowthPercentage: number;
  curveSpeed: number;
};

export type MapProps = {
  openTravelForm: boolean;
  popupState: boolean;
  travelItineraryState: boolean;
  isTravelFormSaved: boolean;
  modifyTravelFormState: boolean;
  index: number | null;
  scheduleSectionState: boolean;
  historyCardState: boolean;
  mapClearState: boolean;
  pointsArray: TravelFormData[]; // Add this property to store travel points
  mapCustomizationPopupState: boolean;
  mapStyleIndex: number;
  historyPageState: boolean;
  videoPopupState: boolean;
  videoLength: number;
  modelSize: number;
  isRecording: boolean;
  startRecording: boolean;
  stopRecording: boolean;
  travelHistoryState: TravelHistoryData[];
  travelHistoryIndex: number;
  paymentStatsState: boolean;
  travelHistoryTrackingID: number;
  verificationEmailState: string;
  fullscreenMode: boolean;
  animationJSON: JSONEdit | null;
  planeModelEnum: string;
  carModelEnum: string;
  downloadStartTime: Date;
  settingsPageState: boolean;
  publishID: number;
  feedbackPopupState: boolean;
  userID: string;
  userEmail: string;
  userName: string;
  profileImgURL: string;
};

type ActionProps = MapProps & {
  type: string;
};

const initialState: MapProps = {
  mapClearState: false,
  popupState: false,
  openTravelForm: false,
  travelItineraryState: false,
  modifyTravelFormState: false,
  isTravelFormSaved: false,
  scheduleSectionState: false,
  historyCardState: false,
  pointsArray: [],
  index: null,
  mapCustomizationPopupState: false,
  mapStyleIndex: 0,
  historyPageState: false,
  videoPopupState: false,
  videoLength: 1,
  modelSize: 1,
  isRecording: false,
  startRecording: false,
  stopRecording: false,
  travelHistoryState: [],
  travelHistoryIndex: 0,
  travelHistoryTrackingID: -1,
  verificationEmailState: '',
  paymentStatsState: false,
  fullscreenMode: false,
  animationJSON: null,
  planeModelEnum: '0',
  carModelEnum: '100',
  downloadStartTime: new Date(), // Set the initial value for downloadStartTime
  settingsPageState: false,
  publishID: 0,
  feedbackPopupState: false,
  userID: '',
  userEmail: '',
  userName: '',
  profileImgURL: 'icons/croppedLogoVizualTravel.svg',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: ActionProps) => {
  switch (action.type) {
    case Types.TRAVEL_FORM_STATE:
      return {
        ...state,
        openTravelForm: action.openTravelForm,
      };
    case Types.SET_MODIFY_TRAVEL_STATE:
      return {
        ...state,
        modifyTravelFormState: action.modifyTravelFormState,
      };
    case Types.GET_USER_ID:
      return {
        ...state,
        userID: action.userID,
      };
    case Types.GET_USER_EMAIL:
      return {
        ...state,
        userEmail: action.userEmail,
      };
    case Types.SET_INDEX_FOR_MODIFY:
      return {
        ...state,
        index: action.index,
      };
    case Types.SET_TRAVEL_ITINERARY_STATE:
      return {
        ...state,
        travelItineraryState: action.travelItineraryState,
      };
    case Types.POPUP_STATE:
      return {
        ...state,
        popupState: action.popupState,
      };
    case Types.ADD_TRAVEL_POINT:
      return {
        ...state,
        pointsArray: action.pointsArray,
      };
    case Types.DISCARD_TRAVEL_POINTS:
      return {
        ...state,
        pointsArray: [], // Discard all travel points by setting the array to an empty one
      };
    case Types.SET_TRAVEL_FORM_SAVE_STATE:
      return {
        ...state,
        isTravelFormSaved: action.isTravelFormSaved, // Discard all travel points by setting the array to an empty one
      };
    case Types.SET_SCHEDULE_SECTION_STATE:
      return {
        ...state,
        scheduleSectionState: action.scheduleSectionState, // Discard all travel points by setting the array to an empty one
      };

    case Types.MAP_CUSTOMIZATION_POPUP_STATE:
      return {
        ...state,
        mapCustomizationPopupState: action.mapCustomizationPopupState,
      };

    case Types.SET_MAP_STYLE_INDEX:
      return {
        ...state,
        mapStyleIndex: action.mapStyleIndex,
      }; //reducer is set

    case Types.SET_HISTORY_PAGE_STATE:
      return {
        ...state,
        historyPageState: action.historyPageState,
      };
    case Types.SET_VIDEO_POPUP_STATE:
      return {
        ...state,
        videoPopupState: action.videoPopupState,
      };

    case Types.CLEAR_MAP_STATE:
      return {
        ...state,
        mapClearState: action.mapClearState,
      };
    case Types.SET_MODEL_SIZE:
      return {
        ...state,
        modelSize: action.modelSize,
      };
    case Types.SET_VIDEO_LENGTH:
      return {
        ...state,
        videoLength: action.videoLength,
      };

    case Types.SET_IS_RECORDING:
      return {
        ...state,
        isRecording: action.isRecording,
      };

    case Types.START_RECORDING:
      return {
        ...state,
        startRecording: action.startRecording,
      };
    case Types.STOP_RECORDING:
      return {
        ...state,
        stopRecording: action.stopRecording,
      };
    case Types.SAVE_TRAVEL_TO_HISTORY:
      return {
        ...state,
        travelHistoryState: action.travelHistoryState,
      };
    case Types.SET_TRAVEL_HISTORY_INDEX:
      return {
        ...state,
        travelHistoryIndex: action.travelHistoryIndex,
      }; //reducer is set

    case Types.SET_HISTORY_TRACKING_ID:
      return {
        ...state,
        travelHistoryTrackingID: action.travelHistoryTrackingID,
      };

    case Types.SET_VERIFICATION_EMAIL:
      return {
        ...state,
        verificationEmailState: action.verificationEmailState,
      };
    case Types.SET_PAYMENT_STATS_STATE:
      return {
        ...state,
        paymentStatsState: action.paymentStatsState,
      };

    case Types.SET_FULLSCREEN_MODE:
      return {
        ...state,
        fullscreenMode: action.fullscreenMode,
      };
    case Types.SELECT_PLANE_MODEL:
      return {
        ...state,
        planeModelEnum: action.planeModelEnum,
      };
    case Types.SELECT_CAR_MODEL:
      return {
        ...state,
        carModelEnum: action.carModelEnum,
      };

    case Types.SET_DOWNLOAD_START_TIME:
      return {
        ...state,
        downloadStartTime: action.downloadStartTime,
      };
    case Types.SET_SETTINGS_PAGE_STATE:
      return {
        ...state,
        settingsPageState: action.settingsPageState,
      };
    case Types.SET_PUBLISHED_TRAVEL_ID:
      return {
        ...state,
        publishID: action.publishID,
      };
    case Types.SET_FEEDBACK_POPUP_STATE:
      return {
        ...state,
        feedbackPopupState: action.feedbackPopupState,
      };
    case Types.GET_USER_NAME:
      return {
        ...state,
        userName: action.userName,
      };
    case Types.GET_PROFILE_IMAGE_URL:
      return {
        ...state,
        profileImgURL: action.profileImgURL,
      };
    default:
      return state;
  }
};
