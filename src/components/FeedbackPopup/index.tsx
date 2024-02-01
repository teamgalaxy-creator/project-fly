import React, { useState, useEffect, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ActionsCreator from '~redux/actions';
import { useDispatch } from '~redux/store';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';
import { useSelector } from '~redux/reducers';
import { submitFeedback } from '~/supabase/feedback';

// interface FeedbackPopupProps {
//   open: boolean;
//   onClose: () => void;

// }

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  dialog: {
    maxWidth: '400px',
    borderRadius: '10px',
  },
  fieldBox: {
    fontFamily: 'Futura Md BT',
    marginBottom: '15px',
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
    width: '365px',
    height: '60px',
    fontFamily: 'Futura Md BT',
    boxShadow: 'none',
  },
  dialogConfirmButton: {
    //marginTop: '10px', // Add some top margin to separate the buttons
    backgroundColor: '#FE7138',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#E46532 ',
    },
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
  },
}));

const FeedbackPopup = ({
  setOpenSnackbar,
  feedbackResult,
  setFeedbackResult,
}: any) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackType, setFeedbackType] = useState('bug');
  let userID: any = useSelector((state: any) => state.MapReducers.userID);
  const openFeedbackPopup: any = useSelector(
    (state: any) => state.MapReducers.feedbackPopupState,
  );
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackText(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackType(event.target.value);
  };
  const handleClose = () => {
    dispatch(ActionsCreator.setFeedbackPopupState(false));
  };
  const handleSubmitFeedback = async () => {
    console.log('Submit Start');
    const result = await submitFeedback(feedbackText, feedbackType, userID);
    console.log(result);
    if (result.success) {
      // Success Message Handling
      setFeedbackResult(result);
      setOpenSnackbar(true);
    } else {
      // Error Message Handling
      setFeedbackResult(result);
      setOpenSnackbar(true);
    }

    // Close Feedback Popup
    handleClose();
  };

  return (
    <Dialog
      open={openFeedbackPopup}
      onClose={handleClose}
      classes={{ paper: classes.dialog }}
    >
      <DialogTitle className={classes.dialogTitle}>
        Send us some Feedback!
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        Do you have a suggestion or found some bug? Let us know in the field
        below:
      </DialogContent>

      <TextField
        id="filled-multiline-static"
        label="Write here"
        multiline
        rows={4}
        onChange={handleTextChange}
        sx={{ marginBottom: '15px' }}
        // defaultValue="Write here"
        // variant="filled"
      />

      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        onChange={handleTypeChange}
        name="row-radio-buttons-group"
        sx={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        <FormControlLabel
          className={classes.radioGroupStyle}
          value="bug"
          control={<Radio />}
          label="Bug"
          componentsProps={{ typography: { fontFamily: 'Futura Md BT' } }}
        />
        <FormControlLabel
          value="comment"
          control={<Radio />}
          label="Comment"
          componentsProps={{ typography: { fontFamily: 'Futura Md BT' } }}
        />
        <FormControlLabel
          value="other"
          control={<Radio />}
          label="Other"
          componentsProps={{ typography: { fontFamily: 'Futura Md BT' } }}
        />
      </RadioGroup>
      <Box className={classes.dialogButtonContainer}>
        <Button
          className={`${classes.dialogButton} ${classes.dialogConfirmButton}`}
          color="primary"
          onClick={handleSubmitFeedback}
        >
          Send Feedback
        </Button>
      </Box>
    </Dialog>
  );
};

export default FeedbackPopup;
