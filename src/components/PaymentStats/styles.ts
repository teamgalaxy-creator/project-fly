import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  maincontainer: {
    position: 'fixed',
    marginTop: '25px',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '87dvh', // isMobile ? '92vh' :
    display: 'inline-block',
    backgroundColor: 'white',

    overflowY: 'auto',
  },
  mainGrid: {
    display: 'flex',

    justifyContent: 'space-around',
  },
  titleBilling: {
    fontFamily: 'Futura Hv BT',
    fontSize: '34px',
    marginTop: '14px',
    marginBottom: '25px',
  },
  firstGrid: {
    // marginLeft:'65px',
  },
  secondGrid: {
    // marginRight:'65px',
  },
  // orangeCard:{
  //   width:'100%',
  //   height:'auto',
  // },
  h1: {
    fontFamily: 'Futura Hv BT',
    fontSize: '40px',
    marginTop: '48px',
    marginLeft: '20px',
    position: 'absolute',
    color: '#ffffff',
  },
  h2: {
    fontFamily: 'Futura Bk BT',
    fontSize: '16px',
    marginTop: '156px',
    marginLeft: '20px',
    position: 'absolute',
    color: '#ffffff',
  },
  h3: {
    fontFamily: 'Futura Md BT',
    fontSize: '18px',
    marginTop: '186px',
    marginLeft: '20px',
    position: 'absolute',
    color: '#ffffff',
  },
  [theme.breakpoints.between(600, 992)]: {
    mainGrid: {
      display: 'flex',
      justifyContent: 'left',
      // margin:'30px',
    },
    firstGrid: {
      padding: '20px',
    },
    secondGrid: {
      padding: '20px',
    },
  },

  [theme.breakpoints.between(468, 600)]: {
    mainGrid: {
      display: 'flex',
      justifyContent: 'left',
      // margin:'30px',
    },
    firstGrid: {
      padding: '20px',
    },
    secondGrid: {
      padding: '20px',
    },
  },
  [theme.breakpoints.between(350, 468)]: {
    mainGrid: {
      display: 'flex',
      justifyContent: 'left',
      // margin:'30px',
    },
    firstGrid: {
      padding: '20px',
    },
    secondGrid: {
      padding: '20px',
    },
    titleBilling: {
      fontSize: '28px',
      marginTop: '9px',
    },
    orangeCard: {
      width: '100%',
      height: 'auto',
    },
    h1: {
      fontFamily: 'Futura Hv BT',
      fontSize: '8.5vw',
      marginTop: '10vw',
      marginLeft: '20px',
      position: 'absolute',
      color: '#ffffff',
    },
    h2: {
      fontFamily: 'Futura Bk BT',
      fontSize: '3.5vw',
      marginTop: '32vw',
      marginLeft: '20px',
      position: 'absolute',
      color: '#ffffff',
    },
    h3: {
      fontFamily: 'Futura Md BT',
      fontSize: '3.95vw',
      marginTop: '38vw',
      marginLeft: '20px',
      position: 'absolute',
      color: '#ffffff',
    },
  },
  '@media (max-width: 400px)': {
    mainGrid: {
      display: 'flex',
      justifyContent: 'left',
      // margin:'30px',
    },
    titleBilling: {
      fontSize: '28px',
      marginTop: '9px',
    },
    firstGrid: {
      padding: '20px',
    },
    secondGrid: {
      padding: '20px',
    },
    orangeCard: {
      width: '100%',
      height: 'auto',
    },
    h1: {
      fontFamily: 'Futura Hv BT',
      fontSize: '8.5vw',
      marginTop: '10vw',
      marginLeft: '20px',
      position: 'absolute',
      color: '#ffffff',
    },
    h2: {
      fontFamily: 'Futura Bk BT',
      fontSize: '3.5vw',
      marginTop: '32vw',
      marginLeft: '20px',
      position: 'absolute',
      color: '#ffffff',
    },
    h3: {
      fontFamily: 'Futura Md BT',
      fontSize: '3.95vw',
      marginTop: '38vw',
      marginLeft: '20px',
      position: 'absolute',
      color: '#ffffff',
    },
  },
}));

export default useStyles;
