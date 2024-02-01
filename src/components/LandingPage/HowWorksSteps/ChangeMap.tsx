import { Button } from '@mui/material';
import useStyles from './styles';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';

const ChangeMap = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <section id="changeMap" className={classes.itineryContainer}>
      <div className={classes.itineryImageBox}>
        {/* <img
          src="/ChangeMap.png"
          alt="Change Map"
          className={classes.itineryImage}
        /> */}
        <Player
          autoplay
          loop
          src="./lottieAnimation3.json"
          className={classes.itineryImage}
        >
          <Controls visible={false} />
        </Player>
      </div>
      <div className={classes.itineryTextBox}>
        <div className={classes.stepCount}>#3</div>
        <div className={classes.subtitle}>
          <img
            className={classes.titleIcon}
            src="/threeLinesPrimary.svg"
            alt="Three Lines"
          />
          SHARE WITH ANYONE
        </div>
        <div className={classes.title}>
          Publish and{' '}
          <span style={{ color: '#FD6F35' }}>Share with Anyone</span>
        </div>
        <p className={classes.text}>
          When satisfied with your custom animation, click 'Publish' to generate
          a unique link. Share it easily via text or direct messages with a
          client, a traveler, a friend, anyone... for a guaranteed shareable
          travel experience.
        </p>
        <Button
          className={classes.button}
          onClick={() => navigate('/homepage')}
        >
          Publish
        </Button>
      </div>
    </section>
  );
};

export default ChangeMap;
