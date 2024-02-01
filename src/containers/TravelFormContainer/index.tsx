import React from 'react';
import { Modal, Drawer, Box } from '@mui/material';
import { useSelector } from '~redux/reducers';
import useMediaQuery from '@mui/material/useMediaQuery';
import TravelForm from '~components/TravelForm';
import ActionsCreator from '~redux/actions';
import { useDispatch } from '~redux/store';
import useStyles from './styles';

const TravelFormContainer = (props: any) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const formName = ' Add a New Travel ';
  const alertText =
    ' Departure point locked in as previous arrival point, only departure ';

  const openTravelForm: any = useSelector(
    (state: any) => state.MapReducers.openTravelForm,
  );
  const handleClose = () => {
    dispatch(ActionsCreator.openTravelForm(false));
  };

  const isSmScreen = useMediaQuery('(max-width:768px)');

  return (
    <div style={{ padding: '10px' }}>
      {isSmScreen ? (
        <Drawer
          anchor="bottom"
          open={openTravelForm}
          onClose={handleClose}
          PaperProps={{
            style: { borderRadius: '25px 25px 0 0' },
          }}
          ModalProps={{
            keepMounted: false, // Better open performance on mobile.
          }}
        >
          <div style={{ maxHeight: `calc(100vh - 107px)`, padding: '5px' }}>
            <TravelForm
              handleClose={handleClose}
              formName={formName}
              alertText={alertText}
              state={false}
            />
          </div>
        </Drawer>
      ) : (
        <Modal
          open={openTravelForm}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.travelForm}>
            <TravelForm
              handleClose={handleClose}
              formName={formName}
              alertText={alertText}
              state={false}
            />
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default TravelFormContainer;
