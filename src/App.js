import ThemeProvider  from './contexts/ThemeProvider';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import { AuthProvider } from './contexts/AuthContext';
import { SearchProvider } from './contexts/SearchParam';





function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <SearchProvider>
             <Router />
          </SearchProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;