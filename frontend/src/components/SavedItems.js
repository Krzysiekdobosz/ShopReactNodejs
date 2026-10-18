import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getSavedItems } from '../actions/savedActions';
import ProductCard from './ProductCard';
import Loader from './Loader';

const SavedItems = () => {
    const dispatch = useDispatch();
    const { savedItems, loading } = useSelector((state) => state.saved);

    useEffect(() => {
        dispatch(getSavedItems()).catch((err) => toast.error(err.message));
    }, [dispatch]);

    if (loading) return <Loader />;

    return (
        <Container className="py-5">
            <div className="page-heading">
                <h1>Saved items</h1>
                <p className="text-muted mb-0">Products you want to come back to.</p>
            </div>
            {savedItems.length ? (
                <Row className="g-4">
                    {savedItems.map((product) => (
                        <Col sm={6} lg={4} xl={3} key={product._id}>
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <div className="empty-state">
                    <p>You have no saved items yet. Tap the heart on any product to save it.</p>
                    <Button as={Link} to="/products">Browse products</Button>
                </div>
            )}
        </Container>
    );
};

export default SavedItems;
