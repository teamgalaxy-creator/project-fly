import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  nameFly: {
    fontSize: '40px',
    color: '#FE7138',
    fontFamily: 'Futura Md BT',
    alignItems: 'center',
  },
  nameProject: {
    fontSize: '40px',
    color: '#0E131F',
    alignContent: 'center',
    fontFamily: 'Futura Md BT',
  },
  logoContainer: {
    width: '280px',
  },
  mainBox: {
    height: '100dvh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verify: {
    fontFamily: 'Futura Hv BT',
    fontSize: '26px',
    marginBottom: '20px',
    // display:'flex',
    // flexDirection:'column',
    // alignItems:'center'
  },
  line2: {
    // alignContent: 'center',
    fontFamily: 'Futura Md BT',
    fontSize: '23px',
  },
  email: {
    fontFamily: 'Futura Hv BT',
    fontSize: '19px',
    // marginBottom:23,
  },
  textFieldBox: {
    width: '388px',
    height: '81px',
  },
  textField: {
    borderRadius: '10px',
    marginTop: '5px',
    width: '388px',
    height: '60px',
    fontFmaily: 'Futura Bk BT',
  },
  p1Box: {
    width: '100%',
    maxWidth: '660px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  p1: {
    fontFamily: 'Futura Bk BT',
    fontSize: '19px',
    padding: '40px 0px',
    textAlign: 'center',
  },
  find: {
    fontFamily: 'Futura Md BT',
    fontSize: '19px',
  },
  password: {
    paddingTop: '18px',
    fontFamily: 'Futura Bk BT',
  },
  resendButton: {
    borderRadius: '10px',
    textTransform: 'none',
    fontFamily: 'Futura Md BT',
    width: '388px',
    height: '60px',
    margin: '25px ',
    backgroundColor: '#FE7138', // Change background color
    color: 'white', // Change text color
    '&:hover': {
      backgroundColor: '#FE7138', // Change hover background color
    },
  },
  [theme.breakpoints.between(250, 400)]: {
    outerdiv: {
      padding: 20,
      width: '100vw',
      flexWrap: 'nowrap',
    },

    textField: {
      borderRadius: '10px',
      marginTop: '6px',
      width: '100%',
      height: '50px',
    },
    textFieldBox: {
      width: '97%',
      height: '81px',
    },

    resendButton: {
      width: '97%',
      // height:'45px'
    },
  },
}));

export default useStyles;
