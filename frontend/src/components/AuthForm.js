import React from 'react';
import { Card, Container } from 'react-bootstrap';

const AuthForm = ({ title, subtitle, children, footer }) => (
    <Container className="auth-page">
        <Card className="auth-card">
            <Card.Body>
                <h1 className="h3 mb-1">{title}</h1>
                <p className="text-muted mb-4">{subtitle}</p>
                {children}
                <p className="text-center text-muted mt-4 mb-0">{footer}</p>
            </Card.Body>
        </Card>
    </Container>
);

export default AuthForm;
