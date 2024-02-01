import React, { useState } from 'react';
import AnimationView from '~components/AnimationView';
import FloatingActionButtons from '~components/FloatingActionButtons';
import ControlsSpace from '~components/ControlsSpace';
import Navbar from '../NavBar';
import FeedbackPopup from '../FeedbackPopup';
import { TravelFormData } from '~/utility/models';
import { Alert, Slide, Snackbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';
import { useSelector } from '~/redux/reducers';
import CalenderView from './CalenderView';
import GetStartedFooter from './GetStartedFooter';
import { FaShare } from "react-icons/fa6";


const useStyles = makeStyles((theme: typeof MuiTheme) => ({

  dialog: {
    maxWidth: '400px',
    borderRadius: '10px',
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Futura Md BT',
    fontweight: 400,
    fontSize: '17px',
    color: '#454953',
  },
  dialogTitle: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Futura Hv BT',
    fontWeight: 400,
    fontSize: '22px',
  },
  dialogButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    gap: '15px',
  },
  dialogButton: {
    textTransform: 'none',
    borderRadius: '8px',
    width: '250px',
    height: '60px',
    fontFamily: 'Futura Md BT',
    boxShadow: 'none',
  },
  dialogConfirmButton: {
    //marginTop: '10px', // Add some top margin to separate the buttons
    backgroundColor: '#FE7138',
    color: '#fff',
  },
  dialogCancelButton: {
    // marginLeft: '0px',
    backgroundColor: '#ECECED',
    color: '#000',
    marginBottom: '10px',
  },
  [theme.breakpoints.between(150, 450)]: {
    dialogCancelButton: {
      width: '100%',
    },
    dialogConfirmButton: {

      width: '100%',
    },
  }
}));




export default function MainPageUi() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [feedbackResult, setFeedbackResult] = useState({
    success: true,
    message: '',
  });
  const [calenderView, setCalenderView] = useState<Boolean>(false)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };
  const classes = useStyles();
  const travelArray: TravelFormData[] = useSelector(
    (state: any) => state.MapReducers.pointsArray,
  );

  return (
    <>
      <Navbar />
      {calenderView && <CalenderView />}
      <FeedbackPopup
        setOpenSnackbar={setOpenSnackbar}
        feedbackResult={feedbackResult}
        setFeedbackResult={setFeedbackResult}
      />

      {travelArray.length > 0 ? <GetStartedFooter setCalenderView={setCalenderView} /> :
        <FloatingActionButtons />

      }
      <ControlsSpace />
      <AnimationView isVideoPopupMap={true} />
      {/* <VideoPopupContainer/> */}
      {/* <HistoryPageContainer/> */}
      {/* <HistoryPage/> */}
      {/* <VideoPopup/> */}
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={Slide}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity={`${feedbackResult?.success ? 'success' : 'error'}`}
          sx={{ width: '100%' }}
        >
          {feedbackResult?.message}
        </Alert>
      </Snackbar>
    </>
  );
}
