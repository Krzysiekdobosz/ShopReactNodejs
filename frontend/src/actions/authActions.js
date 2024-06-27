import axios from 'axios';
import { LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS } from './types';

// Helper to set auth token
const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token);
    } else {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
    }
};

export const register = (userData) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/register', userData);
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        setAuthToken(res.data.token);
    } catch (err) {
        console.error(err.response.data);
    }
};

export const login = (userData) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', userData);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        setAuthToken(res.data.token);
    } catch (err) {
        console.error(err.response.data);
    }
};

export const logout = () => dispatch => {
    setAuthToken(null);
    dispatch({ type: LOGOUT });
};
