import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate login
        setTimeout(() => {
            setIsLoading(false);
            navigate('/admin/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
            {/* Animated Background */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [0, -90, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
            />

            <div className="container-custom px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md mx-auto"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl"
                        >
                            <Shield className="w-10 h-10 text-white" strokeWidth={2.5} />
                        </motion.div>
                        <h1 className="text-4xl font-black text-white mb-2">
                            Admin Portal
                        </h1>
                        <p className="text-gray-400">
                            Secure access for administrators only
                        </p>
                    </div>

                    {/* Login Card */}
                    <Card variant="glass" className="border border-gray-700 bg-gray-800/50 backdrop-blur-xl">
                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@flashypay.com"
                                        required
                                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                        className="w-full pl-12 pr-12 py-4 rounded-xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded" />
                                    Remember me
                                </label>
                                <a href="#" className="text-blue-400 hover:text-blue-300 font-semibold">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Login Button */}
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full text-lg font-black"
                                loading={isLoading}
                            >
                                {isLoading ? 'Authenticating...' : 'Login to Dashboard'}
                            </Button>

                            {/* Security Notice */}
                            <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-900/50 p-3 rounded-xl border border-gray-700">
                                <Shield className="w-4 h-4 text-blue-400" />
                                <span>This is a secure admin area. All activities are logged.</span>
                            </div>
                        </form>
                    </Card>

                    {/* Back to Home */}
                    <div className="text-center mt-6">
                        <button
                            onClick={() => navigate('/')}
                            className="text-gray-400 hover:text-white transition-colors font-semibold"
                        >
                            Back to Home
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminLogin;
