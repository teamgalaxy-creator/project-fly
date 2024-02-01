import * as Types from '../actionTypes';

export type TravelProps = {
  isConfirmationDialogOpen: boolean;
  modeOfTransport: string;
  selectedDepartureCategory: string;
  selectedArrivalCategory: string;
  isEditing: boolean;
  canDelete: boolean;
  isDisabled: boolean;
};

type ActionProps = TravelProps & {
  type: string;
};

const initialState: TravelProps = {
  isConfirmationDialogOpen: false,
  modeOfTransport: '',
  selectedDepartureCategory: '',
  selectedArrivalCategory: '',
  isEditing: false,
  canDelete: false,
  isDisabled: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: ActionProps) => {
  switch (action.type) {
    case Types.SET_CONFIRMATION_DIALOG_STATE:
      return {
        ...state,
        isConfirmationDialogOpen: action.isConfirmationDialogOpen,
      };
    case Types.SET_MODE_OF_TRANSPORT:
      return {
        ...state,
        modeOfTransport: action.modeOfTransport,
      };
    case Types.SET_SELECTED_DEPARTURE_CATEGORY:
      return {
        ...state,
        selectedDepartureCategory: action.selectedDepartureCategory,
      };
    case Types.SET_SELECTED_ARRIVAL_CATEGORY:
      return {
        ...state,
        selectedArrivalCategory: action.selectedArrivalCategory,
      };
    case Types.SET_IS_EDITING_TRAVEL_STATE:
      return {
        ...state,
        isEditing: action.isEditing,
      };
    case Types.DELETE_TRAVEL_ITEM:
      return {
        ...state,
        canDelete: action.canDelete,
      };
    case Types.DISABLE_STATE:
      return {
        ...state,
        isDisabled: action.isDisabled,
      };
    default:
      return state;
  }
};
