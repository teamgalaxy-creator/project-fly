import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  sectionWrapper: {
    width: '100%',
    background: 'linear-gradient(to top, #FCF3F0, #ffffff)',
    position: 'relative',
  },

  dotMapImage: {
    width: '966.74px',
    height: '454.17px',
    position: 'absolute',
    top: '28px',
    left: '-517px',
    zIndex: '0.5',
  },

  circleRing: {
    height: '497px',
    position: 'absolute',
    top: '15px',
    right: '-107px',
    zIndex: '0.5',
  },

  section: {
    maxWidth: '1240px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    minHeight: '90vh',
    position: 'relative',
    background: 'linear-gradient(to top, #FCF3F0, #ffffff)',
  },

  planePathImage: {
    height: '124px',
    marginTop: '50px',
    zIndex: '1',
  },

  title: {
    fontSize: '60px',
    fontWeight: '650',
    lineHeight: '72px',
    fontFamily: 'Futura Std',
    marginBottom: '16px',
    zIndex: '1',
  },

  text: {
    fontFamily: 'Futura Bk',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
    color: '#4F535BE5',
    maxWidth: '530px',
    marginBottom: '36px',
    zIndex: '1',
  },

  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    position: 'relative',
    marginBottom: '50px',
  },

  arrowIcon: {
    position: 'absolute',
    top: '20px',
    right: '-90px',
  },

  homeButton: {
    padding: '14px 24px',
    border: '1.7px solid #0E131F',
    borderRadius: '8px',
    textTransform: 'none',
    textDecoration: 'none',
    transition: 'all 0.3s ease',

    fontFamily: 'Futura Hv BT',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '24px',
    color: '#ffffff',

    '&:hover': {
      // backgroundColor: '#FE7138',
      boxShadow:
        '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
  },

  imageContainer: {
    width: '1157.28px',
    padding: '15px 15px 0',
    margin: '0 auto',
    border: '1.31px solid #F1F1F2',
    backgroundColor: '#F1F1F2',
    boxShadow: '0px 5.242471694946289px 89.12202453613281px 0px #FE713826',
    borderTopLeftRadius: '13.11px',
    borderTopRightRadius: '13.11px',
    overflow: 'hidden',
  },

  videoIframe: {
    '& iframe': {
      width: '100%',
      aspectRatio: '16/9',
    },
  },

  [theme.breakpoints.between(1024, 1180)]: {
    imageContainer: {
      width: '90%',
      overflow: 'hidden',
    },
  },

  [theme.breakpoints.between(768, 1024)]: {
    section: {
      padding: '0 20px',
    },

    planePathImage: {
      height: 'unset',
      width: '90%',
      margin: '50px 0 10px',
    },

    imageContainer: {
      width: '95%',
      padding: '15px 15px 0',
      margin: '0 auto',
      backgroundColor: '#F1F1F2',
      borderTopLeftRadius: '12px',
      borderTopRightRadius: '12px',
      overflow: 'hidden',
    },
  },

  [theme.breakpoints.between(600, 768)]: {
    planePathImage: {
      width: '90%',
    },

    imageContainer: {
      width: '80%',
      overflow: 'hidden',
    },
  },

  '@media (max-width: 600px)': {
    section: {
      padding: '0 20px',
      minHeight: '90vh',
    },

    videoIframe: {
      '& iframe': {
        width: '100%',
        aspectRatio: '9/9',
      },
    },

    title: {
      fontSize: '32px',
      lineHeight: '38.36px',
      marginBottom: '14px',
      marginTop: '7.74px',
    },

    text: {
      marginBottom: '25px',
    },

    homeButton: {
      padding: '12px 24px',
    },

    dotMapImage: {
      width: '244.02px',
      height: '270px',
      top: '8px',
      left: '-160px',
    },

    circleRing: {
      height: '216px',
      top: '5px',
      right: '-36px',
    },

    planePathImage: {
      maxWidth: '376px',
      height: 'unset',
      marginTop: '25px',
      zIndex: '1',
    },

    buttonContainer: {
      marginBottom: '50px',
    },

    arrowIcon: {
      width: '40px',
      top: '50px',
      right: '-50px',
    },

    imageContainer: {
      width: '100%',
      overflow: 'hidden',
      padding: '8px 8px 0',
    },
  },

  [theme.breakpoints.between(280, 430)]: {
    imageContainer: {
      width: '100%',
      padding: '5px 5px 0',
    },
  },

  '@media (max-width: 410px)': {
    planePathImage: {
      width: '100%',
      height: 'unset',
    },
  },

  '@media (max-width: 360px)': {
    arrowIcon: {
      width: '25px',
      top: '50px',
      right: '-10px',
    },
  },

  [theme.breakpoints.between(315, 339)]: {
    homeButton: {
      padding: '12px 18px',
    },
  },

  [theme.breakpoints.between(300, 339)]: {
    homeButton: {
      padding: '12px 12px',
    },
  },

  [theme.breakpoints.between(280, 300)]: {
    homeButton: {
      padding: '12px 8px',
    },
  },
}));

export default useStyles;
