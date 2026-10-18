import { CART_LOADING, SET_CART } from '../actions/types';

const initialState = {
    cart: { products: [] },
    loading: false,
};

function cartReducer(state = initialState, action) {
    switch (action.type) {
        case CART_LOADING:
            return { ...state, loading: true };
        case SET_CART:
            return { ...state, cart: action.payload, loading: false };
        default:
            return state;
    }
}

export const selectCartCount = (state) =>
    state.cart.cart.products.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = (state) =>
    state.cart.cart.products.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

export default cartReducer;
