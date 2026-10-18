import {
    GET_PRODUCTS,
    GET_PRODUCT,
    GET_CATEGORIES,
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    PRODUCTS_LOADING,
    PRODUCTS_ERROR,
} from '../actions/types';

const initialState = {
    products: [],
    product: null,
    categories: [],
    loading: true,
    error: null,
};

function productReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case PRODUCTS_LOADING:
            return { ...state, loading: true, error: null };
        case PRODUCTS_ERROR:
            return { ...state, loading: false, error: payload };
        case GET_PRODUCTS:
            return { ...state, products: payload, loading: false };
        case GET_PRODUCT:
            return { ...state, product: payload, loading: false };
        case GET_CATEGORIES:
            return { ...state, categories: payload };
        case ADD_PRODUCT:
            return { ...state, products: [payload, ...state.products] };
        case UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map((product) => (product._id === payload._id ? payload : product)),
            };
        case DELETE_PRODUCT:
            return { ...state, products: state.products.filter((product) => product._id !== payload) };
        default:
            return state;
    }
}

export default productReducer;
