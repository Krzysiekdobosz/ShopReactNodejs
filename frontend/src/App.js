import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import Cart from './components/Cart';
import Home from './components/Home';
import Navbar from './components/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <div>
              <Navbar />
              <div className="container">

                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/" element={<Home />} />
                </Routes>
                </div>
                


            </div>
        </Router>
    );
}

export default App;