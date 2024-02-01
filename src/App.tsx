import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import MuiTheme from '~styles/theme/MuiTheme';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={MuiTheme}>
        <AppRoutes />
      </ThemeProvider>
    </Router>
  );
}
