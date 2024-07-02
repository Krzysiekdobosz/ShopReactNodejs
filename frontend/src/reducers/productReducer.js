import {
    GET_PRODUCTS,
    GET_PRODUCT,
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT
} from '../actions/types';

const initialState = {
    products: [],
    product: null,
    loading: true,
};


export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload,
                loading: false,
            };
        case GET_PRODUCT:
            return {
                ...state,
                product: payload,
                loading: false,
            };
        case ADD_PRODUCT:
            return {
                ...state,
                products: [payload, ...state.products],
                loading: false,
            };
        case UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map(product =>
                    product._id === payload._id ? payload : product
                ),
                loading: false,
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product._id !== payload),
                loading: false,
            };
        default:
            return state;
    }
}
