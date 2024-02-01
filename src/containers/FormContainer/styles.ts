import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  heading: {
    marginTop: '4px',
    fontFamily: 'Futura Bk BT',
    fontWeight: 400,
    color: '#0E131F',
    lineHeight: '26.37px',
    marginBottom: '8px',
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
        width: '98.5%',
      },
    },
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
    color: '#0E131F',
    lineHeight: '26.37px',
    marginBottom: '4px',
  },

  categoryButtons: {
    textTransform: 'none',
    fontFamily: 'Futura Bk BT',
    backgroundColor: '#FAFAFB',
    borderRadius: '100px',
    padding: '8px 16px',
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
    backgroundColor: '#FAFAFB', // Change the background color to your desired color
  },

  
  

  



  

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
      paddingTop: '0px',
      marginBottom: '0px',
    },

    subHeading: {
      fontSize: '14px',
    },

    categoryButtons: {
      fontSize: '14px',
    },
  },
  [theme.breakpoints.between(1024, 1440)]: {
    heading: {
      fontSize: '20px',
    },

    formContainer: {
      paddingTop: '0px',
      margin: "0px"
    },

    subHeading: {
      fontSize: '16px',
    },

    categoryButtons: {
      fontSize: '14px',
    },
  },
  [theme.breakpoints.between(1440, 1700)]: {
    heading: {
      fontSize: '24px',
    },

    formContainer: {
      margin: '0px',
      paddingTop: '0px',
    },

    subHeading: {
      fontSize: '18px',
    },

    categoryButtons: {
      fontSize: '18px',
    },
  },
  [theme.breakpoints.between(1700, 1920)]: {
    heading: {
      fontSize: '26px',
    },

    formContainer: {
      marginTop: '0px',
      paddingTop: '0px',
    },

    subHeading: {
      fontSize: '20px',
    },

    categoryButtons: {
      fontSize: '20px',
    },
  },
  [theme.breakpoints.between(1920, 2560)]: {
    heading: {
      fontSize: '28px',
    },

    formContainer: {
      paddingTop: '10px',
    },

    subHeading: {
      fontSize: '22px',
    },

    categoryButtons: {
      fontSize: '22px',
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
    dropDownOutlineInput: {
      '& .css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select':
        {
          height: '20px',
          fontSize: '24px',
          paddingTop: '15px',
        },
    },

    customOutlineInput: {
      '& .MuiOutlinedInput-root': {
        fontSize: '24px',
        padding: '4px auto',

        '& fieldset': {
          height: '78px',
        },
      },
    },

    clockImg: {
      width: '35px',
      height: '35px',
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
    dropDownOutlineInput: {
      '& .css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select':
        {
          height: '3rem',
          fontSize: '30px',
          paddingTop: '20px',
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
  },


}));
export default useStyles;
