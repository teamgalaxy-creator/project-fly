import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
  Slide,
  TextField,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '~redux/store';
import ActionsCreator from '~redux/actions';
import useStyles from './style';
import { TransitionProps } from '@mui/material/transitions';
import { LoadingButton } from '@mui/lab';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CircleCheckedFilled from '@mui/icons-material/CheckCircle';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from '~/redux/reducers';
import { useAuth } from '~/managers/AuthContext';

interface SettingsPageProps {
  handleClose: () => void;
}

const Settings = (props: SettingsPageProps) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mainContainerRef = useRef<any>(null);
  const gridContainerRef = useRef<any>(null);
  const { updateUserData } = useAuth();

  const passwordRef = useRef<string>('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const [isLowercase, setIsLowercase] = useState(false);
  const [isUppercase, setIsUppercase] = useState(false);
  const [isDigit, setIsDigit] = useState(false);
  const [isSpecialCharacter, setIsSpecialCharacter] = useState(false);
  const [isMinimum8Character, setIsMinimum8Character] = useState(false);
  const [isPasswordInput, setIsPasswordInput] = useState(false);
  const [selectedProfilePicture, setSelectedProfilePicture] =
    useState<any>(null);

  const userEmail: string = useSelector(
    (state: any) => state.MapReducers.userEmail,
  );
  const userName: string = useSelector(
    (state: any) => state.MapReducers.userName,
  );

  const profilePictureURL: string = useSelector(
    (state: any) => state.MapReducers.profileImgURL,
  );

  const initialState = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: null,
  };

  const [formData, setFormData] = useState(initialState);

  const handleCloseSettingsPage = () => {
    navigate('/homepage');
    dispatch(ActionsCreator.openSettingsPageState(false));
  };

  useEffect(() => {
    if (!profilePictureURL) {
      const defaultProfilePicture = '/icons/croppedLogoVizualTravel.svg';
      fetch(defaultProfilePicture)
        .then((response) => response.blob())
        .then((blob) => setSelectedProfilePicture(blob));
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (mainContainerRef.current) {
        const mainContainerHeight = mainContainerRef.current.clientHeight;
        const desiredMaxHeight = `calc(87vh - ${mainContainerHeight}px - 20px)`;
        if (gridContainerRef.current) {
          gridContainerRef.current.style.maxHeight = desiredMaxHeight;
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [loading]);

  useEffect(() => {
    setFormData({
      ...formData,
      email: userEmail,
    });
  }, [userEmail]);

  const validateForm = () => {
    if (
      (formData.fullName === '' && formData.profilePicture === null) ||
      (formData.password === '' &&
        formData.confirmPassword === '' &&
        formData.profilePicture === null)
    ) {
      setSaveButtonDisabled(true);
      setErrorMessage('Please fill at least one field');
    } else {
      setErrorMessage('');
      setSaveButtonDisabled(false);
    }
  };
  

  useEffect(() => {
    validateForm();
  }, [formData, formData.fullName, formData.profilePicture]);
  

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

    const newPassword = event.target.value;

    setPassword(newPassword);
    setIsPasswordInput(newPassword.length > 0);
    const isValid = passwordRegex.test(newPassword);
    const userFinishedTyping = newPassword.length >= 8;
    setIsLowercase(/[a-z]/.test(newPassword));
    setIsUppercase(/[A-Z]/.test(newPassword));
    setIsDigit(/\d/.test(newPassword));
    setIsSpecialCharacter(/[!@#$%^&*()_+]/.test(newPassword));
    setIsMinimum8Character(newPassword.length >= 8);
    if (isValid) {
      setFormData({ ...formData, password: event.target.value });
    }
    // else if (userFinishedTyping && !isValid) {
    //   setErrorMessage('Password should contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*()_+)');
    //   setErrorSnackbarOpen(true);
    // }
  };
  const handleConfirmPasswordChange = (event: any) => {
    setConfirmPassword(event.target.value);
    setFormData({
      ...formData,
      confirmPassword: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    //     const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[A-Z]).{8,}$/;

    //       const isStrongPassword = passwordRegex.test(password);
    // console.log('STRONG:',isStrongPassword);

    //       if (!isStrongPassword) {
    //         setLoading(false);
    //         setErrorMessage(
    //           'Password is weak.',
    //         );
    //        setErrorSnackbarOpen(true);
    //         return;
    //       }
    setLoading(true);

    // if (errorMessage !== '') {
    //   setErrorSnackbarOpen(true);
    //   setLoading(false);
    //   return;
    // }
    if (
      isLowercase &&
      isDigit &&
      isSpecialCharacter &&
      isMinimum8Character &&
      isUppercase|| (password === ''&& confirmPassword=== '')
      ) {
      console.log(password, 11, confirmPassword);

      if (password === confirmPassword|| (password === ''&& confirmPassword=== '') ){
        try {
          const response = await updateUserData(formData);

          console.log(response);

          if (response.success === true) {
            setSuccessMessage('User data updated successfully');
            setSuccessSnackbarOpen(true);
            ActionsCreator.setUserProfileImageURL(
              response.data.user.user_metadata.profile_picture,
            );
            ActionsCreator.setUserName(
              response.data.user.user_metadata.full_name,
            );
            setFormData({
              ...initialState,
              email: formData.email,
            });
            setConfirmPassword('');
            setPassword('');
            setIsPasswordInput(false);
            setIsLowercase(false);
            setIsUppercase(false);
            setIsDigit(false);
            setIsSpecialCharacter(false);
            setIsMinimum8Character(false);
          } else {
            setErrorMessage(response.error);
            setErrorSnackbarOpen(true);
          }
        } catch (error) {
          console.error('Error updating user data:', error);
          setErrorMessage('An error occurred while updating user data');
          setErrorSnackbarOpen(true);
        }
      } else {
        setLoading(false);
        setErrorMessage('Passwords do not match');
        setErrorSnackbarOpen(true);
      }
    } else {
      setLoading(false);
      setErrorMessage('Passwords is not strong enough');
      setErrorSnackbarOpen(true);
    }

    setLoading(false);
  };

  const handleProfilePictureChange = async (event: any) => {
    const file = event.target.files[0];

    setSelectedProfilePicture(file);

    setFormData((prevFormData) => ({
      ...prevFormData,
      profilePicture: file,
    }));
  };

  return (
    <Box className={classes.mainContainer}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Adjust the duration as needed
        onClose={() => setErrorSnackbarOpen(false)} // Close the Snackbar on action
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Position the Snackbar at bottom left
        TransitionComponent={Slide} // Use the Slide component for the transition
        TransitionProps={{ direction: 'right' } as TransitionProps} // Slide from right to left
      >
        <Alert
          variant="filled"
          severity="error"
          onClose={() => setErrorSnackbarOpen(false)}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'right' } as TransitionProps}
      >
        <Alert
          variant="filled"
          severity="success"
          onClose={() => setSuccessSnackbarOpen(false)}
        >
          {successMessage}
        </Alert>
      </Snackbar>
      <Grid>
        <div ref={mainContainerRef}>
          <Typography className={classes.title}>Settings</Typography>
          <Button
            className={classes.goBackButton}
            onClick={handleCloseSettingsPage}
          >
            {' '}
            Go Back
          </Button>

          <Divider
            variant="middle"
            className={classes.divider}
            sx={{ bgcolor: 'gray' }}
          />
        </div>
        <Container
          component="form"
          noValidate
          onSubmit={handleSubmit}
          maxWidth="md"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'auto',
            maxHeight: '100%',
          }}
          ref={gridContainerRef}
        >
          <Box
            sx={{
              mt: 3,
              padding: '15px',
              alignContent: 'center',
            }}
          >
            <Grid container spacing={4}>
              <Grid xs={12} className={classes.topAdjustment}>
                <input
                  type="file"
                  accept="image/*"
                  id="profilePictureInput"
                  style={{ display: 'none' }}
                  onChange={handleProfilePictureChange}
                />
                <label
                  htmlFor="profilePictureInput"
                  className={classes.imageContainer}
                >
                  <div className={classes.circularImageContainer}>
                    <img
                      className={classes.circularImage}
                      src={
                        selectedProfilePicture
                          ? URL.createObjectURL(selectedProfilePicture)
                          : profilePictureURL
                      }
                      alt="Profile"
                    />
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    className={classes.changePicture}
                  >
                    Change Picture
                  </Button>
                </label>
              </Grid>
              <Grid xs={12} sm={6} className={classes.itemClass}>
                <Typography className={classes.headings}>Full Name</Typography>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  id="fullName"
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
                        <PersonOutlineOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={formData.fullName}
                  onChange={(event) => {
                    setFormData({ ...formData, fullName: event.target.value }); // Update the fullName state on change
                  }}
                />
              </Grid>
              <Grid xs={12} sm={6} className={classes.itemClass}>
                <Typography className={classes.headings}>Email</Typography>
                <TextField
                  autoComplete="email"
                  name="email"
                  id="email"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: 'black',
                      },
                    },
                  }}
                  fullWidth
                  value={formData.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                  disabled={true}
                />
              </Grid>
              <Grid xs={12} sm={6} className={classes.itemClass}>
                <Typography className={classes.headings}>
                  New Password
                </Typography>
                <TextField
                  name="password"
                  type="password"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: 'black',
                      },
                    },
                  }}
                  id="password"
                  fullWidth
                  autoComplete="new-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={password}
                  onChange={handlePasswordChange}
                  // onChange={(event) => {
                  //   setFormData({ ...formData, password: event.target.value });
                  // }}
                />
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
                        className={
                          isMinimum8Character ? classes.check : classes.uncheck
                        }
                        disableRipple
                      />
                      <Typography className={classes.checklistItemText}>
                        Minimum 8 characters
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Grid>
              <Grid xs={12} sm={6} className={classes.itemClass}>
                <Typography className={classes.headings}>
                  Confirm New Password
                </Typography>
                <TextField
                  name="password2"
                  type="password"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: 'black',
                      },
                    },
                  }}
                  id="password2"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleConfirmPasswordChange}
                  value={confirmPassword}
                  // onChange={(event) => {
                  //   setFormData({
                  //     ...formData,
                  //     confirmPassword: event.target.value,
                  //   });
                  // }}
                />
              </Grid>
            </Grid>
            <LoadingButton
              className={classes.saveButton}
              variant="contained"
              color="primary"
              type="submit"
              loading={loading}
              // disabled={saveButtonDisabled} // Disable the button when saveButtonEnabled is false
            >
              Save
            </LoadingButton>
          </Box>
        </Container>
      </Grid>
    </Box>
  );
};

export default Settings;
