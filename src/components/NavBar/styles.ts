import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  appbar: {
    backgroundColor: '#ffffff',
    marginLeft: '25px',
    bgcolor: '#f5f6f6',
    marginRight: '25px',
    height: '104px',
    width: 'calc(100% - 50px)',
    borderBottomLeftRadius: '14px',
    borderBottomRightRadius: '14px',
    display: 'flex',
    // justifyContent: 'center',
    overflow: 'hidden',
    // position:'fixed',
  },
  containerset: {
    maxWidth: '100%',
  },
  title: {
    ml: 3,
    flexGrow: 1,
    fontFamily: 'Futura Md BT',
    fontSize: '26px',
    marginTop: '32px',
    fontWeight: 400,
    letterSpacing: '0rem',
    color: 'black',
    textDecoration: 'none',
  },
  feedbackContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    // display: 'none',
    // left: '25%',
    top: '10px',
    width: '310px',
    position: 'relative',
  },
  suggestionButton: {
    backgroundColor: '#FE7138',
    color: '#fff',
    textTransform: 'none',
    borderRadius: '13px',
    width: '92px',
    height: '20px',
    fontFamily: 'Futura Md BT',
    boxShadow: 'none',
    fontSize: '10px',
    '&:hover': {
      backgroundColor: '#E46532 ',
    },
  },
  customcontainer: {
    width: '100%',
    maxwidth: '100%',
  },

  [theme.breakpoints.between(1281, 1920)]: {
    containerset: {
      maxWidth: '95%',
    },
  },
  [theme.breakpoints.between(0, 850)]: {
    // suggestionButton: {
    //   display: 'none',
    // },
    feedbackContainer: {
      display: 'none',
    },
  },

  '@media (max-width:600px)': {
    appbar: {
      marginLeft: '0px', // Set margin to 0 for mobile
      marginRight: '0px', // Set margin to 0 for mobile
      height: '72px',
      width: '100%',
      borderBottomLeftRadius: '0px',
      borderBottomRightRadius: '0px',
    },
    title: {
      marginTop: '15px',
    },
  },
}));

export default useStyles;
