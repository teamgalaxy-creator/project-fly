import React, { useState } from 'react';
import useStyles from './styles';
import { Icon } from '@iconify/react';
import { useDispatch } from '~/redux/store';
import ActionsCreator from '~/redux/actions';
import { useSelector } from '~/redux/reducers';
import { TravelFormData } from '~/utility/models';
import { Fab, Typography } from '@mui/material';
import { Button } from 'react-bootstrap';
import './animatedButton.css';

const VideoControls: React.FC = () => {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(true);
  let timeoutId: NodeJS.Timeout;
  const dispatch = useDispatch();

  let currentTravelIndex = useSelector(
    (state) => state.AnimationReducers.currentTravelIndex,
  );

  let playPauseState = useSelector(
    (state) => state.AnimationReducers.playPauseState,
  );

  const travelArray: TravelFormData[] = useSelector(
    (state: any) => state.MapReducers.pointsArray,
  );

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  const handleMouseMove = () => {
    clearTimeout(timeoutId);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  const handlePlay = () => {
    // Add your play logic here
    // if (document.fullscreenElement) {
    //   document
    //     .exitFullscreen()
    //     .then(() => console.log('Document Exited from Full screen mode'))
    //     .catch((err) => console.error(err));
    // } else {
    //   // document.documentElement.requestFullscreen();
    // }
    dispatch(ActionsCreator.setPlayPauseState(!playPauseState));
  };

  const handlePrevious = () => {
    if (currentTravelIndex === 0)
      dispatch(ActionsCreator.setCurrentTravelIndex(travelArray.length - 1));
    else
      dispatch(ActionsCreator.setCurrentTravelIndex((currentTravelIndex -= 1)));
    // Add your previous logic here
  };

  const handleNext = () => {
    // Add your next logic here
    if (currentTravelIndex === travelArray.length - 1)
      dispatch(ActionsCreator.setCurrentTravelIndex(0));
    else
      dispatch(ActionsCreator.setCurrentTravelIndex((currentTravelIndex += 1)));
  };

  return (
    <div
      className={classes.overlay}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      // onMouseMove={handleMouseMove}
    >
      <div
        className={`${classes.videoControls} ${
          isVisible ? classes.visible : ''
        }`}
      >
        {/* <Fab className={`${classes.fab}`} onClick={handlePrevious}>
          <Icon
            icon="fluent:previous-48-filled"
            color="#fe7138"
            width="20"
            height="20"
          />
        </Fab> */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div>
            <a className="play-btn" href="#" onClick={handlePlay}></a>
          </div>
          {/* <Fab className={`${classes.fab}`}>
            <Icon
              icon="fluent:play-16-filled"
              color="white"
              width="70"
              height="70"
              onClick={handlePlay}
            />
          </Fab> */}
          {/* <Typography variant="h5" style={{ fontFamily: 'Futura Md BT' }}>
            Watch Preview of Trip
          </Typography> */}
        </div>
        {/* <Fab className={`${classes.fab}`} onClick={handleNext}>
          <Icon
            icon="fluent:next-48-filled"
            color="#fe7138"
            width="20"
            height="20"
          />
        </Fab> */}
      </div>
    </div>
  );
};

export default VideoControls;
