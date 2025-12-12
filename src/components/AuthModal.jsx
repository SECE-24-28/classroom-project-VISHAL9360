import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const AuthModal = ({ isOpen, onClose }) => {
    const { loginUser, addNotification } = useAppContext();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!isLogin && !formData.name) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!isLogin && !formData.mobile) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!isLogin && !/^[6-9]\d{9}$/.test(formData.mobile)) {
            newErrors.mobile = 'Invalid mobile number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Simulate login/signup
        const userData = {
            name: formData.name || formData.email.split('@')[0],
            email: formData.email,
            mobile: formData.mobile || '9999999999',
            joinedDate: new Date().toISOString()
        };

        loginUser(userData);
        addNotification(
            isLogin ? 'Login successful!' : 'Account created successfully!',
            'success'
        );
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fadeIn">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl"
                >
                    ✕
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-3xl">🔐</span>
                    </div>
                    <h2 className="text-3xl font-bold gradient-text">
                        {isLogin ? 'Welcome Back!' : 'Create Account'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        {isLogin ? 'Login to continue' : 'Sign up to get started'}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                                className={`w-full px-4 py-3 rounded-lg border-2 ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    } focus:border-indigo-500 focus:outline-none transition-colors dark:bg-gray-700 dark:text-white`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className={`w-full px-4 py-3 rounded-lg border-2 ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                } focus:border-indigo-500 focus:outline-none transition-colors dark:bg-gray-700 dark:text-white`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                Mobile Number
                            </label>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                placeholder="Enter 10-digit mobile number"
                                maxLength="10"
                                className={`w-full px-4 py-3 rounded-lg border-2 ${errors.mobile ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    } focus:border-indigo-500 focus:outline-none transition-colors dark:bg-gray-700 dark:text-white`}
                            />
                            {errors.mobile && (
                                <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                            )}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            className={`w-full px-4 py-3 rounded-lg border-2 ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                } focus:border-indigo-500 focus:outline-none transition-colors dark:bg-gray-700 dark:text-white`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {isLogin && (
                        <div className="text-right">
                            <a href="#forgot" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                                Forgot Password?
                            </a>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-200"
                    >
                        {isLogin ? '🚀 Login' : '✨ Create Account'}
                    </button>
                </form>

                {/* Social Login */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold">
                            🔵 Google
                        </button>
                        <button className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold">
                            📱 Phone
                        </button>
                    </div>
                </div>

                {/* Toggle Login/Signup */}
                <div className="mt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                        <button
                            type="button"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setErrors({});
                            }}
                            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
