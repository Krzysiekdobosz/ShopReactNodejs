import axios from 'axios';
import { GET_SAVED_ITEMS, ADD_TO_SAVED, REMOVE_FROM_SAVED } from './types';

export const getSavedItems = () => async dispatch => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        const res = await axios.get('http://localhost:5000/api/saved', config);
        dispatch({ type: GET_SAVED_ITEMS, payload: res.data });
    } catch (err) {
        console.error(err.response.data);
    }
};

export const addToSaved = (productId) => async dispatch => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        const res = await axios.post('http://localhost:5000/api/saved', { productId }, config);
        dispatch({ type: ADD_TO_SAVED, payload: res.data });
    } catch (err) {
        console.error(err.response.data);
    }
};

export const removeFromSaved = (productId) => async dispatch => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        const res = await axios.delete(`http://localhost:5000/api/saved/${productId}`, config);
        dispatch({ type: REMOVE_FROM_SAVED, payload: productId });
    } catch (err) {
        console.error(err.response.data);
    }
};
