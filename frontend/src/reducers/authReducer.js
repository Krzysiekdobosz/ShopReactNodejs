import { AUTH_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, USER_LOADED } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    loading: true,
    user: null,
};

function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
        case LOGIN_SUCCESS:
            return { ...state, isAuthenticated: true, loading: false, user: payload };
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            return { ...state, isAuthenticated: false, loading: false, user: null };
        default:
            return state;
    }
}

export default authReducer;
