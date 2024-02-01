import { Button } from '@mui/material';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import useStyles from './styles';
import { useNavigate } from 'react-router-dom';

const CustomItinery = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div id="customItinery" className={classes.itineryContainer}>
      <div className={classes.itineryImageBox}>
        <Player
          autoplay
          loop
          src="lottieAnimation1.json"
          className={classes.itineryImage}
        >
          <Controls visible={false} />
        </Player>
      </div>
      <div className={classes.itineryTextBox}>
        <div className={classes.stepCount}>#1</div>
        <div className={classes.subtitle}>
          <img
            className={classes.titleIcon}
            src="/threeLinesPrimary.svg"
            alt="Three Lines"
          />
          ADD TRAVEL ITINERARY
        </div>
        <div className={classes.title}>
          Add <span style={{ color: '#FD6F35' }}>Flights, Hotels</span> and
          other <span style={{ color: '#FD6F35' }}>Travel Points</span> in about
          2 min
        </div>
        <p className={classes.text}>
          Start on our homepage, go to the add travel section, and seamlessly
          add travel points (flights, hotels) by filling in departures,
          arrivals, and transportation modes. Finish by clicking 'Save' to
          confirm your additions.
        </p>
        <Button
          className={classes.button}
          onClick={() => navigate('/homepage')}
        >
          Add a Travel
        </Button>
      </div>
    </div>
  );
};

export default CustomItinery;
