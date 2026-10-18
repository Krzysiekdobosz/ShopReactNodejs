import { api } from '../api';
import { CART_LOADING, SET_CART } from './types';

const setCart = (cart) => ({ type: SET_CART, payload: cart });

export const getCart = () => async (dispatch) => {
    dispatch({ type: CART_LOADING });
    dispatch(setCart(await api.getCart()));
};

export const addToCart = (productId, quantity = 1) => async (dispatch) => {
    dispatch(setCart(await api.addToCart(productId, quantity)));
};

export const updateCartItem = (productId, quantity) => async (dispatch) => {
    dispatch(setCart(await api.updateCartItem(productId, quantity)));
};

export const removeFromCart = (productId) => async (dispatch) => {
    dispatch(setCart(await api.removeFromCart(productId)));
};

export const clearCart = () => async (dispatch) => {
    dispatch(setCart(await api.clearCart()));
};
