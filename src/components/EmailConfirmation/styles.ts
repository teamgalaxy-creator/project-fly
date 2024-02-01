import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  mainBox: {
    height: '100dvh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'center',
    padding:'15px',

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
    fontSize: '20px',
  },
  email: {
    fontFamily: 'Futura Hv BT',
    fontSize: '22px',
    // marginBottom:23,
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
  resendButton: {
    borderRadius: '10px',
    textTransform: 'none',
    fontFamily: 'Futura Md BT',
    width: '388px',
    maxWidth:'90vw',
    height: '60px',
    margin: '25px ',
    backgroundColor: '#FE7138', // Change background color
    color: 'white', // Change text color
    '&:hover': {
      backgroundColor: '#FE7138', // Change hover background color
    },
  },

  [theme.breakpoints.between(350, 600)]: {},
  [theme.breakpoints.between(250, 350)]: {},
}));

export default useStyles;
