import { createTheme } from '@mui/material/styles';

const MuiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FE7138',
      contrastText: 'white',
    },
    secondary: {
      main: '#D3D3D3',
      contrastText: '000000',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 601, // Customize your breakpoints as needed
      md: 769,
      lg: 992,
      xl: 1500,
    },
  },
  // Define other theme properties here
});

export default MuiTheme;
