/* eslint-disable no-unused-expressions */
// @ts-nocheck

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
  FormControl,
  DialogActions,
  Slide,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '~/redux/store';
import ActionsCreator from '~redux/actions';
import { LoadingButton } from '@mui/lab';
import Logo from '../Logo';
import { useAuth } from '~/managers/AuthContext';

function Login() {
  const [openDialog, setOpenDialog] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setErrorMessage] = useState('');
  const { signIn, signInWithGoogle } = useAuth();

  const handleEmailChange = (event: any) => {
    {
      setEmail(event.target.value);
    }
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSignIn = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email !== '' && password !== '') {
      if (!emailRegex.test(email)) {
        setErrorMessage('Invalid email address');
        openSnackbar();
        return;
      }
      setLoading(true);
      signIn({ email, password })
        .then((result) => {
          if (result.message === 'Error signing in: Email not confirmed') {
            dispatch(ActionsCreator.setVerificationEmailState(email));
            setLoading(false);
            navigate('/verification');
          }
          if (result.data) {
            setOpenDialog(true);
            setLoading(false);
            navigate('/homepage');
          }

          if (result.error) {
            setLoading(false);

            setErrorMessage(result.message);
            openSnackbar();
          }
        })
        .catch((error) => {});
    }
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleForgotPassword = () => {
    navigate('/passwordreset');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const openSnackbar = () => {
    setSnackbarOpen(true);
  };
  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };
  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const param1Value = new URLSearchParams(location.search).get('param1');

    // Log the values to the console

    if (param1Value) {
      // setErrorMessage('Account created successfully');
      // openSnackbar();
      setOpenDialog(true);
    }
    // Read values from the URL parameters
    // eslint-disable-next-line no-restricted-globals
  }, [location.search]);

  return (
    <form>
      <Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert  severity={error ? 'warning' : 'success'}> {error || 'Account created successfully'}.</Alert>
        </Snackbar>
        <Grid container className={classes.outergrid}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={5}
            xl={5}
            className={classes.leftGrid}
          >
            <div className={classes.outerdiv}>
              <Box className={classes.logoContainer}>
                <Logo />
              </Box>
              {/* <Typography className={classes.nameFly}>
                Fly
                <Typography component="span" className={classes.nameProject}>
                  Project
                </Typography>
              </Typography> */}
              <FormControl defaultValue="" required>
                <Box>
                  <Typography className={classes.statement}>
                    Login to your account
                  </Typography>
                  {/* Display error message if there is an error */}
                  {/* {error && (
                    <Box
                      sx={{
                        borderColor: 'red',
                        border: 1,
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="error"
                        className={classes.errorMessage}
                      >
                        {error}
                      </Typography>
                    </Box>
                  )} */}

                  <Typography className={classes.email}>Email</Typography>
                  <Box className={classes.textFieldBox}>
                    <TextField
                      className={classes.textField}
                      // color="primary"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: 'black',
                          },
                        },
                      }}
                      onChange={handleEmailChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlineIcon />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      fullWidth
                      required
                      value={email}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault(); // Prevent the default form submission
                          handleSignIn(); // Call the signIn function
                        }
                      }}
                    />
                  </Box>
                  <Typography className={classes.password}>Password</Typography>
                  <Box className={classes.textFieldBox}>
                    <TextField
                      className={classes.textField}
                      onChange={handlePasswordChange}
                      // color="primary"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: 'black',
                          },
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlinedIcon />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      fullWidth
                      type="password"
                      required
                      value={password}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault(); // Prevent the default form submission
                          handleSignIn(); // Call the signIn function
                        }
                      }}
                    />
                  </Box>
                  <Button
                    className={classes.forgot}
                    variant="text"
                    color="primary"
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </Button>
                  <Box className={classes.buttonBox}>
                    <LoadingButton
                      loading={loading}
                      loadingPosition="end"
                      className={classes.login}
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={handleSignIn}
                      disabled={email === '' || password === ''}
                    >
                      Login
                    </LoadingButton>

                    <Typography className={classes.or}>OR</Typography>

                    <Button
                      className={classes.google}
                      variant="contained"
                      color="primary"
                      onClick={handleSignInWithGoogle}
                    >
                      <IconButton
                        aria-label="Login with Google"
                        sx={{ color: '#0E131F' }}
                        onClick={handleSignInWithGoogle}
                      >
                        {/* Use the Google logo as the icon */}
                        <img src="icons/google.svg" alt="Map 1" />
                      </IconButton>
                      Login with Google
                    </Button>
                    <Box sx={{ marginTop: 3, mb: 10 }}>
                      <Typography className={classes.signup}>
                        Don't have an account?
                        <Button
                          className={classes.signupButton}
                          variant="text"
                          color="primary"
                          onClick={handleSignUpClick}
                        >
                          Sign Up
                        </Button>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </FormControl>
            </div>
          </Grid>

          <Grid item lg={7} xl={7}>
            <div className={classes.imageDiv}>
              <img
                src="icons/mapImageLogin.png"
                alt="Map 1"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit:'cover',
                }}
              />
            </div>
          </Grid>
        </Grid>
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
              overflow:'hidden',
            }}
    
    >
                <Box className={classes.logoDialog}>
                    <Logo />
                  </Box>
            {/* <Typography
              sx={{
                alignContent: 'center',
                fontFamily: 'Futura Hv BT',
                fontSize: '22px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              Welcome to VizualTravel!
            </Typography> */}
            <Typography className={classes.thanks}>
            Your account has been created.
              <br />
              Hooray! 🎉
            </Typography>
            <DialogActions sx={{ width: '100%' }}>
              <Button
                className={classes.continue}
                onClick={handleCloseDialog}
                color="primary"
                variant="contained"
              >
                Continue
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </Box>
    </form>
  );
}

export default Login;
