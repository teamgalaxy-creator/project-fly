import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  section: {
    padding: '53px 0px 0px 0px',
  },

  sectionTitleContainer: {
    textAlign: 'center',
  },

  mainTitle: {
    fontFamily: 'Futura Hv BT',
    fontSize: '40px',
    fontWeight: '400',
    lineHeight: '47.95px',
    marginBottom: '16px',
  },

  titleText: {
    fontFamily: 'Futura Bk BT',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
    maxWidth: '500px',
    margin: '0 auto',
    marginBottom: '50px',
    color: '#323641',
  },

  button: {
    padding: '18px 32px',
    backgroundColor: '#FD6F35',
    color: 'white',
    borderRadius: '8px',
    textTransform: 'none',
    transition: 'all 0.3s ease',

    fontFamily: 'Futura Hv BT',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',

    '&:hover': {
      backgroundColor: '#FE7138',
      boxShadow:
        '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
  },

  stepCount: {
    fontFamily: 'Futura Hv BT',
    fontSize: '46px',
    fontWeight: '400',
    lineHeight: '55.14px',
    color: '#323641',
    opacity: '10%',
    marginBottom: '9px',
  },

  // -----------Custom Itinery
  itineryContainer: {
    maxWidth: '1240px',
    margin: '0px auto',
    padding: '61px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '50px',
  },

  itineryTextBox: {
    flex: '1',
  },

  itineryImageBox: {
    flex: '1',
  },

  itineryImage: {
    display: 'block',
    height: '100%',
  },

  title: {
    fontFamily: 'Futura Hv BT',
    fontSize: '40px',
    fontWeight: '400',
    lineHeight: '49px',
    marginBottom: '16px',
    color: '#0E131F',
    maxWidth: '516px',
  },

  titleIcon: {
    color: '#FD6F35',
    position: 'relative',
    width: '24px',
    top: '-10px',
    left: '3px',
  },

  subtitle: {
    fontFamily: 'Futura Hv BT',
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '21.58px',
    marginBottom: '9px',
    textTransform: 'uppercase',
    position: 'relative',
    color: '#0E131F',
  },

  text: {
    fontFamily: 'Futura Bk BT',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '26px',
    color: '#4F535BE5',
    marginBottom: '24px',
    maxWidth: '494px',
  },

  // -----------Generate Video
  generateContainer: {
    maxWidth: '1240px',
    margin: '61px auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '50px',
  },

  generateVideoTextBox: {
    flex: '1',
  },

  generateVideoImageBox: {
    flex: '1',
  },

  generateVideoImage: {
    display: 'block',
    height: '100%',
  },

  [theme.breakpoints.between(769, 1024)]: {
    itineryContainer: {
      flexDirection: 'row',
      padding: '0 20px',
    },

    generateContainer: {
      flexDirection: 'row',
      padding: '0 20px',
    },
  },

  '@media (max-width: 600px)': {
    section: {
      padding: '30px 20px',
    },

    mainTitle: {
      fontSize: '24px',
      lineHeight: '28.77px',
      marginBottom: '10px',
    },

    titleText: {
      padding: '0',
      marginBottom: '30px',
    },

    button: {
      padding: '12.5px 25px',
    },

    itineryContainer: {
      flexDirection: 'column-reverse',
      gap: '37.54px',
      marginTop: '0px',
      marginBottom: '0px',
      padding: '0px',
    },

    title: {
      fontSize: '24px',
      lineHeight: '28.77px',
      marginBottom: '12px',
      maxWidth: '300px',
    },

    subtitle: {
      fontSize: '14px',
      lineHeight: '16.78px',
      marginBottom: '7px',
    },

    stepCount: {
      fontSize: '36px',
      lineHeight: '43.15px',
      marginBottom: '17px',
    },

    text: {
      lineHeight: '19.18px',
    },

    itineryImageBox: {
      width: '100%',
    },

    //--------Generate Video Mobile
    generateContainer: {
      flexDirection: 'column',
      gap: '30px',
      padding: '0',
    },

    generateVideoImageBox: {
      width: '100%',
    },
  },
}));

export default useStyles;
