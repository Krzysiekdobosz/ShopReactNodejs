import axios from 'axios';
import { ADD_TO_CART, REMOVE_FROM_CART, GET_CART } from './types';

export const addToCart = (productId, quantity) => async dispatch => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        const res = await axios.post('http://localhost:5000/api/cart', { productId, quantity }, config);
        dispatch({ type: ADD_TO_CART, payload: res.data });
    } catch (err) {
        console.error(err.response.data);
    }
};

export const getCart = () => async dispatch => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        const res = await axios.get('http://localhost:5000/api/cart', config);
        dispatch({ type: GET_CART, payload: res.data });
    } catch (err) {
        console.error(err.response.data);
    }
};

export const removeFromCart = (productId) => async dispatch => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        const res = await axios.delete(`http://localhost:5000/api/cart/${productId}`, config);
        dispatch({ type: REMOVE_FROM_CART, payload: res.data });
    } catch (err) {
        console.error(err.response.data);
    }
};
