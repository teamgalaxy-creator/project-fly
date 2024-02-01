import { Box } from '@mui/material';
import TravelFormContainer from '~/containers/TravelFormContainer';
import TravelItineraryContainer from '~/containers/TravelItineraryContainer';
import ModifyTravelFormContainer from '~/containers/ModifyTravelFormContainer';

import CustomizeMapContainer from '~/containers/MapCustomizationPopupContainer';

import { makeStyles } from '@mui/styles';
import ConfirmationDialog from '~components/ConfirmationDialog';
import { useSelector } from '~/redux/reducers';
import { useDispatch } from '~/redux/store';
import ActionsCreator from '~/redux/actions';
import VideoPopupContainer from '~/containers/VideoPopupContainer';
import SharePopup from '../SharePopup';
import FeedbackPopup from '~/components/FeedbackPopup';

const useStyles = makeStyles(() => ({
  controlsSpaceContainer: {
    position: 'absolute',
  },
}));

export default function ControlsSpace() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isDIalogOpen: any = useSelector(
    (state: any) => state.TravelReducers.isConfirmationDialogOpen,
  );

  const mapClearState: any = useSelector(
    (state: any) => state.MapReducers.mapClearState,
  );

  const index: number = useSelector(
    (state: any) => state.MapReducers.travelHistoryIndex,
  );

  const link: string = useSelector(
    (state: any) => state.AnimationReducers.publishedLink,
  );

  const handleCancel = () => {
    dispatch(ActionsCreator.toggleConfirmationDialogState(false));
    // dispatch(ActionsCreator.openTravelItinerary(true));
    dispatch(ActionsCreator.setScheduleSectionState(true));
  };

  const openItinerary = () => {
    dispatch(ActionsCreator.toggleConfirmationDialogState(false));
    dispatch(ActionsCreator.openTravelItinerary(true));
    dispatch(ActionsCreator.setScheduleSectionState(true));
  };

  const handleConfirm = () => {
    dispatch(ActionsCreator.discardAllTravelPoints());
    dispatch(ActionsCreator.toggleConfirmationDialogState(false));
    dispatch(ActionsCreator.setTravelFormSaveState(false));

    dispatch(ActionsCreator.openTravelForm(true));

    dispatch(ActionsCreator.triggerStateToClear(!mapClearState));
    dispatch(ActionsCreator.setTravelHistoryCurrentID(-1));

    dispatch(ActionsCreator.setTravelHistoryIndex(0));
  };

  return (
    <Box component="div" className={classes.controlsSpaceContainer}>
      <TravelFormContainer />

      <ConfirmationDialog
        open={isDIalogOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        openItinerary={openItinerary}
      />
      {/* <FeedbackPopup /> */}
      <TravelItineraryContainer />

      <ModifyTravelFormContainer />

      <CustomizeMapContainer />
      <VideoPopupContainer />

      <SharePopup link={link}></SharePopup>
    </Box>
  );
}
