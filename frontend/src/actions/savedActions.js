import { api } from '../api';
import { SAVED_LOADING, SET_SAVED_ITEMS } from './types';

const setSaved = (items) => ({ type: SET_SAVED_ITEMS, payload: items });

export const getSavedItems = () => async (dispatch) => {
    dispatch({ type: SAVED_LOADING });
    dispatch(setSaved(await api.getSaved()));
};

export const addToSaved = (productId) => async (dispatch) => {
    dispatch(setSaved(await api.addToSaved(productId)));
};

export const removeFromSaved = (productId) => async (dispatch) => {
    dispatch(setSaved(await api.removeFromSaved(productId)));
};
