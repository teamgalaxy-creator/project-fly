import React from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  openItinerary: () => void;
}

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
    padding:'10px',
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
  },
  dialogCancelButton: {
    // marginLeft: '0px',
    backgroundColor: '#ECECED',
    color: '#000',
    marginBottom: '10px',
  },
[theme.breakpoints.between(150,450)]:{
  dialogCancelButton: {
    width: '100%',
  },
  dialogConfirmButton: {
    
    width: '100%',
  },
}
}));

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  openItinerary,
}) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        Add a Travel Itinerary
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        Do you want to modify the current itinerary or do you want to remove the
        current one and start a new one?
      </DialogContent>
      <Box className={classes.dialogButtonContainer}>
        <Button
          className={`${classes.dialogButton} ${classes.dialogConfirmButton}`}
          onClick={openItinerary}
          color="primary"
        >
          View/Modify current Itinerary
        </Button>
        <Button
          className={`${classes.dialogButton} ${classes.dialogCancelButton}`}
          onClick={onConfirm}
        >
          Add a New Itinerary
        </Button>
      </Box>
    </Dialog>
  );
};

export default ConfirmationDialog;
