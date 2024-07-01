import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../actions/productActions';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector(state => state.products);
    const [formData, setFormData] = useState({ name: '', description: '', price: '', category: '', image: '' });
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        if (editMode) {
            dispatch(updateProduct(editId, formData));
            setEditMode(false);
            setEditId(null);
        } else {
            dispatch(addProduct(formData));
        }
        setFormData({ name: '', description: '', price: '', category: '', image: '' });
    };

    const onEdit = (product) => {
        setFormData(product);
        setEditMode(true);
        setEditId(product._id);
    };

    const onDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="admin-dashboard container mt-5">
            <h1 className="mb-4">Admin Dashboard</h1>
            <form onSubmit={onSubmit} className="mb-5">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={onChange} placeholder="Name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={formData.description} onChange={onChange} placeholder="Description" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={onChange} placeholder="Price" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input type="text" className="form-control" id="category" name="category" value={formData.category} onChange={onChange} placeholder="Category" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image URL</label>
                    <input type="text" className="form-control" id="image" name="image" value={formData.image} onChange={onChange} placeholder="Image URL" required />
                </div>
                <button type="submit" className="btn btn-primary">{editMode ? 'Update Product' : 'Add Product'}</button>
            </form>
            <div className="product-list row">
                {products.map(product => (
                    <div key={product._id} className="product-item col-md-4 mb-4">
                        <div className="card">
                            <img src={product.image} className="card-img-top" alt={product.name} style={{ height: '200px', objectFit: 'cover' }} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text"><strong>${product.price}</strong></p>
                                <button onClick={() => onEdit(product)} className="btn btn-secondary me-2">Edit</button>
                                <button onClick={() => onDelete(product._id)} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
