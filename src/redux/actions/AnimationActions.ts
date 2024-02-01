import { store } from '../store';
import * as Types from '../actionTypes';

export const setPlayPauseState = (value: boolean) =>
  store.dispatch({
    ...store.getState().AnimationReducers,
    type: Types.SET_PLAY_PAUSE_STATE,
    playPauseState: value,
  });

export const setCurrentTravelIndex = (value: number) =>
  store.dispatch({
    ...store.getState().AnimationReducers,
    type: Types.SET_CURRENT_TRAVEL_INDEX,
    currentTravelIndex: value,
  });
export const setPublishedTravelLink = (value: string) =>
  store.dispatch({
    ...store.getState().AnimationReducers,
    type: Types.SET_PUBLISHED_TRAVEL_LINK,
    publishedLink: value,
  });

export const showSharePopup = (value: boolean) =>
  store.dispatch({
    ...store.getState().AnimationReducers,
    type: Types.SHOW_SHARE_POPUP,
    sharePopupState: value,
  });

const AnimationActions = {
  setPlayPauseState,
  setCurrentTravelIndex,
  setPublishedTravelLink,
  showSharePopup,
};

export default AnimationActions;
