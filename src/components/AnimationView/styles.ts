import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';
import { useSelector } from '~/redux/reducers';

interface StylesProps {
  scheduleSectionState: boolean;
  fullscreenMode: boolean; // Assuming this is the state variable from Redux
}

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
  watermark: {
    width: '153px',
    position: 'absolute',
    bottom: '10px',
    left: '8px',
    zIndex: '1',
  },
  watermarkFullscreen: {
    width: '153px',
    position: 'absolute',
    bottom: '10px',
    left: '8px',
    zIndex: '1',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  showOverlay: {
    display: 'flex',
  },
  mapsMainContainer: {
    position: 'fixed',
    marginTop: '25px',
    marginLeft: '25px', // Set margin to 0 for mobile
    marginRight: '25px', // Set margin to 0 for mobile
    borderRadius: '9px',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'calc(100% - 50px)' /* Subtract the left and right margins */,
    height: '87dvh',
    display: 'inline-block',
    backgroundColor: '#c0ddfd',
    overflow: 'hidden',
  },
  loadingScreen: (props: StylesProps) => ({
    position: 'absolute',
    width: '100%',
    height: props.fullscreenMode ? '100dvh' : '100%',
    background: 'rgba(255, 255, 255, 0.8)', // Adjust the background color and opacity
    zIndex: 9998, // Adjust the z-index as needed
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  mapsVideoPopupContainer: (props: StylesProps) => ({
    position: 'inherit',

    borderRadius: !props.fullscreenMode ? '14px' : '0px',
    width: '100%',
    height: !props.fullscreenMode ? '43dvh' : '100dvh',
    // display: 'inline-block',
    backgroundColor: '#c0ddfd',
    overflowY: 'hidden',
  }),
  travelFormDrawer: {
    maxHeight: '80dvh',
    borderRadius: '25px 25px 0 0 !important',
  },
  // fullScreenmapsVideoPopupContainer: {
  //   height: '100vh',
  //   // position: 'absolute',
  // },
  title: {
    fontFamily: 'Futura Hv BT',
    fontSize: '20px',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: '10px',
  },

  infoMessage: {
    textAlign: 'center',
  },

  message: {
    fontSize: '1rem',
    color: '#555' /* Adjust the color to match your design */,
    marginBottom: '16px',
  },

  // Media query for screens with a max-width of 576px (small screens)
  [theme.breakpoints.between(350, 600)]: {
    watermark: {
      width: '79px',
      position: 'absolute',
      bottom: '5px',
      left: '3px',
      zIndex: '1',
    },
    watermarkFullscreen: {
      width: '103px',
      position: 'relative',
      top: '47px',
      left: '-30px',
      zIndex: '1',
      transform: 'rotate(90deg)',
    },

  },
  [theme.breakpoints.between(300, 600)]: {
    mapContainer: {
      marginTop: '0px',
      marginLeft: '0px', // Set margin to 0 for mobile
      marginRight: '0px', // Set margin to 0 for mobile
      borderRadius: '0px',
      width: '100%',
      height: '50dvh',
    },
    mapsVideoPopupContainer: (props: StylesProps) => ({
      width: !props.fullscreenMode ? '100%' : '100dvh',
      height: !props.fullscreenMode ? '37dvh' : '100vw',
      transform: !props.fullscreenMode ? 'rotate(0deg)' : 'rotate(-90deg)',
      transformOrigin: props.fullscreenMode && 'top left',
      position: !props.fullscreenMode ? 'inherit' : 'fixed',
      top: !props.fullscreenMode ? '0%' : '100%',
      left: '0',
      overflow: 'hidden',
    }),
    // loadingScreen: (props: StylesProps) => ({
    //   position: 'absolute',
    //   width: '100%',
    //   height: props.fullscreenMode ? '100vh' : '100%',
    //   background: 'rgba(255, 255, 255, 0.8)', // Adjust the background color and opacity
    //   zIndex: 9998, // Adjust the z-index as needed
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // }),

    mapsMainContainer: {
      position: 'fixed',
      marginTop: '0px',
      marginLeft: '0px', // Set margin to 0 for mobile
      marginRight: '0px', // Set margin to 0 for mobile
      borderRadius: '0px',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100dvh',
    },
  },
  [theme.breakpoints.between(300, 350)]: {
    watermark: {
      width: '78px',
      position: 'absolute',
      bottom: '5px',
      left: '3px',
      zIndex: '1',
    },
    watermarkFullscreen: {
      width: '90px',
      position: 'relative',
      top: '47px',
      left: '-30px',
      zIndex: '1',
      transform: 'rotate(90deg)',
    },
  },
  '@media (max-width: 300px)': {
    mapsContainer: {
      marginTop: '0px',
      marginLeft: '0px', // Set margin to 0 for mobile
      marginRight: '0px', // Set margin to 0 for mobile
      borderRadius: '0px',
      width: '100%',
      height: '50dvh',
    },
    watermark: {
      width: '78px',
      position: 'absolute',
      bottom: '0px',
      left: '3px',
      zIndex: '1',
    },
    // watermarkFullscreen:{
    //   width:'79px',
    //   position:'relative',
    //   top:'47px',
    //   left:'-30px',
    //   zIndex:'1',
    //   transform: 'rotate(90deg)',
    // },
    // fullScreenmapsVideoPopupContainer: {
    //   width: '100vh' /* Set the width to the viewport height */,
    //   height: '100vw' /* Set the height to the viewport width */,
    //   transform: 'rotate(-90deg)' /* Rotate the content by -90 degrees */,
    //   transformOrigin:
    //     'top left' /* Set the rotation origin to the top left corner */,
    //   position: 'absolute',
    //   top: '100%' /* Adjust positioning as needed */,
    //   left: '0',
    //   overflow: 'hidden',
    // },
    mapsMainContainer: {
      position: 'fixed',
      marginTop: '0px',
      marginLeft: '0px', // Set margin to 0 for mobile
      marginRight: '0px', // Set margin to 0 for mobile
      borderRadius: '0px',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100dvh',
    },
  },
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
