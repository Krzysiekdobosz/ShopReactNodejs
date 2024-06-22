import React, { useState } from 'react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

const AdminDashboard = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
    };

    const handleSaveProduct = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="container">
            <h2>Admin Dashboard</h2>
            <ProductList onEdit={handleEditProduct} />
            <ProductForm product={selectedProduct} onSave={handleSaveProduct} />
        </div>
    );
};

export default AdminDashboard;
