import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSavedItems, removeFromSaved } from '../actions/savedActions';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const SavedItems = () => {
    const dispatch = useDispatch();
    const { savedItems, loading } = useSelector(state => state.saved);

    useEffect(() => {
        dispatch(getSavedItems());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!savedItems || savedItems.length === 0) {
        return <div>You have no saved items.</div>;
    }

    return (
        <Container className="mt-5">
            <h1 className="mb-4">Saved Items</h1>
            {savedItems.length > 0 ? (
                <Row>
                    {savedItems.map(item => (
                        <Col md={4} key={item.product._id} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={item.product.image} alt={item.product.name} style={{ height: '200px', objectFit: 'cover' }} />
                                <Card.Body>
                                    <Card.Title>{item.product.name}</Card.Title>
                                    <Card.Text>Price: ${item.product.price}</Card.Text>
                                    <Button variant="danger" onClick={() => dispatch(removeFromSaved(item.product._id))} className="me-2">Remove</Button>
                                    <Button variant="primary" as={Link} to={`/product/${item.product._id}`}>View Details</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p>You have no saved items.</p>
            )}
        </Container>
    );
};

export default SavedItems;
