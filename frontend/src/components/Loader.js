import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => (
    <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Loading…</span>
        </Spinner>
    </div>
);

export default Loader;
