import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  travelForm: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    maxHeight: '85dvh',
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '10px',
    overflowY: 'auto',
  },

  travelFormDrawer: {
    maxHeight: '80dvh',
    borderRadius: '25px 25px 0 0 !important',
  },

  [theme.breakpoints.between(768, 1024)]: {
    travelForm: {
      width: '70%',
      maxHeight: '95dvh',
      overFlow: 'hidden',
    },
  },

  [theme.breakpoints.between(1024, 1280)]: {
    travelForm: {
      width: '70%',
      maxHeight: '95dvh',
      overFlow: 'hidden',
      padding: '0 12px',
    },
  },

  [theme.breakpoints.between(1280, 1440)]: {
    travelForm: {
      width: '65%',
      maxHeight: '95dvh',
      overFlow: 'hidden',
      padding: '0 12px',
    },
  },
  [theme.breakpoints.between(1440, 1920)]: {
    travelForm: {
      width: '65%',
      maxHeight: '95dvh',
      overFlow: 'hidden',
      padding: '0 10px',
      borderRadius: '14px',
    },
  },

  [theme.breakpoints.between(1920, 2560)]: {
    travelForm: {
      width: '65%',
      maxHeight: '95dvh',
      overFlow: 'hidden',
      padding: '0 20px',
      borderRadius: '14px',
    },
  },

  '@media (min-width: 2560px)': {
    travelForm: {
      width: '60%',
      maxHeight: '95dvh',
      overFlow: 'hidden',
      padding: '0 40px',
      borderRadius: '14px',
    },
  },
}));

export default useStyles;
