import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { register } from '../actions/authActions';
import AuthForm from './AuthForm';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            await dispatch(register(formData));
            toast.success('Your account is ready. Happy shopping!');
            navigate('/products', { replace: true });
        } catch (err) {
            setError(err.message);
            setSubmitting(false);
        }
    };

    return (
        <AuthForm
            title="Create an account"
            subtitle="Save products, build your cart and check out faster."
            footer={<>Already have an account? <Link to="/login">Log in</Link></>}
        >
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="name" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" value={formData.name} onChange={onChange} autoComplete="name" required />
                </Form.Group>
                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={onChange} autoComplete="email" required />
                </Form.Group>
                <Form.Group controlId="password" className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={onChange}
                        autoComplete="new-password"
                        minLength={6}
                        required
                    />
                    <Form.Text>At least 6 characters.</Form.Text>
                </Form.Group>
                <Button type="submit" className="w-100" size="lg" disabled={submitting}>
                    {submitting ? 'Creating account…' : 'Sign up'}
                </Button>
            </Form>
        </AuthForm>
    );
};

export default Register;
