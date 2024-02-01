import { makeStyles } from '@mui/styles';
import MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  videoControls: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    opacity: 0,
    transition: 'opacity 0.5s ease-in-out',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  visible: {
    opacity: 1,
  },
  controlButton: {
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    marginBottom: theme.spacing(1),
  },
  fab: {
    backgroundColor: '#FE7138',
    width: '100px',
    height: '100px',
    border: '5px solid white',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default useStyles;
