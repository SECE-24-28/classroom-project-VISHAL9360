import axios from 'axios';

// Base URL Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default configuration
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor - Attach JWT token to every request
axiosInstance.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('token');

        // If token exists, add it to Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Log request in development mode
        if (import.meta.env.DEV) {
            console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        }

        return config;
    },
    (error) => {
        // Handle request error
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// Response Interceptor - Handle responses and errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        // Log successful response in development mode
        if (import.meta.env.DEV) {
            console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
        }

        return response;
    },
    (error) => {
        // Handle different error scenarios
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            // Log error in development mode
            if (import.meta.env.DEV) {
                console.error(`❌ API Error [${status}]:`, data);
            }

            switch (status) {
                case 401:
                    // Unauthorized - Token expired or invalid
                    console.warn('🔒 Session expired. Logging out...');

                    // Clear authentication data
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');

                    // Redirect to login page
                    if (window.location.pathname !== '/login') {
                        window.location.href = '/login';
                    }

                    return Promise.reject({
                        message: 'Session expired. Please login again.',
                        status: 401,
                    });

                case 403:
                    // Forbidden - Insufficient permissions
                    console.warn('🚫 Access denied. Insufficient permissions.');
                    return Promise.reject({
                        message: 'You do not have permission to perform this action.',
                        status: 403,
                    });

                case 404:
                    // Not Found
                    return Promise.reject({
                        message: data.message || 'Resource not found.',
                        status: 404,
                    });

                case 422:
                    // Validation Error
                    return Promise.reject({
                        message: data.message || 'Validation failed.',
                        errors: data.errors || {},
                        status: 422,
                    });

                case 500:
                    // Internal Server Error
                    return Promise.reject({
                        message: 'Server error. Please try again later.',
                        status: 500,
                    });

                default:
                    // Other errors
                    return Promise.reject({
                        message: data.message || 'An error occurred.',
                        status,
                        data,
                    });
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error('🌐 Network Error: No response from server');
            return Promise.reject({
                message: 'Network error. Please check your internet connection.',
                status: 0,
            });
        } else {
            // Something else happened
            console.error('⚠️ Error:', error.message);
            return Promise.reject({
                message: error.message || 'An unexpected error occurred.',
                status: -1,
            });
        }
    }
);

// Export configured axios instance
export default axiosInstance;

// Export base URL for reference
export { API_BASE_URL };
