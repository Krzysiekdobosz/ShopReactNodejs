import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { logout } from '../actions/authActions';
import { selectCartCount } from '../reducers/cartReducer';

const CNavbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const cartCount = useSelector(selectCartCount);
    const savedCount = useSelector((state) => state.saved.savedItems.length);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <Navbar expand="lg" className="shop-navbar" sticky="top" collapseOnSelect>
            <Container>
                <Navbar.Brand as={Link} to="/" className="brand">
                    <span className="brand-mark">MB</span> Mini Bike Shop
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/products" eventKey="products">Shop</Nav.Link>
                        {user?.role === 'admin' && (
                            <Nav.Link as={NavLink} to="/admin" eventKey="admin">Admin</Nav.Link>
                        )}
                    </Nav>
                    <Nav className="align-items-lg-center gap-lg-2">
                        {isAuthenticated ? (
                            <>
                                <Nav.Link as={NavLink} to="/saved" eventKey="saved">
                                    Saved {savedCount > 0 && <Badge bg="light" text="dark">{savedCount}</Badge>}
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/cart" eventKey="cart">
                                    Cart {cartCount > 0 && <Badge bg="primary">{cartCount}</Badge>}
                                </Nav.Link>
                                <span className="navbar-user d-none d-lg-inline">Hi, {user?.name.split(' ')[0]}</span>
                                <Nav.Link as="button" className="btn btn-outline-secondary btn-sm px-3" onClick={onLogout}>
                                    Log out
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/login" eventKey="login">Log in</Nav.Link>
                                <Nav.Link as={Link} to="/register" eventKey="register" className="btn btn-primary btn-sm px-3">
                                    Sign up
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CNavbar;
