import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './reducers/authReducer';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import savedReducer from './reducers/savedReducer';

const reducer = combineReducers({
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    saved: savedReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const createAppStore = () => createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const store = createAppStore();

export default store;
