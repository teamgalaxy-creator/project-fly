import React from 'react';
import { useDispatch } from '~redux/store';
import { Typography, Dialog, Box, Fab, Button, Slide } from '@mui/material';
import ActionsCreator from '~redux/actions';
import useStyles from './styles';
import { useSelector } from '~/redux/reducers';
import { TravelFormData } from '~/utility/models';
import { useState } from 'react';
import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align';

export default function FloatingActionButtons() {
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();

  const dispatch = useDispatch();
  const isSaved: any = useSelector(
    (state: any) => state.MapReducers.isTravelFormSaved,
  );

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddTravelForm = () => {
    if (isSaved) {
      dispatch(ActionsCreator.toggleConfirmationDialogState(true));
    } else dispatch(ActionsCreator.openTravelForm(true));
  };

  const handleOpenTravelItinerary = () => {
    dispatch(ActionsCreator.openTravelItinerary(true));
    dispatch(ActionsCreator.setScheduleSectionState(true));
  };

  const handleOpenModifyTravelForm = () => {
    // dispatch(ActionsCreator.openModifyTravelForm(true));
  };

  const handleOpenMapTypes = () => {
    dispatch(ActionsCreator.openMapCustomizationPopup(true));
  };

  const handleOpenVideoPopup = () => {
    if (travelArray.length === 0) {
      setOpenDialog(true);
    } else dispatch(ActionsCreator.openVideoPopup(true));
  };

  const travelArray: TravelFormData[] = useSelector(
    (state: any) => state.MapReducers.pointsArray,
  );

  return (
    <Box
      sx={{
        position: 'absolute', // Make sure the parent container has a relative position
        height: '100px',
        bottom: 0,
        width: '100%',
        overflow:'hidden',
        zIndex: 1,
        background: 'linear-gradient(to bottom, transparent, white)',
      }}
    >
      <Box className={classes.container} sx={{}}>
        <div className={classes.fabContainer}>
          <Fab
            className={`${classes.customFab} ${
              travelArray.length === 0 ? classes.flashButton : ''
            }`}
            // className={classes.customFab}
            aria-label="add travel"
            onClick={handleAddTravelForm}
          >
            <img src="icons/AddaTravel.svg" alt="Add a Travel" />
          </Fab>
          <Typography variant="subtitle2" className={classes.customTypography}>
            Add a Travel
          </Typography>
        </div>

        <div className={classes.fabContainer}>
          <Fab
            className={classes.customFab}
            aria-label="travel iti"
            onClick={handleOpenTravelItinerary}
          >
            <img src="icons/TravelItinerary.svg" alt="Travel Itinerary" />
          </Fab>
          <Typography variant="subtitle2" className={classes.customTypography}>
            Travel Itinerary
          </Typography>
        </div>

        <div className={classes.fabContainer}>
          <Fab
            className={classes.customFab}
            onClick={handleOpenMapTypes}
            aria-label="change map"
          >
            <img src="icons/ChangeMap.svg" alt="Add a Travel" />
          </Fab>
          <Typography variant="subtitle2" className={classes.customTypography}>
            Change Map
          </Typography>
        </div>

        <div className={classes.fabContainer}>
          <Fab
            className={classes.diffColorCustomFab}
            aria-label="video"
            onClick={handleOpenVideoPopup}
          >
            <img src="icons/GenerateVideo.svg" alt="Add a Travel" />
          </Fab>
          <Typography variant="subtitle2" className={classes.customTypography}>
            Generate Animation
          </Typography>
        </div>
        <Dialog
          open={openDialog}
          TransitionComponent={Slide}
          onClose={handleCloseDialog}
          PaperProps={{ style: { borderRadius: 14 } }}
        >
          <div
            style={{
              padding: '20px',
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography className={classes.dialogHeading}>
              Action Required
            </Typography>
            <Typography className={classes.text} sx={{ textAlign: 'center' }}>
              Please add a travel itinerary first!
            </Typography>
            <Button
              className={classes.continue}
              onClick={handleCloseDialog}
              color="primary"
              variant="contained"
            >
              Continue
            </Button>
          </div>
        </Dialog>
      </Box>
    </Box>
  );
}
