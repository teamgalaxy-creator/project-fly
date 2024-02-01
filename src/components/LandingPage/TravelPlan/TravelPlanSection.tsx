import React from 'react';
import useStyles from './styles';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TravelPlanSection = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <section className={classes.section}>
      <div className={classes.travelPlanContainer}>
        <div className={classes.travelPlanTextBox}>
          <div className={classes.title}>
            Show Travel Packages like never before.
          </div>
          <p className={classes.description}>
            Explore the features of the product that will enhance the traveler
            experience and will smoothly visualize your trips.
          </p>
          <Button
            className={classes.button}
            onClick={() => navigate('/homepage')}
          >
            Get Started Now
          </Button>
        </div>
        <img
          className={classes.travelPlanImage}
          src="/TravelPlanImage.svg"
          alt="Travel Plan Image"
        />
        <img
          className={classes.circleRingImage}
          src="./circleRingTravelPlan.svg"
          alt="Circle Rings"
        />
      </div>
    </section>
  );
};

export default TravelPlanSection;
