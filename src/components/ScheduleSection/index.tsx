import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useStyles from './styles';
import { useSelector } from '~/redux/reducers';

interface ScheduleSectionProps {
  currentPointAirport?: string;
  currentPointCity?: string;
  currentPointCountry?: string;
  originAirport?: string;
  originCity?: string;
  originCountry?: string;
  destAirport?: string;
  destCity?: string;
  destCountry?: string;
  departureDate?: Date | null;
  departureTime?: string;
  arrivalDate?: Date | null;
  arrivalTime?: string;
  travelTime?: string;
  selectedTransport: string;
  disabled?: boolean;
  handleClose?: () => void;
}

const ScheduleSection = (props: ScheduleSectionProps) => {
  const scheduleSectionState = useSelector(
    (state: any) => state.MapReducers.scheduleSectionState,
  );

  const classes = useStyles({ scheduleSectionState });
  return (
    <div>
      <Grid container className={classes.containerComp}>
        <Grid item xs={4}>
          <Typography variant="h6" className={classes.text}>
            {props.originCity}
            <br />
            {props.originCountry}
            <br />
            {props.originAirport}
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center', margin: 'auto' }}>
          <img
            src={
              props.selectedTransport === 'Car'
                ? 'icons/carTravel.svg'
                : 'icons/flight.svg'
            }
            alt="flight"
            className={classes.flight}
          ></img>
          <br />
          <Typography variant="h6" className={classes.traveltime}>
            {props.travelTime}
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'right' }}>
          <Typography variant="h6" className={classes.text}>
            {props.destCity}
            <br />
            {props.destCountry}
            <br />
            {props.destAirport}
          </Typography>
        </Grid>
        <hr className={classes.line}></hr>

        <Grid item xs={4.5}>
          <Typography
            variant="h6"
            sx={{ fontSize: '10px' }}
            className={classes.text}
          >
            {props.departureDate!.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
            <br />
            {props.departureTime} (local time) 
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'center', margin: 'auto' }}>
          <img
            src="icons/clock2.svg"
            alt="clock"
            className={classes.clock2}
          ></img>
        </Grid>
        <Grid item xs={4.5} sx={{ textAlign: 'right' }}>
          <Typography variant="h6" className={classes.text}>
            {props.arrivalDate!.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
            <br />
            (local time) {props.arrivalTime} 
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default ScheduleSection;
