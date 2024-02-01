import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  IconButton,
  InputAdornment,
  FormControl,
  Snackbar,
  Alert,
} from '@mui/material';
//import Mapstatic from '../Map/Map';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CircleChecked from '@mui/icons-material/CheckCircleOutline';
import CircleCheckedFilled from '@mui/icons-material/CheckCircle';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import useStyles from './styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '~/redux/store';
import ActionsCreator from '~/redux/actions';
import { LoadingButton } from '@mui/lab';
import Logo from '../Logo';
import { useAuth } from '~/managers/AuthContext';

function Signup() {
  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setErrorMessage] = useState('');
  const [isLowercase, setIsLowercase] = useState(false);
  const [isUppercase, setIsUppercase] = useState(false);
  const [isDigit, setIsDigit] = useState(false);
  const [isMinimum8Character, setIsMinimum8Character] = useState(false);
  const [isSpecialCharacter, setIsSpecialCharacter] = useState(false);
  const [isPasswordInput, setIsPasswordInput] = useState(false);
  const handleNameChange = (event: any) => {
    setFullName(event.target.value);
  };

  const { signUp } = useAuth();

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    const newPassword = event.target.value;
    setIsPasswordInput(newPassword.length > 0);
    const isValid = passwordRegex.test(newPassword);

    setIsMinimum8Character(newPassword.length >= 8);


    // Update checklist based on conditions
    setIsLowercase(/[a-z]/.test(newPassword));
    setIsUppercase(/[A-Z]/.test(newPassword));
    setIsDigit(/\d/.test(newPassword));
    setIsSpecialCharacter(/[!@#$%^&*()_+]/.test(newPassword));

    if (isValid) {
      setPassword(event.target.value);
      // } else {
      //   setErrorMessage(
      //     'Password should contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*()_+)',
      //   );
      //   openSnackbar();
    }
  };

  const handleConfirmPasswordChange = (event: any) => {
    setConfirmPassword(event.target.value);
  };
  const handleSignInClick = () => {
    navigate('/login');
  };
  const handleSignUp = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email address');
      openSnackbar();
      return;
    }
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[A-Z]).{8,}$/;
      const isStrongPassword = passwordRegex.test(password);

      if (!isStrongPassword) {
        setLoading(false);
        setErrorMessage(
          'Password is weak.',
        );
        openSnackbar();
        return;
      }
    setLoading(true);
    if(isLowercase && isDigit && isSpecialCharacter && isMinimum8Character&& isUppercase){
    if (password === confirmPassword) {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[A-Z]).{8,}$/;
      const isValid = passwordRegex.test(password);

      // if (!isValid) {
      //   setLoading(false);
      //   setErrorMessage(
      //     'Password Should be minimum 8 characters, 1 number, and 1 uppercase letter',
      //   );
      //   openSnackbar();
      //   return;
      // }
      signUp({ email, password, fullName })
        .then((result: any) => {
          if (result.data) {
            setOpenDialog(true);
            dispatch(
              ActionsCreator.setVerificationEmailState(
                result.data?.user?.email,
              ),
            );
            setLoading(false);
            navigate('/verification');
          }

          if (result.error) {
            setLoading(false);
            setErrorMessage(result.message);
            openSnackbar();
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      setLoading(false);
      setErrorMessage('Passwords do not match');
      openSnackbar();
    }}
    else{
      setLoading(false);
      setErrorMessage('Passwords is not strong enough');
      openSnackbar();
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const openSnackbar = () => {
    setSnackbarOpen(true);
  };
  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="warning">{error}.</Alert>
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
            <FormControl>
              <Box>
                <Typography className={classes.statement}>
                  Sign up to your account
                </Typography>
                {/* Display error message if there is an error */}
                {/* {error && (
                        <Box sx={{borderColor:'red',border: 1,display:'flex', justifyContent:'center'}}>
                        <Typography variant="body2" color="error" className={classes.errorMessage}>
                        {error}
                      </Typography>
                      </Box>
                    )} */}
                <Typography className={classes.name}>Full Name</Typography>

                <Box className={classes.textFieldBox}>
                  <TextField
                    // label="Nathan Roberts"
                    variant="outlined"
                    fullWidth
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
                          <PersonOutlineOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      style: {
                        fontFamily: 'Futura Bk BT', // Specify your desired font family for the label
                        fontSize: '16px', // Specify your desired font size for the label
                        // Additional styles can be added here
                      },
                    }}
                    className={classes.textField}
                    onChange={handleNameChange}
                  />
                </Box>
                <Typography className={classes.email}>Email</Typography>
                <Box className={classes.textFieldBox}>
                  <TextField
                    // label="nathan.roberts@example.com"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: 'black',
                        },
                      },
                    }}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon />
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      style: {
                        fontFamily: 'Futura Bk BT', // Specify your desired font family for the label
                        fontSize: '16px', // Specify your desired font size for the label
                        // Additional styles can be added here
                      },
                    }}
                    type="email"
                    required
                    className={classes.textField}
                    onChange={handleEmailChange}
                  />
                </Box>
                <Typography className={classes.password}>Password</Typography>
                <Box className={classes.textFieldBox}>
                  <TextField
                    // label="•••••••••"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: 'black',
                        },
                      },
                    }}
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
                        handleSignUp(); // Call the signIn function
                      }
                    }}
                  />
                </Box>
                {isPasswordInput && (
                  <Box className={classes.passwordChecklist}>
                    <Box className={classes.checklistItem}>
                      <Checkbox
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
                        checked={isLowercase}
                        className={
                          isLowercase ? classes.check : classes.uncheck
                        }
                        disableRipple
                      />
                      <Typography className={classes.checklistItemText}>
                        One lowercase letter
                      </Typography>
                    </Box>
                    <Box className={classes.checklistItem}>
                      <Checkbox
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
                        checked={isUppercase}
                        className={
                          isUppercase ? classes.check : classes.uncheck
                        }
                        disableRipple
                      />
                      <Typography className={classes.checklistItemText}>
                        One uppercase letter
                      </Typography>
                    </Box>
                    <Box className={classes.checklistItem}>
                      <Checkbox
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
                        checked={isDigit}
                        className={isDigit ? classes.check : classes.uncheck}
                        disableRipple
                      />
                      <Typography className={classes.checklistItemText}>
                        One digit
                      </Typography>
                    </Box>
                    <Box className={classes.checklistItem}>
                      <Checkbox
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
                        checked={isSpecialCharacter}
                        className={
                          isSpecialCharacter ? classes.check : classes.uncheck
                        }
                        disableRipple
                      />
                      <Typography className={classes.checklistItemText}>
                        One special character
                      </Typography>
                    </Box>
                                 
                   <Box className={classes.checklistItem}>
                    <Checkbox
                      icon={<CircleUnchecked />}
                      checkedIcon={<CircleCheckedFilled />}
                      checked={isMinimum8Character}
                      className={isMinimum8Character ? classes.check : classes.uncheck}
                      disableRipple
                    />
                    <Typography className={classes.checklistItemText}>
                      Minimum 8 characters
                    </Typography>
                  </Box>
                </Box>

                )}
                <Typography className={classes.password}>
                  Confirm Password
                </Typography>
                <Box className={classes.textFieldBox}>
                  <TextField
                    // label="•••••••••"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: 'black',
                        },
                      },
                    }}
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
                        handleSignUp(); // Call the signIn function
                      }
                    }}
                  />
                </Box>

                <Box className={classes.buttonBox}>
                  <LoadingButton
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    color="primary"
                    className={classes.signup}
                    type="submit"
                    onClick={handleSignUp}
                    disabled={
                      email === '' ||
                      // password === '' ||
                      // confirmPassword === '' ||
                      fullName === ''
                    }
                  >
                    Sign Up
                  </LoadingButton>
                  <Box sx={{ marginTop: 3, mb: 10 }}>
                    <Typography className={classes.login}>
                      Already have an account?
                      <Button
                        className={classes.loginButton}
                        variant="text"
                        color="primary"
                        onClick={handleSignInClick}
                      >
                        Sign In
                      </Button>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </FormControl>
          </div>
        </Grid>
        <Grid item lg={7} xl={7}>
          {/* <Mapstatic /> */}
          <div className={classes.imageDiv}>
            <img
              src="icons/mapImageLogin.png"
              alt="Map"
              style={{
                // right:0,
                width: '100%',
                height: '100%',
                objectFit:'cover',
              }}
            />
            {/* <img

            src="icons/mapimg2.svg"
            alt="Map 2"
             style={{
               position: 'absolute',
            //   top: 0, // You can adjust the top position as needed
              left: 0, // You can adjust the left position as needed
              //  right: 0,
              width: '100%',
              height:'auto',
             }}
          /> */}
          </div>
        </Grid>
      </Grid>

      {/* Dialog for showing the alert */}

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
          <Typography
            sx={{
              alignContent: 'center',
              fontFamily: 'Futura Hv BT',
              fontSize: '22px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            Welcome Back!
          </Typography>
          <Typography className={classes.thanks}>
            Thank you for creating an account on
          </Typography>
          {/* <Typography > */}
          <Box sx={{ padding: '40px 0px 40px 0px' }}>
            <Box className={classes.logoContainer}>
              <Logo />
            </Box>
          </Box>
          {/* </Typography> */}
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
    </>
  );
}

export default Signup;
