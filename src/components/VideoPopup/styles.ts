import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  maincontainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '79%',
    maxWidth: '884px',

    // justifyContent: 'center',
    maxHeight: '90dvh',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '12px 24px',
    overflow: 'hidden',
  },
  watermark:{
    width:'153px',
    position:'absolute',
    bottom:'10px',
    left:'8px',
    zIndex:'1',
  },
  watermarkFullscreen:{
    width:'153px',
    position:'absolute',
    bottom:'10px',
    left:'8px',
    zIndex:'1',
  },
  loader: {
    margin: theme.spacing(2),
  },

  fullScreenMap: { width: '100%', height: '100%' },
  title: {
    fontFamily: 'Futura Hv BT',
    fontSize: '20px',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: '10px',
  },
  mapSnapshot: {
    borderRadius: '14px',
    // Set a maximum width
    // minHeight:'30%',
    width: '100%', // Ensure the div resizes with its parent
    justifyContent: 'center',
    position: 'relative',
    display: 'inline-block',
    overflow: 'hidden',
    margin: 0,
  },
  bottomRightButton: {
    position: 'absolute',
    padding: '16px',
    bottom: '10px', // Adjust the vertical position as needed
    right: '10px', // Adjust the horizontal position as needed
    width: 'auto',
    fontFamily: 'Futura Md BT',

    fontSize: '16px',
    height: '38px',
    textTransform: 'none',
    borderRadius: '25px',
    backgroundColor: '#ffffff',
    '&:hover': {
      backgroundColor: '#ffffff',
    },
  },
  topRightFab: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    top: '10px', // Adjust the vertical position as needed
    right: '10px', // Adjust the horizontal position as needed
    width: '60px',
    height: '60px',

    '&:hover': {
      backgroundColor: '#ffffff',
    },
  },
  fullscreenIcon: {
    width: '40px',
    height: '40px',
  },
  bottomLeftFab: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    bottom: '10px', // Adjust the vertical position as needed
    left: '10px', // Adjust the horizontal position as needed
    width: '60px',
    height: '60px',

    '&:hover': {
      backgroundColor: '#ffffff',
    },
  },
  selectorContainer: {
    position: 'absolute',
    top: 0,

    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
  },

  planeSelector: {
    position: 'relative',
    backgroundColor: '#ffffff',
    width: 'auto',
    height: '35px',
    borderRadius: '40px',
    top: '10px', // Adjust the vertical position as needed
    left: '10px', // Adjust the horizontal position as needed
  },
  paper: {
    // background: 'red',
    // color: 'white',
    maxHeight: '30dvh',
  },
  input: {
    backgroundColor: 'rgba(255, 0, 0, 0.4)',
    '&:focus': {
      borderRadius: 4,
      borderColor: 'rgba(255,255,255,0.2)',
      boxShadow: '0 0 0 0.2rem rgba(0,190,255,0.6)',
      background: 'rgba(0,0,0,0)',
    },
  },
  carSelector: {
    position: 'relative',

    backgroundColor: '#ffffff',
    width: 'auto',
    height: '35px',
    borderRadius: '40px',
    top: '10px', // Adjust the vertical position as needed
    left: '10px', // Adjust the horizontal position as needed
  },
  selectEmpty: {
    color: 'black',
    width: 'auto',
    fontFamily: 'Futura Md BT',
    height: '35px',
    // fontSize:'10px',
    borderRadius: '40px',
  },
  selectItem: {
    fontFamily: 'Futura Md BT',
  },

  customThumb: {
    width: '24px', // Set the width of the thumb
    height: '24px', // Set the height of the thumb
    backgroundImage: `url(/icons/DotInCircle.svg)`, // Set the path to your SVG image
    backgroundSize: 'cover',
    cursor: 'pointer', // Add a pointer cursor on hover
  },
  sliderName1: {
    fontFamily: 'Futura Md BT',
    fontSize: '16px',
    fontWeight: '400px',
    marginTop: '20px',
  },
  sliderName2: {
    fontFamily: 'Futura Md BT',
    fontSize: '16px',
    fontWeight: '400px',
  },
  bottombutton1: {
    backgroundColor: '#FE7138',

    // marginBottom: '10px',
    // maxWidth:'406px',
    height: '60px',
    width: '100%',
    borderRadius: '8px',
    fontFamily: 'Futura Md BT',
    fontSize: '16px',
    textTransform: 'none',

    // "&:active": {
    //   boxShadow: "none",
    //   background: "yellow"
    // }
  },
  bottombutton2: {
    backgroundColor: '#ececed',
    color: 'black',
    fontSize: '16px',
    width: '49%',
    // maxWidth:'406px',
    height: '60px',
    borderRadius: '8px',
    fontFamily: 'Futura Md BT',
    // marginLeft:'27px',
    '&:hover': {
      backgroundColor: '#ececed',
    },
    textTransform: 'none',
  },
  [theme.breakpoints.between(300, 770)]: {
    maincontainer: {
      width: '90%',
      maxWidth: '90%',
      height: 'auto',
      maxHeight: '90dvh',
    },
    title: {
      fontSize: '20px',
      marginTop: '6px',
      marginBottom: '14px',
    },
    bottombutton1: {
      maxWidth: '100%',
      maxHeight: '60px',
      height: '8dvh',
      width: '100%',
      marginBottom: '14px',
    },
    bottombutton2: {
      maxWidth: '100%',
      width: '100%',
      maxHeight: '60px',
      height: '8dvh',
    },
    sliderName1: {
      marginTop: '10px',
    },
    mapSnapshot: {
      // borderRadius:'1px',
    },
  },
  [theme.breakpoints.between(430, 500)]: {
    topRightFab: {
      width: '35px',
      height: '35px',
    },
    fullscreenIcon: {
      width: '25px',
      height: '25px',
    },
    selectorContainer: {
      gap: '5px',
    },
  },
  [theme.breakpoints.between(350, 600)]: {
    watermark:{
      width:'79px',
      position:'absolute',
      bottom:'5px',
      left:'3px',
      zIndex:'1',
    },
    watermarkFullscreen:{
      width:'103px',
      position:'absolute',
      bottom:'5px',
      left:'3px',
      zIndex:'1',
    },
    
  },
  [theme.breakpoints.between(300, 350)]: {
    watermark:{
      width:'78px',
      position:'absolute',
      bottom:'5px',
      left:'3px',
      zIndex:'1',
    },
    watermarkFullscreen:{
      width:'103px',
      position:'absolute',
      bottom:'5px',
      left:'3px',
      zIndex:'1',
    },
  },
  [theme.breakpoints.between(300, 430)]: {
    planeSelector: {
      width: 'auto',
      height: '35px',
      borderRadius: '40px',
    },
    bottomRightButton: {
      width: '131px',
      zIndex:'3',
      fontSize: '11px',
      '&:hover': {
        backgroundColor: '#ffffff',
      },
    },
    carSelector: {
      width: 'auto',
      height: '35px',
    },
    selectEmpty: {
      fontSize: '10px',
    },
    selectItem: {
      fontSize: '10px',
    },
    topRightFab: {
      width: '30px',
      height: '30px',
    },
    fullscreenIcon: {
      width: '20px',
      height: '20px',
    },
    selectorContainer: {
      gap: '5px',
    },
  },
  '@media (max-width: 300px)': {
    planeSelector: {
      width: 'auto',
      height: '35px',
      borderRadius: '40px',
    },
    watermark:{
      width:'78px',
      position:'absolute',
      bottom:'0px',
      left:'3px',
      zIndex:'1',
    },
    watermarkFullscreen:{
      width:'103px',
      position:'absolute',
      bottom:'5px',
      left:'3px',
      zIndex:'1',
    },
    carSelector: {
      width: 'auto',
      height: '35px',
    },
    selectEmpty: {
      fontSize: '10px',
    },
    selectItem: {
      fontSize: '10px',
    },
    selectorContainer: {
      gap: '5px',
      flexDirection: 'column',
    },
    maincontainer: {
      width: '90%',
      maxWidth: '90%',
      height: 'auto',
      maxHeight: '90%',
    },
    title: {
      fontSize: '20px',
    },
    bottombutton1: {
      maxWidth: '100%',
      height: '50px',
      width: '100%',
      marginBottom: '14px',
    },
    bottombutton2: {
      maxWidth: '100%',
      width: '100%',
      height: '50px',
    },
    sliderName1: {
      marginTop: '10px',
    },
    bottomRightButton: {
      width: '131px',
      zIndex:'3',
      fontSize: '11px',
      '&:hover': {
        backgroundColor: '#ffffff',
      },
    },
    topRightFab: {
      width: '30px',
      height: '30px',
    },
    fullscreenIcon: {
      width: '20px',
      height: '20px',
    },
    mapSnapshot: {
      // borderRadius:'1px',
      // maxHeight: '227px',
    },
  },
}));

export default useStyles;
