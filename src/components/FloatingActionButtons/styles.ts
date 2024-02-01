import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'fixed',
    maxWidth: '592px',
    bottom: '16px',
    // left: 3,
    // right: 3 ,
    left: '50%', // Set left to 50% to align with the horizontal center of the screen
    transform: 'translateX(-50%)',

    zIndex: 1,
    width: '100%', // Set the width to 100% to fill the screen horizontally
    // transform: 'none',
  },
  customFab: {
    // size: 'large',
    backgroundColor: '#ffffff',
    width: '50px',
    height: '50px',
    marginBottom: '7px',
  },
  diffColorCustomFab: {
    // size: 'large',
    backgroundColor: '#FE7138',
    width: '50px',
    height: '50px',
    // marginLeft: '5px',
    marginBottom: '7px',
  },
  fabContainer: {
    textAlign: 'center',
    // alignContent: 'center',
    // alignItems:'center',
    // margin: '12px 26px',
  },
  customTypography: {
    fontFamily: 'Futura Md BT',
    fontSize: '13px',
    whiteSpace: 'nowrap', // Prevents text from wrapping to the next line
  },
  travelPDialog: {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '400px', // Adjust the width as needed
    height: '100%', // Set the height to cover the entire screen height
    margin: '0',
  },

  flashButton: {
    width: '65px',
    height: '65px',
    // marginBottom:'13px',
    animation: '$flash 0.5s infinite',
  },
  '@keyframes flash': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },

  continue: {
    borderRadius: '10px',
    textTransform: 'none',
    fontFamily: 'Futura Md BT',
    width: '100%',
    height: '50px',
    backgroundColor: '#FE7138',
    color: 'white',
    '&:hover': {
      backgroundColor: '#FE7138',
    },
  },
  text: {
    alignContent: 'center',
    fontFamily: 'Futura Md BT',
    fontSize: '18px',
    marginTop: '8px',
    marginBottom: '16px',
  },

  dialogHeading: {
    alignContent: 'center',
    fontFamily: 'Futura Hv BT',
    fontSize: '22px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  [theme.breakpoints.between(1366, 1920)]: {},
  [theme.breakpoints.between(410, 769)]: {
    fabContainer: {
      margin: '12px 6px',
    },
  },
  [theme.breakpoints.between(340, 410)]: {
    fabContainer: {
      margin: '12px 6px',
    },
    customTypography: {
      fontSize: '11px',
    },
    text: {
      fontSize: '14px',
    },
    dialogHeading: {
      fontSize: '18px',
    },
  },

  '@media (max-width: 340px)': {
    fabContainer: {
      margin: '12px 3px',
    },
    customTypography: {
      fontSize: '9px',
    },
    text: {
      fontSize: '12px',
    },
    dialogHeading: {
      fontSize: '15px',
    },
    continue: {
      height: '40px',
      fontSize: '12px',
    },
  },
  // [theme.breakpoints.between(250, 385)]: {
  //   thanks: {
  //     fontSize: '15px',
  //   },
  // },
}));

export default useStyles;
