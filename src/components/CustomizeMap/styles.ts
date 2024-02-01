import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  boxStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '529px',
    maxHeight: '90dvh',
    borderRadius: '31.62px',
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontFamily: 'Futura Hv BT',
    fontSize: '28px',
    fontWeight: '400',
    lineHeight: '34px',
    letterSpacing: '0em',
    textAlign: 'center',
    marginTop: '41px',
  },
  imageGrid: {
    width: '533px',
    marginTop: '55px',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: '75px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  selected: {
    boxShadow: '0 0 0 4px #FE7138',
    borderRadius: '16.31px',
    outline: 'none',
  },

  imageGap: {
    margin: '18px',
  },

  [theme.breakpoints.between('xs', 361)]: {
    boxStyle: {
      width: '95%',
      borderRadius: '21.62px',
    },
    heading: {
      fontSize: '18px',
      lineHeight: '26.37px',
      marginTop: '24px',
    },
    imageGrid: {
      width: '233px',
      marginTop: '15px',
      marginBottom: '15px',
    },
    mapType: {
      height: '100px',
    },
    imageGap: {
      margin: '8px',
    },
  },
  [theme.breakpoints.between(361, 'sm')]: {
    boxStyle: {
      width: '95%',
      borderRadius: '21.62px',
    },
    heading: {
      fontSize: '22px',
      lineHeight: '26.37px',
      marginTop: '24px',
    },
    imageGrid: {
      width: '350px',
      marginTop: '35px',
      marginBottom: '24px',
    },
    imageGap: {
      margin: '15px',
    },
  },

  [theme.breakpoints.between('sm', 850)]: {
    boxStyle: {
      width: '529px',
      borderRadius: '21.62px',
    },
    heading: {
      fontSize: '26px',
      lineHeight: '30px',
      marginTop: '32px',
    },
    imageGrid: {
      marginTop: '35px',
      marginBottom: '40px',
    },
    imageGap: {
      margin: '18px',
    },
  },
}));

export default useStyles;
