import { api } from '../api';
import {
    GET_PRODUCTS,
    GET_PRODUCT,
    GET_CATEGORIES,
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    PRODUCTS_LOADING,
    PRODUCTS_ERROR,
} from './types';

export const getProducts = (filters = {}) => async (dispatch) => {
    dispatch({ type: PRODUCTS_LOADING });
    try {
        dispatch({ type: GET_PRODUCTS, payload: await api.getProducts(filters) });
    } catch (err) {
        dispatch({ type: PRODUCTS_ERROR, payload: err.message });
    }
};

export const getProduct = (id) => async (dispatch) => {
    dispatch({ type: PRODUCTS_LOADING });
    try {
        dispatch({ type: GET_PRODUCT, payload: await api.getProduct(id) });
    } catch (err) {
        dispatch({ type: PRODUCTS_ERROR, payload: err.message });
    }
};

export const getCategories = () => async (dispatch) => {
    dispatch({ type: GET_CATEGORIES, payload: await api.getCategories() });
};

// The admin actions rethrow so the dashboard can show a toast with the reason.
export const addProduct = (productData) => async (dispatch) => {
    dispatch({ type: ADD_PRODUCT, payload: await api.createProduct(productData) });
};

export const updateProduct = (id, productData) => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT, payload: await api.updateProduct(id, productData) });
};

export const deleteProduct = (id) => async (dispatch) => {
    await api.deleteProduct(id);
    dispatch({ type: DELETE_PRODUCT, payload: id });
};
