import React from 'react';
import { Modal, Drawer, Box } from '@mui/material';
import { useSelector } from '~redux/reducers';
import useMediaQuery from '@mui/material/useMediaQuery';
import ModifyTravelForm from '~/components/ModifyTravelForm';
import ActionsCreator from '~redux/actions';
import { useDispatch } from '~redux/store';
import useStyles from './styles';

const ModifyTravelFormContainer = (props: any) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const modifyFormName = ' Modify a Travel ';
  const modifyDepartureAlertText =
    'Departure point locked in as previous arrival point';
  const modifyArrivalAlertText =
    'Arrival point locked in as next departure point';

  const openModifyTravelForm: any = useSelector(
    (state: any) => state.MapReducers.modifyTravelFormState,
  );

  const travelPoints: any = useSelector(
    (state: any) => state.MapReducers.pointsArray,
  );

  const handleClose = () => {
    dispatch(ActionsCreator.openModifyTravelForm(false));
    if (travelPoints.length > 0) {
      dispatch(ActionsCreator.setTravelFormSaveState(true));
    }
  };

  const isSmScreen = useMediaQuery('(max-width:600px)');

  return (
    <div style={{ padding: '10px' }}>
      {isSmScreen ? (
        <Drawer
          anchor="bottom"
          open={openModifyTravelForm}
          onClose={handleClose}
          PaperProps={{
            style: { borderRadius: '25px 25px 0 0' },
          }}
          ModalProps={{
            keepMounted: false,
          }}
        >
          <div style={{ maxHeight: '80dvh', padding: '20px' }}>
            <ModifyTravelForm
              handleClose={handleClose}
              formName={modifyFormName}
              departureAlertText={modifyDepartureAlertText}
              arrivalAlertText={modifyArrivalAlertText}
              state={true}
            />
          </div>
        </Drawer>
      ) : (
        <Modal
          open={openModifyTravelForm}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.travelForm}>
            <ModifyTravelForm
              handleClose={handleClose}
              formName={modifyFormName}
              departureAlertText={modifyDepartureAlertText}
              arrivalAlertText={modifyArrivalAlertText}
              state={true}
            />
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default ModifyTravelFormContainer;
