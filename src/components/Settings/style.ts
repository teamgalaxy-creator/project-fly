import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  mainContainer: {
    width: '100%',
    marginTop: '25px',
    borderTopLeftRadius: '14px',
    borderTopRightRadius: '14px',
    position: 'fixed',
    justifyContent: 'center',
    alignItems: 'center',
    //height: '100vh',
    height: '87dvh',
    display: 'inline-block',
    backgroundColor: 'white',
  },
  title: {
    fontSize: '34px',
    margin: '20px',
    marginTop: '45px',
    fontFamily: 'Futura Hv BT',
  },
  goBackButton: {
    position: 'absolute',
    margin: '51px',
    top: '0',
    textTransform: 'none',
    fontSize: '14px',
    color: 'white',
    fontfamily: 'Futura Md BT',
    backgroundColor: '#FE7138',
    borderRadius: '16.5px',
    right: 0,
    height: '40px',
    width: '150px',
    '&:hover': {
      backgroundColor: '#E46532 ',
    },
  },
  divider: {
    marginTop: '42px',
  },
  checklistItem:{
    display: 'flex',
    alignItems:'center',
  },
  checklistItemText:{
    fontFamily: 'Futura Bk BT',

  },
  saveButton: {
    display: 'flex',
    margin: '30px 0 50px 0',
    borderRadius: '10px',
    textTransform: 'none',
    fontFamily: 'Futura Md BT',
    width: '388px',
    height: '60px',
    // padding: '21px 157px',
    backgroundColor: '#FE7138',
    color: 'white',
    marginRight: 'auto',
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: '#FE7138',
    },
  },
  changePicture: {
    borderRadius: '6px',
    textTransform: 'none',
    fontFamily: 'Futura Md BT',
    backgroundColor: '#FE7138',
    marginLeft: '34px',
    height: '46px',
    color: 'white',
    '&:hover': {
      backgroundColor: '#FE7138',
    },
  },
  headings: {
    fontFamily: 'Futura Bk BT',
    marginBottom: '5px',
  },
  circularImageContainer: {
    width: 100, // Adjust the width and height as needed
    height: 100,
    overflow: 'hidden',
    borderRadius: '50%', // This makes the container circular
    position: 'relative',
  },
  circularImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // This ensures the image covers the circular container
    borderRadius: '50%', // This makes the image itself circular
  },

  imageContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  itemClass: {
    paddingTop: '12px',
    paddingLeft: '32px',
  },
  topAdjustment: {
    marginTop: '6%',
    paddingLeft: '32px',
  },

  '@media (max-width: 370px)': {
    mainContainer: {
      marginTop: '0',
      borderRadius: '0',
    },
    title: {
      marginBottom: '5px',
      fontSize: '28px',
      marginTop: '25px',
    },
    goBackButton: {
      marginRight: '10px',
      marginTop: '30px',
      width: '100px',
      borderRadius: '25px',
      height: '35px',
    },
    saveButton: {
      width: '90%',
      padding: '20px 20px',
    },
    // changePicture: {
    //   height: '40px',
    //   marginLeft: '12px',
    //   padding: '10px',
    // },
  },
  [theme.breakpoints.between(250, 600)]: {
    changePicture: {
      display:'none',
    },
    circularImageContainer:{
      display:'none',

    },
  },
  [theme.breakpoints.between(370, 601)]: {
    mainContainer: {
      marginTop: '0',
      borderRadius: '0',
    },
    title: {
      marginBottom: '5px',
      fontSize: '28px',
      marginTop: '25px',
    },
    goBackButton: {
      marginRight: '10px',
      marginTop: '30px',
      width: '100px',
      borderRadius: '25px',
      height: '35px',
    },
    saveButton: {
      width: '92%',
    },
  },
  [theme.breakpoints.between(1440, 1800)]: {
    topAdjustment: {
      marginTop: '12%',
    },
    saveButton: {
      marginTop: '18px',
    },
    itemClass: {
      paddingTop: '20px',
    },
  },
  '@media (min-width: 1800px)': {
    topAdjustment: {
      marginTop: '15%',
    },
    saveButton: {
      marginTop: '18px',
    },
    itemClass: {
      paddingTop: '20px',
    },
  },
}));

export default useStyles;
