import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../actions/productActions';
import { Container, Row, Col, Button, Form, Card, Modal, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import '../styles/AdminDashboard.css'; 

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector(state => state.products);
    const [formData, setFormData] = useState({ name: '', description: '', price: '', category: '', image: '' });
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const handleClose = () => {
        setShow(false);
        setFormData({ name: '', description: '', price: '', category: '', image: '' });
        setEditMode(false);
        setEditId(null);
    };
    const handleShow = () => setShow(true);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        if (editMode) {
            dispatch(updateProduct(editId, formData));
            toast.success('Product updated successfully!');
        } else {
            dispatch(addProduct(formData));
            toast.success('Product added successfully!');
        }
        handleClose();
    };

    const onEdit = (product) => {
        setFormData(product);
        setEditMode(true);
        setEditId(product._id);
        handleShow();
    };

    const onDelete = (id) => {
        dispatch(deleteProduct(id));
        toast.success('Product deleted successfully!');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="admin-dashboard mt-5">
            <h1 className="mb-4 text-center">Admin Dashboard</h1>
            <Button variant="primary" onClick={handleShow} className="mb-4">Add Product</Button>
            <Row>
                {products.map(product => (
                    <Col md={4} key={product._id} className="mb-4">
                        <Card className="product-card shadow-sm">
                            <Image src={product.image} alt={product.name} fluid className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text><strong>${product.price}</strong></Card.Text>
                                <Button variant="secondary" onClick={() => onEdit(product)} className="me-2">Edit</Button>
                                <Button variant="danger" onClick={() => onDelete(product._id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? 'Edit Product' : 'Add Product'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="name" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={onChange} required />
                        </Form.Group>
                        <Form.Group controlId="description" className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name="description" value={formData.description} onChange={onChange} required />
                        </Form.Group>
                        <Form.Group controlId="price" className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" name="price" value={formData.price} onChange={onChange} required />
                        </Form.Group>
                        <Form.Group controlId="category" className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" name="category" value={formData.category} onChange={onChange} required />
                        </Form.Group>
                        <Form.Group controlId="image" className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type="text" name="image" value={formData.image} onChange={onChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            {editMode ? 'Update Product' : 'Add Product'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default AdminDashboard;
