import React from 'react';
import ReactDOM from 'react-dom';  // Import from 'react-dom' instead of 'react-dom/client'
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { createTheme,ThemeProvider } from '@mui/material';

const theme = createTheme({});

ReactDOM.render(
  <ThemeProvider theme={theme}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);
