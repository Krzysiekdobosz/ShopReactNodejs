import { api } from '../api';
import { getToken, setToken } from '../api/token';
import { AUTH_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, USER_LOADED, SET_CART, SET_SAVED_ITEMS } from './types';

// Restores the session after a page reload.
export const loadUser = () => async (dispatch) => {
    if (!getToken()) {
        dispatch({ type: AUTH_ERROR });
        return;
    }
    try {
        const user = await api.me();
        dispatch({ type: USER_LOADED, payload: user });
    } catch {
        setToken(null);
        dispatch({ type: AUTH_ERROR });
    }
};

const startSession = (dispatch, { token, user }) => {
    setToken(token);
    dispatch({ type: LOGIN_SUCCESS, payload: user });
    return user;
};

export const register = (userData) => async (dispatch) => startSession(dispatch, await api.register(userData));

export const login = (userData) => async (dispatch) => startSession(dispatch, await api.login(userData));

export const logout = () => (dispatch) => {
    setToken(null);
    dispatch({ type: LOGOUT_SUCCESS });
    dispatch({ type: SET_CART, payload: { products: [] } });
    dispatch({ type: SET_SAVED_ITEMS, payload: [] });
};
