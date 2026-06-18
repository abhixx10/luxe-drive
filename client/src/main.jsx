import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#121217',
              border: '1px solid rgba(216, 182, 106, 0.25)',
              color: '#f7f2e7'
            },
            success: {
              iconTheme: {
                primary: '#5eead4',
                secondary: '#050507'
              }
            },
            error: {
              iconTheme: {
                primary: '#d94a38',
                secondary: '#050507'
              }
            }
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
