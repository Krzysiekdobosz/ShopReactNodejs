import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/format';
import useShopActions from '../hooks/useShopActions';

const ProductCard = ({ product }) => {
    const { handleAddToCart, handleToggleSaved, isSaved } = useShopActions();
    const saved = isSaved(product._id);

    return (
        <Card className="product-card h-100">
            <Link to={`/product/${product._id}`} className="product-card__image">
                <ProductImage product={product} />
            </Link>
            <button
                type="button"
                className={`save-toggle ${saved ? 'is-saved' : ''}`}
                onClick={() => handleToggleSaved(product)}
                aria-label={saved ? `Remove ${product.name} from saved` : `Save ${product.name} for later`}
                aria-pressed={saved}
            >
                {saved ? '♥' : '♡'}
            </button>
            <Card.Body className="d-flex flex-column">
                <span className="product-card__category">{product.category}</span>
                <Card.Title as="h3" className="product-card__title">
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                </Card.Title>
                <Card.Text className="product-card__description">{product.description}</Card.Text>
                <div className="mt-auto d-flex align-items-center justify-content-between">
                    <span className="product-card__price">{formatPrice(product.price)}</span>
                    <Button variant="primary" size="sm" onClick={() => handleAddToCart(product)}>
                        Add to cart
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
