import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import './App.css';
import store from './store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <App />
                <ToastContainer position="bottom-right" autoClose={2500} newestOnTop />
            </HashRouter>
        </Provider>
    </React.StrictMode>
);
