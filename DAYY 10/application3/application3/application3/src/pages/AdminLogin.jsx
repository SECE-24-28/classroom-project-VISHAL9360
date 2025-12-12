import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../components/Button';
import Card from '../components/Card';

// Schema
const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 chars')
});

const AdminLogin = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = (data) => {
        setIsLoading(true);
        // Simulate login
        setTimeout(() => {
            if (data.email === 'admin@flashypay.com' && data.password === 'admin') {
                setSuccess(true);
                setTimeout(() => {
                    setIsLoading(false);
                    navigate('/admin/dashboard');
                }, 1000);
            } else {
                setSuccess(true); // Mock success for demo
                setTimeout(() => {
                    setIsLoading(false);
                    navigate('/admin/dashboard');
                }, 1000);
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden font-sans">
            {/* Animated Background */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-950 to-black"></div>
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]"
                />
            </div>

            <div className="container-custom px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md mx-auto"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30"
                        >
                            <Shield className="w-10 h-10 text-white" strokeWidth={2.5} />
                        </motion.div>
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                            Admin Portal
                        </h1>
                        <p className="text-gray-400">
                            Secure access for system administrators
                        </p>
                    </div>

                    {/* Login Card */}
                    <Card variant="glass" className="border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                                    <input
                                        type="email"
                                        {...register('email')}
                                        placeholder="admin@flashypay.com"
                                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    />
                                </div>
                                {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email.message}</p>}
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password')}
                                        placeholder="Enter your password"
                                        className="w-full pl-12 pr-12 py-4 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{errors.password.message}</p>}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-gray-300 transition-colors">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900" />
                                    Remember me
                                </label>
                                <a href="#" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Login Button */}
                            <Button
                                type="submit"
                                variant="primary"
                                className={`w-full text-lg font-bold py-4 shadow-lg shadow-blue-600/20 ${success ? '!bg-green-500 !text-white' : ''}`}
                                loading={isLoading}
                                disabled={isLoading || success}
                            >
                                {success ? (
                                    <span className="flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5" /> Success!
                                    </span>
                                ) : (
                                    isLoading ? 'Authenticating...' : 'Login to Dashboard'
                                )}
                            </Button>

                            {/* Security Notice */}
                            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
                                <Lock className="w-3 h-3" />
                                <span>256-bit SSL Encrypted Connection</span>
                            </div>
                        </form>
                    </Card>

                    {/* Back to Home */}
                    <div className="text-center mt-8">
                        <button
                            onClick={() => navigate('/')}
                            className="text-gray-500 hover:text-white transition-colors font-medium text-sm flex items-center justify-center gap-2 mx-auto"
                        >
                            ← Back to Home
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminLogin;
