import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  IconButton,
  InputAdornment,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles';
// import { useAuth } from '~/context/AuthProvider';
import { supabase } from '~/supabase/supabaseClient';
import { useSelector } from '~/redux/reducers';
import { useNavigate } from 'react-router-dom';

function Verify() {
  //   const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  const email: string | undefined = useSelector(
    (state: any) => state.MapReducers.verificationEmailState,
  );

  useEffect(() => {
    if (email === '') navigate('/');
  }, []);

  const handleResendEmail = () => {
    if (email && email !== '') {
      supabase.auth
        .resend({ email, type: 'signup' })
        .then(() => {
          console.log('Verification email has been sent again');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Box className={classes.mainBox}>
      <Typography className={classes.verify}>
        Please verify your email{' '}
      </Typography>
      <Typography className={classes.line2}>
        You're almost there! We sent an email to
      </Typography>
      <Typography className={classes.email}>{email}</Typography>
      <Box className={classes.p1Box}>
        <Typography className={classes.p1}>
          Just click on the link in that email to complete your signup. If you
          don't see it, you may need to check your spam folder
        </Typography>
      </Box>
      <Typography className={classes.find}>
        Still can't find the email? No problem
      </Typography>

      <Button
        className={classes.resendButton}
        // onClick={handleCloseDialog}
        color="primary"
        variant="contained"
        onClick={handleResendEmail}
      >
        Resend Verification Email
      </Button>
    </Box>
  );
}

export default Verify;
