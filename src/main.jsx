import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './theme/ThemeContext';
import GlobalStyles from './theme/GlobalStyles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
