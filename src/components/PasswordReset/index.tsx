import React, { useState } from 'react';
import { Box, TextField, Typography, Snackbar, Alert } from '@mui/material';
import useStyles from './styles';
import { LoadingButton } from '@mui/lab';
import Logo from '../Logo';
import { useAuth } from '~/managers/AuthContext';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { resetPassword } = useAuth();

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleEmailToReset = () => {
    if (email) {
      setLoading(true);

      resetPassword({ email })
        .then(() => {
          // Email sent successfully
          setSnackbarOpen(true);

          // Stop loading after 3 seconds
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  return (
    <Box className={classes.mainBox}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          variant="filled"
          severity="success"
        >
          Email Sent
        </Alert>
      </Snackbar>
      <Box className={classes.logoContainer}>
        <Logo />
      </Box>

      <Box className={classes.p1Box}>
        <Typography className={classes.p1}>
          Enter the email associated with your account and we will send you a
          link to reset your password
        </Typography>
      </Box>
      <Typography className={classes.email}>Email</Typography>
      <Box className={classes.textFieldBox}>
        <form>
          <TextField
            className={classes.textField}
            onChange={handleEmailChange}
            variant="outlined"
            fullWidth
            value={email}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleEmailToReset();
              }
            }}
          />
        </form>
      </Box>
      <LoadingButton
        loading={loading}
        loadingPosition="end"
        className={classes.resendButton}
        color="primary"
        variant="contained"
        onClick={handleEmailToReset}
      >
        Continue
      </LoadingButton>
    </Box>
  );
}

export default PasswordReset;
