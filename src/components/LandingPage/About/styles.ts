import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  aboutWrapper: {
    maxWidth: '1202px',
    margin: '0px auto',
    padding: '59px 0',
  },

  aboutContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '80px',
  },

  title: {
    fontFamily: 'Futura Hv BT',
    fontSize: '40px',
    lineHeight: '47.95px',
    fontWeight: '400',
    marginBottom: '16px',
    position: 'relative',
  },

  subtitleBox: {
    position: 'relative',
  },

  subtitleIcon: {
    width: '25px',
    position: 'relative',
    top: '-13px',
    right: '-3px',
  },

  subtitleText: {
    fontFamily: 'Futura Hv BT',
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '21.58px',
    marginBottom: '8px',
    color: '#FD6F35',
    textTransform: 'uppercase',
  },

  aboutText: {
    fontFamily: 'Futura Bk BT',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '26px',
    color: '#62666DE5',
    marginBottom: '12px',
  },

  image: {
    width: '528px',
    height: '709px',
  },

  planTripButton: {
    padding: '13px 19px 13px 18px',
    backgroundColor: '#FD6F35',
    borderRadius: '8px',
    textTransform: 'none',
    transition: 'all 0.3s ease',
    marginTop: '25px',

    fontFamily: 'Futura Hv BT',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
    color: 'white',

    '&:hover': {
      backgroundColor: '#FE7138',
      boxShadow:
        '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
  },

  [theme.breakpoints.between(600, 1240)]: {
    aboutWrapper: {
      padding: '0 40px',
      margin: '30px auto',
    },

    image: {
      width: '400px',
      // height: '502.87px',
    },

    aboutContainer: {
      gap: '0px',
    },
  },

  [theme.breakpoints.between(600, 768)]: {
    aboutContainer: {
      flexDirection: 'column',
      gap: '9px',
    },

    image: {
      width: '100%',
      height: '502.87px',
    },
  },

  '@media (max-width: 600px)': {
    aboutWrapper: {
      padding: '30px 20px 0',
      margin: '0px auto',
    },

    aboutContainer: {
      flexDirection: 'column',
      gap: '9px',
    },

    title: {
      fontSize: '24px',
      lineHeight: '28.77px',
      marginBottom: '12px',
    },

    subtitleIcon: {
      width: '20px',
      top: '-7px',
      right: '-1px',
    },

    subtitleText: {
      fontSize: '16px',
      lineHeight: '16.78px',
      marginBottom: '8.46px',
    },

    aboutText: {
      lineHeight: '21px',
    },

    planTripButton: {
      padding: '13px 19px 13px 18px',
    },

    image: {
      width: '100%',
      height: '502.87px',
    },
  },

  '@media (max-width: 400px)': {
    image: {
      height: 'unset',
    },
  },
}));

export default useStyles;
