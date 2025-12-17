import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor - Attach JWT token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor - Handle errors globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Handle 401 - Unauthorized (Token expired or invalid)
            if (error.response.status === 401) {
                // Clear auth data
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                
                // Redirect to login
                window.location.href = '/login';
                
                return Promise.reject({
                    message: 'Session expired. Please login again.',
                    status: 401
                });
            }
            
            // Handle 403 - Forbidden (Insufficient permissions)
            if (error.response.status === 403) {
                return Promise.reject({
                    message: 'You do not have permission to perform this action.',
                    status: 403
                });
            }
            
            // Handle other errors
            return Promise.reject({
                message: error.response.data.message || 'An error occurred',
                status: error.response.status,
                data: error.response.data
            });
        }
        
        // Network error
        return Promise.reject({
            message: 'Network error. Please check your connection.',
            status: 0
        });
    }
);

// Get all plans
export const getAllPlans = async () => {
    try {
        const response = await api.get('/plans');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// Create a new plan
export const createPlan = async (planData) => {
    try {
        const response = await api.post('/plans', planData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// Update a plan
export const updatePlan = async (id, planData) => {
    try {
        const response = await api.put(`/plans/${id}`, planData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// Delete a plan
export const deletePlan = async (id) => {
    try {
        const response = await api.delete(`/plans/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// Create a transaction
export const createTransaction = async (transactionData) => {
    try {
        const response = await api.post('/transactions', transactionData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// Get all users (Admin)
export const getAllUsers = async () => {
    try {
        const response = await api.get('/auth/users');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// Get all transactions (Admin)
export const getAllTransactions = async () => {
    try {
        const response = await api.get('/transactions');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// Get my transactions
export const getMyTransactions = async () => {
    try {
        const response = await api.get('/transactions/my');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export default api;
