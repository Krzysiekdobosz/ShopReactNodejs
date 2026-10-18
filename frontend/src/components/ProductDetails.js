import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { getProduct } from '../actions/productActions';
import ProductImage from './ProductImage';
import Loader from './Loader';
import { formatPrice } from '../utils/format';
import useShopActions from '../hooks/useShopActions';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.products);
    const { handleAddToCart, handleToggleSaved, isSaved } = useShopActions();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(getProduct(id));
        setQuantity(1);
    }, [dispatch, id]);

    if (loading) return <Loader />;

    if (error || !product) {
        return (
            <Container className="py-5">
                <Alert variant="warning">{error || 'Product not found'}</Alert>
                <Link to="/products">&larr; Back to the shop</Link>
            </Container>
        );
    }

    const inStock = product.stock > 0;

    return (
        <Container className="py-5">
            <Link to="/products" className="back-link">&larr; Back to the shop</Link>
            <Row className="g-5 mt-1">
                <Col md={6}>
                    <ProductImage product={product} className="product-details__image" />
                </Col>
                <Col md={6}>
                    <Link to={`/products?category=${product.category}`} className="product-card__category">
                        {product.category}
                    </Link>
                    <h1 className="product-details__title">{product.name}</h1>
                    <p className="product-details__price">{formatPrice(product.price)}</p>
                    <p className="product-details__description">{product.description}</p>
                    <p className={inStock ? 'text-success' : 'text-danger'}>
                        {inStock ? `In stock (${product.stock} available)` : 'Out of stock'}
                    </p>

                    <div className="d-flex gap-2 align-items-end flex-wrap">
                        <Form.Group controlId="quantity" className="quantity-field">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max={Math.max(1, product.stock)}
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                            />
                        </Form.Group>
                        <Button size="lg" disabled={!inStock} onClick={() => handleAddToCart(product, quantity)}>
                            Add to cart
                        </Button>
                        <Button size="lg" variant="outline-secondary" onClick={() => handleToggleSaved(product)}>
                            {isSaved(product._id) ? '♥ Saved' : '♡ Save for later'}
                        </Button>
                    </div>

                    <ul className="perks">
                        <li>Free delivery on orders over $100</li>
                        <li>30-day hassle-free returns</li>
                        <li>2-year warranty on all bikes</li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetails;
