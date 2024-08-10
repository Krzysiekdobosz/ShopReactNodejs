import { ADD_TO_CART, REMOVE_FROM_CART, GET_CART } from '../actions/types';

const initialState = {
    cart: {
        products: [],
    },
    loading: true,
};

function cartReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_CART:
            return {
                ...state,
                cart: payload,
                loading: false,
            };
        case ADD_TO_CART:
            return {
                ...state,
                cart: payload,
                loading: false,
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: payload,
                loading: false,
            };
        default:
            return state;
    }
}

export default cartReducer;