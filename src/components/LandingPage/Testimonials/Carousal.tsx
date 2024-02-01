import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { Avatar, Rating } from '@mui/material';

const Carousal = () => {
  const classes = useStyles();
  const mobileSize = 768;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= mobileSize);
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
    <div className={classes.carousalBox}>
      {/* Carousal Card */}
      <div className={classes.card}>
        <div className={classes.avatarOuterRing}>
          <div className={classes.avatarInnerRing}>
            <Avatar
              alt="Remy Sharp"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              className={classes.authorProfilePic}
            />
          </div>
        </div>
        <p className={classes.text}>
          Using this travel itinerary app was a game-changer for my trip! It
          effortlessly organized every detail, from flights to activities. I was
          able to explore without the stress of planning, and the real-time
          updates kept me in the know.{!isMobile && <br />} Highly recommended
          for anyone seeking a seamless and enriching travel experience.
        </p>
        <div className={classes.authorInfoContianer}>
          <div>
            <div className={classes.author}>Luke Shaw</div>
            <div className={classes.authorRole}>Explorer</div>
          </div>
          <Rating
            name="read-only"
            style={{ width: '126px', height: '22px', color: '#F9C234' }}
            value={5}
            readOnly
          />
        </div>
        <div className={classes.leftArrowButton}>
          <img src="/icons/arrow-left.svg" alt="Move Left" />
        </div>
        <div className={classes.rightArrowButton}>
          <img src="/icons/arrow-right.svg" alt="Move Right" />
        </div>
      </div>

      {/* Carousal Navigation Dots */}
      <div className={classes.carousalDotContainer}>
        <div className={classes.carousalDot}></div>
        <div className={classes.carousalDot}></div>
        <div className={`${classes.carousalDot} active`}></div>
        <div className={classes.carousalDot}></div>
        <div className={classes.carousalDot}></div>
      </div>
    </div>
  );
};

export default Carousal;
