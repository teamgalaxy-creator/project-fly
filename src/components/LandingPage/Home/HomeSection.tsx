import { Box, Button } from '@mui/material';
import useStyles from './styles';
import { Ref, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import YouTube, { YouTubeProps } from 'react-youtube';

interface HomeSectionProps {
  homeRef: Ref<HTMLElement>;
  mainContainerRef: HTMLDivElement;
}

const HomeSection = ({ homeRef, mainContainerRef }: HomeSectionProps) => {
  const mobileSize = 768;
  const classes = useStyles();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);
  const videoRef = useRef<HTMLDivElement>(null);
  const videoUrl =
    'https://www.youtube.com/embed/i2txsMJ2jts?si=jNWQEF8CD-FfjEeX';
  const [player, setPlayer] = useState<any | null>(null);

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

  const handleVideoReady = (e: any) => {
    setPlayer(e.target);
  };

  const handleClickWatchDemo = () => {
    const videoElement = videoRef.current;

    if (videoElement) {
      mainContainerRef?.scrollTo({
        top: videoRef?.current?.offsetTop - 0, // Adjust the value based on your fixed navbar height
        behavior: 'smooth',
      });
    }

    player?.playVideo();
  };

  return (
    <div className={classes.sectionWrapper}>
      <section id="home" ref={homeRef} className={classes.section}>
        <img
          className={classes.planePathImage}
          src={`${
            isMobile
              ? '/ThreePlanesCurvePathMobile.svg'
              : '/ThreePlanesCurvePath.svg'
          }`}
          alt="Curling Arrow"
        />
        <div className={classes.title}>
          Any <span style={{ color: '#FE7138' }}>Travel Itinerary,</span>
          <br />
          Brought to <span style={{ color: '#FE7138' }}>Life</span>
        </div>
        <p className={classes.text}>
          Travel Agents, Travel Planners, Travelers... Elevate any Travel Plan
          in 2 min
        </p>
        <Box className={classes.buttonContainer}>
          <Button
            className={classes.homeButton}
            style={{ backgroundColor: '#FE7138', borderColor: '#FE7138' }}
            onClick={() => navigate('/homepage')}
          >
            Get Started
          </Button>
          <Button
            className={classes.homeButton}
            style={{
              backgroundColor: 'white',
              color: '#0E131F',
            }}
            onClick={handleClickWatchDemo}
          >
            Watch a Demo
          </Button>
          <img
            src="/arrow.svg"
            alt="Curling Arrow"
            className={classes.arrowIcon}
          />
        </Box>
        <img className={classes.dotMapImage} src="./dotMap.svg" alt="Dot Map" />
        <img
          className={classes.circleRing}
          src="./circleRingHome.svg"
          alt="Circle Rings"
        />
        <div className={classes.imageContainer} ref={videoRef}>
          <YouTube
            videoId="i2txsMJ2jts"
            title="Demo Video of Vizual Travel"
            className={classes.videoIframe}
            opts={{
              width: '100%',
              height: '100%',
              playerVars: {
                autoplay: 0,
              },
            }}
            onReady={handleVideoReady}
          />
        </div>
      </section>
    </div>
  );
};

export default HomeSection;
