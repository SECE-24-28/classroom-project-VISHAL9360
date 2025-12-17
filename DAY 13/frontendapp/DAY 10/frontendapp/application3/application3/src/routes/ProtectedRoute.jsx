import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

/**
 * ProtectedRoute Component
 * 
 * Protects routes based on authentication and role-based access control
 * 
 * @param {Array} allowedRoles - Array of roles that can access this route
 * @param {string} redirectPath - Path to redirect if access is denied
 */
const ProtectedRoute = ({ allowedRoles = [], redirectPath = '/login' }) => {
    const { user, loading, isAuthenticated } = useAuth();

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 font-semibold">
                        Verifying access...
                    </p>
                </motion.div>
            </div>
        );
    }

    // Check if user is authenticated
    if (!isAuthenticated || !user) {
        console.warn('🔒 Access denied: User not authenticated');
        return <Navigate to={redirectPath} replace />;
    }

    // Check if user has required role
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        console.warn(`🚫 Access denied: User role '${user.role}' not in allowed roles [${allowedRoles.join(', ')}]`);

        // Redirect based on user role
        if (user.role === 'admin') {
            return <Navigate to="/admin/dashboard" replace />;
        }
        return <Navigate to="/" replace />;
    }

    // User is authenticated and has required role
    console.log(`✅ Access granted: User '${user.email}' with role '${user.role}'`);
    return <Outlet />;
};

export default ProtectedRoute;
