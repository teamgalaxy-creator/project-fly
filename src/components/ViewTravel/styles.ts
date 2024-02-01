import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  mapsMainContainer: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  topRightFab: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    top: '10px', // Adjust the vertical position as needed
    right: '10px', // Adjust the horizontal position as needed
    width: '60px',
    height: '60px',

    '&:hover': {
      backgroundColor: '#ffffff',
    },
  },
  loadingScreen: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.8)', // Adjust the background color and opacity
    zIndex: 9998, // Adjust the z-index as needed
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  [theme.breakpoints.between(250, 600)]: {
    mapsMainContainer: {
      width: '100dvh' /* Set the width to the viewport height */,
      height: '100vw' /* Set the height to the viewport width */,
      transform: 'rotate(-90deg)' /* Rotate the content by -90 degrees */,
      transformOrigin:
        'top left' /* Set the rotation origin to the top left corner */,
      position: 'fixed',
      top: '100%' /* Adjust positioning as needed */,
      left: '0',
      overflow: 'hidden',
    },
  },
}));

export default useStyles;
