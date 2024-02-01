import { store } from '../store';
import * as Types from '../actionTypes';

export const toggleConfirmationDialogState = (value: boolean) =>
  store.dispatch({
    ...store.getState().TravelReducers,
    type: Types.SET_CONFIRMATION_DIALOG_STATE,
    isConfirmationDialogOpen: value,
  });

export const setDepartureSelectedCategory = (value: string) =>
  store.dispatch({
    ...store.getState().TravelReducers,
    type: Types.SET_SELECTED_DEPARTURE_CATEGORY,
    selectedDepartureCategory: value,
  });

export const setArrivalSelectedCategory = (value: string) =>
  store.dispatch({
    ...store.getState().TravelReducers,
    type: Types.SET_SELECTED_ARRIVAL_CATEGORY,
    selectedArrivalCategory: value,
  });

export const setModeOfTransport = (value: string) =>
  store.dispatch({
    ...store.getState().TravelReducers,
    type: Types.SET_MODE_OF_TRANSPORT,
    modeOfTransport: value,
  });

export const setIsEditingTravelForm = (value: boolean) =>
  store.dispatch({
    ...store.getState().TravelReducers,
    type: Types.SET_IS_EDITING_TRAVEL_STATE,
    isEditing: value,
  });

export const deleteTravelItem = (value: boolean) =>
  store.dispatch({
    ...store.getState().TravelReducers,
    type: Types.DELETE_TRAVEL_ITEM,
    canDelete: value,
  });

export const setDisabledState = (value: boolean) =>
  store.dispatch({
    ...store.getState().TravelReducers,
    type: Types.DISABLE_STATE,
    isDisabled: value,
  });

const TravelActions = {
  toggleConfirmationDialogState,
  setDepartureSelectedCategory,
  setArrivalSelectedCategory,
  setModeOfTransport,
  setIsEditingTravelForm,
  deleteTravelItem,
  setDisabledState,
};

export default TravelActions;
