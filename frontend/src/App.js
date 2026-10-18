import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './actions/authActions';
import { getCart } from './actions/cartActions';
import { getSavedItems } from './actions/savedActions';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import SavedItems from './components/SavedItems';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';

const App = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    // Load the cart badge and saved hearts as soon as the user is known.
    useEffect(() => {
        if (!isAuthenticated) return;
        dispatch(getCart()).catch(() => {});
        dispatch(getSavedItems()).catch(() => {});
    }, [dispatch, isAuthenticated]);

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/saved" element={<SavedItems />} />
                </Route>
                <Route element={<PrivateRoute adminOnly />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default App;
