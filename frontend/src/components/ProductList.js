import React, { useState, useEffect } from 'react';
import API from '../api';

const ProductList = ({ onEdit }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await API.get('/products');
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <div className="container">
            <h2>Product List</h2>
            <ul className="list-group">
                {products.map(product => (
                    <li key={product._id} className="list-group-item">
                        {product.name} - {product.price}
                        <button className="btn btn-secondary float-right" onClick={() => onEdit(product)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
