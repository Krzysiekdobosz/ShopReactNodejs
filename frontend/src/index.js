import { combineReducers } from 'redux';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import authReducer from './authReducer';
import savedReducer from './savedReducer';

export default combineReducers({
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    saved: savedReducer
});
