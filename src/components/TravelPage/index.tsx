/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ActionsCreator from '~redux/actions';
import { useDispatch } from '~redux/store';
import ScheduleSection from '~components/ScheduleSection';
import useStyles from './styles';
import { useSelector } from '~/redux/reducers';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { isEditingAllowed, timezoneDate } from '~/utility/utils';
import { TravelFormData, TravelHistoryData } from '~/utility/models';
import EditMenu from '~components/EditMenu';
import { Grid } from '@mui/material';
import { calculateTravelTime, formatTime } from '~/utility/utils';
import { useNavigate } from 'react-router-dom';

interface TravelScheduleProps {
  pointAirport: string | undefined;
  originAirport: string | undefined;
  originCity: string | undefined;
  originCountry: string | undefined;
  destCity: string | undefined;
  destCountry: string | undefined;
  destAirport: string | undefined;
  departureDate: Date | null | undefined;
  departureTime: string;
  arrivalDate: Date | null | undefined;
  arrivalTime: string;
  travelTime: string;
  selectedTransport: string;
  handleClose: () => void;
}

function getSuffix(index: number) {
  const suffixes = ['st', 'nd', 'rd'];
  const num = index + 1;
  const lastDigit = num % 10;
  const secondLastDigit = Math.floor(num / 10) % 10;

  if (secondLastDigit === 1) {
    return 'th';
  }

  return suffixes[lastDigit - 1] || 'th';
}

export default function TravelPage() {
  const sampleProps = [];
  const dispatch = useDispatch();

  const travelPoints: TravelFormData[] = useSelector(
    (state: any) => state.MapReducers.pointsArray,
  );

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600); // Detect initial screen width

  const [openedInMobileMode, setOpenedInMobileMode] = useState(isMobile);
  const [isTravelPageVisible, setIsTravelPageVisible] = useState(true);
  const [email, setEmail] = useState(''); // Detect initial screen width

  const userID: string = useSelector((state: any) => state.MapReducers.userID);
  const userEmail: string = useSelector(
    (state: any) => state.MapReducers.userEmail,
  );

  const navigate = useNavigate();

  const currentHistoryID: number = useSelector(
    (state: any) => state.MapReducers.travelHistoryTrackingID,
  );
  const currentIndex: number = useSelector(
    (state: any) => state.MapReducers.travelHistoryIndex,
  );
  const travelHistoryData: TravelHistoryData[] = useSelector(
    (state: any) => state.MapReducers.travelHistoryState,
  );
  const toggleTravelPageVisibility = () => {
    setIsTravelPageVisible(!isTravelPageVisible);
  };
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(-1);
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 600);
  };

  const handleClose = () => {
    dispatch(ActionsCreator.openTravelItinerary(false));
  };

  const handleOpenVideoPopup = () => {
    dispatch(ActionsCreator.openTravelItinerary(false));
    dispatch(ActionsCreator.openVideoPopup(true));
  };

  let departureDateTime: any;
  let arrivalDateTime: any;

  function mapToTravelSchedule(formData: TravelFormData): TravelScheduleProps {
    const { arrival, departure } = formData;

    departureDateTime = departure.dateTime
      ? new Date(departure.dateTime)
      : null;
    arrivalDateTime = arrival.dateTime ? new Date(arrival.dateTime) : null;

    let travelTime = calculateTravelTime(departureDateTime, arrivalDateTime);
    let departureLocation = departure.location ? departure.location : null;
    let arrivalLocation = arrival.location ? arrival.location : null;

    travelTime = calculateTravelTime(departureDateTime, arrivalDateTime);

    departureDateTime = timezoneDate(departureLocation, departureDateTime);
    arrivalDateTime = timezoneDate(arrivalLocation, arrivalDateTime);

    const departureTime = formatTime(departureDateTime);
    const arrivalTime = formatTime(arrivalDateTime);

    return {
      pointAirport: departure.location?.label,
      originAirport: departure.location?.label,
      originCity: departure.location?.city,
      originCountry: departure.location?.country,
      destCity: arrival.location?.city,
      destCountry: arrival.location?.country,
      destAirport: arrival.location?.label,
      departureDate: departureDateTime,
      departureTime: departureTime,
      arrivalDate: arrivalDateTime,
      arrivalTime: arrivalTime,
      travelTime,
      selectedTransport: formData.selectedTransport,
      handleClose: () => {},
    };
  }

  const [travelData, setTravelData] = useState<TravelScheduleProps[]>([]);

  const classes = useStyles();
  // const canvasRef = useRef<HTMLCanvasElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const ctx2 = canvas.getContext('2d');
    const indexSpan = document.getElementById('index');
    const parentCard = document.getElementById('parent-card');

    if (canvas && indexSpan && parentCard) {
      const indexMidY = indexSpan.offsetTop + indexSpan.offsetHeight / 2;
      const parentCardBottom = parentCard.offsetHeight - indexMidY; // Calculate bottom of parent-card

      const divHeight = parentCardBottom - indexMidY;
      const divWidth = indexSpan.clientWidth;

      canvas.height = divHeight + 14;
      canvas.width = 17;

      const drawDashedLine = function (pattern: number[]) {
        if (ctx && ctx2) {
          const canvasMidX = canvas.width / 2;
          const canvasMidY = canvas.height / 2;
          //top circle
          ctx.beginPath();
          ctx.arc(canvasMidX, indexMidY, 7, 0, 2 * Math.PI); // Top dot
          ctx.strokeStyle = '#FE7138';
          ctx.stroke();
          //top dot
          ctx.beginPath(); // Start a new sub-path for the filled circle
          ctx.arc(canvasMidX, indexMidY, 4, 0, 2 * Math.PI); // Top dot
          ctx.fillStyle = '#FE7138';
          ctx.fill();
          //bottom circle
          ctx.beginPath();
          ctx.arc(canvasMidX, parentCardBottom - 10, 7, 0, 2 * Math.PI); // Bottom dot
          ctx.strokeStyle = '#FE7138';
          ctx.stroke();
          //bottom dot
          ctx.beginPath();
          ctx.arc(canvasMidX, parentCardBottom - 10, 5, 0, 2 * Math.PI); // Bottom dot
          ctx.fillStyle = '#FE7138';
          ctx.fill();

          //dashed line
          ctx.beginPath();
          ctx.arc(canvasMidX, indexMidY, 4, 0, 2 * Math.PI); // Top dot
          ctx.fillStyle = '#FE7138';
          ctx.fill();
          ctx.setLineDash(pattern);
          ctx.strokeStyle = '#FE7138'; // Set the color of the dashed line
          ctx.beginPath();
          ctx.moveTo(canvasMidX, indexMidY); // Move the starting point to the center of the canvas
          ctx.lineTo(canvasMidX, parentCardBottom); // Draw a vertical line to the bottom of the parent-card
          ctx.stroke();

          // Draw dots on top and bottom of the dashed line
        }
      };

      // Initial draw of dashed lines
      drawDashedLine([5, 5]);
      return () => {
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      };
      // Redraw your dashed lines or any other content here if needed
    }
  }, [travelData]);

  useEffect(() => {
    const travelSchedulePropsArray = mapArrayToTravelSchedule(travelPoints);
    setTravelData(travelSchedulePropsArray);

    function mapArrayToTravelSchedule(
      formDataArray: TravelFormData[],
    ): TravelScheduleProps[] {
      return formDataArray.map(mapToTravelSchedule);
    }
  }, [travelPoints]);

  const addTravelSchedule = () => {
    if (travelPoints.length > 0) {
      dispatch(ActionsCreator.setIsEditingTravelForm(false));
      dispatch(ActionsCreator.setIndexForModifyTravelForm(travelPoints.length));
      dispatch(ActionsCreator.openModifyTravelForm(true));
      dispatch(ActionsCreator.setTravelFormSaveState(false));
      dispatch(ActionsCreator.setDisabledState(true));
    } else if (travelPoints.length === 0) {
      dispatch(ActionsCreator.openTravelForm(true));
    }
    handleClose(); // Close the menu
  };

  const addTravelPointAtStart = () => {
    if (travelPoints.length > 0) {
      dispatch(ActionsCreator.setIsEditingTravelForm(true));
      dispatch(ActionsCreator.setIndexForModifyTravelForm(-1));
      dispatch(ActionsCreator.openModifyTravelForm(true));
      dispatch(ActionsCreator.setTravelFormSaveState(false));
      dispatch(ActionsCreator.setDisabledState(true));
    } else if (travelPoints.length === 0) {
      dispatch(ActionsCreator.openTravelForm(true));
    }
    handleClose(); // Close the menu
  };

  useEffect(() => {
    const handleResize = () => {
      setOpenedInMobileMode(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleEditClick = (index: number) => {
    dispatch(ActionsCreator.setIndexForModifyTravelForm(index));
    dispatch(ActionsCreator.setTravelFormSaveState(false));
    dispatch(ActionsCreator.openModifyTravelForm(true));
    dispatch(ActionsCreator.setIsEditingTravelForm(true));
    handleClose();
  };

  const handleDeleteClick = (index: number) => {
    deleteObjectFromArray(index);
    if (travelPoints.length === 1) {
      dispatch(ActionsCreator.setTravelFormSaveState(false));
    }
  };

  function deleteObjectFromArray(index: number) {
    const updatedTravelPoints = [...travelPoints];
    updatedTravelPoints.splice(index, 1);

    if (updatedTravelPoints.length > 1) {
    }
    if (travelHistoryData.length > 0 && currentHistoryID !== -1) {
      if (travelHistoryData[currentIndex].id === currentHistoryID) {
        if (travelHistoryData[currentIndex].travelPoints.length > 1) {
          ActionsCreator.updateTravelToHistoryAndDispatch(
            updatedTravelPoints,
            currentHistoryID,
          )
            .then((data) => {
              console.log('Update successful:', data);
              dispatch(ActionsCreator.setTravelHistoryIndex(0));
            })
            .catch((error) => {
              // Handle error with the 'error' returned
              console.error('Error:', error);
            });
        } else {
          ActionsCreator.deleteTravelToHistoryAndDispatch(currentHistoryID)
            .then((data) => {
              console.log('Delete successful:', data);
            })
            .catch((error) => {
              // Handle error with the 'error' returned
              console.error('Error:', error);
            });
        }

        // Update existing travel history
      }
    }
    dispatch(
      ActionsCreator.updateTravelPoints(
        updatedTravelPoints as TravelFormData[],
      ),
    );
  }

  return (
    <div>
      <Box
        className={
          openedInMobileMode
            ? classes.mobileContainerStyle
            : classes.containerStyle
        }
        top="0"
        right="0"
        bgcolor="#ffffff"
        display="flex"
        flexDirection="column"
        padding="20px"
      >
        <Button
          onClick={toggleTravelPageVisibility}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 2, // Ensure the button is on top of the content
          }}
        ></Button>
        <Typography
          className={classes.title}
          // variant="h5"
        >
          Travel Itinerary
        </Typography>
        <img
          src="icons/cross.svg"
          alt="cancel"
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            padding: '24px',
            cursor: 'pointer',
          }}
          onClick={handleClose}
        />

        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            flexDirection: 'column',
            display: 'flex',
          }}
        >
          <div
            id="parent-card"
            style={{ display: 'inline-block', position: 'relative' }}
          >
            <canvas
              ref={canvasRef}
              width={4}
              height="100%"
              style={{ position: 'absolute' }}
            />
            {travelData.map((travel, index) => (
              <div
                id="carddiv"
                key={index}
                style={{
                  marginLeft: '25px',
                  marginBottom: '25px',
                  fontFamily: 'Futura Hv BT',
                  position: 'relative',
                }}
              >
                <EditMenu
                  index={index}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                  travelPoints={travelPoints}
                />
                <span id="index" className={classes.indexnumber}>
                  {index + 1}
                  {getSuffix(index)}
                </span>
                <Typography className={classes.fromtext}>
                  From {travel.originCity} to {travel.destCity}
                </Typography>
                <ScheduleSection {...travel} />

                <Divider
                  id="divider"
                  sx={{ bgcolor: 'gray', marginTop: '25px' }}
                />
              </div>
            ))}
          </div>
        </div>

        <Grid container spacing={1}>
          <Grid item xs={6} md={6}>
            <Button
              className={classes.bottombutton1}
              variant="contained"
              onClick={addTravelPointAtStart}
            >
              Add another point at the start
            </Button>
          </Grid>
          <Grid item xs={6} md={6}>
            <Button
              className={classes.bottombutton1}
              variant="contained"
              onClick={addTravelSchedule}
            >
              Add another point at the end
            </Button>
          </Grid>
        </Grid>
        <Button
          className={classes.bottombutton2}
          onClick={handleOpenVideoPopup}
          variant="contained"
        >
          Generate Video Preview
        </Button>
      </Box>
    </div>
  );
}
