import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useStyles from './styles';
import { Typography } from '@mui/material';
import { useSelector } from '~/redux/reducers';
import { CircularProgress } from '@mui/material';
import { TravelFormData, TravelHistoryData } from '~/utility/models';
import Divider from '@mui/material/Divider';
import HistoryCard from './HistoryCard';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { useDispatch } from '~redux/store';
import ActionsCreator from '~redux/actions';
import {
  deleteTravelHistory,
  getTravelHistory,
} from '~/supabase/travelHistoryTracking';
import {
  calculateTravelTime,
  formatTime,
  // setUserIDFromTokenStorage,
} from '~/utility/utils';
import { useNavigate } from 'react-router-dom';
import { timezoneDate } from '~/utility/utils';
// import { useAuth } from '~/context/AuthProvider';
interface HistoryCardProps {
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

interface HistoryPageProps {
  handleClose: () => void;
}

const HistoryPage = (props: HistoryPageProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const mainContainerRef = useRef<any>(null);
  const gridContainerRef = useRef<any>(null);

  const travelHistory: TravelHistoryData[] = useSelector(
    (state: any) => state.MapReducers.travelHistoryState,
  );

  const [travelDataArray, setTravelDataArray] = useState<HistoryCardProps[]>(
    [],
  );

  const userID: string = useSelector((state: any) => state.MapReducers.userID);

  useEffect(() => {
    getTravelHistory(userID).then((result) => {
      setLoading(false); // Show the loader

      if (result.error) {
        // Handle the error if needed
        console.error('Error adding to travel history:', result.error);
      } else {
        // The operation was successful
        console.log('Data added to travel history:', result.data);

        const travelHistory = result.data?.filter((travelHistoryData) => {
          const firstEntry = travelHistoryData.travelPoints[0];
          const lastEntry =
            travelHistoryData.travelPoints[
              travelHistoryData.travelPoints.length - 1
            ];

          return (
            firstEntry.arrival.location?.placeId &&
            lastEntry.departure.location?.placeId
          );
        });

        dispatch(
          ActionsCreator.saveTravelToHistory(
            travelHistory as TravelHistoryData[],
          ),
        );
      }
    });
  }, [dispatch, userID]);

  useEffect(() => {
    const travelArr = travelHistory.map((travelHistoryData) => {
      const firstEntry = travelHistoryData.travelPoints[0];
      const lastEntry =
        travelHistoryData.travelPoints[
          travelHistoryData.travelPoints.length - 1
        ];

      let travelTime = '';
      let departureDateTime;
      let arrivalDateTime;
      let departureTime;
      let departureLocation;
      let arrivalLocation;
      let arrivalTime;

      departureDateTime = firstEntry.departure.dateTime
        ? new Date(firstEntry.departure.dateTime)
        : null;
      arrivalDateTime = lastEntry.arrival.dateTime
        ? new Date(lastEntry.arrival.dateTime)
        : null;

      departureLocation = firstEntry.departure.location
        ? firstEntry.departure.location
        : null;
      arrivalLocation = lastEntry.arrival.location
        ? lastEntry.arrival.location
        : null;

      travelTime = calculateTravelTime(departureDateTime, arrivalDateTime);

      departureDateTime = timezoneDate(departureLocation, departureDateTime);
      arrivalDateTime = timezoneDate(arrivalLocation, arrivalDateTime);
      departureTime = formatTime(departureDateTime);
      arrivalTime = formatTime(arrivalDateTime);

      return {
        uuid: travelHistoryData.UUID,
        id: travelHistoryData.id,
        originCity: firstEntry.departure.location?.city
          ? firstEntry.departure.location?.city
          : firstEntry.departure.location?.country,
        destCity: lastEntry.arrival.location?.city
          ? lastEntry.arrival.location?.city
          : lastEntry.arrival.location?.country,
        departureDate: departureDateTime,
        departureTime: departureTime,
        arrivalDate: arrivalDateTime,
        arrivalTime: arrivalTime,
        travelTime: travelTime,
      };
    });

    setTravelDataArray(travelArr as HistoryCardProps[]);
  }, [travelHistory]);

  useEffect(() => {
    dispatch(ActionsCreator.setPulishedTravelId(0));
  });

  useEffect(() => {
    const handleResize = () => {
      if (mainContainerRef.current) {
        const mainContainerHeight = mainContainerRef.current.clientHeight;
        const desiredMaxHeight = `calc(87vh - ${mainContainerHeight}px - 20px)`; // Adjust the margin as needed
        if (gridContainerRef.current) {
          gridContainerRef.current.style.maxHeight = desiredMaxHeight;
        }
      }
    };

    // Initial setup
    handleResize();

    // Attach the event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [loading]);

  const handleCloseHistoryPage = () => {
    navigate('/homepage');
    dispatch(ActionsCreator.openHistoryPageState(false));
  };

  const handleDeleteTravel = (uuid: string, id: number, index: number) => {
    deleteTravelHistory(uuid, id);
    const updatedHistory = [...travelDataArray];
    updatedHistory.splice(index, 1);
    setTravelDataArray(updatedHistory);

    const updatedTravelHistory = [...travelHistory];
    updatedTravelHistory.splice(index, 1);
    dispatch(ActionsCreator.saveTravelToHistory(updatedTravelHistory));
  };

  if (loading) {
    return (
      <CircularProgress
        size={40}
        thickness={4}
        style={{ position: 'absolute', top: '50%', left: '50%' }}
      />
    );
  }

  return (
    <Box className={classes.maincontainer}>
      <div className="title" ref={mainContainerRef}>
        <Typography className={classes.title}>History</Typography>
        <Tabs
          className={classes.tabs}
          value={tabValue}
          // onChange={handleTabChange}
          variant="fullWidth"
          sx={{}}
        >
          <Tab className={classes.tab} label="Travel Itineraries" />
          {/* <Tab className={classes.tab} label="Travel Videos" /> */}
        </Tabs>
        <Divider variant="middle" sx={{ bgcolor: 'gray' }} />
        <Button
          className={classes.goBackButton}
          onClick={handleCloseHistoryPage}
        >
          {' '}
          Go Back
        </Button>
      </div>
      <Grid
        container
        ref={gridContainerRef}
        sx={{ overflow: 'auto', maxHeight: '100%', paddingBottom: '45px' }}
        spacing={0}
      >
        {travelDataArray.map((travelData, index) => (
          <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index}>
            <div style={{ margin: '10px' }}>
              <HistoryCard
                travelData={travelData}
                index={index}
                travelHistory={travelHistory}
                handleDeleteTravel={handleDeleteTravel}
              />
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default HistoryPage;
