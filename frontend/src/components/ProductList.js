import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { getCategories, getProducts } from '../actions/productActions';
import ProductCard from './ProductCard';
import Loader from './Loader';

const SORT_OPTIONS = [
    { value: 'createdAt:desc', label: 'Newest' },
    { value: 'price:asc', label: 'Price: low to high' },
    { value: 'price:desc', label: 'Price: high to low' },
    { value: 'name:asc', label: 'Name: A–Z' },
];

const FILTER_KEYS = ['search', 'category', 'minPrice', 'maxPrice', 'sort'];

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, categories, loading, error } = useSelector((state) => state.products);
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');

    const filters = Object.fromEntries(FILTER_KEYS.map((key) => [key, searchParams.get(key) || '']));
    const [sortBy, order] = (filters.sort || SORT_OPTIONS[0].value).split(':');
    const queryKey = searchParams.toString();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getProducts({ ...filters, sortBy, order }));
        // The query string is the single source of truth for the filters.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, queryKey]);

    // Debounce the search box so we do not query on every keystroke.
    useEffect(() => {
        const timeout = setTimeout(() => updateFilter('search', search.trim()), 300);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    function updateFilter(key, value) {
        setSearchParams((params) => {
            const next = new URLSearchParams(params);
            if (value) next.set(key, value);
            else next.delete(key);
            return next;
        }, { replace: true });
    }

    const resetFilters = () => {
        setSearch('');
        setSearchParams({}, { replace: true });
    };

    const hasFilters = FILTER_KEYS.some((key) => filters[key]);
    let title = 'All products';
    if (filters.category === 'Accessories') title = 'Accessories';
    else if (filters.category) title = `${filters.category} bikes`;

    return (
        <Container className="py-5">
            <div className="page-heading">
                <h1>{title}</h1>
                <p className="text-muted mb-0">{loading ? 'Loading…' : `${products.length} products`}</p>
            </div>

            <Row className="g-4">
                <Col lg={3}>
                    <aside className="filters-panel">
                        <Form.Group className="mb-3" controlId="search">
                            <Form.Label>Search</Form.Label>
                            <Form.Control
                                type="search"
                                placeholder="e.g. helmet"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label as="span" className="d-block">Category</Form.Label>
                            <div className="category-pills">
                                <button
                                    type="button"
                                    className={!filters.category ? 'active' : ''}
                                    onClick={() => updateFilter('category', '')}
                                >
                                    All
                                </button>
                                {categories.map((category) => (
                                    <button
                                        type="button"
                                        key={category}
                                        className={filters.category === category ? 'active' : ''}
                                        onClick={() => updateFilter('category', category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Label as="span" className="d-block">Price ($)</Form.Label>
                        <Row className="g-2 mb-3">
                            <Col>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    placeholder="Min"
                                    aria-label="Minimum price"
                                    value={filters.minPrice}
                                    onChange={(e) => updateFilter('minPrice', e.target.value)}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    placeholder="Max"
                                    aria-label="Maximum price"
                                    value={filters.maxPrice}
                                    onChange={(e) => updateFilter('maxPrice', e.target.value)}
                                />
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="sort">
                            <Form.Label>Sort by</Form.Label>
                            <Form.Select value={`${sortBy}:${order}`} onChange={(e) => updateFilter('sort', e.target.value)}>
                                {SORT_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        {hasFilters && (
                            <Button variant="outline-secondary" size="sm" className="w-100" onClick={resetFilters}>
                                Clear filters
                            </Button>
                        )}
                    </aside>
                </Col>

                <Col lg={9}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {loading ? (
                        <Loader />
                    ) : products.length ? (
                        <Row className="g-4">
                            {products.map((product) => (
                                <Col sm={6} xl={4} key={product._id}>
                                    <ProductCard product={product} />
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <div className="empty-state">
                            <p>No products match your filters.</p>
                            <Button variant="outline-primary" onClick={resetFilters}>Clear filters</Button>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ProductList;
