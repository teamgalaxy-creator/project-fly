import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useStyles from './styles';
import { CircularProgress, MenuItem, Select, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Fab from '@mui/material/Fab';
import Slider from '@mui/material/Slider';
import AnimationView from '~components/AnimationView';
import { useDispatch } from '~/redux/store';
import ActionsCreator from '~/redux/actions';
import { useSelector } from '~/redux/reducers';
import { TravelFormData, TravelHistoryData } from '~/utility/models';
import LoadingButton from '@mui/lab/LoadingButton';
import { Modal } from '@mui/material';
import { Alert } from '@mui/lab';
import { Icon } from '@iconify/react';
import { CarModels, PlaneModels } from '~/animation_engine/utility/enums';
import { modelConfiguration } from '~/animation_engine/utility/resource.config';
import { useNavigate } from 'react-router-dom';

interface videoPopupProps {
  handleClose: () => void;
}

const CarModelSelector = () => {
  const carModelEnum: string = useSelector(
    (state: any) => state.MapReducers.carModelEnum,
  );
  const [selectedModel, setSelectedModel] = useState(
    carModelEnum ? carModelEnum : 'bluecar',
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleModelChange = (event: any) => {
    dispatch(ActionsCreator.selectCarModel(event.target.value));
    setSelectedModel(event.target.value);
  };

  const menuItemsConfig = Object.values(CarModels)
    .filter((value) => typeof value === 'number')
    .map((value) => {
      const modelEnum = value as CarModels; // Assuming models is your enum
      const config = modelConfiguration[modelEnum];

      if (config && config.UIname && config.name) {
        return { label: config.UIname, value: modelEnum };
      }

      return null;
    })
    .filter(Boolean); // Filter out null values

  // const menuItemsConfig = [
  //   { label: 'Default Car', value: 'car' },
  //   { label: 'SUV Car', value: 'suvCar' },
  // ];

  return (
    <div>
      <Select
        value={selectedModel}
        onChange={handleModelChange}
        displayEmpty
        className={`${classes.selectEmpty} ${classes.carSelector}`}
        inputProps={{ 'aria-label': 'Select car Model' }}
      >
        {menuItemsConfig.map((item) => (
          <MenuItem
            className={classes.selectItem}
            key={item?.value}
            value={item?.value}
          >
            {item?.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
const PlaneModelSelector = () => {
  const planeModelEnum: string = useSelector(
    (state: any) => state.MapReducers.planeModelEnum,
  );
  const [selectedModel, setSelectedModel] = useState(planeModelEnum);

  console.log(planeModelEnum, selectedModel);

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleModelChange = (event: any) => {
    dispatch(ActionsCreator.selectPlaneModel(event.target.value));
    setSelectedModel(event.target.value);
  };

  // const menuItemsConfig = [
  //   { label: 'Default Plane', value: 'egypt plane' },
  //   { label: 'Classic Plane', value: 'milad plane' },
  //   { label: 'Aqua Plane', value: 'airbus318_aqua' },
  //   { label: 'Blue Plane', value: 'airbus318_blue' },
  //   { label: 'Cyan Plane', value: 'airbus318_cyan' },
  //   { label: 'Lemon Plane', value: 'airbus318_lemon' },
  //   { label: 'Orange Plane', value: 'airbus318_orange' },
  //   { label: 'Pink Plane', value: 'airbus318_pink' },
  //   { label: 'Purple Plane', value: 'airbus318_purple' },
  //   { label: 'Red Plane', value: 'airbus318_red' },
  //   { label: 'White Plane', value: 'airbus318_white' },
  //   { label: 'Yellow Plane', value: 'airbus318_yellow' },
  // ];

  const menuItemsConfig = Object.values(PlaneModels)
    .filter((value) => typeof value === 'number')
    .map((value) => {
      const modelEnum = value as PlaneModels; // Assuming models is your enum
      const config = modelConfiguration[modelEnum];

      if (config && config.UIname && config.name) {
        return { label: config.UIname, value: modelEnum };
      }

      return null;
    })
    .filter(Boolean); // Filter out null values

  return (
    <div>
      <Select
        value={selectedModel}
        onChange={handleModelChange}
        displayEmpty
        className={`${classes.selectEmpty} ${classes.planeSelector}`}
        MenuProps={{
          classes: {
            paper: classes.paper,
          },
        }}
        inputProps={{
          classes: {
            root: classes.input,
          },
        }}
      >
        {menuItemsConfig.map((item) => (
          <MenuItem
            className={classes.selectItem}
            key={item?.value}
            value={item?.value}
          >
            {item?.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

const FullScreenModal = ({ onClose }: any) => {
  const classes = useStyles();
  const fullscreenMode: boolean = useSelector(
    (state: any) => state.MapReducers.fullscreenMode,
  );

  return (
    <Modal open={fullscreenMode} onClose={onClose}>
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          // paddingBottom: '56.25%',
          backgroundColor: 'white',
        }}
      >
        <AnimationView isVideoPopupMap={false} />
        {/* <Button onClick={() => setIsFullScreen(false)}>
          {isOpen ? 'Exit Full Screen' : 'Full Screen'}
        </Button> */}
        <Fab
          className={classes.topRightFab}
          color="primary"
          aria-label="Add"
          onClick={() => onClose()}
        >
          <Icon
            icon="tdesign:fullscreen-exit"
            color="black"
            width="40"
            height="40"
          />
        </Fab>
        <Box className={classes.watermarkFullscreen}>
            <img src="/logoVizualTravel.svg" alt="Logo" />
          </Box>
      </Box>
    </Modal>
  );
};

const VideoPopup = (props: videoPopupProps) => {
  const classes = useStyles();

  //const [videoLength, setVideoLength] = useState(5); // Initial value for video length slider
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccessMessage] = useState('');

  const state: TravelHistoryData[] = useSelector(
    (state: any) => state.MapReducers.travelHistoryState,
  );

  const fullscreenMode: boolean = useSelector(
    (state: any) => state.MapReducers.fullscreenMode,
  );

  const travelHistory = useRef<TravelHistoryData[]>(state);

  // const [historyData, setTravelHistory] =
  //   useState<{ pointsArray: TravelFormData[] }[]>(state);

  const travelArray: TravelFormData[] = useSelector(
    (state: any) => state.MapReducers.pointsArray,
  );

  const isRecording: boolean = useSelector(
    (state: any) => state.MapReducers.isRecording,
  );

  const index: number = useSelector(
    (state: any) => state.MapReducers.travelHistoryIndex,
  );

  const currentHistoryID: number = useSelector(
    (state: any) => state.MapReducers.travelHistoryTrackingID,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');

  const publishID: number = useSelector(
    (state: any) => state.MapReducers.publishID,
  );

  const handleOpenMapTypes = () => {
    dispatch(ActionsCreator.openMapCustomizationPopup(true));
  };

  const baseUrl = window.location.origin;

  const openSnackbar = () => {
    setSnackbarOpen(true);
  };
  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };
  const handleSaveAnimation = () => {
    dispatch(ActionsCreator.setIsAnimationCapture(false));
    // setLoading(true);
    // if (state.length > 0 && currentHistoryID !== -1) {
    //   // Show the loader
    //   if (state[index].id === currentHistoryID) {
    //     updateTravelHistoryById(travelArray, currentHistoryID).then(
    //       (result) => {
    //         setLoading(false); // Hide the loader

    //         if (result.error) {
    //           console.error('Error updating to travel history:', result.error);
    //         } else {
    //           // The operation was successful
    //           console.log('Data updating to travel history:', result.data);
    //           setSuccessMessage('Data updated to travel history');
    //           // let updatedTravelHistory: TravelHistoryData[] = [];
    //           // if (travelHistory.current.length > 0 && travelHistory.current[index]) {
    //           //   updatedTravelHistory = travelHistory.current.map((item, i) => {
    //           //     if (i === index) {
    //           //       return travelArray;
    //           //     }
    //           //     return item;
    //           //   });
    //           // } else {
    //           //   updatedTravelHistory = [...travelHistory.current, travelArray];
    //           // }

    //           dispatch(
    //             ActionsCreator.saveTravelToHistory(
    //               result.data as TravelHistoryData[],
    //             ),
    //           );

    //           dispatch(
    //             ActionsCreator.setTravelHistoryCurrentID(result.data?.[0].id),
    //           );
    //           openSnackbar();
    //         }
    //       },
    //     );

    //     return;
    //   }
    // }

    // addtoTravelHistory(travelArray, user.email).then((result) => {
    //   setLoading(false); // Hide the loader

    //   if (result.error) {
    //     // Handle the error if needed
    //     console.error('Error adding to travel history:', result.error);
    //   } else {
    //     // The operation was successful
    //     console.log('Data added to travel history:', result.data);
    //     setSuccessMessage('Data added to travel history');

    //     // let updatedTravelHistory: TravelHistoryData[] = [];
    //     // if (travelHistory.current.length > 0 && travelHistory.current[index]) {
    //     //   updatedTravelHistory = travelHistory.current.map((item, i) => {
    //     //     if (i === index) {
    //     //       return travelArray;
    //     //     }
    //     //     return item;
    //     //   });
    //     // } else {
    //     //   updatedTravelHistory = [...travelHistory.current, travelArray];
    //     // }

    //     dispatch(
    //       ActionsCreator.saveTravelToHistory(
    //         result.data as TravelHistoryData[],
    //       ),
    //     );

    //     dispatch(ActionsCreator.setTravelHistoryCurrentID(result.data?.[0].id));
    //     openSnackbar();
    //   }
    // });

    // dispatch(ActionsCreator.startRecording(false));
    // dispatch(ActionsCreator.stopRecording(true));
  };

  function encodeTourID(tourID: number) {
    const encodedTourID = tourID * 9 + 100010;
    return encodedTourID;
  }

  const planeModelEnum: string = useSelector(
    (state: any) => state.MapReducers.planeModelEnum,
  );

  const carModelEnum: string = useSelector(
    (state: any) => state.MapReducers.carModelEnum,
  );

  const videoLength: any = useSelector(
    (state: any) => state.MapReducers.videoLength,
  );

  const modelSize: any = useSelector(
    (state: any) => state.MapReducers.modelSize,
  );

  const [videoSpeedState, setVideoSpeed] = useState(videoLength); // Initial value for video Speed
  const [modelSizeState, setModelSize] = useState(modelSize); // Initial value for modal size slider

  const mapStyleIndex: any = useSelector(
    (state: any) => state.MapReducers.mapStyleIndex,
  );

  const link = useRef('');

  // useEffect(() => {
  //   if (publishID) {
  //     const hashedTourID = encodeTourID(publishID);

  //     link.current = `${baseUrl}/viewtravel?tourID=${hashedTourID}`;

  //     console.log(link.current);

  //     dispatch(ActionsCreator.setPublishedTravelLink(link.current));
  //   }
  // }, [baseUrl, publishID]);

  const handlePublishButtonClick = async () => {
    if (travelArray) {
      setLoading(true);

      ActionsCreator.publishTravelPoints(
        travelArray,
        userId,
        currentHistoryID,
        planeModelEnum,
        carModelEnum,
        videoLength,
        modelSize,
        mapStyleIndex,
      )
        .then((data: any) => {
          setLoading(false);

          const hashedTourID = encodeTourID(data[0].id);

          link.current = `${baseUrl}/viewtravel?tourID=${hashedTourID}`;

          dispatch(ActionsCreator.setPublishedTravelLink(link.current));

          console.log('Operation successful:', data[0]);

          setSuccessMessage(`Updated Successfully: ${link.current}`);
          setSnackbarOpen(true);

          setTimeout(() => {
            dispatch(ActionsCreator.showSharePopup(true));
          }, 1000);
        })
        .catch((error) => {
          // Handle error with the 'error' returned
          console.error('Error:', error);
        });
    }
  };

  const handleFullScreenToggle = () => {
    if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .then(() => console.log('Document Exited from Full screen mode'))
        .catch((err) => console.error(err));
    } else {
      if (document.documentElement.requestFullscreen)
        document.documentElement.requestFullscreen();
    }
    // if (!isRecording)
    dispatch(ActionsCreator.setFullscreenAnimationMode(!fullscreenMode));
  };

  return (
    <>
      <Box className={classes.maincontainer}>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert variant="filled" severity="success">
            {success}.
          </Alert>
        </Snackbar>

        <Typography className={classes.title}>Preview Animation</Typography>
        <img
          src="icons/cross.svg"
          alt="cancel"
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            padding: '18px',
            cursor: 'pointer',
          }}
          onClick={props.handleClose}
        />
        <div className={classes.mapSnapshot}>
          <div>
            {!fullscreenMode ? (
              <AnimationView isVideoPopupMap={false}></AnimationView>
            ) : (
              <FullScreenModal onClose={handleFullScreenToggle} />
            )}
          </div>
          <Box
            className={
              fullscreenMode ? classes.watermarkFullscreen : classes.watermark
            }
          >
            <img src="/logoVizualTravel.svg" alt="Logo" />
          </Box>
          <Button
            className={classes.bottomRightButton}
            onClick={handleOpenMapTypes}
          >
            Change Map Style
          </Button>
          <Fab
            className={classes.topRightFab}
            color="primary"
            aria-label="Add"
            onClick={handleFullScreenToggle}
          >
            <Icon
              className={classes.fullscreenIcon}
              icon="material-symbols:fullscreen"
              color="black"
              // width="40"
              // height="40"
            />
          </Fab>
          <Box className={classes.selectorContainer}>
            <PlaneModelSelector />
            <CarModelSelector />
          </Box>
          {/* <Box sx={{ width:'153px',position:'absolute',bottom:'10px',left:'8px'}}>
              <img src="/logoVizualTravel.svg" alt="Logo" />
            </Box> */}
          {/* {link.current && (
            <Fab
              className={classes.bottomLeftFab}
              color="primary"
              aria-label="Add"
              onClick={() => dispatch(ActionsCreator.showSharePopup(true))}
              disabled={link.current ? false : true}
            >
              <Icon icon="mi:share" color="#fe7138" width="30" height="30" />
            </Fab>
          )} */}

          {/* <Typography>asdasd</Typography> */}
        </div>
        <Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography className={classes.sliderName1}>Video Speed</Typography>
            <Typography
              className={classes.sliderName1}
            >{`${videoSpeedState}x`}</Typography>
          </Box>
          <Slider
            classes={{ thumb: classes.customThumb }}
            aria-label="Video Length"
            value={videoSpeedState}
            onChange={(e, value) => setVideoSpeed(value as number)}
            onChangeCommitted={(e, value) => {
              setVideoSpeed(value as number);
              dispatch(ActionsCreator.setVideoLength(value as number));
            }}
            color="primary"
            valueLabelDisplay="off"
            min={0.25}
            max={2} //travelArray.length * 10
            disabled={isRecording}
            step={0.25}
          />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography className={classes.sliderName2}>Model Size</Typography>
            <Typography
              className={classes.sliderName2}
            >{`${modelSizeState}x`}</Typography>
          </Box>
          <Slider
            classes={{ thumb: classes.customThumb }}
            aria-label="Model Size"
            value={modelSizeState}
            onChange={(e, value) => setModelSize(value as number)}
            onChangeCommitted={(e, value) => {
              dispatch(ActionsCreator.setModelSize(value as number));
            }}
            color="primary"
            valueLabelDisplay="off"
            step={0.25}
            min={0.25}
            disabled={isRecording}
            max={2}
          />
        </Box>
        <Box
          sx={{
            marginTop: '15px',
            marginBottom: '10px',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' }, // Column for mobile, Row for desktop
            justifyContent: 'space-between',
          }}
        >
          <LoadingButton
            key={index}
            loading={loading}
            disabled={loading || travelArray.length === 0}
            size="large"
            variant="contained"
            className={classes.bottombutton1}
            sx={{
              fontFamily: 'Futura Bold Italic',
            }}
            onClick={handlePublishButtonClick}
          >
            Publish
          </LoadingButton>
        </Box>
      </Box>
    </>
  );
};
export default VideoPopup;
