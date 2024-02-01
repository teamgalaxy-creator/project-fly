import { Drawer, Modal, Box } from '@mui/material';
import React from 'react';
import TravelPage from '~/components/TravelPage';
import { useSelector } from '~/redux/reducers';
import ActionsCreator from '~redux/actions';
import { useDispatch } from '~redux/store';
import useStyles from './styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const TravelItineraryContainer = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const openTravelItinerary: any = useSelector(
    (state: any) => state.MapReducers.travelItineraryState,
  );

  const handleClose = () => {
    dispatch(ActionsCreator.openTravelItinerary(false));
    dispatch(ActionsCreator.setScheduleSectionState(false));
  };
  const isSmScreen = useMediaQuery('(max-width:600px)');

  return (
    <div>
      {isSmScreen ? (
        <Drawer
          anchor="bottom"
          open={openTravelItinerary}
          onClose={handleClose}
          PaperProps={{
            style: { borderRadius: '25px 25px 0 0' },
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div>
            <TravelPage />
          </div>
        </Drawer>
      ) : (
        <Modal
          open={openTravelItinerary}
          onClose={handleClose}
          aria-labelledby="modal-travelPage"
          aria-describedby="modal-travelPage-description"
        >
          <Box className={classes.TravelPage}>
            <TravelPage />
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default TravelItineraryContainer;
