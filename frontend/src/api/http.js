import axios from 'axios';
import { getToken } from './token';

const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL || '/api',
});

client.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Unwraps the response body and turns API errors into plain Error objects.
const call = (request) =>
    request.then(
        (res) => res.data,
        (err) => {
            throw new Error(err.response?.data?.msg || err.message || 'Something went wrong');
        }
    );

export const httpApi = {
    login: (data) => call(client.post('/auth/login', data)),
    register: (data) => call(client.post('/auth/register', data)),
    me: () => call(client.get('/auth/me')).then((data) => data.user),

    getProducts: (params) => call(client.get('/products', { params })),
    getCategories: () => call(client.get('/products/categories')),
    getProduct: (id) => call(client.get(`/products/${id}`)),
    createProduct: (data) => call(client.post('/products', data)),
    updateProduct: (id, data) => call(client.put(`/products/${id}`, data)),
    deleteProduct: (id) => call(client.delete(`/products/${id}`)),

    getCart: () => call(client.get('/cart')),
    addToCart: (productId, quantity) => call(client.post('/cart', { productId, quantity })),
    updateCartItem: (productId, quantity) => call(client.put(`/cart/${productId}`, { quantity })),
    removeFromCart: (productId) => call(client.delete(`/cart/${productId}`)),
    clearCart: () => call(client.delete('/cart')),

    getSaved: () => call(client.get('/saved')),
    addToSaved: (productId) => call(client.post('/saved', { productId })),
    removeFromSaved: (productId) => call(client.delete(`/saved/${productId}`)),
};
