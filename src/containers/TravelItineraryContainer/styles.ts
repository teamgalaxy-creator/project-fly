import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  travelForm: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    maxHeight: '90dvh',
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '24px',
    overflowY: 'auto',
  },

  travelFormDrawer: {
    maxHeight: '80dvh',
    borderRadius: '25px 25px 0 0 !important',
  },

  // Media query for screens with a max-width of 576px (small screens)
  [theme.breakpoints.down('sm')]: {
    travelForm: {
      transform: 'translate(-50%, 0%)', // Apply the transformation for screens <= 576px
      width: '100%',
      maxHeight: '80dvh',
      top: '20dvh',
      borderRadius: '25px 25px 0 0',
    },
  },
}));

export default useStyles;
