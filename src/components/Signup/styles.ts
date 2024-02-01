import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  outergrid: {
    justifyContent: 'space-between',
    overflowX: 'hidden',
    overflowY: 'hidden',
    display: 'flex',
  },
  outerdiv: {
    // marginLeft: 5,
    marginTop: '40px',

    alignContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  login: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontFamily: 'Futura Bk BT',
  },
  loginButton: {
    textTransform: 'none',
    display: 'flex',
    justifyContent: 'center',
    color: '#FE7138',
    fontFamily: 'Futura Bk BT',
  },
  leftGrid: {
    maxHeight: '100dvh',
    overflowY: 'auto',
    // '&::-webkit-scrollbar': {
    //     // width: '6px',
    //     display: 'none', // Adjust the width as needed
    //   },
    //   '-ms-overflow-style': 'none',
    // Hide scrollbar for Firefox
    scrollbarWidth: 'thin',
  },
  nameFly: {
    fontSize: '40px',
    color: '#FE7138',
    fontFamily: 'Futura Md BT',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: '15px',
    fontColor: 'black',
    margin: '10px 0px',
    // alignContent: 'center',
    fontFamily: 'Futura Md BT',
  },
  nameProject: {
    fontSize: '40px',
    color: '#0E131F',
    alignContent: 'center',
    fontFamily: 'Futura Md BT',
  },
  checklistItem:{
    display: 'flex',
    alignItems:'center',
  },
  checklistItemText:{
    fontFamily: 'Futura Bk BT',

  },
  statement: {
    paddingTop: 20,
    marginBottom: '10px',
    fontWeight: '400',
    fontSize: '20px',
    fontFamily: 'Futura Hv BT',
  },
  name: {
    paddingTop: 20,
    fontFamily: 'Futura Bk BT',
  },
  email: {
    paddingTop: 10,
    fontFamily: 'Futura Bk BT',
  },
  textFieldBox: {
    width: '388px',
    height: '81px',
  },
  textField: {
    borderRadius: '10px',
    marginTop: '20px',
    width: '388px',
    height: '60px',
    // fontSize:'5px',
    fontFmaily: 'Futura Bk BT',
  },
  password: {
    paddingTop: '18px',
    fontFamily: 'Futura Bk BT',
  },
  forgot: {
    paddingLeft: '257px',
    paddingTop: '10px',
    color: '#FE7138',
    fontFamily: 'Futura Bk BT',
  },
  buttonBox: {
    position: 'relative',
    paddingTop: '20px',
    left: '0px',
    marginBottom: '70px',
  },
  signup: {
    borderRadius: '10px',
    textTransform: 'none',
    fontFamily: 'Futura Md BT',
    width: '388px',
    height: '60px',
    padding: '21px 157px',
    backgroundColor: '#FE7138', // Change background color
    color: 'white', // Change text color
    '&:hover': {
      backgroundColor: '#FE7138', // Change hover background color
    },
  },
  continue: {
    borderRadius: '10px',
    textTransform: 'none',
    fontFamily: 'Futura Md BT',
    width: '388px',
    height: '60px',
    // padding: '21px 157px',
    backgroundColor: '#FE7138', // Change background color
    color: 'white', // Change text color
    '&:hover': {
      backgroundColor: '#FE7138', // Change hover background color
    },
  },
  or: {
    paddingLeft: '183px',
    paddingTop: '15px',
    color: '#454953',
  },
  imageDiv: {
    overflowY: 'hidden',
    maxHeight: '100dvh',
    height:'100vh'

  },
  logoContainer: {
    width: '280px',
    marginTop:'50px',
  },
  [theme.breakpoints.between(600, 992)]: {
    imageDiv: {
      display: 'none',
    },
  },
  [theme.breakpoints.between(350, 600)]: {
    outerdiv: {
      padding: 20,
      width: '100vw',
      flexWrap: 'nowrap',
      marginTop: '5px',
    },
    textField: {
      borderRadius: '10px',
      marginTop: '6px',
      width: '100%',
      height: '50px',
    },
    textFieldBox: {
      width: 'auto',
      height: '81px',
    },
    signup: {
      width: '100%',
      height: '60px',
      padding: '0',
    },
    continue: {
      width: '100%',
    },
    imageDiv: {
      display: 'none',
    },
  },
  [theme.breakpoints.between(250, 385)]: {
    thanks: {
      fontSize: '15px',
    },
  },
  [theme.breakpoints.between(250, 350)]: {
    outerdiv: {
      padding: 20,
      width: '100vw',
      flexWrap: 'nowrap',
      marginTop: '5px',
    },
    textField: {
      borderRadius: '10px',
      marginTop: '6px',
      width: '100%',
      height: '50px',
    },
    textFieldBox: {
      width: 'auto',
      height: '81px',
    },
    signup: {
      width: '100%',
      height: '60px',
      padding: 0,
    },
    continue: {
      width: '100%',
      height: '45px',
    },
    imageDiv: {
      display: 'none',
      overflowY: 'hidden',
    },
  },
}));

export default useStyles;
