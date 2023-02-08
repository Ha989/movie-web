import ThemeProvider  from './contexts/ThemeProvider';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import { AuthProvider } from './contexts/AuthContext';




function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
         <AuthProvider>
          <Router />
       </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;