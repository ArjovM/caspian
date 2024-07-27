import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { isLoggedIn } from '../pages/auth';

const ProtectedRoute = ({ element, ...rest }) => {
  return isLoggedIn() ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;