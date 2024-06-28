import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import setAuthToken from './utils/setAuthToken';
import { LOGIN_SUCCESS } from './actions/types';

const token = localStorage.getItem('token');
if (token) {
    setAuthToken(token);
    // Dispatch login success with token
    store.dispatch({
        type: LOGIN_SUCCESS,
        payload: { token }
    });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
