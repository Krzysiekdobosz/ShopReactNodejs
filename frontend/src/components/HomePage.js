import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { getProducts } from '../actions/productActions';
import ProductCard from './ProductCard';
import ProductImage from './ProductImage';
import Loader from './Loader';

const CATEGORY_TILES = [
    { category: 'Mountain', title: 'Mountain bikes', text: 'Durable bikes for trails and forest paths.', sample: 'Trailblazer' },
    { category: 'Road', title: 'Road & gravel', text: 'Fast and light for long rides.', sample: 'Velocity' },
    { category: 'City', title: 'City bikes', text: 'Comfortable everyday commuting.', sample: 'Urban' },
    { category: 'Accessories', title: 'Accessories', text: 'Helmets, lights, locks and more.', sample: 'Aero Helmet' },
];

const HomePage = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProducts({ sortBy: 'createdAt', order: 'desc' }));
    }, [dispatch]);

    return (
        <>
            <section className="hero">
                <Container>
                    <Row className="align-items-center g-5">
                        <Col lg={6}>
                            <span className="hero__eyebrow">New season collection</span>
                            <h1 className="hero__title">Find the bike that fits your ride</h1>
                            <p className="hero__lead">
                                Mountain, road, city and kids&apos; bikes plus all the gear you need &ndash;
                                carefully selected and ready to ride.
                            </p>
                            <div className="d-flex gap-2 flex-wrap">
                                <Button as={Link} to="/products" size="lg">Shop now</Button>
                                <Button as={Link} to="/products?category=Accessories" size="lg" variant="outline-secondary">
                                    Browse accessories
                                </Button>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <ProductImage product={{ name: 'Featured bike', category: 'Road' }} className="hero__image" />
                        </Col>
                    </Row>
                </Container>
            </section>

            <Container className="py-5">
                <h2 className="section-title">Shop by category</h2>
                <Row className="g-3 mb-5">
                    {CATEGORY_TILES.map((tile) => (
                        <Col sm={6} lg={3} key={tile.category}>
                            <Link to={`/products?category=${tile.category}`} className="category-tile">
                                <ProductImage product={{ name: tile.sample, category: tile.category }} />
                                <div>
                                    <h3>{tile.title}</h3>
                                    <p>{tile.text}</p>
                                </div>
                            </Link>
                        </Col>
                    ))}
                </Row>

                <div className="d-flex justify-content-between align-items-end mb-3">
                    <h2 className="section-title mb-0">New arrivals</h2>
                    <Link to="/products">See all &rarr;</Link>
                </div>
                {loading ? (
                    <Loader />
                ) : (
                    <Row className="g-4">
                        {products.slice(0, 4).map((product) => (
                            <Col sm={6} lg={3} key={product._id}>
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </>
    );
};

export default HomePage;
