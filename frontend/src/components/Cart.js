import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { clearCart, getCart, removeFromCart, updateCartItem } from '../actions/cartActions';
import { selectCartTotal } from '../reducers/cartReducer';
import ProductImage from './ProductImage';
import Loader from './Loader';
import { formatPrice } from '../utils/format';

const FREE_SHIPPING_FROM = 100;
const SHIPPING_COST = 15;

const Cart = () => {
    const dispatch = useDispatch();
    const { cart, loading } = useSelector((state) => state.cart);
    const subtotal = useSelector(selectCartTotal);

    useEffect(() => {
        dispatch(getCart()).catch((err) => toast.error(err.message));
    }, [dispatch]);

    const run = (action) => dispatch(action).catch((err) => toast.error(err.message));

    const handleCheckout = async () => {
        await run(clearCart());
        toast.success('Thank you! Your order has been placed.');
    };

    if (loading) return <Loader />;

    const items = cart.products;
    const shipping = subtotal >= FREE_SHIPPING_FROM || subtotal === 0 ? 0 : SHIPPING_COST;

    if (!items.length) {
        return (
            <Container className="py-5">
                <div className="empty-state">
                    <h1>Your cart is empty</h1>
                    <p>Looks like you haven&apos;t added anything yet.</p>
                    <Button as={Link} to="/products">Start shopping</Button>
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <div className="page-heading">
                <h1>Your cart</h1>
            </div>
            <Row className="g-4">
                <Col lg={8}>
                    <Card className="cart-card">
                        {items.map(({ product, quantity }) => (
                            <div className="cart-item" key={product._id}>
                                <Link to={`/product/${product._id}`} className="cart-item__image">
                                    <ProductImage product={product} />
                                </Link>
                                <div className="cart-item__info">
                                    <Link to={`/product/${product._id}`} className="cart-item__name">{product.name}</Link>
                                    <span className="text-muted small">{formatPrice(product.price)} each</span>
                                </div>
                                <Form.Select
                                    className="cart-item__qty"
                                    aria-label={`Quantity of ${product.name}`}
                                    value={quantity}
                                    onChange={(e) => run(updateCartItem(product._id, Number(e.target.value)))}
                                >
                                    {Array.from({ length: Math.max(10, quantity) }, (_, i) => i + 1).map((n) => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </Form.Select>
                                <strong className="cart-item__total">{formatPrice(product.price * quantity)}</strong>
                                <Button
                                    variant="link"
                                    className="text-danger p-0"
                                    onClick={() => run(removeFromCart(product._id))}
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className="summary-card">
                        <Card.Body>
                            <h2 className="h5 mb-3">Order summary</h2>
                            <dl className="summary-list">
                                <dt>Subtotal</dt>
                                <dd>{formatPrice(subtotal)}</dd>
                                <dt>Shipping</dt>
                                <dd>{shipping ? formatPrice(shipping) : 'Free'}</dd>
                                <dt className="summary-list__total">Total</dt>
                                <dd className="summary-list__total">{formatPrice(subtotal + shipping)}</dd>
                            </dl>
                            {shipping > 0 && (
                                <p className="small text-muted">
                                    Add {formatPrice(FREE_SHIPPING_FROM - subtotal)} more for free delivery.
                                </p>
                            )}
                            <Button className="w-100" size="lg" onClick={handleCheckout}>Checkout</Button>
                            <Button as={Link} to="/products" variant="link" className="w-100 mt-2">
                                Continue shopping
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
