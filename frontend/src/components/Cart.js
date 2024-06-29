import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';

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
                        <img src={item.product.image} alt={item.product.name} style={{ width: '200px', height: 'auto' }} />
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${item.product.price}</p>
                        <button onClick={() => dispatch(removeFromCart(item.product._id))}>Remove</button>
                        <Link to={`/product/${item.product._id}`}><button>View Details</button></Link>
                    </div>
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
