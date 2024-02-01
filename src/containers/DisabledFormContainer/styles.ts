import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  heading: {
    fontFamily: 'Futura Hv BT',
    fontWeight: 400,
    fontSize: '22px',
    color: '#0E131F',
    marginBottom: '8px',
  },

  alertText: {
    color: 'grey',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '26px',
    fontFamily: 'Futura Bk BT',
  },

  img: {
    width: '20px',
    height: '20px',
  },

  disabled: {
    color: '#454953',
  },

  subHeading: {
    fontFamily: 'Futura Bk BT',
    fontWeight: 400,
    fontSize: '16px',
    color: '#0E131F',
    marginBottom: '4px',
  },

  hideDropdownArrow: {
    color: 'black',
    '& .MuiSelect-icon': {
      display: 'none',
    },
  },

  customOutlineInput: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        width: '98.5%', // Change the outline border color
      },
    },
  },
  categoryButtons: {
    textTransform: 'none',
    fontFamily: 'Futura Bk BT',
    backgroundColor: '#FAFAFB',
    borderRadius: '100px',
    color: '#0E131F',
    boxShadow: 'none',
    border: '1px solid #ECECED',
    '&:hover': {
      backgroundColor: 'black', // Change background color on hover
      color: 'white', // Change text color on hover
    },
  },

  activeCategory: {
    backgroundColor: 'black', // Change background color on active
    color: 'white',
  },

 
  

  selectBackground: {
    fontFamily: 'Futura Bk BT',
    
    backgroundColor: '#FAFAFB', // Change the background color to your desired color
  },

  

  

  // Media query for screens with a max-width of 576px (small screens)

  '@media (max-width: 420px)': {
    heading: {
      fontSize: '20px',
    },

    subHeading: {
      fontSize: '14px',
    },

    categoryButtons: {
      fontSize: '14px',
    },

    formContainer: {
      marginTop: '0px',
      paddingTop: '0px',
    },
  },
  [theme.breakpoints.between(420, 768)]: {
    heading: {
      fontSize: '22px',
    },
    formContainer: {
      marginTop: '0px',
      paddingTop: '0px',
    },

    subHeading: {
      fontSize: '16px',
    },

    categoryButtons: {
      fontSize: '16px',
    },
    // Add styles for other classes at this breakpoint
  },
  [theme.breakpoints.between(768, 1024)]: {
    heading: {
      fontSize: '18px',
    },

    formContainer: {
      marginTop: '0px',
      paddingTop: '0px !important',
    },

    subHeading: {
      fontSize: '14px',
    },

    categoryButtons: {
      fontSize: '14px',
    },

    alertText: {
      fontSize: '14px',
      lineHeight: '20px',
    },
  },
  [theme.breakpoints.between(1024, 1440)]: {
    heading: {
      fontSize: '20px',
    },

    formContainer: {
      marginTop: '0px',
      paddingTop: '0px !important',
    },

    subHeading: {
      fontSize: '16px',
    },

    categoryButtons: {
      fontSize: '16px',
    },

    alertText: {
      fontSize: '16px',
      lineHeight: '22px',
    },
  },
  [theme.breakpoints.between(1440, 1700)]: {
    heading: {
      fontSize: '24px',
    },

    formContainer: {
      marginTop: '0px',
      paddingTop: '0px',
    },

    subHeading: {
      fontSize: '18px',
    },

    categoryButtons: {
      fontSize: '18px',
    },

    alertText: {
      fontSize: '18px',
      lineHeight: '24px',
    },
  },
  [theme.breakpoints.between(1700, 1920)]: {
    heading: {
      fontSize: '24px',
    },

    subHeading: {
      fontSize: '20px',
    },

    categoryButtons: {
      fontSize: '20px',
    },

    alertText: {
      fontSize: '20px',
      lineHeight: '24px',
    },
  },
  [theme.breakpoints.between(1920, 2560)]: {
    heading: {
      fontSize: '26px',
    },

    formContainer: {
      paddingTop: '10px',
    },

    subHeading: {
      fontSize: '20px',
    },

    categoryButtons: {
      fontSize: '20px',
    },
    alertText: {
      fontSize: '20px',
      lineHeight: '24px',
    },
  },
  [theme.breakpoints.between(2560, 3500)]: {
    heading: {
      fontSize: '36px',
    },

    formContainer: {
      marginTop: '8px',
      paddingTop: '8px',
    },

    subHeading: {
      fontSize: '24px',
    },

    categoryButtons: {
      fontSize: '24px',
    },
    customInput: {
      '& .MuiOutlinedInput-root': {
        height: '55px',
        fontSize: '24px',
      },
    },

    customOutlineInput: {
      '& .MuiOutlinedInput-root': {
        fontSize: '24px',
        padding: '4px auto',

        '& fieldset': {
          height: '60px',
        },
      },
    },

    clockImg: {
      width: '35px',
      height: '35px',
    },
    alertText: {
      fontSize: '24px',
      lineHeight: '32px',
    },
  },
  '@media (min-width: 3500px)': {
    heading: {
      fontSize: '40px',
    },

    formContainer: {
      marginTop: '10px',
      paddingTop: '10px',
    },

    subHeading: {
      fontSize: '30px',
    },

    categoryButtons: {
      fontSize: '30px',
    },
    customInput: {
      '& .MuiOutlinedInput-root': {
        height: '70px',
        fontSize: '30px',
      },
    },

    customOutlineInput: {
      '& .MuiOutlinedInput-root': {
        fontSize: '30px',
        padding: '6px auto',

        '& fieldset': {
          height: '70px',
        },
      },
    },

    clockImg: {
      width: '40px',
      height: '40px',
    },

    alertText: {
      fontSize: '30px',
      lineHeight: '36px',
    },
  },

  
}));

export default useStyles;
