import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  pointDetail: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: '50%',
    width: '396px',
    //height: '393px',
    maxHeight: '90dvh',
    backgroundColor: '#fff',
    borderRadius: '14px',
    padding: '24px',
    fontFamily: 'Futura',
    boxhadow: '4px 8px 44px 0px #00000014',
  },
  airportName: {
    fontFamily: 'Futura Hv BT',
    fontSize: '22px',
    fontWeight: '400',
    lineHeight: '26.37px',
  },

  location: {
    fontFamily: 'Futura Bk BT',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '19.18px',
    letterSpacing: '0em',
    gap: '8px',
    display: 'flex',
    marginTop: '6px',
  },

  subheading: {
    fontFamily: 'Futura Md BT',
    marginBottom: '14px',
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '21.58px',
  },

  button1: {
    background:
      'linear-gradient(0deg, #F5F6F6, #F5F6F6),linear-gradient(0deg, #ECECED, #ECECED)',
    border: '1px solid #ECECED',
    textTransform: 'none',
    fontFamily: 'Futura Md BT',
    fontWeight: '400',
    lineHeight: '16.78px',
    letterSpacing: '0em',
    padding: '12.5px 15px 12.5px 15px',
    borderRadius: '100px',
    gap: '10px',
    color: 'black',
    // width: '40%',
    width: '103px',
    marginTop: '8px',
    marginLeft: '12px',
    marginBottom: '28px',
    fontSize: '14px',
  },

  button2: {
    fontSize: '16px',
    letterSpacing: '0em',
    padding: '20px',
    borderRadius: '8px',
    gap: '8px',
    marginTop: '16px',
    backgroundColor: '#ECECED',
    color: 'black',
    width: '166px',
    height: '60px',
    textTransform: 'none',
    fontFamily: 'Futura Bk BT',
    fontWeight: '400',
    '&:hover': {
      backgroundColor: 'lightgrey', // Change background color on hover
      color: 'black', // Change text color on hover
    },
  },

  gridContainer: {
    overflowY: 'auto',
    maxHeight: '50dvh',
    // '&::-webkit-scrollbar': {
    //   width: '6px',
    //   display: 'none', // Adjust the width as needed
    // },
    // Hide scrollbar for IE and Edge
    // '-ms-overflow-style': 'none',
    // Hide scrollbar for Firefox
    scrollbarWidth: 'thin',
  },

  button3: {
    fontSize: '16px',
    letterSpacing: '0em',
    padding: '20px',
    gap: '8px',
    backgroundColor: '#FFE4E4',
    color: 'black',
    borderRadius: '8px',
    fontFamily: 'Futura Bk BT',
    fontWeight: '400',
    marginTop: '16px',
    width: '100%',
    height: '60px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'lightpink', // Change background color on hover
      color: 'white', // Change text color on hover
    },

    '&:active': {
      backgroundColor: 'lightpink', // Change background color on active
      color: 'white', // Change text color on active
    },
  },

  // Media query for screens with a max-width of 576px (small screens)
  [theme.breakpoints.between('xs', 400)]: {
    pointDetail: {
      width: '95%',
      //height: '100%',
      maxHeight: '90dvh',
      borderRadius: '14px',
      padding: '18px',
    },
    airportName: {
      fontSize: '22px',
    },
    subheading: {
      fontSize: '18px',
    },

    location: {
      fontSize: '16px',
      lineHeight: '19px',
    },

    button1: {
      width: '55%',
      fontSize: '12px',
      padding: '8px 16px 8px 16px',
    },

    button2: {
      fontSize: '16px',
      lineHeight: '19px',
      borderRadius: '8px',
      height: '80%',
      width: '96%',
    },

    button3: {
      borderRadius: '8px',
      fontSize: '16px',
      lineHeight: '19px',
      height: '80%',
      width: '96%',
    },

    iconClass: {
      height: '18px',
    },
  },

  '@media (max-width: 396px)': {
    gridContainer: {
      maxHeight: '40dvh',
    },

    pointDetail: {
      width: '95%',
      maxHeight: '90dvh',
      borderRadius: '14px',
      padding: '18px',
    },
    airportName: {
      fontSize: '20px',
    },
    subheading: {
      fontSize: '16px',
    },

    location: {
      fontSize: '14px',
      lineHeight: '17px',
    },

    button1: {
      width: '55%',
      fontSize: '10px',
      padding: '8px 10px 8px 10px',
    },

    button2: {
      fontSize: '14px',
      lineHeight: '17px',
      borderRadius: '8px',
      height: '80%',
      width: '96%',
    },

    button3: {
      fontSize: '14px',
      lineHeight: '17px',
      borderRadius: '8px',
      height: '80%',
      width: '96%',
    },

    marker1: {
      height: '16px',
    },
  },
}));

export default useStyles;
