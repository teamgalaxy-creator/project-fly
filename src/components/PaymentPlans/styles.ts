import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  mainContainer: {
    width: '100%',
    marginTop: '22px',
    borderTopLeftRadius: '14px',
    borderTopRightRadius: '14px',
    backgroundColor: 'white',
    padding: '15px',
  },

  heading: {
    fontFamily: 'Futura Hv BT',
    fontSize: '28px',
    fontWeight: 400,
    lineHeight: '34px',
    letterSpacing: '0em',
    marginInline: 'auto',
    textAlign: 'center',
  },

  paymentButtonsGroup: {
    marginTop: '15px',
    borderRadius: '190px',
    backgroundColor: '#F5F6F6',
    width: '311px',
    height: '50px',
    padding: '4px',
    marginInline: 'auto',
  },

  selectedButton: {
    width: '150px',
    height: '42px',
    borderRadius: '190px',
    backgroundColor: '#FE7138 !important',
    fontFamily: 'Futura Md BT',
    fontSize: '20px',
    fontWeight: 400,
    lineHeight: '30px',
    letterSpacing: '0em',
    textAlign: 'center',
    color: '#FFFFFF !important',
    border: 'none',
    marginInline: 'auto',
    textTransform: 'none',
  },

  paymentButton: {
    width: '150px',
    height: '42px',
    borderRadius: '190px',
    backgroundColor: '#F5F6F6',
    fontFamily: 'Futura Md BT',
    fontSize: '20px',
    fontWeight: 400,
    lineHeight: '30px',
    letterSpacing: '0em',
    textAlign: 'center',
    color: '#454953',
    border: 'none',
    marginInline: 'auto',
    '&:hover': {
      backgroundColor: '#F5F6F6',
    },
    textTransform: 'none',
  },

  line: {
    height: '2px',
    border: '1px solid darkgrey',
    width: '95%',
    marginInline: 'auto',
    marginTop: '18px',
  },

  cardContent: {
    padding: '16px',
  },

  card: {
    width: '88%',
    borderRadius: '14px',
    boxShadow: '4px 8px 44px 0px #00000014',
    backgroundColor: '#FFFFFF',
    border: 'none',
    marginInline: 'auto',
    marginTop: '10px',
    marginBottom: '4px',
    cursor: 'pointer',
  },

  cardSelected: {
    backgroundColor: '#FE7138',
    width: '88%',
    borderRadius: '14px',
    boxShadow: '4px 8px 44px 0px #00000014',
    border: 'none',
    marginInline: 'auto',
    marginTop: '10px',
    marginBottom: '4px',
    cursor: 'pointer',
  },

  planHeading: {
    fontFamily: 'Futura Md BT',
    fontSize: '20px',
    fontWeight: 400,
    lineHeight: '30px',
    letterSpacing: '0em',
    color: '#101828',
    marginBottom: '8px',
    textAlign: 'left',
  },

  planHeadingSelected: {
    color: '#FFFFFF',
    fontFamily: 'Futura Md BT',
    fontSize: '20px',
    fontWeight: 400,
    lineHeight: '30px',
    letterSpacing: '0em',
    marginBottom: '10px',
    textAlign: 'left',
  },

  price: {
    fontFamily: 'Futura Hv BT',
    fontSize: '48px',
    fontWeight: 400,
    lineHeight: '60px',
    letterSpacing: '-0.02em',
    color: '#FE7138',
    textAlign: 'left',
  },

  priceSelected: {
    color: '#FFFFFF',
    fontFamily: 'Futura Hv BT',
    fontSize: '48px',
    fontWeight: 400,
    lineHeight: '60px',
    letterSpacing: '-0.02em',
    textAlign: 'left',
  },

  planSubheading: {
    fontFamily: 'Futura Bk BT',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0em',
    color: '#667085',
    marginTop: '27px',
    textAlign: 'left',
    marginLeft: '5px',
  },

  planSubheadingSelected: {
    color: '#FFFFFF',
    fontFamily: 'Futura Bk BT',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0em',
    marginTop: '27px',
    textAlign: 'left',
    marginLeft: '5px',
  },

  line2: {
    border: '1px solid #FFFFFF',
    height: '2px',
    width: '100%',
    marginInline: 'auto',
    marginTop: '12px',
    marginBottom: '12px',
  },

  planDetails: {
    fontFamily: 'Futura Bk BT',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0em',
    textAlign: 'left',
    color: '#454953',
    marginLeft: '12px',
  },

  planDetailsSelected: {
    color: '#FFFFFF',
    fontFamily: 'Futura Bk BT',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0em',
    textAlign: 'left',
    marginLeft: '12px',
  },

  details: {
    marginBottom: '8px',
  },

  planButton: {
    width: '100%',
    height: '60px',
    border: '1px solid #E0E0E2',
    padding: '18px 20px 18px 20px',
    borderRadius: '8px',
    borderWidth: '1px',
    fontFamily: 'Futura Md BT',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0em',
    color: '#454953',
    marginTop: '20px',
    textTransform: 'none',
    background: '#FFFFFF',
  },

  planButtonSelected: {
    border: 'none',
    color: '#FE7138',
    width: '100%',
    height: '60px',
    padding: '18px 20px 18px 20px',
    borderRadius: '8px',
    borderWidth: '1px',
    fontFamily: 'Futura Md BT',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0em',
    marginTop: '24px',
    textTransform: 'none',
    background: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
  },

  dialogBox: {
    width: '132px',
    background: '#f5f6f6',
    borderRadius: '6px',
    borderTopColor: '#f5f6f6',
    padding: '20px',
    color: '#FFFFFF',
  },

  bubbleText: {
    fontFamily: 'Futura Md BT',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '17px',
    letterSpacing: '0em',
    textAlign: 'center',
    color: '#545760',
  },

  bubbleText2: {
    fontFamily: 'Futura Hv BT',
    fontSize: '20px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0em',
    textAlign: 'center',
    color: '#454953',
  },

  [theme.breakpoints.between('xs', 396)]: {
    heading: {
      fontSize: '26px',
    },

    paymentButtonsGroup: {
      width: '230px',
    },

    paymentButton: {
      width: '110px',
      fontSize: '16px',
    },

    selectedButton: {
      width: '110px',
      fontSize: '16px',
    },

    price: {
      fontSize: '42px',
      lineHeight: '48px',
    },

    priceSelected: {
      fontSize: '42px',
      lineHeight: '48px',
    },

    planSubheading: {
      fontSize: '10px',
    },

    planSubheadingSelected: {
      fontSize: '10px',
    },

    planDetails: {
      fontSize: '12px',
    },

    planDetailsSelected: {
      fontSize: '12px',
    },

    cardContent: {
      padding: '12px',
    },

    planButton: {
      marginTop: '14px',
      fontSize: '14px',
      lineHeight: '20px',
      height: '50px',
    },

    planButtonSelected: {
      marginTop: '14px',
      fontSize: '14px',
      lineHeight: '20px',
      height: '50px',
    },

    planHeading: {
      marginBottom: '10px',
      fontSize: '18px',
    },

    planHeadingSelected: {
      marginBottom: '10px',
      fontSize: '18px',
    },

    line2: {
      marginTop: '10px',
      marginBottom: '10px',
    },

    details: {
      marginBottom: '10px',
    },
  },

  [theme.breakpoints.between(396, 'md')]: {
    heading: {
      fontSize: '26px',
    },

    paymentButtonsGroup: {
      width: '258px',
    },

    paymentButton: {
      width: '125px',
      fontSize: '16px',
    },

    selectedButton: {
      width: '125px',
      fontSize: '16px',
    },
  },

  [theme.breakpoints.between('md', 920)]: {
    heading: {
      fontSize: '26px',
    },

    paymentButtonsGroup: {
      width: '258px',
    },

    paymentButton: {
      width: '125px',
      fontSize: '16px',
    },

    selectedButton: {
      width: '125px',
      fontSize: '16px',
    },

    price: {
      fontSize: '32px',
      lineHeight: '40px',
    },

    priceSelected: {
      fontSize: '32px',
      lineHeight: '40px',
    },

    planSubheading: {
      fontSize: '10px',
    },

    planSubheadingSelected: {
      fontSize: '10px',
    },

    planHeading: {
      marginBottom: '8px',
      fontSize: '18px',
    },

    planHeadingSelected: {
      marginBottom: '8px',
      fontSize: '18px',
    },

    planDetails: {
      fontSize: '11px',
    },

    planDetailsSelected: {
      fontSize: '11px',
    },

    details: {
      marginBottom: '6px',
    },

    planButton: {
      marginTop: '12px',
      height: '45px',
      fontSize: '14px',
    },

    planButtonSelected: {
      marginTop: '12px',
      height: '45px',
      fontSize: '14px',
    },

    line2: {
      marginTop: '8px',
      marginBottom: '8px',
    },
  },

  [theme.breakpoints.between(920, 1030)]: {
    heading: {
      fontSize: '26px',
    },

    paymentButtonsGroup: {
      width: '278px',
    },

    paymentButton: {
      width: '135px',
      fontSize: '18px',
    },

    selectedButton: {
      width: '135px',
      fontSize: '18px',
    },

    price: {
      fontSize: '42px',
      lineHeight: '48px',
    },

    priceSelected: {
      fontSize: '42px',
      lineHeight: '48px',
    },

    planSubheading: {
      fontSize: '12px',
    },

    planSubheadingSelected: {
      fontSize: '12px',
    },

    planHeading: {
      marginBottom: '10px',
    },

    planHeadingSelected: {
      marginBottom: '10px',
    },

    planDetails: {
      fontSize: '14px',
    },

    planDetailsSelected: {
      fontSize: '14px',
    },

    details: {
      marginBottom: '8px',
    },

    planButton: {
      marginTop: '18px',
    },

    planButtonSelected: {
      marginTop: '18px',
    },

    line2: {
      marginTop: '10px',
      marginBottom: '10px',
    },
  },

  [theme.breakpoints.between(1365, 1440)]: {
    heading: {
      marginTop: '2%',
    },

    line: {
      marginTop: '1.5%',
      marginBottom: '1.5%',
    },

    details: {
      marginBottom: '3%',
    },

    paymentButtonsGroup: {
      marginTop: '1%',
    },
  },

  [theme.breakpoints.between(1440, 1800)]: {
    heading: {
      marginTop: '2.8%',
    },

    line: {
      marginTop: '2%',
      marginBottom: '2%',
    },

    details: {
      marginBottom: '5%',
    },

    paymentButtonsGroup: {
      marginTop: '1.8%',
    },
  },

  '@media (min-width: 1800px)': {
    heading: {
      marginTop: '4.2%',
      fontSize: '34px',
    },

    line: {
      marginTop: '3%',
      marginBottom: '3%',
    },

    details: {
      marginBottom: '5%',
    },

    paymentButtonsGroup: {
      marginTop: '2%',
    },

    planSubheading: {
      fontSize: '16px',
    },

    planSubheadingSelected: {
      fontSize: '16px',
    },

    planHeading: {
      marginBottom: '26px',
    },

    planHeadingSelected: {
      marginBottom: '26px',
    },

    planDetails: {
      fontSize: '20px',
    },

    planDetailsSelected: {
      fontSize: '20px',
    },

    price: {
      fontSize: '52px',
    },

    priceSelected: {
      fontSize: '52px',
    },

    planButton: {
      fontSize: '20px',
    },

    planButtonSelected: {
      fontSize: '20px',
    },
  },
}));

export default useStyles;
