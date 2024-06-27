import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';

const Navbar = () => {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
    };

    const authLinks = (
        <>
            <li>
                <Link to="/cart">Cart</Link>
            </li>
            <li>
                <Link to="/saved">Saved Items</Link>
            </li>
            {user && user.role === 'admin' && (
                <li>
                    <Link to="/admin">Admin Dashboard</Link>
                </li>
            )}
            <li>
                <a href="#!" onClick={onLogout}>
                    Logout
                </a>
            </li>
        </>
    );

    const guestLinks = (
        <>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
        </>
    );

    return (
        <nav>
            <h1>
                <Link to="/">Mini Bike Shop</Link>
            </h1>
            <ul>
                <li>
                    <Link to="/products">Products</Link>
                </li>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </nav>
    );
};

export default Navbar;
