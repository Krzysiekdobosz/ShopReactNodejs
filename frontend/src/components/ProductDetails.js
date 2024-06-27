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

    return (
        <div className="product-details">
            {product && (
                <>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                    <button>Add to Cart</button>
                </>
            )}
        </div>
    );
};

export default ProductDetails;
