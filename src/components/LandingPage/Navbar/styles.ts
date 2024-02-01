import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  navbar: {
    width: '100%',
    height: '90px',
    padding: '0 20px',
    backgroundColor: 'white',
    position: 'sticky',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '2',
  },

  sticky: {
    position: 'sticky',
    top: '0',
    left: '0',
    right: '0',
    transition: 'all 0.3s ease-in-out',
  },

  navbarContainer: {
    maxWidth: '1240px',
    margin: '0 auto',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logoBox: {
    width: '190px',
  },

  navMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },

  navMenuItem: {
    textDecoration: 'none',
    cursor: 'pointer',
    fontFamily: 'Futura Md BT',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '19.18px',
    color: '#4F535B',
    transition: 'all 0.3s ease-in-out',

    '&:hover': {
      color: '#FE7138',
    },

    '&.active': {
      color: '#FE7138',
      fontFamily: 'Futura-Bold',
      lineHeight: '17.1px',
    },
  },

  accessMapButton: {
    padding: '14px 24px',
    borderRadius: '8px',
    backgroundColor: '#0E131F',
    textTransform: 'none',
    textDecoration: 'none',
    transition: 'all 0.3s ease-in-out',

    fontFamily: 'Futura Md BT',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
    color: '#ffffff',

    '&:hover': {
      backgroundColor: '#0E131F',
      boxShadow:
        '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
  },

  [theme.breakpoints.between(769, 1000)]: {
    logoBox: {
      width: '140px',
    },

    navMenu: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
  },

  '@media (max-width: 768px)': {
    navbar: {
      height: '72px',
      padding: '0 20px',
    },

    navbarContainer: {
      maxWidth: 'unset',
    },
  },
}));

export default useStyles;
