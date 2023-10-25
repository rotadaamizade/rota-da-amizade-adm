import React from 'react';
import ReactDOM from 'react-dom/client'; // Importe createRoot de 'react-dom/client'
import App from './App';
import { UserProvider } from './UserContext';

function MainApp() {
  return (
    <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <MainApp />
);
