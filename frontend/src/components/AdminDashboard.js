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
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <form onSubmit={onSubmit}>
                <input type="text" name="name" value={formData.name} onChange={onChange} placeholder="Name" required />
                <input type="text" name="description" value={formData.description} onChange={onChange} placeholder="Description" required />
                <input type="number" name="price" value={formData.price} onChange={onChange} placeholder="Price" required />
                <input type="text" name="category" value={formData.category} onChange={onChange} placeholder="Category" required />
                <input type="text" name="image" value={formData.image} onChange={onChange} placeholder="Image URL" required />
                <button type="submit">{editMode ? 'Update Product' : 'Add Product'}</button>
            </form>
            <div className="product-list">
                {products.map(product => (
                    <div key={product._id} className="product-item">
                        <h2>{product.name}</h2>
                        <img src={product.image} alt={product.name} style={{ width: '200px', height: 'auto' }} />
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        <button onClick={() => onEdit(product)}>Edit</button>
                        <button onClick={() => onDelete(product._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
