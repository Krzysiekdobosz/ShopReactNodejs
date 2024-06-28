import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../actions/authActions';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        try {
            await dispatch(register(formData));
        } catch (err) {
            setError('Registration failed. Please check your information.');
        }
    };

    return (
        <div>
            <h1>Register</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={onSubmit}>
                <input type="text" name="name" value={formData.name} onChange={onChange} required />
                <input type="email" name="email" value={formData.email} onChange={onChange} required />
                <input type="password" name="password" value={formData.password} onChange={onChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
