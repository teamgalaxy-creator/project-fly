import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  travelForm: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    maxHeight: '90dvh',
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '24px',
    overflowY: 'auto',
  },

  title: {
    fontFamily: 'Futura Hv BT',
    fontWeight: 400,
    fontSize: '20px',
    color: '#0E131F',
    lineHeight: '23.97px',
    marginTop: '20px',
  },

  submitButton: {
    textTransform: 'none',
    marginTop: '10px',
    marginRight: '10px',
    borderRadius: '8px',
    width: '30%',
    height: '50px',
    fontFamily: 'Futura Medium',
    color: '#fff',
    backgroundColor: '#FE7138',
    boxShadow: 'none',
  },

  addPointButton: {
    textTransform: 'none',

    marginTop: '10px',
    marginRight: '10px',
    borderRadius: '8px',
    height: '50px',
    fontFamily: 'Futura Medium',
    color: '#0E131F',
    backgroundColor: '#ECECED',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'black', // Change background color on hover
      color: 'white', // Change text color on hover
    },
  },

  goBackContainer: {
    textAlign: 'start',
  },

  submitContainer: {
    textAlign: 'end',
  },

  backButton: {
    textTransform: 'none',
    marginTop: '10px',
    marginRight: '30%',
    borderRadius: '8px',
    width: '60%',
    height: '50px',
    border: '1px solid #ECECED',
    fontFamily: 'Futura Medium',
    color: '#0E131F',
    backgroundColor: '#FAFAFB',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'black', // Change background color on hover
      color: 'white', // Change text color on hover
    },
  },

  modeHeading: {
    fontFamily: 'Futura Bk BT',
    fontSize: '18px',
  },

  modeOfTrasport: {
    marginTop: '2rem',
  },

  modeButtons: {
    textTransform: 'none',
    fontFamily: 'Futura Bk BT',
    backgroundColor: '#FAFAFB',
    borderRadius: '100px',
    padding: '8px 36px',
    color: '#0E131F',
    boxShadow: 'none',
    border: '1px solid #ECECED',
    '&:hover': {
      backgroundColor: 'black', // Change background color on hover
      color: 'white', // Change text color on hover
    },

    '&:active': {
      backgroundColor: 'black', // Change background color on active
      color: 'white', // Change text color on active
    },
  },
  activeMode: {
    backgroundColor: 'black', // Change background color on active
    color: 'white',
  },

  '@media (max-width: 420px)': {
    title: {
      fontSize: '18px',
      marginTop: '16px',
    },
    modeOfTrasport: {
      marginTop: '0rem',
      marginBottom: '2px',
    },

    modeHeading: {
      fontSize: '14px',
      textAlign: 'left',
      marginBottom: '5px',
      paddingLeft: '18px',
    },

    submitButton: {
      width: '90%',
      height: '50px',
      fontSize: '14px',
    },
    addPointButton: {
      width: '90%',
      height: '50px',
      fontSize: '14px',
    },
    modeButtons: {
      width: '48%',
      fontSize: '14px',
    },
    backButton: {
      width: '90%',
      height: '50px',
      marginRight: '0%',
      fontSize: '14px',
    },
    goBackContainer: {
      textAlign: 'center',
    },

    submitContainer: {
      textAlign: 'center',
    },
  },

  [theme.breakpoints.between(420, 768)]: {
    travelForm: {
      transform: 'translate(-50%, 0%)', // Apply the transformation for screens <= 576px
      width: '100%',
      maxHeight: '80dvh',
      top: '20dvh',
      borderRadius: '25px 25px 0 0',
    },

    title: {
      fontSize: '20px',
      marginTop: '16px',
    },

    modeOfTrasport: {
      marginTop: '0rem',
      marginBottom: '2px',
    },

    modeHeading: {
      textAlign: 'left',
      marginBottom: '5px',
      paddingLeft: '18px',
      fontSize: '16px',
    },
    submitButton: {
      width: '95%',
      height: '60px',
      fontSize: '16px',
    },
    addPointButton: {
      width: '95%',
      height: '60px',
      fontSize: '16px',
    },
    modeButtons: {
      width: '45%',
      fontSize: '16px',
    },
    backButton: {
      width: '95%',
      height: '50px',
      fontSize: '16px',
      marginRight: '0%',
    },
    goBackContainer: {
      textAlign: 'center',
    },

    submitContainer: {
      textAlign: 'center',
    },
    // Add styles for other classes at this breakpoint
  },
  [theme.breakpoints.between(768, 1024)]: {
    title: {
      fontSize: '18px',
      marginTop: '8px',
    },

    formContainer: {
      marginTop: '0px',
      paddingTop: '0px !important',
    },

    modeOfTrasport: {
      marginTop: '0rem',
      marginBottom: '2px',
    },

    modeHeading: {
      textAlign: 'center',
      marginBottom: '5px',
      fontSize: '14px',
    },
    submitButton: {
      height: '50px',
      fontSize: '14px',
    },
    addPointButton: {
      height: '50px',
      fontSize: '14px',
    },
    modeButtons: {
      width: '30%',
      fontSize: '14px',
    },
    backButton: {
      height: '50px',
      fontSize: '14px',
    },
  },
  [theme.breakpoints.between(1024, 1280)]: {
    title: {
      fontSize: '18px',
      marginTop: '8px',
    },

    modeOfTrasport: {
      marginTop: '0rem',
      paddingTop: '0px',
      marginBottom: '2px',
    },

    modeHeading: {
      textAlign: 'center',
      marginBottom: '5px',
      fontSize: '16px',
    },
    submitButton: {
      height: '50px',
      fontSize: '14px',
    },
    addPointButton: {
      height: '50px',
      fontSize: '14px',
    },
    modeButtons: {
      width: '25%',
      fontSize: '14px',
    },
    backButton: {
      height: '50px',
      fontSize: '14px',
    },
  },
  [theme.breakpoints.between(1280, 1440)]: {
    title: {
      fontSize: '18px',
      marginTop: '10px',
    },

    modeOfTrasport: {
      marginTop: '0rem',
      marginBottom: '2px',
    },

    modeHeading: {
      textAlign: 'center',
      marginBottom: '5px',
      fontSize: '16px',
    },
    submitButton: {
      padding: '15px',
      height: '50px',
      fontSize: '14px',
    },
    addPointButton: {
      padding: '15px',
      height: '50px',
      fontSize: '14px',
    },
    modeButtons: {
      width: '25%',
      fontSize: '16px',
    },
    backButton: {
      padding: '15px',
      height: '50px',
      fontSize: '16px',
    },
  },
  [theme.breakpoints.between(1440, 1700)]: {
    title: {
      fontSize: '22px',
    },

    modeOfTrasport: {
      marginTop: '0rem',
      marginBottom: '2px',
    },

    modeHeading: {
      textAlign: 'center',
      marginBottom: '5px',
      fontSize: '18px',
    },
    submitButton: {
      padding: '20px',
      height: '55px',
      fontSize: '18px',
    },
    addPointButton: {
      padding: '20px',
      height: '55px',
      fontSize: '18px',
    },
    modeButtons: {
      height: '55px',
      width: '20%',
      fontSize: '18px',
    },
    backButton: {
      padding: '20px',
      height: '55px',
      fontSize: '18px',
    },
    footerButtons: {
      marginTop: '2rem',
    },
  },
  [theme.breakpoints.between(1700, 1920)]: {
    title: {
      fontSize: '24px',
    },

    modeOfTrasport: {
      marginTop: '0rem',
      marginBottom: '2px',
    },

    modeHeading: {
      textAlign: 'center',
      marginBottom: '6px',
      fontSize: '20px',
    },
    submitButton: {
      height: '55px',
      padding: '25px',
      fontSize: '20px',
    },
    addPointButton: {
      padding: '25px',
      height: '55px',
      fontSize: '20px',
    },
    modeButtons: {
      height: '55px',
      width: '20%',
      fontSize: '20px',
    },
    backButton: {
      height: '55px',
      fontSize: '20px',
      padding: '25px',
    },
    footerButtons: {
      marginTop: '2rem',
    },
  },
  [theme.breakpoints.between(1920, 2560)]: {
    title: {
      fontSize: '26px',
    },

    modeOfTrasport: {
      marginTop: '0rem',
      marginBottom: '2px',
    },

    modeHeading: {
      textAlign: 'center',
      marginBottom: '6px',
      fontSize: '22px',
    },
    submitButton: {
      padding: '30px',
      height: '60px',
      fontSize: '22px',
    },
    addPointButton: {
      padding: '30px',
      height: '60px',
      fontSize: '22px',
    },
    modeButtons: {
      height: '60px',

      width: '20%',
      fontSize: '20px',
    },
    backButton: {
      height: '60px',
      fontSize: '22px',
      padding: '30px',
    },
    footerButtons: {
      marginTop: '4rem !important',
    },
  },
  '@media (min-width: 2560px)': {
    title: {
      fontSize: '34px',
    },

    modeOfTrasport: {
      marginTop: '4rem',
      marginBottom: '6px',
    },

    modeHeading: {
      textAlign: 'center',
      marginBottom: '10px',
      fontSize: '28px',
    },
    submitButton: {
      padding: '45px',
      height: '75px',
      fontSize: '30px',
    },
    addPointButton: {
      padding: '45px',
      height: '75px',
      fontSize: '30px',
    },
    modeButtons: {
      height: '75px',

      width: '35%',
      fontSize: '30px',
    },
    backButton: {
      height: '65px',
      fontSize: '30px',
      padding: '35px',
    },
    transportIcon: {
      width: '35px',
      height: '35px',
    },
  },
}));

export default useStyles;
