import React, { ReactElement, useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Snackbar, Slide, Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import ActionsCreator from '~redux/actions';
import { useDispatch } from '~redux/store';
import useStyles from './styles';
import { TransitionProps } from '@mui/material/transitions';
import {
  FormData,
  Options,
  TravelFormData,
  TravelHistoryData,
} from '~/utility/models';
import FormContainer from '~/containers/FormContainer';
import TransportSelector from '../TransportSelector';
import { LngLatLike } from 'maplibre-gl';
import { Dayjs } from 'dayjs';
import { addOrUpdateTravelData, setEncodedPaths } from '~/utility/utils';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

type ModeOfTransportButtonProps = {
  label: string;
  icon: ReactElement<any, any>;
  isSelected: boolean;
  onClick: any;
  onMouseEnter: any;
  onMouseLeave: any;
};

const ModeOfTransportButton: React.FC<ModeOfTransportButtonProps> = ({
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

const ModifyTravelForm = (props: {
  departureAlertText: string;
  arrivalAlertText: string;
  formName: string;
  handleClose: React.MouseEventHandler<HTMLImageElement> | undefined;
  state: boolean;
}) => {
  const selectedTransport = useRef(''); // New state for selected transport
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

  const isArrivalDisabled = useRef(false);
  const isDepartureDisabled = useRef(false);
  const dispatch = useDispatch();

  const userID: string = useSelector((state: any) => state.MapReducers.userID);
  const userEmail: string = useSelector(
    (state: any) => state.MapReducers.userEmail,
  );

  const state: TravelFormData[] = useSelector(
    (state: any) => state.MapReducers.pointsArray,
  );

  const currentHistoryID: number = useSelector(
    (state: any) => state.MapReducers.travelHistoryTrackingID,
  );
  const currentIndex: number = useSelector(
    (state: any) => state.MapReducers.travelHistoryIndex,
  );

  const travelHistoryData: TravelHistoryData[] = useSelector(
    (state: any) => state.MapReducers.travelHistoryState,
  );

  const travelPoints = useRef<TravelFormData[]>(state);
  const tempTravelPoints = useRef<TravelFormData[]>(state);

  const isDisabled = useSelector(
    (state: any) => state.TravelReducers.isDisabled,
  );

  const [travelData, setTravelData] = useState<TravelFormData[]>(state);

  const isSaved: any = useSelector(
    (state: any) => state.MapReducers.isTravelFormSaved,
  );

  const index: any = useSelector((state: any) => state.MapReducers.index);

  const isEditing: any = useSelector(
    (state: any) => state.TravelReducers.isEditing,
  );

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 600);
  };

  const initialFormData = useRef({
    location: null,
    dateTime: null,
    category: '',
    timezone: 'Asia/Karachi',
  });

  const [departureFormData, setDepartureFormData] = useState<FormData>(
    initialFormData.current,
  );
  const [arrivalFormData, setArrivalFormData] = useState<FormData>(
    initialFormData.current,
  );

  useEffect(() => {
    // if (index !== null) {
    if (state[index]) {
      if (state.length === 1) {
        // If there is only one item in the state, disable neither Arrival nor Departure
        setArrivalFormData(state[index].arrival);
        setDepartureFormData(state[index].departure);
        selectedTransport.current = state[index].selectedTransport;
        isArrivalDisabled.current = false;
        isDepartureDisabled.current = false;
      } else if (state.length > 1) {
        if (index === 0) {
          // If it's the first index, disable Arrival
          setArrivalFormData(state[index].arrival);
          setDepartureFormData(state[index].departure);
          selectedTransport.current = state[index].selectedTransport;
          isArrivalDisabled.current = true;
          isDepartureDisabled.current = false; // Make sure Departure is enabled
        } else if (index === state.length - 1) {
          // If it's the last index, disable Departure
          setArrivalFormData(state[index].arrival);
          setDepartureFormData(state[index].departure);
          selectedTransport.current = state[index].selectedTransport;
          isArrivalDisabled.current = false; // Make sure Arrival is enabled
          isDepartureDisabled.current = true;
        }
      }
    } else {
      if (index > state.length - 1) {
        isArrivalDisabled.current = false;
        isDepartureDisabled.current = true;
        selectedTransport.current = '';
        setDepartureFormData(state[state.length - 1].arrival);
        setArrivalFormData(initialFormData.current);
      } else if (index < 0) {
        setArrivalFormData(state[0].departure);
        setDepartureFormData(initialFormData.current);
        selectedTransport.current = '';
        isArrivalDisabled.current = true;
        isDepartureDisabled.current = false; // Make sure Departure is enabled
      }
    }
    // set Enum class with only one state
    if (selectedTransport.current === 'Plane') {
      setIsPlaneSelected(true);
      setIsCarSelected(false);
    } else if (selectedTransport.current === 'Car') {
      setIsCarSelected(true);
      setIsPlaneSelected(false);
    } else {
      setIsCarSelected(false);
      setIsPlaneSelected(false);
    }
  }, [index, state]);

  const handleArrivalFormChange = (
    field: keyof FormData,
    value: string | null | number | Date | Options | Dayjs,
  ) => {
    setArrivalFormData((prevData) => {
      let updatedFormData = { ...prevData };

      updatedFormData = { ...prevData, [field]: value };

      return updatedFormData;
    });
  };

  const handleDepartureFormChange = (
    field: keyof FormData,
    value: string | null | number | Date | Options | Dayjs,
  ) => {
    setDepartureFormData((prevData) => {
      let updatedFormData = { ...prevData };

      updatedFormData = { ...prevData, [field]: value };
      return updatedFormData;
    });
  };

  const handleTransportChange = (transportType: string) => {
    setIsPlaneSelected(transportType === 'Plane');
    setIsCarSelected(transportType === 'Car');
    selectedTransport.current = transportType;
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

  const handleEditingDoneButtonClick = async () => {
    let formValidState = await modifyTravelPointsArray();
    if (formValidState) {
      setLoading(true);
      addOrUpdateTravelData(
        travelHistoryData,
        currentIndex,
        currentHistoryID,
        tempTravelPoints,
        userID,
        userEmail,
        setLoading,
        setSuccessMessage,
        setSuccessSnackbarOpen,
        dispatch,
      );
    }
  };

  const handleAddingDoneButtonClick = async () => {
    let formValidState = await updateTravelPointsArray();

    if (formValidState) {
      setLoading(true);
      addOrUpdateTravelData(
        travelHistoryData,
        currentIndex,
        currentHistoryID,
        travelPoints,
        userID,
        userEmail,
        setLoading,
        setSuccessMessage,
        setSuccessSnackbarOpen,
        dispatch,
      );
    }
  };

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
      selectedTransport: selectedTransport.current,
      encodedPath: '',
    };

    newTravelObj = await setEncodedPaths(newTravelObj);

    const updatedTravelPoints = [...travelPoints.current, newTravelObj];

    dispatch(
      ActionsCreator.addTravelPoint(updatedTravelPoints as TravelFormData[]),
    );

    setTravelData(updatedTravelPoints as TravelFormData[]);
    travelPoints.current = updatedTravelPoints as TravelFormData[];

    return true;
  }

  async function modifyTravelPointsArray() {
    const departureForm = departureFormData;
    const arrivalForm = arrivalFormData;

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

    let updatedTravelPoints = [...travelPoints.current];

    let updatedPoints = {
      arrival: arrivalForm,
      departure: departureForm,
      selectedTransport: selectedTransport.current,
      encodedPath: '',
    };

    updatedPoints = await setEncodedPaths(updatedPoints);

    if (index < 0) {
      updatedTravelPoints.unshift(updatedPoints);
    } else {
      updatedTravelPoints[index] = updatedPoints;
    }

    dispatch(
      ActionsCreator.addTravelPoint(updatedTravelPoints as TravelFormData[]),
    );

    tempTravelPoints.current = updatedTravelPoints as TravelFormData[];

    return true; // Return true to indicate that the update was successful
  }

  const handleAddAnotherPointClick = async () => {
    let formValidState = await updateTravelPointsArray();
    if (formValidState && travelPoints.current) {
      const lastPointIndex = travelPoints.current.length - 1;
      setIsPlaneSelected(false);
      setIsCarSelected(false);
      selectedTransport.current = '';
      setArrivalFormData(initialFormData.current);
      setDepartureFormData(travelPoints.current[lastPointIndex].arrival);
      dispatch(ActionsCreator.setIndexForModifyTravelForm(index + 1));
      dispatch(ActionsCreator.setDisabledState(true));
      isArrivalDisabled.current = false;
      isDepartureDisabled.current = true;
    } else return;
  };

  const handleOnGoBackMethod = () => {
    if (travelPoints.current) {
      const lastPointIndex = travelPoints.current.length - 1;
      setDepartureFormData(travelPoints.current[lastPointIndex].departure);
      setArrivalFormData(travelPoints.current[lastPointIndex].arrival);
      selectedTransport.current =
        travelPoints.current[lastPointIndex].selectedTransport;
      if (travelPoints.current[lastPointIndex].selectedTransport === 'Plane') {
        // TODO: global enum class
        setIsPlaneSelected(true);
      } else if (
        travelPoints.current[lastPointIndex].selectedTransport === 'Car'
      ) {
        setIsCarSelected(true);
      }
      const updatedTravelPoints = [...travelPoints.current.slice(0, -1)];
      travelPoints.current = updatedTravelPoints;
      setTravelData(updatedTravelPoints as TravelFormData[]);

      dispatch(ActionsCreator.setIndexForModifyTravelForm(index - 1));
      if (Array.isArray(travelPoints.current)) {
        if (travelPoints.current.length === 0) {
          isDepartureDisabled.current = false;
          dispatch(ActionsCreator.setDisabledState(false));
        }
      }
    }
  };

  const buttonConfigurations = [
    {
      label: 'Add another Point',
      class: classes.addPointButton,
      loading: false,
      isDisabled: isEditing ? true : false,
      onClick: handleAddAnotherPointClick,
    },
    {
      label: 'Save',
      class: classes.submitButton,
      isDisabled: false,
      loading: loading,
      onClick: isEditing
        ? handleEditingDoneButtonClick
        : handleAddingDoneButtonClick,
    },
  ];

  const planeTransport = {
    label: 'Plane',
    icon: (
      <img
        src="icons/blackplane.svg"
        alt="Plane"
        className={classes.transportIcon}
      />
    ),
    selectIcon: (
      <img
        src="icons/plane.svg"
        alt="Plane"
        className={classes.transportIcon}
      />
    ),
    onClick: () => handleTransportChange('Plane'),
  };

  const carTransport = {
    label: 'Car',
    icon: (
      <img
        src="icons/blackcar.svg"
        alt="Car"
        className={classes.transportIcon}
      />
    ),
    selectIcon: (
      <img src="icons/car.svg" alt="Plane" className={classes.transportIcon} />
    ),
    onClick: () => handleTransportChange('Car'),
  };

  useEffect(() => {
    // Add a listener for window resize events
    window.addEventListener('resize', handleResize);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        {props.formName}
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
            isDisabled={isDepartureDisabled.current} // Pass the isDisabled prop to indicate it's for departure and should not be disabled
            alertText={props.departureAlertText}
            defaultCategory={null}
          />
        </Grid>

        {/* This is to show mode of transport selector in middle for mobile init state case */}
        {/* {isMobile && (
         
        )} */}

        <Grid item xs={12} md={6}>
          <FormContainer
            type={'arrival'}
            formData={arrivalFormData}
            oppositeformData={departureFormData}
            onFormChange={handleArrivalFormChange}
            isDisabled={isArrivalDisabled.current}
            alertText={props.arrivalAlertText}
            defaultCategory={''}
          />
        </Grid>
      </Grid>

      {isMobile ? (
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

      <Grid
        container
        spacing={2}
        textAlign={'center'}
        marginTop={'1px'}
        className={classes.footerButtons}
      >
        <Grid item xs={12} md={4} className={classes.goBackContainer}>
          {isDisabled && (
            <Button
              disabled={isEditing ? true : false}
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
              disabled={config.isDisabled}
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

export default ModifyTravelForm;
