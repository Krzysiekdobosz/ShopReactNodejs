import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const NotFound = () => (
    <Container className="py-5">
        <div className="empty-state">
            <h1>Page not found</h1>
            <p>The page you are looking for does not exist.</p>
            <Button as={Link} to="/">Go to the homepage</Button>
        </div>
    </Container>
);

export default NotFound;
