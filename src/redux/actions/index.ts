import MapActions from '~redux/actions/MapActions';
import TravelActions from '~redux/actions/TravelActions';
import AnimationActions from '~redux/actions/AnimationActions';
import { SET_INITIAL_STATE } from '../actionTypes';
import { store } from '../store';

const ActionsCreator = {
  ...MapActions,
  ...TravelActions,
  ...AnimationActions,

  // Define the root action creator for resetting the state
  resetStateToInitial: () =>
    store.dispatch({
      type: SET_INITIAL_STATE,
    }),
};

export default ActionsCreator;
