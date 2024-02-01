import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  section: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '50px 20px 66px',
  },

  sectionTitle: {
    fontFamily: 'Futura Hv BT',
    fontSize: '40px',
    fontWeight: '400',
    lineHeight: '47.95px',
    textAlign: 'center',
    marginBottom: '16px',
  },

  mainDivider: {
    borderTop: '1px solid #000000',
    opacity: '0.11',
    marginTop: '23.93px',
    marginBottom: '30px',
  },

  cardDivider: {
    borderTop: '1px solid transparent',
    opacity: '0.2',
    marginTop: '16px',
  },

  sectionTitleSpan: { color: '#0E131F' },

  buttonBox: {
    margin: '0 auto',
    width: '311px',
    height: '48px',
    padding: '4px',
    borderRadius: '190px',
    backgroundColor: '#ECECED',
    display: 'flex',
  },

  toggleButton: {
    fontFamily: 'Futura Md BT',
    fontSize: '20px',
    lineHeight: '30px',
    fontWeight: '400',
    color: '#000000',
    textTransform: 'unset',
    height: '100%',
    padding: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '190px',
    backgroundColor: 'rgb(236, 236, 237)',
    marginBottom: '60px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out,color 0.3s ease-in-out',
    flex: '1',

    '&.active': {
      backgroundColor: '#FE7138',
      color: 'white',
    },
  },

  cardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },

  paymentCard: {
    width: '392px',
    color: '#454953',
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '30px 32px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    boxShadow: '4px 8px 44px #00000014',

    '&.active': {
      color: 'white',
      backgroundColor: '#FE7138',
    },

    '&:hover': {
      color: 'white',
      backgroundColor: '#FE7138',

      '& $planType': {
        color: '#ffffff',
      },

      '& $price': {
        color: '#ffffff',
      },

      '& $planDuration': {
        color: '#ffffff',
      },

      '& $pointItem': {
        color: '#ffffff',
      },

      '& $button': {
        color: '#FE7138',
      },

      '& $cardDivider': {
        borderTop: '1px solid #ffffff',
      },
    },
  },

  planType: {
    fontFamily: 'Futura Md BT',
    fontSize: '20px',
    fontWeight: '400',
    lineHeight: '30px',
    color: '#101828',
    marginBottom: '16px',
    transition: 'all 0.3s ease-in-out',

    '&.active': {
      color: '#ffffff',
    },
  },

  price: {
    fontFamily: 'Futura Hv BT',
    fontSize: '48px',
    fontWeight: 'bold',
    lineHeight: '60px',
    color: '#FE7138',
    letterSpacing: '-2px',
    marginRight: '8px',
    transition: 'all 0.3s ease-in-out',
  },

  planDuration: {
    fontFamily: 'Futura Bk BT',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '24px',
    color: '#667085',
    transition: 'all 0.3s ease-in-out',
  },

  pointContainer: {
    padding: '24px 0 40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  pointItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
    color: '#454953',
    transition: 'all 0.3s ease-in-out',
  },

  button: {
    fontFamily: 'Futura Md BT',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
    color: '#454953',
    padding: '18px 20px',
    backgroundColor: 'white',
    border: '1px solid #E0E0E2',
    borderRadius: '8px',
    textTransform: 'none',
    transition: 'all 0.3s ease',

    '&:hover': {
      backgroundColor: 'white',
      boxShadow:
        '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
  },

  [theme.breakpoints.between(601, 860)]: {
    paymentCard: {
      padding: '20px 15px',
    },
  },

  [theme.breakpoints.between(601, 750)]: {
    cardContainer: {
      flexDirection: 'column',
      gap: '20px',
    },

    paymentCard: {
      width: '100%',
      height: 'unset',
    },
  },

  // Mobile View Designing
  '@media (max-width: 600px)': {
    section: {
      padding: '30px 20px',
    },

    sectionTitle: {
      fontSize: '24px',
      lineHeight: '28.77px',
    },

    sectionTitleSpan: {
      color: '#FE7138',
    },

    cardContainer: {
      flexDirection: 'column',
      gap: '20px',
    },

    paymentCard: {
      width: '100%',
      height: 'unset',
    },

    buttonBox: {
      width: '244px',
      height: '39px',
      padding: '0px',
      margin: '0 auto 30px',
    },

    button: {
      fontFamily: 'Futura Md BT',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '24px',
      color: '#454953',
      padding: '18px 20px',
      backgroundColor: 'white',
      border: '1px solid #E0E0E2',
      borderRadius: '8px',
      textTransform: 'none',
      transition: 'all 0.3s ease',

      '&:hover': {
        backgroundColor: 'white',
        boxShadow:
          '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
      },
    },
  },
}));

export default useStyles;
