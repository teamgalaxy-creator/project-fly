import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useDispatch } from '~/redux/store';
import Grid from '@mui/material/Grid';
import DialogContent from '@mui/material/DialogContent';
import useStyles from './styles';
import MapStyles from '~components/MapStyles';
import Drawer from '@mui/material/Drawer';
import TravelPage from '~components/TravelPage';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { TravelFormData, TravelHistoryData } from '~/utility/models';
import { useSelector } from '~/redux/reducers';
import ActionsCreator from '~/redux/actions';
import { Icon } from '@iconify/react';
interface TravelDataProps {
  originCity: string | undefined;
  destCity: string | undefined;
  departureDate: Date | null | undefined;
  departureTime: string;
  arrivalDate: Date | null | undefined;
  arrivalTime: string;
  travelTime: string;
  uuid: string;
  id: number;
}

interface HistoryCardProps {
  travelData: TravelDataProps;
  index: number;
  travelHistory: TravelHistoryData[];
  handleDeleteTravel: (uuid: string, id: number, index: number) => void;
}
const HistoryCard = ({
  travelData,
  index,
  travelHistory,
  handleDeleteTravel,
}: HistoryCardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpenHistory = () => {
    // Convert date and time strings to Date objects
    const updatedTravelPoints = travelHistory[index].travelPoints.map(
      (point) => {
        const arrivalDateTime = point.arrival.dateTime
          ? new Date(point.arrival.dateTime)
          : null;
        const departureDateTime = point.departure.dateTime
          ? new Date(point.departure.dateTime)
          : null;

        return {
          arrival: {
            location: point.arrival.location,
            dateTime: arrivalDateTime,
            category: point.arrival.category,
            timezone: point.arrival.timezone,
          },
          departure: {
            location: point.departure.location,
            dateTime: departureDateTime,
            category: point.departure.category,
            timezone: point.departure.timezone,
          },
          selectedTransport: point.selectedTransport,
          encodedPath: point.encodedPath,
        };
      },
    );
    dispatch(ActionsCreator.addTravelPoint(updatedTravelPoints));
    dispatch(ActionsCreator.setTravelHistoryIndex(index));
    dispatch(ActionsCreator.setTravelHistoryCurrentID(travelHistory[index].id));
    dispatch(ActionsCreator.setTravelFormSaveState(true));
    dispatch(ActionsCreator.setPublishedTravelLink(''));

    ActionsCreator.getPulishedTravelId(travelHistory[index].id);

    navigate('/homepage');
  };

  const handleDelete = () => {
    handleDeleteTravel(travelData.uuid, travelData.id, index);
  };

  const classes = useStyles();

  return (
    <Box className={classes.maincard} sx={{ boxShadow: 1 }}>
      <Grid sx={{ display: 'flex' }}>
        <Grid item xs={11}>
          <Typography className={classes.cardTitle}>
            {travelData.originCity} - {travelData.destCity}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Button
            sx={{ width: '40px', minWidth: '40px', marginBottom: '5px' }}
            // id={`edit-button-${index}`}
            // aria-controls={open ? `edit-menu-${index}` : undefined}
            // aria-haspopup="true"
            // aria-expanded={open ? 'true' : undefined}
            onClick={handleDelete}
          >
            <Icon
              icon="ic:round-delete"
              color="#fe7138"
              width={30}
              height={30}
            />
          </Button>
        </Grid>
      </Grid>
      <Grid sx={{ display: 'flex' }}>
        <Grid item xs={4.5}>
          <Typography variant="h6" className={classes.text}>
            {travelData.departureDate!.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
            <br />
            {travelData.departureTime}
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
            {travelData.arrivalDate!.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
            <br />
            {travelData.arrivalTime}
          </Typography>
        </Grid>
      </Grid>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end', // Spread children evenly
          marginTop: '9px',
        }}
      >
        <Button className={classes.openButton} onClick={handleOpenHistory}>
          Open
        </Button>
      </div>
    </Box>
  );
};
export default HistoryCard;
