import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const PrivateRoute = ({ adminOnly = false }) => {
    const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
    const location = useLocation();

    if (loading) return <Loader />;
    if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    if (adminOnly && user?.role !== 'admin') return <Navigate to="/" replace />;

    return <Outlet />;
};

export default PrivateRoute;
