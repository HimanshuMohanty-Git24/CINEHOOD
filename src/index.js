import React from 'react';
import ReactDOM from 'react-dom';  // Import from 'react-dom' instead of 'react-dom/client'
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
