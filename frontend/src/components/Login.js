import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { login } from '../actions/authActions';
import { isDemo } from '../api';
import { DEMO_ACCOUNTS } from '../api/mock';
import AuthForm from './AuthForm';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const signIn = async (credentials) => {
        setSubmitting(true);
        setError(null);
        try {
            const user = await dispatch(login(credentials));
            toast.success(`Welcome back, ${user.name.split(' ')[0]}!`);
            navigate(location.state?.from || '/products', { replace: true });
        } catch (err) {
            setError(err.message);
            setSubmitting(false);
        }
    };

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();
        signIn(formData);
    };

    return (
        <AuthForm
            title="Log in"
            subtitle="Access your cart, saved items and orders."
            footer={<>New here? <Link to="/register">Create an account</Link></>}
        >
            {isDemo && (
                <div className="demo-accounts">
                    <span>Try a test account:</span>
                    <div className="d-flex gap-2 flex-wrap">
                        {DEMO_ACCOUNTS.map((account) => (
                            <Button
                                key={account.email}
                                variant="outline-primary"
                                size="sm"
                                disabled={submitting}
                                onClick={() => signIn(account)}
                            >
                                {account.label}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={onChange} autoComplete="email" required />
                </Form.Group>
                <Form.Group controlId="password" className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={formData.password} onChange={onChange} autoComplete="current-password" required />
                </Form.Group>
                <Button type="submit" className="w-100" size="lg" disabled={submitting}>
                    {submitting ? 'Logging in…' : 'Log in'}
                </Button>
            </Form>
        </AuthForm>
    );
};

export default Login;
