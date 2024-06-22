import React, { useState, useEffect } from 'react';
import API from '../api';

const ProductForm = ({ product, onSave }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (product) {
                await API.put(`/products/${product._id}`, { name, description, price });
            } else {
                await API.post('/products', { name, description, price });
            }
            onSave();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">{product ? 'Update' : 'Add'}</button>
            </form>
        </div>
    );
};

export default ProductForm;
