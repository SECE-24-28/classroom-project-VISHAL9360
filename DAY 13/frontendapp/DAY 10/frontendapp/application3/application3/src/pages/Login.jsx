import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import { useAuth } from '../context/AuthContext';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().required('Password is required'),
});

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [authError, setAuthError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        setAuthError('');
        setLoading(true);

        const res = await login(data.email, data.password);

        setLoading(false);
        if (res.success) {
            if (res.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/plans');
            }
        } else {
            console.error(res);
            setAuthError(res.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-black/60 backdrop-blur-sm"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="max-w-md w-full relative z-10"
            >
                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] relative overflow-hidden">
                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="text-center mb-10">
                            <motion.div
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                                className="w-24 h-24 mx-auto mb-6 rounded-full bg-white flex items-center justify-center shadow-xl"
                            >
                                <User className="w-12 h-12 text-purple-600" />
                            </motion.div>
                            <h1 className="text-4xl font-black text-white mb-2 drop-shadow-md">
                                Welcome Back!
                            </h1>
                            <p className="text-white/80 font-medium text-lg">Sign in to continue recharging</p>
                        </div>

                        {authError && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                className="mb-6 p-4 bg-red-500/20 border border-red-200/50 rounded-2xl flex items-center gap-3 text-white text-sm font-bold shadow-sm"
                            >
                                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                                {authError}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-4">
                                <div className="group">
                                    <Input
                                        label="Email"
                                        type="email"
                                        icon={Mail}
                                        placeholder="hello@example.com"
                                        error={errors.email?.message}
                                        {...register('email')}
                                        className="bg-white/20 border-white/30 text-white placeholder-white/60 focus:bg-white/30 focus:border-white focus:ring-0 rounded-xl"
                                        labelClassName="text-white/90 font-bold"
                                    />
                                </div>
                                <div className="group">
                                    <Input
                                        label="Password"
                                        type="password"
                                        icon={Lock}
                                        placeholder="••••••••"
                                        error={errors.password?.message}
                                        {...register('password')}
                                        className="bg-white/20 border-white/30 text-white placeholder-white/60 focus:bg-white/30 focus:border-white focus:ring-0 rounded-xl"
                                        labelClassName="text-white/90 font-bold"
                                    />
                                </div>
                            </div>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
                                <Button
                                    type="submit"
                                    className="w-full py-4 text-lg font-black text-purple-600 bg-white hover:bg-white/90 shadow-xl shadow-purple-900/20 rounded-xl border-none"
                                    loading={loading}
                                >
                                    Log In <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </motion.div>
                        </form>

                        <div className="mt-8 pt-6 border-t border-white/20 text-center">
                            <p className="text-white/80 font-medium">
                                No account?{' '}
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="text-white font-black hover:underline decoration-4 underline-offset-4 decoration-yellow-400 transition-all ml-1"
                                >
                                    Sign Up Free
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
