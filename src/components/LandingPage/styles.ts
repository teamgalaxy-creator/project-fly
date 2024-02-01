import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  pageWrapper: {
    width: '100%',
    height: '100vh',
    overflow: 'hidden auto',
    scrollBehavior: 'smooth',
    backgroundColor: '#ffffff',
  },

  mainContainer: {
    maxWidth: '1240px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '55px 0',
    border: '1px solid red',
  },

  mainTitleContainer: {
    textAlign: 'center',
    marginBottom: '95px',
  },

  title: {
    fontFamily: 'Futura Md BT',
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },

  subtitle: {
    fontFamily: 'Futura Md BT',
    fontSize: '16px',
    maxWidth: '500px',
    margin: '0 auto',
  },

  // ---------Footer Styling
  footerContainer: {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '50px 20px 48px',
    display: 'flex',
  },

  footerColumnTitle: {
    fontFamily: 'Futura Md BT',
    fontSize: '20px',
    fontWeight: '400',
    lineHeight: '23.3px',
    color: '#FD6F35',
    marginBottom: '24px',
  },

  footerColumnContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '15px',
  },

  footerCopyrightText: {
    fontFamily: 'Futura Md BT',
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '20.97px',
    padding: '30px 0',
    textAlign: 'center',
    backgroundColor: '#FFF6F3',
  },

  footerAboutColumn: {
    marginRight: '178px',
    maxWidth: '280px',
  },

  footerLogo: {
    width: '150px',
    cursor: 'pointer',
    marginBottom: '20px',
  },

  footerAboutText: {
    fontFamily: 'Futura Bk',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '26px',
    color: '#4F535B',
    marginBottom: '20px',
  },

  footerLink: {
    fontFamily: 'Futura Bk',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '26px',
    textDecoration: 'none',
    color: '#4F535B',
  },

  footerIconBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },

  footerContactColumn: {
    maxWidth: '215px',
  },

  footerCenterColumn: {
    display: 'flex',
  },

  quickAccessColumn: {
    maxWidth: '122px',
    marginRight: '90px',
  },

  featuresColumn: {
    maxWidth: '159px',
    marginRight: '90px',
  },

  [theme.breakpoints.between(601, 880)]: {
    footerAboutColumn: {
      marginRight: '50px',
      maxWidth: '352px',
    },

    quickAccessColumn: {
      maxWidth: '122px',
      marginRight: '50px',
    },

    featuresColumn: {
      maxWidth: '159px',
      marginRight: '50px',
    },

    footerContactColumn: {
      maxWidth: '206px',
    },
  },

  // Mobile View Design
  '@media (max-width: 600px)': {
    mainContainer: {
      padding: '35px 0',
    },

    mainTitleContainer: {
      marginBottom: '70px',
    },

    title: {
      fontSize: '36px',
      marginBottom: '12px',
    },

    subtitle: {
      fontFamily: 'Futura Md BT',
      fontSize: '16px',
      maxWidth: '500px',
      margin: '0 auto',
    },

    carousalContainer: {
      flexDirection: 'column',
      gap: '30px',
      padding: '0 20px',
    },

    carousalBox: {
      width: '100%',
      padding: '0 20px',
    },

    card: {
      width: '100%',
      padding: '46px 35px 30px',
    },

    carousalDotContainer: {
      marginTop: '10px',
    },

    testimonialImage: {
      width: '100%',
      padding: '0 20px',
    },

    loadMoreButton: {
      marginTop: '25px',
    },

    // -------Footer Style

    //==========================
    footerContainer: {
      padding: '30px 20px',
      flexDirection: 'column',
      gap: '30px',
    },

    footerLogo: {
      width: '130px',
      marginBottom: '12px',
    },

    footerColumnTitle: {
      fontSize: '18px',
      lineHeight: '21.58px',
      marginBottom: '20px',
    },

    footerColumnContainer: {
      gap: '15px',
    },

    footerLink: {
      fontFamily: 'Futura Bk BT',
      lineHeight: '19.18px',
    },

    footerAboutColumn: {
      marginRight: '0px',
      maxWidth: '352px',
    },

    footerCenterColumn: {
      display: 'flex',
    },

    quickAccessColumn: {
      maxWidth: '100%',
      marginRight: '101px',
    },

    featuresColumn: {
      maxWidth: '100%',
      marginRight: '0',
    },

    footerContactColumn: {
      maxWidth: '100%',
    },
  },

  [theme.breakpoints.between(280, 360)]: {
    quickAccessColumn: {
      maxWidth: '100%',
      marginRight: '40px',
    },
  },
}));

export default useStyles;
