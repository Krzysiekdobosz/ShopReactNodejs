import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

const CNavbar = () => {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
    };

    const authLinks = (
        <>
            <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
            <Nav.Link as={Link} to="/saved">Saved Items</Nav.Link>
            {user && user.role === 'admin' && (
                <Nav.Link as={Link} to="/admin">Admin Dashboard</Nav.Link>
            )}
            <Nav.Link href="#!" onClick={onLogout}>Logout</Nav.Link>
        </>
    );

    const guestLinks = (
        <>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
        </>
    );

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Mini Bike Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/products">Products</Nav.Link>
                        {isAuthenticated ? authLinks : guestLinks}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CNavbar;
