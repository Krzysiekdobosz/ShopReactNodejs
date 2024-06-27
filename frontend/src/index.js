import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import setAuthToken from './utils/setAuthToken';
// Set auth token on page load if exists
const token = localStorage.getItem('token');
if (token) {
    setAuthToken(token);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
