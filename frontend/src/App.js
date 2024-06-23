import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import Cart from './components/Cart';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Admin from './components/Admin';
import { AuthProvider } from './context/AuthContext';


import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <div>
              <Navbar />
              <div className="container mt-3">

                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    
                    <Route path="/" element={<Home />} />
                </Routes>
                </div>
                


            </div>
        </Router>
    );
}

export default App;