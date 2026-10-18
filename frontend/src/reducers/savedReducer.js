import { SAVED_LOADING, SET_SAVED_ITEMS } from '../actions/types';

const initialState = {
    savedItems: [],
    loading: false,
};

function savedReducer(state = initialState, action) {
    switch (action.type) {
        case SAVED_LOADING:
            return { ...state, loading: true };
        case SET_SAVED_ITEMS:
            return { ...state, savedItems: action.payload, loading: false };
        default:
            return state;
    }
}

export default savedReducer;
