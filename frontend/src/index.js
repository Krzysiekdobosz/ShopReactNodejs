import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ToastContainer />
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
