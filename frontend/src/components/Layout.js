import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import CNavbar from './Navbar';
import { isDemo } from '../api';
import { resetDemo } from '../api/mock';

const handleReset = () => {
    resetDemo();
    localStorage.removeItem('shop:token');
    window.location.reload();
};

const Layout = () => (
    <div className="app-shell">
        {isDemo && (
            <div className="demo-banner">
                Demo version with test data &ndash; nothing is really sold and changes stay in your browser.
                <button type="button" onClick={handleReset}>Reset data</button>
            </div>
        )}
        <CNavbar />
        <main className="app-main">
            <Outlet />
        </main>
        <footer className="shop-footer">
            <Container className="d-flex flex-column flex-md-row justify-content-between gap-2">
                <span>&copy; {new Date().getFullYear()} Mini Bike Shop</span>
                <nav className="d-flex gap-3">
                    <Link to="/products">Shop</Link>
                    <Link to="/saved">Saved</Link>
                    <Link to="/cart">Cart</Link>
                </nav>
            </Container>
        </footer>
    </div>
);

export default Layout;
