import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authActions';
import { Container, Form, Button, Card } from 'react-bootstrap';
import '../styles/Login.css';  // Dodanie pliku CSS

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        try {
            await dispatch(login(formData));
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Card className="login-card shadow p-4">
                <h1 className="mb-4 text-center">Login</h1>
                {error && <p className="text-danger">{error}</p>}
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="email" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={onChange}
                            required
                            placeholder="Enter your email"
                        />
                    </Form.Group>
                    <Form.Group controlId="password" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={onChange}
                            required
                            placeholder="Enter your password"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Login
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Login;
