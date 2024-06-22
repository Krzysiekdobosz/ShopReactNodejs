import React, { useState, useEffect } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await API.get('/products');
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container">
            <header className="jumbotron my-4">
                <h1 className="display-3">Welcome to Our Store!</h1>
                <p className="lead">Discover a variety of products at unbeatable prices. Shop now and enjoy exclusive deals!</p>
            </header>
            <div className="row text-center">
                {products.map(product => (
                    <div key={product._id} className="col-lg-3 col-md-6 mb-4">
                        <div className="card h-100">
                            <img className="card-img-top" src={`https://via.placeholder.com/150?text=${product.name}`} alt={product.name} />
                            <div className="card-body">
                                <h4 className="card-title">{product.name}</h4>
                                <p className="card-text">{product.description}</p>
                            </div>
                            <div className="card-footer">
                                <Link to="/cart" className="btn btn-primary">Add to Cart</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
