import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import { addToSaved } from '../actions/savedActions';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Form } from 'react-bootstrap';

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector(state => state.products);
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const handleAddToCart = (productId) => {
        dispatch(addToCart(productId, 1)); // Adding 1 quantity of the product to the cart
    };

    const handleAddToSaved = (productId) => {
        dispatch(addToSaved(productId));
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="mt-5">
            <h1 className="mb-4">Product List</h1>
            <Form.Group controlId="search">
                <Form.Control 
                    type="text"
                    placeholder="Search for products..."
                    value={search}
                    onChange={handleSearchChange}
                />
            </Form.Group>
            <Row className="mt-4">
                {filteredProducts.map(product => (
                    <Col md={4} key={product._id} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={product.image} alt={product.name} style={{ height: '200px', objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text><strong>${product.price}</strong></Card.Text>
                                <Button variant="primary" onClick={() => handleAddToCart(product._id)} className="me-2">Add to Cart</Button>
                                <Button variant="secondary" onClick={() => handleAddToSaved(product._id)}>Save for Later</Button>
                                <Button variant="info" as={Link} to={`/product/${product._id}`} className="mt-2">View Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductList;
