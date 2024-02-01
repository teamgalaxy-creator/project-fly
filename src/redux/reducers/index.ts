import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux';
import { combineReducers } from 'redux';

import MapReducers, { MapProps } from './MapReducers';
import TravelReducers, { TravelProps } from './TravelReducers';
import AnimationReducers, { AnimationProps } from './AnimationReducers';

import { SET_INITIAL_STATE } from '../actionTypes';
import { CombinedState } from '@reduxjs/toolkit';

// Create a type for the action
type ActionProps = MapProps &
  TravelProps &
  AnimationProps & {
    type: string;
  };

// Combine your existing reducers
export const rootReducer = combineReducers({
  MapReducers,
  TravelReducers,
  AnimationReducers,
  // Add other reducers here
});

// Update your rootReducer to handle the RESET_ALL_STATES action
const rootReducerWithReset = (
  state:
    | CombinedState<{
        MapReducers: MapProps;
        TravelReducers: TravelProps;
        AnimationReducers: AnimationProps;
      }>
    | undefined,
  action: ActionProps,
) => {
  if (action.type === SET_INITIAL_STATE) {
    // Reset the state of all reducers to their initial values
    state = {
      MapReducers: MapReducers(undefined, action),
      TravelReducers: TravelReducers(undefined, action),
      AnimationReducers: AnimationReducers(undefined, action),
      // Add other reducers here
    };
  }

  return rootReducer(state, action);
};

export default rootReducerWithReset;

// export const rootReducer = combineReducers({
//   MapReducers,
//   TravelReducers,
// });

export type RootState = ReturnType<typeof rootReducer>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
