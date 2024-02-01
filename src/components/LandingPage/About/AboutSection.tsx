import { Button } from '@mui/material';
import useStyles from './styles';
import { Ref, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface AboutSectionProps {
  aboutRef: Ref<HTMLElement>;
}

const AboutSection = ({ aboutRef }: AboutSectionProps) => {
  const classes = useStyles();
  const mobileSize = 768;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);
  const navigate = useNavigate();

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
    <section id="about" ref={aboutRef} className={classes.aboutWrapper}>
      <div className={classes.aboutContainer} style={{ alignItems: 'center' }}>
        <div style={{ flex: '1.2' }}>
          <div className={classes.subtitleText}>
            <img
              className={classes.subtitleIcon}
              src="/threeLinesImage.svg"
              alt="Three Lines"
            />
            Our Mission
          </div>
          <div className={classes.title}>
            The Heart and Soul Behind Our{' '}
            <span style={{ color: '#FD6F35' }}>Travel Itinerary</span> App
          </div>
          <p className={classes.aboutText}>
            We're passionate travelers and tech enthusiasts on a mission: to let
            anyone showcase their best travel itineraries in the most
            interesting and useful way. Whether you're a travel agent, a travel
            planner or a traveler, our tool is built for anyone who wants to
            share a travel plan in the best way possible.
          </p>
          <p className={classes.aboutText}>
            We promise to always try to find better ways to maximize the value
            our tool provides to travel experts that publish animations and
            travelers that view them.
          </p>
          <Button
            className={classes.planTripButton}
            onClick={() => navigate('/homepage')}
          >
            Give it a Try
          </Button>
        </div>
        <img
          src={`${isMobile ? './aboutImageMobile.svg' : 'aboutImage.svg'}`}
          alt="Couple Image"
          className={classes.image}
        />
      </div>
    </section>
  );
};

export default AboutSection;
