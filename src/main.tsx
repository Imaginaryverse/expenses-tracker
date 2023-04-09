import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './style/theme';
import { GlobalStyles } from './style/GlobalStyles';
import { ExpensesProvider } from './context/ExpensesProvider';
import { AppRouter } from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <ExpensesProvider>
          <AppRouter />
        </ExpensesProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
