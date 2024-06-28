import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-list">
            <h1>Product List</h1>
            <div className="products">
                {products.map(product => (
                    <div key={product._id} className="product-item">
                        <h2>{product.name}</h2>
                        <img src={product.image} alt={product.name} style={{ width: '200px', height: 'auto' }} />
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        <button>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
