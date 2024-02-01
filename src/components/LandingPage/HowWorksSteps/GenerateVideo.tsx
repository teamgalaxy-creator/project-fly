import { Button } from '@mui/material';
import useStyles from './styles';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';

const GenerateVideo = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <section id="generateVideo" className={classes.generateContainer}>
      <div className={classes.generateVideoTextBox}>
        <div className={classes.stepCount}>#2</div>
        <div className={classes.subtitle}>
          <img
            className={classes.titleIcon}
            src="/threeLinesPrimary.svg"
            alt="Three Lines"
          />
          AUTOMATIC ANIMATION
        </div>
        <div className={classes.title}>
          Generate Custom{' '}
          <span style={{ color: '#FD6F35' }}>Travel Animation</span> instantly
        </div>
        <div className={classes.text}>
          After adding travel points, click 'Generate Animation' for a dynamic
          visual of your itinerary, featuring flights and drives. Chose the
          airplane and car models, plus choose your favorite map style.
        </div>
        <Button
          className={classes.button}
          onClick={() => navigate('/homepage')}
        >
          Get Animation
        </Button>
      </div>
      <div className={classes.generateVideoImageBox}>
        <Player
          autoplay
          loop
          src="./lottieAnimation2.json"
          className={classes.generateVideoImage}
        >
          <Controls visible={false} />
        </Player>
      </div>
    </section>
  );
};

export default GenerateVideo;
