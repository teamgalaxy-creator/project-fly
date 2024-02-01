import * as Types from '../actionTypes';

export type AnimationProps = {
  playPauseState: boolean;
  currentTravelIndex: number;
  publishedLink: string;
  sharePopupState: boolean;
};

type ActionProps = AnimationProps & {
  type: string;
};

const initialState: AnimationProps = {
  playPauseState: false,
  currentTravelIndex: 0,
  publishedLink: '',
  sharePopupState: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: ActionProps) => {
  switch (action.type) {
    case Types.SET_PLAY_PAUSE_STATE:
      return {
        ...state,
        playPauseState: action.playPauseState,
      };
    case Types.SET_CURRENT_TRAVEL_INDEX:
      return {
        ...state,
        currentTravelIndex: action.currentTravelIndex,
      };
    case Types.SET_PUBLISHED_TRAVEL_LINK:
      return {
        ...state,
        publishedLink: action.publishedLink,
      };
    case Types.SHOW_SHARE_POPUP:
      return {
        ...state,
        sharePopupState: action.sharePopupState,
      };

    default:
      return state;
  }
};
