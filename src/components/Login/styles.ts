import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  outergrid: {
    justifyContent: 'space-between',
    overflowX: 'hidden',
    overflowY: 'hidden',
    display: 'flex',
  },
  leftGrid: {
    maxHeight: '100dvh',
    overflowY: 'auto',
    // '&::-webkit-scrollbar': {
    //   // width: '6px',
    //   display: 'none', // Adjust the width as needed
    // },
    // '-ms-overflow-style': 'none',
    // Hide scrollbar for Firefox
    scrollbarWidth: 'thin',
  },
  outerdiv: {
    marginTop: '40px',
    alignContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  logoContainer: {
    width: '280px',
    marginTop: '50px',
  },
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
  statement: {
    paddingTop: 30,
    fontWeight: '400',
    fontSize: '20px',
    fontFamily: 'Futura Hv BT',
  },
  errorMessage: {
    fontSize: '15px',
    fontColor: 'black',
    margin: '10px 0px',
    // alignContent: 'center',
    fontFamily: 'Futura Md BT',
  },
  email: {
    paddingTop: '30px',
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
    fontFmaily: 'Futura Bk BT',
  },
  password: {
    paddingTop: '18px',
    fontFamily: 'Futura Bk BT',
  },
  forgot: {
    display: 'flex',
    justifyContent: 'flex-end',
    color: '#FE7138',
    fontFamily: 'Futura Bk BT',
    textTransform: 'none',
  },
  signup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontFamily: 'Futura Bk BT',
  },
  signupButton: {
    textTransform: 'none',
    display: 'flex',
    justifyContent: 'center',
    color: '#FE7138',
    fontFamily: 'Futura Bk BT',
  },
  buttonBox: {
    position: 'relative',
    paddingTop: '20px',
    left: '0px',
  },
  login: {
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
  google: {
    borderRadius: '10px',
    fontFamily: 'Futura Md BT',
    textTransform: 'none',
    width: '388px',
    height: '60px',
    padding: '21px 0', // Adjust the padding
    backgroundColor: '#ECECED', // Change background color
    color: '#0E131F', // Change text color
    '&:hover': {
      backgroundColor: '#FE7138', // Change hover background color
    },
    whiteSpace: 'nowrap', // Ensure text stays on one line
  },
  or: {
    margin: '10px',
    alignContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    fontFamily: 'Futura Bk BT',
  },
  dialogBox: {
    borderRadius: '14px',
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
  logoDialog:{
    width:'220px',
    marginTop:'20px',
    marginBottom:'30px'
  },
  thanks: {
    alignContent: 'center',
    fontFamily: 'Futura Md BT',
    fontSize: '20px',
    marginBottom:'20px',
    textAlign:'center',
  },
  imageDiv: {
    overflowY: 'hidden',
    maxHeight: '100dvh',
    height:'100vh'
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
    logoContainer: {
      marginTop: '1px',
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
    login: {
      width: '100%',
      height: '60px',
      padding: '0',
    },
    google: {
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
    logoDialog:{
      width:'180px',
    },
    logoContainer: {
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
    login: {
      width: '100%',
      height: '60px',
      padding: 0,
    },
    google: {
      width: '100%',
      height: '60px',
      padding: '0',
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
