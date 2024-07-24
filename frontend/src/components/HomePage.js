import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';  
const HomePage = () => {
    return (
        <Container className="homepage mt-5">
            <Row className="text-center mb-5">
                <Col>
                    <h1 className="display-4">Welcome to Mini Bike Shop</h1>
                    <p className="lead">Your one-stop shop for the best mini bikes.</p>
                    <Button variant="primary" size="lg" as={Link} to="/products">Shop Now</Button>
                </Col>
            </Row>
            <Row>
                <Col md={4} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Img variant="top" src="https://via.placeholder.com/400x200" alt="Mountain Bike" />
                        <Card.Body>
                            <Card.Title>Mountain Bikes</Card.Title>
                            <Card.Text>
                                Explore our range of durable and reliable mountain bikes.
                            </Card.Text>
                            <Button variant="primary" as={Link} to="/products">View Products</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Img variant="top" src="https://via.placeholder.com/400x200" alt="Road Bike" />
                        <Card.Body>
                            <Card.Title>Road Bikes</Card.Title>
                            <Card.Text>
                                Check out our collection of high-performance road bikes.
                            </Card.Text>
                            <Button variant="primary" as={Link} to="/products">View Products</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Img variant="top" src="https://via.placeholder.com/400x200" alt="Accessories" />
                        <Card.Body>
                            <Card.Title>Accessories</Card.Title>
                            <Card.Text>
                                Discover our wide range of bike accessories and gear.
                            </Card.Text>
                            <Button variant="primary" as={Link} to="/products">View Products</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
