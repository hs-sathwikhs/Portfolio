import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './theme/ThemeContext';
import GlobalStyles from './theme/GlobalStyles';
import { ToastProvider } from './components/ui/Toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <GlobalStyles />
      <ToastProvider><App /></ToastProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
