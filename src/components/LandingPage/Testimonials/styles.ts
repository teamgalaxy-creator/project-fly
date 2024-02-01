import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  mainContainer: {
    maxWidth: '1302.7px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '50px 0',
  },

  mainTitleContainer: {
    textAlign: 'center',
    marginBottom: '107px',
  },

  title: {
    fontFamily: 'Futura Hv BT',
    fontSize: '40px',
    lineHeight: '47.95px',
    fontWeight: '400',
    marginBottom: '16px',
    color: '#0E131F',
  },

  subtitle: {
    fontFamily: 'Futura Bk',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
    maxWidth: '500px',
    margin: '0 auto',
    color: '#323641',
  },

  // --------Carousal Styles
  carousalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
    position: 'relative',
    marginBottom: '58px',
  },
  carousalBox: {
    maxWidth: '542px',
  },
  card: {
    width: '542px',
    height: '311px',
    borderRadius: '12px',
    padding: '72px 53px 60px 52px',
    position: 'relative',
    boxShadow: '0 5px 100px 0 #0000001A',
  },
  text: {
    fontFamily: 'Futura Bk',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '18.83px',
    marginBottom: '20px',
    color: '#4F535B',
  },
  authorInfoContianer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Avatar / Author Profile
  avatarOuterRing: {
    position: 'absolute',
    top: '-40px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '92px',
    height: '92px',
    borderRadius: '92px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInnerRing: {
    width: '86px',
    height: '86px',
    borderRadius: '86px',
    backgroundColor: '#FEBEA4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorProfilePic: {
    width: '80px',
    height: '80px',
  },
  author: {
    fontFamily: 'Futura Hv BT',
    fontSize: '20px',
    fontWeight: '400',
    lineHeight: '23.97px',
    marginBottom: '5px',
    color: '#FD6F35',
  },
  authorRole: {
    fontFamily: 'Futura Md BT',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '16.31px',
    color: '#0E131F',
    textAlign: 'left',
  },
  leftArrowButton: {
    position: 'absolute',
    left: '-24px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '45px',
    height: '45px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: 'white',
    border: '1px solid #E0E0E2',
    borderRadius: '8px',
    transition: 'all 0.3s ease',

    '&:hover': {
      backgroundColor: 'white',
      boxShadow:
        '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
  },
  rightArrowButton: {
    position: 'absolute',
    right: '-20px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '45px',
    height: '45px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: '#FE7138',
    color: 'white',
    borderRadius: '8px',
    transition: 'all 0.3s ease',

    '&:hover': {
      backgroundColor: '#FE7138',
      boxShadow:
        '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
  },
  carousalDotContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginTop: '45px',
  },
  carousalDot: {
    width: '10px',
    height: '10px',
    borderRadius: '10px',
    border: '1px solid #FE7138',
    cursor: 'pointer',

    '&.active': {
      width: '40px',
      backgroundColor: '#FE7138',
    },
  },
  testimonialImage: {
    maxHeight: '342px',
    maxWidth: '649.7px',
  },

  loadMoreButton: {
    padding: '18px 32px',
    backgroundColor: '#FE7138',
    color: 'white',
    borderRadius: '8px',
    textTransform: 'none',
    transition: 'all 0.3s ease',

    fontFamily: 'Futura Hv BT',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',

    '&:hover': {
      backgroundColor: '#FE7138',
      boxShadow:
        '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
  },

  [theme.breakpoints.between(1025, 1360)]: {
    carousalBox: {
      border: '1px solid red',
      marginLeft: '25px',
    },
  },

  [theme.breakpoints.between(769, 1024)]: {
    carousalBox: {
      maxWidth: '680px',
    },
    card: {
      width: '680px',
      borderRadius: '12px',
      padding: '60px 52px',
      position: 'relative',
      boxShadow: '0 5px 100px 0 #0000001A',
    },

    carousalDotContainer: {
      marginTop: '25px',
    },
  },

  // Mobile View Design
  '@media (max-width: 1024px)': {
    mainContainer: {
      padding: '30px 0',
    },

    mainTitleContainer: {
      marginBottom: '61px',
    },

    title: {
      fontSize: '24px',
      fontWeight: '400',
      lineHeight: '28.77px',
      marginBottom: '12px',
      color: '#FD6F35',
    },

    subtitle: {
      fontFamily: 'Futura Bk BT',
      fontSize: '16px',
      lineHeight: '24px',
      maxWidth: '500px',
      margin: '0 auto',
    },

    carousalContainer: {
      flexDirection: 'column',
      gap: '30px',
      padding: '0 20px',
      marginBottom: '0',
    },

    carousalBox: {
      width: '100%',
      padding: '0 20px',
    },

    card: {
      width: '100%',
      height: 'unset',
      padding: '46px 35px 30px',
    },

    text: {
      fontFamily: 'Futura Bk BT',
      lineHeight: '16.78px',
      marginBottom: '15px',
    },

    carousalDotContainer: {
      marginTop: '10px',
    },

    carousalDot: {
      width: '6.58px',
      height: '6.58px',
      borderRadius: '10px',
      border: '1px solid #FE7138',

      '&.active': {
        width: '26.33px',
        backgroundColor: '#FE7138',
      },
    },

    author: {
      fontSize: '16px',
      lineHeight: '19.19px',
      marginBottom: '2px',
    },

    authorRole: {
      fontSize: '12px',
      lineHeight: '13.98px',
    },

    // Avatar / Author Profile
    avatarOuterRing: {
      top: '-28px',
      left: '50%',
      width: '61.12px',
      height: '61.12px',
      borderRadius: '92px',
    },
    avatarInnerRing: {
      width: '57.14px',
      height: '57.14px',
      borderRadius: '86px',
    },
    authorProfilePic: {
      width: '53.15px',
      height: '53.15px',
    },

    testimonialImage: {
      width: '100%',
    },

    loadMoreButton: {
      padding: '13px 27.5px',
      marginTop: '25px',
    },
  },

  '@media (max-width: 380px)': {
    authorInfoContianer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '5px',
    },

    testimonialImage: {
      width: '160%',
      objectFit: 'contain',
    },
  },

  [theme.breakpoints.between(280, 360)]: {
    leftArrowButton: {},
  },
}));

export default useStyles;
