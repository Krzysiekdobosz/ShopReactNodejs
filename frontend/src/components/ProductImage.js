import React from 'react';

const PALETTES = {
    Mountain: ['#e8f3ec', '#2f855a'],
    Road: ['#e9effb', '#2b6cb0'],
    City: ['#fdf2e7', '#c05621'],
    Kids: ['#fbecf4', '#b83280'],
    Accessories: ['#f1eefb', '#6b46c1'],
};

const Bike = ({ color, kids }) => (
    <g fill="none" stroke={color} strokeWidth={kids ? 7 : 6} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="70" cy="125" r={kids ? 30 : 38} />
        <circle cx="210" cy="125" r={kids ? 30 : 38} />
        <path d="M70 125 L115 70 L175 70 L210 125 M115 70 L140 125 L175 70 M140 125 L70 125" />
        <path d="M105 55 L130 55 M175 70 L168 48 L185 44" />
    </g>
);

const Helmet = ({ color }) => (
    <g fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M70 130 C70 70 210 55 215 120 L215 130 Z" />
        <path d="M110 80 L120 128 M150 70 L155 128 M185 78 L185 128 M95 130 L80 150 M200 130 L210 150" />
    </g>
);

const Light = ({ color }) => (
    <g fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="80" y="80" width="80" height="50" rx="14" />
        <path d="M160 92 L200 75 M160 105 L210 105 M160 118 L200 135" />
        <path d="M95 130 L95 150 L145 150" />
    </g>
);

const Lock = ({ color }) => (
    <g fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M100 120 L100 75 A40 40 0 0 1 180 75 L180 120" />
        <rect x="85" y="115" width="110" height="30" rx="8" />
        <circle cx="140" cy="130" r="4" fill={color} />
    </g>
);

const Bottle = ({ color }) => (
    <g fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M125 40 L155 40 L155 55 C175 65 175 75 175 85 L175 155 Q175 165 165 165 L115 165 Q105 165 105 155 L105 85 C105 75 105 65 125 55 Z" />
        <path d="M105 100 L175 100 M105 130 L175 130" />
    </g>
);

const accessoryIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('helmet')) return Helmet;
    if (lower.includes('light')) return Light;
    if (lower.includes('lock')) return Lock;
    return Bottle;
};

// Shows the product photo when one is set, otherwise a category illustration.
const ProductImage = ({ product, className = '' }) => {
    if (product.image) {
        return <img src={product.image} alt={product.name} className={`product-image ${className}`} loading="lazy" />;
    }

    const [background, color] = PALETTES[product.category] || PALETTES.Accessories;
    const Icon = product.category === 'Accessories' ? accessoryIcon(product.name) : null;

    return (
        <svg
            viewBox="0 0 280 200"
            className={`product-image ${className}`}
            role="img"
            aria-label={product.name}
            style={{ background }}
        >
            {Icon ? <Icon color={color} /> : <Bike color={color} kids={product.category === 'Kids'} />}
        </svg>
    );
};

export default ProductImage;
