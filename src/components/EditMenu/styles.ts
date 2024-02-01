import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  title: {
    textAlign: 'center',
    padding: '20px 0',
    fontSize: '20px',
    top: '0',
    color: 'black',
    fontFamily: 'Futura Hv BT',
  },
  fromtext: {
    fontFamily: 'Futura Bk BT',
    fontWeight: '400',
    fontSize: '16px',
  },
  indexnumber: {
    display: 'block',
    fontSize: '25px',
    fontWeight: '400',
    marginBottom: '5px',
  },
  bottombutton1: {
    marginBottom: '10px',
    backgroundColor: '#ececed',
    color: 'black',
    height: '60px',
    fontFamily: 'Futura Md BT',
    fontSize: '16px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#ececed',
    },
    // "&:active": {
    //   boxShadow: "none",
    //   background: "yellow"
    // }
  },
  bottombutton2: {
    backgroundColor: '#FE7138',
    fontSize: '16px',
    fontFamily: 'Futura Md BT',
    height: '60px',

    textTransform: 'none',
  },
  editbutton: {
    position: 'absolute',
    top: 2,
    right: 0,
    // overflowX:'hidden',
  },
  containerStyle: {
    position: 'fixed',
    top: '0',
    right: '0',
    height: '100dvh',
    width: '55vw',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    overflowY: 'auto',
  },

  mobileContainerStyle: {
    // position: 'fixed',
    top: 'auto', // Updated to 'auto'
    bottom: '0', // Added to align at the bottom
    left: '0',
    height: '90dvh',
    maxHeight: 'calc(100vh - 70px)',
    width: '100vw',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    overflowY: 'auto',
  },

  [theme.breakpoints.between(300, 367)]: {
    bottombutton1: {
      fontSize: '12px',
    },
    bottombutton2: {
      fontSize: '12px',
    },
  },

  '@media (max-width: 300px)': {
    title: {
      fontSize: '18px',
    },
    fromtext: {
      fontSize: '14px',
    },
    indexnumber: {
      fontSize: '20px',
    },
    bottombutton1: {
      fontSize: '11px',
    },
    bottombutton2: {
      fontSize: '11px',
    },
  },
}));

export default useStyles;
