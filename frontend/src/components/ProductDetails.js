import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import { addToSaved } from '../actions/savedActions';
import { Button, Container } from 'react-bootstrap';

const ProductDetails = ({ match }) => {
    const dispatch = useDispatch();
    const { product, loading } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProduct(match.params.id));
    }, [dispatch, match.params.id]);

    const handleAddToCart = (productId) => {
        dispatch(addToCart(productId, 1)); // Adding 1 quantity of the product to the cart
    };

    const handleAddToSaved = (productId) => {
        dispatch(addToSaved(productId));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <Container className="mt-5">
            <h1 className="mb-4">{product.name}</h1>
            <img src={product.image} alt={product.name} style={{ width: '400px', height: 'auto' }} />
            <p>{product.description}</p>
            <p><strong>${product.price}</strong></p>
            <Button variant="primary" onClick={() => handleAddToCart(product._id)} className="me-2">Add to Cart</Button>
            <Button variant="secondary" onClick={() => handleAddToSaved(product._id)}>Save for Later</Button>
        </Container>
    );
};

export default ProductDetails;
