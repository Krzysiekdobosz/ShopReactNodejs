import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addProduct, deleteProduct, getCategories, getProducts, updateProduct } from '../actions/productActions';
import ProductImage from './ProductImage';
import Loader from './Loader';
import { formatPrice } from '../utils/format';

const emptyForm = { name: '', description: '', price: '', category: '', image: '', stock: '10' };

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { products, categories, loading } = useSelector((state) => state.products);
    const [formData, setFormData] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [show, setShow] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCategories());
    }, [dispatch]);

    const handleClose = () => {
        setShow(false);
        setFormData(emptyForm);
        setEditId(null);
    };

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const data = { ...formData, price: Number(formData.price), stock: Number(formData.stock) };
        try {
            if (editId) {
                await dispatch(updateProduct(editId, data));
                toast.success('Product updated');
            } else {
                await dispatch(addProduct(data));
                toast.success('Product added');
            }
            handleClose();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setSaving(false);
        }
    };

    const onEdit = (product) => {
        const { name, description, price, category, image, stock } = product;
        setFormData({ name, description, price: String(price), category, image: image || '', stock: String(stock ?? 0) });
        setEditId(product._id);
        setShow(true);
    };

    const onDelete = async (product) => {
        if (!window.confirm(`Delete "${product.name}"?`)) return;
        try {
            await dispatch(deleteProduct(product._id));
            toast.success('Product deleted');
        } catch (err) {
            toast.error(err.message);
        }
    };

    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
    const inventoryValue = products.reduce((sum, p) => sum + p.price * (p.stock || 0), 0);

    return (
        <Container className="py-5">
            <div className="page-heading d-flex justify-content-between align-items-end flex-wrap gap-3">
                <div>
                    <h1>Admin dashboard</h1>
                    <p className="text-muted mb-0">Manage the product catalogue.</p>
                </div>
                <Button onClick={() => setShow(true)}>+ Add product</Button>
            </div>

            <Row className="g-3 mb-4">
                {[
                    ['Products', products.length],
                    ['Items in stock', totalStock],
                    ['Inventory value', formatPrice(inventoryValue)],
                ].map(([label, value]) => (
                    <Col sm={4} key={label}>
                        <Card className="stat-card">
                            <Card.Body>
                                <span>{label}</span>
                                <strong>{value}</strong>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {loading ? (
                <Loader />
            ) : (
                <Card className="table-card">
                    <Table responsive hover className="mb-0 align-middle">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th className="text-end">Price</th>
                                <th className="text-end">Stock</th>
                                <th aria-label="Actions" />
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>
                                        <div className="d-flex align-items-center gap-3">
                                            <ProductImage product={product} className="table-thumb" />
                                            <span className="fw-semibold">{product.name}</span>
                                        </div>
                                    </td>
                                    <td>{product.category}</td>
                                    <td className="text-end">{formatPrice(product.price)}</td>
                                    <td className={`text-end ${product.stock < 3 ? 'text-danger fw-semibold' : ''}`}>{product.stock}</td>
                                    <td className="text-end text-nowrap">
                                        <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => onEdit(product)}>
                                            Edit
                                        </Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => onDelete(product)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            )}

            <Modal show={show} onHide={handleClose} centered>
                <Form onSubmit={onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editId ? 'Edit product' : 'Add product'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="name" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" value={formData.name} onChange={onChange} required />
                        </Form.Group>
                        <Form.Group controlId="description" className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={onChange} required />
                        </Form.Group>
                        <Row className="g-3 mb-3">
                            <Col>
                                <Form.Group controlId="price">
                                    <Form.Label>Price ($)</Form.Label>
                                    <Form.Control type="number" min="0" step="0.01" name="price" value={formData.price} onChange={onChange} required />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="stock">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control type="number" min="0" name="stock" value={formData.stock} onChange={onChange} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="category" className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select name="category" value={formData.category} onChange={onChange} required>
                                <option value="">Choose…</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="image">
                            <Form.Label>Image URL (optional)</Form.Label>
                            <Form.Control type="url" name="image" value={formData.image} onChange={onChange} placeholder="https://…" />
                            <Form.Text>Without an image the product gets an illustration of its category.</Form.Text>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={handleClose}>Cancel</Button>
                        <Button type="submit" disabled={saving}>{editId ? 'Save changes' : 'Add product'}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default AdminDashboard;
