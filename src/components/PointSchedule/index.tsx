import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ScheduleSection from '~/components/ScheduleSection';
import useStyles from './styles';
import { useDispatch } from '~/redux/store';
import ActionsCreator from '~redux/actions';
import { Box } from '@mui/material';
import { TravelFormData } from '~/utility/models';
import { calculateTravelTime, formatTime, timezoneDate } from '~/utility/utils';

interface PointScheduleProps {
  travelData?: TravelFormData[];
  currentPointAirport?: string;
  currentPointCity?: string;
  currentPointCountry?: string;
  currentPointCategory?: string;
  handleClose?: () => void;
}

const PointSchedule = (props: PointScheduleProps) => {
  const dispatch = useDispatch();

  // const handleMenuItemClick = () => {
  //   handleOpenModifyTravelForm();
  //   handleClose(); // Close the menu
  // };
  const handleClose = () => {
    dispatch(ActionsCreator.openTravelItinerary(false));
  };
  // const handleOpenModifyTravelForm = () => {
  //   dispatch(ActionsCreator.openModifyTravelForm(true));
  // };

  const handleItineraryPopUp = () => {
    dispatch(ActionsCreator.openTravelItinerary(true));
    dispatch(ActionsCreator.setScheduleSectionState(true));
    dispatch(ActionsCreator.openPopUP(false));
  };

  const classes = useStyles();

  const useCustomProps = props.travelData !== undefined;

  const sampleProps = {
    currentPointAirport: 'Default Current Airport',
    currentPointCity: 'Default Current City',
    currentPointCountry: 'Default Current Country',
    originAirport: 'Default Departure Airport',
    originCity: 'New York City',
    originCountry: 'USA',
    destAirport: 'Default Arrival Airport',
    destCity: 'Paris',
    destCountry: 'France',
    departureDate: new Date('2023-10-25'),
    departureTime: '09:00 AM',
    arrivalDate: new Date('2023-10-25'),
    arrivalTime: '22:00 PM',
    travelTime: '6hrs 23min',
    selectedTransport: 'Car',
    disabled: false,
    handleClose: () => {}, // Placeholder function
  };

  let travelTime = '';
  let departureDateTime: Date | null | undefined;
  let arrivalDateTime: Date | null | undefined;
  let departureTime: string;
  let arrivalTime: string;
  let departureLocation: any;
  let arrivalLocation: any;

  // if (props.travelData) {
  //   departureDateTime = props.travelData.departure.dateTime
  //     ? new Date(props.travelData.departure.dateTime)
  //     : null;
  //   arrivalDateTime = props.travelData.arrival.dateTime
  //     ? new Date(props.travelData.arrival.dateTime)
  //     : null;

  //   travelTime = calculateTravelTime(departureDateTime, arrivalDateTime);
  //   departureTime = formatTime(departureDateTime);
  //   arrivalTime = formatTime(arrivalDateTime);
  // }

  // const customProps = useCustomProps
  // ? {
  //     currentPointAirport:
  //       props.currentPointAirport ||
  //       'Default Departure Airport',
  //     currentPointCity: props.currentPointData?.location?.city || '',
  //     currentPointCountry: props.currentPointData?.location?.country || '',
  //     originAirport:
  //       props.travelData.departure.location?.label ||
  //       'Default Departure Airport',
  //     originCity: props.travelData.departure.location?.city || '',
  //     originCountry: props.travelData.departure.location?.country || '',
  //     destAirport:
  //       props.travelData.arrival.location?.label || 'Default Arrival Airport',
  //     destCity: props.travelData.arrival.location?.city || '',
  //     destCountry: props.travelData.arrival.location?.country || '',
  //     departureDate: departureDateTime,
  //     departureTime: departureTime,
  //     arrivalDate: arrivalDateTime,
  //     arrivalTime: arrivalTime,
  //     travelTime: travelTime,
  //     disabled: false,
  //     handleClose: handleClose,
  //   }
  // : sampleProps;

  const scheduleSectionPropsArray = props.travelData?.map(
    (travelData, index) => {
      if (travelData) {
        departureDateTime = travelData.departure.dateTime
          ? new Date(travelData.departure.dateTime)
          : null;
        arrivalDateTime = travelData.arrival.dateTime
          ? new Date(travelData.arrival.dateTime)
          : null;

        departureLocation = travelData.departure.location
          ? travelData.departure.location
          : null;
        arrivalLocation = travelData.arrival.location
          ? travelData.arrival.location
          : null;

        travelTime = calculateTravelTime(departureDateTime, arrivalDateTime);

        departureDateTime = timezoneDate(departureLocation, departureDateTime);
        arrivalDateTime = timezoneDate(arrivalLocation, arrivalDateTime);

        departureTime = formatTime(departureDateTime);
        arrivalTime = formatTime(arrivalDateTime);
      }
      const customProps = useCustomProps
        ? {
            currentPointAirport:
              props.currentPointAirport || 'Default Departure Airport',
            currentPointCity: props.currentPointCity || '',
            currentPointCountry: props.currentPointCountry || '',
            originAirport:
              travelData.departure.location?.label ||
              'Default Departure Airport',
            originCity: travelData.departure.location?.city || '',
            originCountry: travelData.departure.location?.country || '',
            destAirport:
              travelData.arrival.location?.label || 'Default Arrival Airport',
            destCity: travelData.arrival.location?.city || '',
            destCountry: travelData.arrival.location?.country || '',
            departureDate: departureDateTime,
            departureTime: departureTime,
            arrivalDate: arrivalDateTime,
            arrivalTime: arrivalTime,
            travelTime: travelTime,
            selectedTransport: travelData.selectedTransport,
            disabled: false,
            handleClose: handleClose,
          }
        : sampleProps;

      return customProps;
    },
  );

  return (
    <div>
      <Box className={classes.pointDetail}>
        <Grid container>
          <img
            src="icons/cross.svg"
            alt="cancel"
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              padding: '24px',
            }}
            onClick={props.handleClose}
          />
          <Grid item xs={6}>
            <Typography variant="h4" className={classes.airportName}>
              {props.currentPointAirport}
            </Typography>
            <Typography variant="h6" className={classes.location}>
              <img
                src="icons/marker.svg"
                alt="Marker"
                className={classes.marker1}
              ></img>
              {props.currentPointCountry} - {props.currentPointCity}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button className={classes.button1}>
              {props.currentPointCategory}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.subheading}>
              Travel Associated with this Point
            </Typography>
          </Grid>
          <Grid padding={0} className={classes.gridContainer}>
            {scheduleSectionPropsArray?.map((customProps, index) => (
              <Grid item xs={12} marginBottom={2} key={index}>
                <ScheduleSection {...customProps} />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Button className={classes.button3} onClick={handleItineraryPopUp}>
              View Current Itinerary
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default PointSchedule;
