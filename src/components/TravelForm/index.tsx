import React, { ReactElement, useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Snackbar, Slide, Alert } from '@mui/material';
import { useSelector } from 'react-redux'; // Import useSelector and useDispatch
import ActionsCreator from '~redux/actions';
import { useDispatch } from '~redux/store';
import useStyles from './styles';
import { TransitionProps } from '@mui/material/transitions';
import {
  FormDataProps,
  FormData,
  TravelFormData,
  Options,
} from '~/utility/models';
import TransportSelector from '../TransportSelector';
import FormContainer from '~/containers/FormContainer';

import { Dayjs } from 'dayjs';
import { LoadingButton } from '@mui/lab';
import { setEncodedPaths } from '~/utility/utils';
import { useNavigate } from 'react-router-dom';

export type ModeOfTransportButtonProps = {
  label: string;
  icon: ReactElement<any, any>;
  isSelected: boolean;
  onClick: any;
  onMouseEnter: any;
  onMouseLeave: any;
};

export const ModeOfTransportButton: React.FC<ModeOfTransportButtonProps> = ({
  label,
  icon,
  isSelected,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: ModeOfTransportButtonProps) => {
  const classes = useStyles(); // Use useStyles to access the CSS classes

  return (
    <Button
      disabled={false}
      size="large"
      variant="contained"
      className={`${classes.modeButtons} ${
        isSelected ? classes.activeMode : ''
      }`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {icon}
      {label}
    </Button>
  );
};

const TravelForm = (props: {
  alertText: string;
  formName: string;
  handleClose: React.MouseEventHandler<HTMLImageElement> | undefined;
  state: boolean;
}) => {
  const [selectedTransport, setSelectedTransport] = useState(''); // New state for selected transport
  const [travelPoints, setTravelPoints] = useState<FormDataProps[]>([]); // Array to store travel points
  const [errorMessage, setErrorMessage] = useState(''); // State to manage the error message
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to manage Snackbar visibility
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600); // Detect initial screen width
  const classes = useStyles(); // Use useStyles to access the CSS classes
  const [isCarSelected, setIsCarSelected] = useState(false);
  const [isPlaneSelected, setIsPlaneSelected] = useState(false);
  const [isCarHovered, setIsCarHovered] = useState(false);
  const [isPlaneHovered, setIsPlaneHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const userID: string = useSelector((state: any) => state.MapReducers.userID);
  const userEmail: string = useSelector(
    (state: any) => state.MapReducers.userEmail,
  );

  const state: any = useSelector((state: any) => state.MapReducers.pointsArray);

  const travelObj = useRef<TravelFormData[]>(state);

  const dispatch = useDispatch();

  // const isFormDisabledRef = useRef(travelPoints.length > 0 && !isSaved);

  const [isDisabled, setIsDisabled] = useState<any>(false);
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 600);
  };

  const initialFormData = {
    location: null,
    dateTime: null,
    category: '',
    timezone: 'Asia/Karachi',
  };

  const [departureFormData, setDepartureFormData] =
    useState<FormData>(initialFormData);
  const [arrivalFormData, setArrivalFormData] =
    useState<FormData>(initialFormData);

  useEffect(() => {
    if (state.length === 0) {
      setDepartureFormData(initialFormData);
      setArrivalFormData(initialFormData);
      setSelectedTransport('');
      setIsPlaneSelected(false);
      setIsCarSelected(false);
    }
  }, [state]);

  const handleArrivalFormChange = (
    field: keyof FormData,
    value: string | null | number | Date | Options | Dayjs,
  ) => {
    setArrivalFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleDepartureFormChange = (
    field: keyof FormData,
    value: string | null | number | Date | Options | Dayjs,
  ) => {
    setDepartureFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleTransportChange = (transportType: string) => {
    setIsPlaneSelected(transportType === 'Plane');
    setIsCarSelected(transportType === 'Car');
    setSelectedTransport(transportType);
  };

  const handleMouseEnter = (transportType: string) => {
    if (transportType === 'Plane') {
      setIsPlaneHovered(true);
      setIsCarHovered(false);
    } else if (transportType === 'Car') {
      setIsPlaneHovered(false);
      setIsCarHovered(true);
    }
  };

  const handleMouseLeave = (transportType: string) => {
    if (transportType === 'Plane') {
      setIsPlaneHovered(false);
    } else if (transportType === 'Car') {
      setIsCarHovered(false);
    }
  };

  const handleDoneButtonClick = async () => {
    let formValidState = await updateTravelPointsArray();

    if (formValidState && travelObj.current) {
      setLoading(true);

      ActionsCreator.addTravelToHistoryAndDispatch(
        travelObj.current,
        userEmail,
        userID,
      )
        .then((data) => {
          setLoading(false);
          console.log('Operation successful:', data);
          setSuccessMessage('Saved Successfully');
          setSuccessSnackbarOpen(true);

          setTimeout(() => {
            dispatch(ActionsCreator.setTravelFormSaveState(true));
            dispatch(ActionsCreator.openTravelForm(false));
          }, 1000);
        })
        .catch((error) => {
          // Handle error with the 'error' returned
          console.error('Error:', error);
        });
    }
  };

  useEffect(() => {
    if (travelObj.current.length > 0) {
      setTravelPoints(state);
      const lastPointIndex = state.length - 1;
      setDepartureFormData(state[lastPointIndex].arrival);
      setArrivalFormData(initialFormData);
      setIsDisabled(true);
    }
  }, [isDisabled]);

  async function updateTravelPointsArray() {
    const isAnyFieldNull =
      Object.values(departureFormData).some(
        (value) => value === null || value === '',
      ) ||
      Object.values(arrivalFormData).some(
        (value) => value === null || value === '',
      ) ||
      !selectedTransport;

    if (isAnyFieldNull) {
      setErrorMessage('Please fill all the fields before proceeding furthur');
      setSnackbarOpen(true); // Show the Snackbar
      return false; // Exit the function if any field is null
    }

    let newTravelObj = {
      arrival: arrivalFormData,
      departure: departureFormData,
      selectedTransport: selectedTransport,
      encodedPath: '',
    };

    newTravelObj = await setEncodedPaths(newTravelObj);

    const updatedTravelPoints = [...travelPoints, newTravelObj];

    travelObj.current = updatedTravelPoints;

    setTravelPoints(updatedTravelPoints);

    dispatch(
      ActionsCreator.addTravelPoint(updatedTravelPoints as TravelFormData[]),
    );

    return true;
  }

  const handleAddAnotherPointClick = async () => {
    let formValidState = await updateTravelPointsArray();
    if (formValidState && travelObj.current) {
      const lastPointIndex = travelObj.current.length - 1;
      setIsPlaneSelected(false);
      setIsCarSelected(false);
      setSelectedTransport('');
      setArrivalFormData(initialFormData);
      setDepartureFormData(travelObj.current[lastPointIndex].arrival);

      setIsDisabled(true);
    } else return;
  };

  const handleOnGoBackMethod = () => {
    if (travelObj.current) {
      const lastPointIndex = travelObj.current.length - 1;
      setDepartureFormData(travelObj.current[lastPointIndex].departure);
      setArrivalFormData(travelObj.current[lastPointIndex].arrival);
      setSelectedTransport(travelObj.current[lastPointIndex].selectedTransport);
      if (travelObj.current[lastPointIndex].selectedTransport === 'Plane') {
        // TODO: global enum class
        setIsPlaneSelected(true);
      } else if (
        travelObj.current[lastPointIndex].selectedTransport === 'Car'
      ) {
        setIsCarSelected(true);
      }
      const updatedTravelPoints = [...travelPoints.slice(0, -1)];
      setTravelPoints(updatedTravelPoints as FormDataProps[]);
      travelObj.current = updatedTravelPoints;

      if (Array.isArray(travelObj.current)) {
        if (travelObj.current.length === 0) {
          setIsDisabled(false);
        }
      }
    }
  };

  const buttonConfigurations = [
    {
      label: 'Add another Point',
      class: classes.addPointButton,
      loading: false,
      onClick: handleAddAnotherPointClick,
    },
    {
      label: 'Save',
      loading: loading,
      class: classes.submitButton,
      onClick: handleDoneButtonClick,
    },
  ];

  // useEffect(() => {
  //   // Update the isDisabled state based on conditions whenever necessary
  //   const isTravelPointsNotEmpty = state.length > 0;
  //   const shouldDisable = isTravelPointsNotEmpty && !isSaved;
  //   setIsDisabled(shouldDisable);
  // }, [isSaved, state.length]);

  useEffect(() => {
    // Add a listener for window resize events
    window.addEventListener('resize', handleResize);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ('selected', selectedTransport);

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Adjust the duration as needed
        onClose={() => setSnackbarOpen(false)} // Close the Snackbar on action
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Position the Snackbar at bottom left
        TransitionComponent={Slide} // Use the Slide component for the transition
        TransitionProps={{ direction: 'right' } as TransitionProps} // Slide from right to left
      >
        <Alert
          variant="filled"
          severity="error"
          onClose={() => setSnackbarOpen(false)}
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

      <Typography variant="h5" textAlign={'center'} className={classes.title}>
        Add a New Travel
        <img
          src="icons/cross.svg"
          alt="cancel"
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            padding: '22px',
            cursor: 'pointer',
          }}
          onClick={props.handleClose}
        />
      </Typography>

      <Grid
        item
        container
        spacing={1}
        marginTop={2}
        className={classes.formContainer}
      >
        <Grid item xs={12} md={6}>
          <FormContainer
            type={'departure'}
            formData={departureFormData}
            oppositeformData={arrivalFormData}
            onFormChange={handleDepartureFormChange}
            isDisabled={isDisabled} // Pass the isDisabled prop to indicate it's for departure and should not be disabled
            alertText={props.alertText}
            defaultCategory={null}
          />
        </Grid>

        {/* This is to show mode of transport selector in middle for mobile init state case */}
        {/* {isMobile && (
          <TransportSelector
            onTransportChange={(transportType) =>
              handleTransportChange(transportType)
            }
            isPlaneSelected={isPlaneSelected}
            isCarSelected={isCarSelected}
            isPlaneHovered={isPlaneHovered}
            isCarHovered={isCarHovered}
            onMouseEnter={(transportType) => handleMouseEnter(transportType)}
            onMouseLeave={(transportType) => handleMouseLeave(transportType)}
          />
        )} */}

        <Grid item xs={12} md={6}>
          <FormContainer
            type={'arrival'}
            formData={arrivalFormData}
            oppositeformData={departureFormData}
            onFormChange={handleArrivalFormChange}
            isDisabled={false}
            alertText={''}
            defaultCategory={''}
          />
        </Grid>

        {isMobile ? (
          // Mobile mode of transport selector

          <TransportSelector
            onTransportChange={(transportType) =>
              handleTransportChange(transportType)
            }
            isPlaneSelected={isPlaneSelected}
            isCarSelected={isCarSelected}
            isPlaneHovered={isPlaneHovered}
            isCarHovered={isCarHovered}
            onMouseEnter={(transportType) => handleMouseEnter(transportType)}
            onMouseLeave={(transportType) => handleMouseLeave(transportType)}
          />
        ) : (
          // Desktop mode of transport selector
          <TransportSelector
            onTransportChange={(transportType) =>
              handleTransportChange(transportType)
            }
            isPlaneSelected={isPlaneSelected}
            isCarSelected={isCarSelected}
            isPlaneHovered={isPlaneHovered}
            isCarHovered={isCarHovered}
            onMouseEnter={(transportType) => handleMouseEnter(transportType)}
            onMouseLeave={(transportType) => handleMouseLeave(transportType)}
          />
        )}
      </Grid>

      {/* This grid is for footer buttons */}
      <Grid
        item
        container
        spacing={2}
        textAlign={'center'}
        marginTop={'1px'}
        className={classes.footerButtons}
      >
        <Grid item xs={12} md={4} className={classes.goBackContainer}>
          {isDisabled && (
            <Button
              disabled={false}
              size="large"
              variant="contained"
              className={classes.backButton}
              sx={{
                fontFamily: 'Futura Bold Italic',
              }}
              onClick={handleOnGoBackMethod}
            >
              Go Back
            </Button>
          )}
        </Grid>
        <Grid item xs={12} md={8} className={classes.submitContainer}>
          {buttonConfigurations.map((config, index) => (
            <LoadingButton
              key={index}
              loading={config.loading}
              disabled={false}
              size="large"
              variant="contained"
              className={config.class}
              sx={{
                fontFamily: 'Futura Bold Italic',
              }}
              onClick={config.onClick}
            >
              {config.label}
            </LoadingButton>
          ))}
        </Grid>
      </Grid>
      <br></br>
    </div>
  );
};

export default TravelForm;
