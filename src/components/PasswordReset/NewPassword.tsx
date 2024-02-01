import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Snackbar,
  Alert,
} from '@mui/material';
import useStyles from './styles';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useSelector } from '~/redux/reducers';
import { LoadingButton } from '@mui/lab';
import Logo from '../Logo';
import { useAuth } from '~/managers/AuthContext';

function NewPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { updatePassword } = useAuth();

  const classes = useStyles();
  const navigate = useNavigate();
  const email: string | undefined = useSelector(
    (state: any) => state.MapReducers.verificationEmailState,
  );
  const handlePasswordChange = (event: any) => {
    // var lowerCaseLetters = /[a-z]/g;
    // var upperCaseLetters = /[A-Z]/g;
    // var numbers = /[0-9]/g;
    // var count = 0;
    // if (event.target.value.match(lowerCaseLetters)) {
    //   count++;
    // }
    // if (event.target.value.match(upperCaseLetters)) {
    //   count++;
    // }
    // if (event.target.value.match(numbers)) {
    //   count++;
    // }
    // if (event.target.value.length >= 8) {
    //   count++;
    // }
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[A-Z]).{8,}$/;
    const newPassword = event.target.value;
    const isValid = passwordRegex.test(newPassword);

    if (isValid) {
      setPassword(event.target.value);
    } else {
      setErrorMessage(
        'Password Should be minimum 8 characters, 1 number and 1 uppercase letter',
      );
      openSnackbar();
    }
  };
  const openSnackbar = () => {
    setSnackbarOpen(true);
  };
  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleConfirmPasswordChange = (event: any) => {
    setConfirmPassword(event.target.value);
  };

  const handleUpdatePassword = () => {
    if (password === confirmPassword) {
      setLoading(true);

      updatePassword({ newPassword: password }) // Replace 'user@example.com' with the user's email and 'resetToken' with the token received during password reset
        .then((result) => {
          if (result.data) {
            // localStorage.setItem('token', JSON.stringify(result.data));
            navigate('/homepage');

            // Password updated successfully
            console.log('Password updated successfully:', result.data);
            // Handle the success, e.g., show a success message to the user
          } else {
            console.log('Error updating password:', result.error);
            // Handle the error, e.g., show an error message to the user
          }
        })
        .catch((error) => {
          console.log('Error updating password:', error);
          // Handle the error, e.g., show an error message to the user
        });
    } else {
      console.log('Passwords do not match');
      // Handle the case where passwords do not match, e.g., show an error message to the user
    }
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert variant="filled" severity="error">
          {error}.
        </Alert>
      </Snackbar>
      <Box className={classes.mainBox}>
        <Box className={classes.logoContainer}>
          <Logo />
        </Box>
        <Typography className={classes.line2}>Change your password</Typography>

        <Box className={classes.p1Box}>
          <Typography className={classes.p1}>
            Enter a new password below to change your passsword
          </Typography>
        </Box>

        <Typography className={classes.password}>New Password</Typography>
        <Box className={classes.textFieldBox}>
          <TextField
            // label="•••••••••"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
            }}
            type="password"
            required
            className={classes.textField}
            onChange={handlePasswordChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // Prevent the default form submission
                handleUpdatePassword();
              }
            }}
          />
        </Box>
        <Typography className={classes.password}>Confirm Password</Typography>
        <Box className={classes.textFieldBox}>
          <TextField
            // label="•••••••••"
            variant="outlined"
            fullWidth
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
            }}
            className={classes.textField}
            onChange={handleConfirmPasswordChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // Prevent the default form submission
                handleUpdatePassword();
              }
            }}
          />
        </Box>

        <LoadingButton
          loading={loading}
          loadingPosition="end"
          className={classes.resendButton}
          color="primary"
          variant="contained"
          onClick={handleUpdatePassword}
        >
          Continue
        </LoadingButton>
      </Box>
    </>
  );
}

export default NewPassword;
