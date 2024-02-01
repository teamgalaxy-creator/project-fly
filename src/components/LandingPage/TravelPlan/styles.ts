import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  section: {
    maxWidth: '1240px',
    margin: '0 auto',
    padding: '55px 20px',
  },

  travelPlanContainer: {
    backgroundColor: '#0E131F',
    padding: '75px 48px 74px 85px',
    borderRadius: '16px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },

  travelPlanTextBox: {
    maxWidth: '446px',
  },

  travelPlanImage: {
    width: '50%',
  },

  title: {
    fontFamily: 'Futura Hv BT',
    fontSize: '40px',
    fontWeight: '400',
    lineHeight: '47.95px',
    marginBottom: '12px',
    color: '#FFFFFF',
  },

  titleSpan: {
    color: '#FFFFFF',
  },

  description: {
    fontFamily: 'Futura Bk',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '32px',
    color: '#FDFDFD',
  },

  button: {
    fontFamily: 'Futura Hv BT',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
    backgroundColor: '#FD6F35',
    color: 'white',
    padding: '18px 32px',
    borderRadius: '8px',
    textTransform: 'unset',

    '&:hover': {
      backgroundColor: '#FE7138',
      boxShadow:
        '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
  },

  circleRingImage: {
    display: 'none',
  },

  // Circle Ring Image
  '@media (min-width: 769px)': {
    circleRingImage: {
      display: 'block',
      position: 'absolute',
      top: '0',
      right: '0',
    },
  },

  [theme.breakpoints.between(769, 1024)]: {
    travelPlanContainer: {
      padding: '40px',
    },

    title: {
      fontSize: '40px',
      fontWeight: '400',
      lineHeight: '47.95px',
      marginBottom: '12px',
    },

    description: {
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '32px',
    },

    travelPlanImage: {
      width: '100%',
    },
  },

  [theme.breakpoints.between(600, 768)]: {
    travelPlanContainer: {
      flexDirection: 'column',
      gap: '30px',
      padding: '40px',
    },

    travelPlanImage: {
      width: '100%',
    },
  },

  // Mobile View Styles
  '@media (max-width: 600px)': {
    section: {
      padding: '30px 20px',
    },

    travelPlanContainer: {
      flexDirection: 'column',
      gap: '25px',
      padding: '20px',
    },

    travelPlanTextBox: {
      width: '100%',
    },

    title: {
      fontFamily: 'Futura Hv BT',
      fontSize: '24px',
      fontWeight: '400',
      lineHeight: '28.77px',
      marginBottom: '12px',
    },

    titleSpan: {
      color: '#FD6F35',
    },

    description: {
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '24px',
      color: '#FDFDFDE5',
      marginBottom: '25px',
    },

    travelPlanImage: {
      width: '100%',
    },

    button: {
      padding: '12.5px 25px',
    },
  },
}));

export default useStyles;
