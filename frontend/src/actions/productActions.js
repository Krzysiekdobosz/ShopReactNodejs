import axios from 'axios';
import { GET_PRODUCTS, GET_PRODUCT, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from './types';

export const getProducts = (filters = {}) => async dispatch => {
    try {
        const { category, minPrice, maxPrice, sortBy, order } = filters;
        const res = await axios.get('http://localhost:5000/api/products', {
            params: { category, minPrice, maxPrice, sortBy, order }
        });
        dispatch({ type: GET_PRODUCTS, payload: res.data });
    } catch (err) {
        console.error(err.response.data);
    }
};

export const getProduct = (id) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        dispatch({ type: GET_PRODUCT, payload: res.data });
    } catch (err) {
        console.error(err.response.data);
    }
};

export const addProduct = (productData) => async dispatch => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        const res = await axios.post('http://localhost:5000/api/products', productData, config);
        dispatch({ type: ADD_PRODUCT, payload: res.data });
    } catch (err) {
        console.error(err.response.data);
    }
};

export const updateProduct = (id, productData) => async dispatch => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        const res = await axios.put(`http://localhost:5000/api/products/${id}`, productData, config);
        dispatch({ type: UPDATE_PRODUCT, payload: res.data });
    } catch (err) {
        console.error(err.response.data);
    }
};

export const deleteProduct = (id) => async dispatch => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        await axios.delete(`http://localhost:5000/api/products/${id}`, config);
        dispatch({ type: DELETE_PRODUCT, payload: id });
    } catch (err) {
        console.error(err.response.data);
    }
};
