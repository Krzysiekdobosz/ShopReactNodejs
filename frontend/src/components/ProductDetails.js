import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../actions/productActions';

const ProductDetails = ({ match }) => {
    const dispatch = useDispatch();
    const { product, loading } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProduct(match.params.id));
    }, [dispatch, match.params.id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="product-details">
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} style={{ width: '400px', height: 'auto' }} />
            <p>{product.description}</p>
            <p>${product.price}</p>
        </div>
    );
};

export default ProductDetails;
