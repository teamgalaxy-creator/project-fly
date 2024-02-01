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
    // overflowY: 'auto',
  },
  title: {
    fontSize: '34px',
    margin: '25px',
    fontFamily: 'Futura Hv BT',
  },
  tabs: {
    width: '200px',
    fontSize: '16px',
    fontFamily: 'Futura Md BT',
    color: 'black',
    textTransform: 'none',
  },
  tab: {
    fontFamily: 'Futura Md BT',
    color: 'black',
    textTransform: 'none',
  },
  selectionbuttons: {
    fontSize: '16px',
    margin: '10px',
    fontFamily: 'Futura Md BT',
    color: 'black',
    textTransform: 'none',
  },

  maincard: {
    // marginTop:20,
    // marginLeft:20,
    width: '100%',
    // maxWidth:'393px',
    Height: '176px',
    borderRadius: '14px',
    boxShadow: '5px',
    backgroundColor: '#FFFFFF',
    //  border: '1px solid #ECECED',
    padding: '15px 20px ',
  },
  cardTitle: {
    fontFamily: 'Futura Hv BT',
    fontSize: '22px',
  },
  text: {
    fontSize: '14px',
    fontFamily: 'Futura Md BT',
    fontWeight: '400',
    margin: 0,
    letterSpacing: '0em',
    lineHeight: '1.5rem',
    gap: '6px',
  },
  viewVideoButton: {
    textTransform: 'none',
    color: 'black',
    fontSize: '14px',
    fontfamily: 'Futura Md BT',
    textDecoration: 'underline',
  },
  openButton: {
    textTransform: 'none',
    fontSize: '14px',
    
    color: 'white',
    fontfamily: 'Futura Md BT',
    backgroundColor: '#FE7138',
    borderRadius: '16.5px',
    right: 0,
    height: '34px',
    width: '128px',
    '&:hover': {
      backgroundColor: '#E46532 ',
    },
  },
  goBackButton: {
    // boxShadow:'15',
    position: 'absolute',
    margin: '51px',
    // bottom: '0',
    top: '0',
    textTransform: 'none',
    fontSize: '14px',
    color: 'white',
    fontfamily: 'Futura Md BT',
    backgroundColor: '#FE7138',
    borderRadius: '16.5px',
    right: 0,
    height: '40px',
    width: '150px',
    // marginBottom: '50px',
    '&:hover': {
      backgroundColor: '#E46532 ',
    },
  },
  [theme.breakpoints.between(991, 1103)]: {
    cardTitle: {
      fontSize: '20px',
    },
    text: {
      fontSize: '13px',
    },
    viewVideoButton: {
      fontSize: '13px',
      fontfamily: 'Futura Md BT',
      textDecoration: 'underline',
    },
    openButton: {
      fontSize: '13px',
      height: '31px',
      width: '122px',
    },
  },
  [theme.breakpoints.between(601, 735)]: {
    cardTitle: {
      fontSize: '20px',
    },
    text: {
      fontSize: '13px',
    },
    viewVideoButton: {
      fontSize: '12px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    openButton: {
      fontSize: '13px',
      height: '29px',
      width: '118px',
    },
  },
  [theme.breakpoints.between(600, 1200)]: {
    tabs: {
      width: '300px',
    },
  },
  [theme.breakpoints.between(300, 601)]: {
    maincontainer: {
      marginTop: '0',
    },
    tabs: {
      width: '100vw',
    },
    title: {
      marginBottom: '5px',
      fontSize: '28px',
    },
    goBackButton: {
      marginRight: '10px',
      marginTop: '30px',
      width: '100px',
      borderRadius: '25px',
      height: '35px',
    },
  },
  [theme.breakpoints.between(328, 355)]: {
    maincontainer: {
      marginTop: '0',
    },
    viewVideoButton: {
      fontSize: '12px',
    },
    tabs: {
      width: '100vw',
    },
    title: {
      marginBottom: '5px',
      fontSize: '28px',
    },
    cardTitle: {
      fontSize: '19px',
    },
  },

  '@media (max-width:328px)': {
    maincontainer: {
      marginTop: '0',
    },
    goBackButton: {
      marginRight: '10px',
      marginTop: '30px',
      width: '100px',
      borderRadius: '25px',
      height: '35px',
    },
    cardTitle: {
      fontSize: '17px',
    },
    tabs: {
      width: '100vw',
    },
    viewVideoButton: {
      fontSize: '12px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    title: {
      marginBottom: '5px',
      fontSize: '28px',
    },
    openButton: {
      fontSize: '14px',
      height: '31px',
      width: '98px',
    },
  },
}));

export default useStyles;
