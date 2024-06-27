import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, removeFromCart } from '../actions/cartActions';

const Cart = () => {
    const dispatch = useDispatch();
    const { cart, loading } = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!cart || !cart.products) {
        return <div>Your cart is empty.</div>;
    }

    return (
        <div className="cart">
            <h1>Your Cart</h1>
            {cart.products.length > 0 ? (
                cart.products.map(item => (
                    <div key={item.product._id} className="cart-item">
                        <h2>{item.product.name}</h2>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => dispatch(removeFromCart(item.product._id))}>Remove</button>
                    </div>
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
