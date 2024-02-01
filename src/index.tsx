import React from 'react';
import ReactDOM from 'react-dom';
import '~/index.css';
import App from '~/App';
import MuiTheme from '~styles/theme/MuiTheme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { store } from '~redux/store';
import { Provider } from 'react-redux';

import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { Analytics } from '@vercel/analytics/react';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={MuiTheme}>
      <CssBaseline />
      <StyledEngineProvider injectFirst>
        <App />
        <Analytics />
      </StyledEngineProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
