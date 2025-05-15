import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ adminRequired = false }) => {
  const token = localStorage.getItem('logintoken');
  const role = localStorage.getItem('role');  
  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (adminRequired && role !== 'admin') {
    return <Navigate to="/employees" replace />;
  }

  return <Outlet />;
}
export default PrivateRoutes
