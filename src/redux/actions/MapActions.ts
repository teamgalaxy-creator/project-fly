import { store } from '../store';
import * as Types from '../actionTypes';
import { TravelFormData, TravelHistoryData } from '~utility/models';
import { supabase } from '~/supabase/supabaseClient';

const removeTimezone = (obj: any) => {
  for (const key in obj) {
    if (obj[key] && typeof obj[key] === 'object') {
      // Recursively remove 'timezone' property from nested objects
      obj[key] = removeTimezone(obj[key]);
    }
  }
  // Remove 'timezone' property if present
  if ('timezone' in obj) {
    delete obj.timezone;
  }
  return obj;
};

export const addTravelToHistoryAndDispatch = (
  travelArray: TravelFormData[],
  email: any,
  userId: any,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filteredTravelArray = travelArray.map((travelData) => {
        const filteredArrival = { ...travelData.arrival };
        const filteredDeparture = { ...travelData.departure };

        return {
          ...travelData,
          arrival: removeTimezone(filteredArrival),
          departure: removeTimezone(filteredDeparture),
        };
      });

      const { data } = await supabase
        .from('Travel History')
        .upsert({
          travelPoints: filteredTravelArray,
          email: email,
          UUID: userId,
        })
        .select();

      setTravelHistoryCurrentID(data?.[0].id);
      saveTravelToHistory(data as TravelHistoryData[]);

      resolve(data); // Resolve the Promise with the data
    } catch (error) {
      // You can also reject the Promise with the error if needed
      reject(error);
    }
  });
};

export const publishTravelPoints = (
  travelArray: TravelFormData[],
  userId: any,
  currentHistoryID: any,
  planeModelEnum: any,
  carModelEnum: any,
  videoLength: any,
  modelSize: any,
  mapStyleIndex: any,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await supabase
        .from('Publish Travel')
        .upsert({
          travelPoints: travelArray,
          published_id: currentHistoryID,
          UUID: userId,
          model: planeModelEnum,
          car_model: carModelEnum,
          video_length: videoLength,
          model_size: modelSize,
          map_style_index: mapStyleIndex,
        })
        .select();

      setPulishedTravelId(data![0].id);
      resolve(data); // Resolve the Promise with the data
    } catch (error) {
      // You can also reject the Promise with the error if needed
      reject(error);
    }
  });
};

export const updatePublishedTravelPoints = (
  travelArray: TravelFormData[],
  currentHistoryID: any,
  planeModelEnum: any,
  videoLength: any,
  modelSize: any,
  mapStyleIndex: any,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await supabase
        .from('Publish Travel')
        .update({
          travelPoints: travelArray,
          model: planeModelEnum,
          video_length: videoLength,
          model_size: modelSize,
          map_style_index: mapStyleIndex,
        })
        .eq('published_id', currentHistoryID)
        .select();

      resolve(data); // Resolve the Promise with the data
    } catch (error) {
      // You can also reject the Promise with the error if needed
      reject(error);
    }
  });
};

export const updateTravelToHistoryAndDispatch = (
  travelArray: TravelFormData[],
  id: any,
) => {
  return new Promise(async (resolve, reject) => {
    const filteredTravelArray = travelArray.map((travelData) => {
      const filteredArrival = { ...travelData.arrival };
      const filteredDeparture = { ...travelData.departure };

      return {
        ...travelData,
        arrival: removeTimezone(filteredArrival),
        departure: removeTimezone(filteredDeparture),
      };
    });

    try {
      const { data } = await supabase
        .from('Travel History')
        .update({ travelPoints: filteredTravelArray })
        .eq('id', id)
        .select();

      setTravelHistoryCurrentID(data?.[0].id);
      saveTravelToHistory(data as TravelHistoryData[]);

      resolve(data); // Resolve the Promise with the data
    } catch (error) {
      // You can also reject the Promise with the error if needed
      reject(error);
    }
  });
};

export const deleteTravelToHistoryAndDispatch = (id: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await supabase
        .from('Travel History')
        .delete()
        .eq('id', id);

      resolve(data); // Resolve the Promise with the data
    } catch (error) {
      // You can also reject the Promise with the error if needed
      reject(error);
    }
  });
};
export const openTravelItinerary = (value: boolean) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SET_TRAVEL_ITINERARY_STATE,
    travelItineraryState: value,
  });

export const openModifyTravelForm = (value: boolean) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SET_MODIFY_TRAVEL_STATE,
    modifyTravelFormState: value,
  });

export const setIndexForModifyTravelForm = (value: number | null) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SET_INDEX_FOR_MODIFY,
    index: value,
  });

export const openTravelForm = (value: boolean) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.TRAVEL_FORM_STATE,
    openTravelForm: value,
  });

export const setScheduleSectionState = (value: boolean) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SET_SCHEDULE_SECTION_STATE,
    scheduleSectionState: value,
  });
export const sethistoryCardState = (value: boolean) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SET_HISTORY_CARD_STATE,
    historyCardState: value,
  });

export const openPopUP = (value: boolean) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.POPUP_STATE,
    popupState: value,
  });

export const addTravelPoint = (value: TravelFormData[]) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.ADD_TRAVEL_POINT,
    pointsArray: value,
  });

export const updateTravelPoints = (value: TravelFormData[]) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.ADD_TRAVEL_POINT,
    pointsArray: value,
  });

export const setTravelFormSaveState = (value: boolean) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SET_TRAVEL_FORM_SAVE_STATE,
    isTravelFormSaved: value,
  });

export const discardAllTravelPoints = () =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.DISCARD_TRAVEL_POINTS,
  });

export const openMapCustomizationPopup = (value: boolean) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.MAP_CUSTOMIZATION_POPUP_STATE,
    mapCustomizationPopupState: value,
  });
export const setMapStyleIndex = (value: number) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SET_MAP_STYLE_INDEX,
    mapStyleIndex: value,
  });
export const openHistoryPageState = (value: boolean) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SET_HISTORY_PAGE_STATE,
    historyPageState: value,
  });

export const triggerStateToClear = (value: boolean) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.CLEAR_MAP_STATE,
    mapClearState: value,
  });

export const openVideoPopup = (value: boolean) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SET_VIDEO_POPUP_STATE,
    videoPopupState: value,
  });

export const setModelSize = (value: number) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SET_MODEL_SIZE,
    modelSize: value,
  });

export const setVideoLength = (value: number) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SET_VIDEO_LENGTH,
    videoLength: value,
  });

export const setIsAnimationCapture = (value: boolean) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SET_IS_RECORDING,
    isRecording: value,
  });

export const startRecording = (value: boolean) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.START_RECORDING,
    startRecording: value,
  });

export const stopRecording = (value: boolean) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.STOP_RECORDING,
    stopRecording: value,
  });

export const saveTravelToHistory = (value: TravelHistoryData[]) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SAVE_TRAVEL_TO_HISTORY,
    travelHistoryState: value,
  });

export const setTravelHistoryIndex = (value: number) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SET_TRAVEL_HISTORY_INDEX,
    travelHistoryIndex: value,
  });

export const setTravelHistoryCurrentID = (value: number) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SET_HISTORY_TRACKING_ID,
    travelHistoryTrackingID: value,
  });
export const setPaymentStatsState = (value: boolean) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SET_PAYMENT_STATS_STATE,
    paymentStatsState: value,
  });
export const setVerificationEmailState = (value: string | undefined) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SET_VERIFICATION_EMAIL,
    verificationEmailState: value,
  });

export const setFullscreenAnimationMode = (value: boolean) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SET_FULLSCREEN_MODE,
    fullscreenMode: value,
  });

export const selectPlaneModel = (value: string) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SELECT_PLANE_MODEL,
    planeModelEnum: value,
  });
export const selectCarModel = (value: string) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SELECT_CAR_MODEL,
    carModelEnum: value,
  });

export const setDownloadStartTime = (value: Date) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SET_DOWNLOAD_START_TIME,
    downloadStartTime: value,
  });

export const openSettingsPageState = (value: boolean) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SET_SETTINGS_PAGE_STATE,
    settingsPageState: value,
  });

export const setPulishedTravelId = (value: number) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SET_PUBLISHED_TRAVEL_ID,
    publishID: value,
  });

export const getPulishedTravelId = (value: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await supabase
        .from('Publish Travel')
        .select('id')
        .eq('published_id', value);

      setPulishedTravelId(data!.length > 0 ? data![0].id : 0);

      resolve(data); // Resolve the Promise with the data
    } catch (error) {
      // You can also reject the Promise with the error if needed
      reject(error);
    }
  });
};
export const setFeedbackPopupState = (value: boolean) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.SET_FEEDBACK_POPUP_STATE,
    feedbackPopupState: value,
  });
export const setUserID = (value: string) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.GET_USER_ID,
    userID: value,
  });
export const setUserEmail = (value: string) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.GET_USER_EMAIL,
    userEmail: value,
  });
export const setUserName = (value: string) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.GET_USER_NAME,
    userName: value,
  });

export const setUserProfileImageURL = (value: string) =>
  store.dispatch({
    ...store.getState().MapReducers,
    type: Types.GET_PROFILE_IMAGE_URL,
    profileImgURL: value,
  });

const MapActions = {
  addTravelPoint,
  selectPlaneModel,
  selectCarModel,
  setUserEmail,
  setUserName,
  openTravelForm,
  openPopUP,
  openTravelItinerary,
  openModifyTravelForm,
  discardAllTravelPoints,
  setTravelFormSaveState,
  setScheduleSectionState,
  setIndexForModifyTravelForm,
  updateTravelPoints,
  openMapCustomizationPopup,
  setMapStyleIndex,
  openHistoryPageState,
  triggerStateToClear,
  openVideoPopup,
  setModelSize,
  setVideoLength,
  setIsAnimationCapture,
  startRecording,
  stopRecording,
  saveTravelToHistory,
  setTravelHistoryIndex,
  setTravelHistoryCurrentID,
  setVerificationEmailState,
  setPaymentStatsState,
  addTravelToHistoryAndDispatch,
  updateTravelToHistoryAndDispatch,
  setFullscreenAnimationMode,
  deleteTravelToHistoryAndDispatch,
  setDownloadStartTime,
  openSettingsPageState,
  publishTravelPoints,
  updatePublishedTravelPoints,
  setPulishedTravelId,
  getPulishedTravelId,
  setFeedbackPopupState,
  setUserID,
  setUserProfileImageURL,
};

export default MapActions;
