import { makeStyles } from '@mui/styles';
import type MuiTheme from '~/styles/theme/MuiTheme';

interface StylesProps {
  scheduleSectionState: boolean; // Assuming this is the state variable from Redux
}

const useStyles = makeStyles((theme: typeof MuiTheme) => ({
  line: {
    // color: 'darkgrey',
    height: '2px',
    width: '100%',
    border: '1px solid darkgrey',
  },

  containerComp: (props: StylesProps) => ({
    backgroundColor: '#FAFAFB',
    padding: '16px',
    border: '1px solid #ECECED',
    borderRadius: '10px',
    width: props.scheduleSectionState ? '98%' : '348px',
    //height: '163px',
  }),

  text: {
    fontSize: '14px',
    fontFamily: 'Futura Md BT',
    fontWeight: '400',
    letterSpacing: '0em',
    lineHeight: '1.5rem',
    gap: '6px',
  },

  traveltime: {
    fontFamily: 'Futura Bk BT',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '16.78px',
    letterSpacing: '0em',
    marginTop: '5px',
  },

  [theme.breakpoints.between('xs', 400)]: {
    containerComp: {
      width: '100%',
      //height: '50%',
    },
    text: {
      fontSize: '14px',
    },
    traveltime: {
      fontSize: '14px',
    },
  },
  '@media (max-width: 396px)': {
    containerComp: (props: StylesProps) => ({
      width: '100%',
    }),
    text: {
      fontSize: '11px',
      lineHeight: '15px',
    },
    traveltime: {
      fontSize: '12px',
      lineHeight: '15px',
    },
    flight: {
      height: '28px',
    },
    clock2: {
      height: '20px',
    },
  },
}));

export default useStyles;
