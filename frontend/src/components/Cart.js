import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const Cart = () => {
    const dispatch = useDispatch();
    const { cart, loading } = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!cart || !cart.products) {
        return <div>Your cart is empty.</div>;
    }

    return (
        <Container className="mt-5">
            <h1 className="mb-4">Your Cart</h1>
            {cart.products.length > 0 ? (
                <Row>
                    {cart.products.map(item => (
                        <Col md={4} key={item.product._id} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={item.product.image} alt={item.product.name} style={{ height: '200px', objectFit: 'cover' }} />
                                <Card.Body>
                                    <Card.Title>{item.product.name}</Card.Title>
                                    <Card.Text>Quantity: {item.quantity}</Card.Text>
                                    <Card.Text>Price: ${item.product.price}</Card.Text>
                                    <Button variant="danger" onClick={() => dispatch(removeFromCart(item.product._id))} className="me-2">Remove</Button>
                                    <Button variant="primary" as={Link} to={`/product/${item.product._id}`}>View Details</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </Container>
    );
};

export default Cart;
