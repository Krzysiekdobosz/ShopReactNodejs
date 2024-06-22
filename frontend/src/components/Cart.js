import React, { useState, useEffect } from 'react';
import API from '../api';
import { jwtDecode } from 'jwt-decode';
const Cart = () => {
    const [cart, setCart] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            const userId = jwtDecode(localStorage.getItem('token')).id;
            const { data } = await API.get(`/cart/${userId}`);
            setCart(data);
        };

        fetchCart();
    }, []);

    const handleRemoveItem = async (productId) => {
        const userId = jwtDecode(localStorage.getItem('token')).id;
        await API.delete(`/cart/${userId}/${productId}`);
        setCart(cart.items.filter(item => item.product._id !== productId));
    };

    if (!cart) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h2>Cart</h2>
            <ul className="list-group">
                {cart.items.map(item => (
                    <li key={item.product._id} className="list-group-item">
                        {item.product.name} - {item.quantity}
                        <button className="btn btn-danger float-right" onClick={() => handleRemoveItem(item.product._id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
