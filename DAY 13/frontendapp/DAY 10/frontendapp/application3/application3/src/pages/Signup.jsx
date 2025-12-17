import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import { useAuth } from '../context/AuthContext';

const schema = yup.object().shape({
    name: yup.string().required('Full Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const Signup = () => {
    const navigate = useNavigate();
    const { register: registerUser } = useAuth();
    const [authError, setAuthError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);

    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    });

    const passwordParams = watch('password', '');

    React.useEffect(() => {
        const calculateStrength = (pwd) => {
            let strength = 0;
            if (pwd.length >= 8) strength++;
            if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
            if (/\d/.test(pwd)) strength++;
            if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
            setPasswordStrength(strength);
        };
        calculateStrength(passwordParams);
    }, [passwordParams]);

    const getStrengthColor = () => {
        if (passwordStrength === 0) return 'bg-gray-200';
        if (passwordStrength < 2) return 'bg-red-500';
        if (passwordStrength < 3) return 'bg-yellow-500';
        if (passwordStrength < 4) return 'bg-blue-500';
        return 'bg-green-500';
    };

    const getStrengthLabel = () => {
        if (passwordStrength === 0) return '';
        if (passwordStrength < 2) return 'Weak';
        if (passwordStrength < 3) return 'Fair';
        if (passwordStrength < 4) return 'Good';
        return 'Strong';
    };

    const onSubmit = async (data) => {
        // ... existing submit logic
        setAuthError('');
        const res = await registerUser({
            name: data.name,
            email: data.email,
            password: data.password
        });
        if (res.success) {
            navigate('/plans');
        } else {
            setAuthError(res.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                <Card variant="glass" className="backdrop-blur-2xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black gradient-text mb-2">Create Account</h1>
                        <p className="text-gray-400">Join us for seamless recharges</p>
                    </div>

                    {authError && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                            {authError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <Input
                            label="Full Name"
                            icon={User}
                            placeholder="John Doe"
                            error={errors.name?.message}
                            {...register('name')}
                        />
                        <Input
                            label="Email Address"
                            type="email"
                            icon={Mail}
                            placeholder="john@example.com"
                            error={errors.email?.message}
                            {...register('email')}
                        />
                        <div>
                            <Input
                                label="Password"
                                type="password"
                                icon={Lock}
                                placeholder="••••••••"
                                error={errors.password?.message}
                                {...register('password')}
                            />
                            {/* Password Strength Meter */}
                            {passwordParams && (
                                <div className="mt-2">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-400">Password Strength</span>
                                        <span className={`font-bold ${passwordStrength < 2 ? 'text-red-400' :
                                                passwordStrength < 3 ? 'text-yellow-400' :
                                                    passwordStrength < 4 ? 'text-blue-400' : 'text-green-400'
                                            }`}>{getStrengthLabel()}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-700/50 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                                            style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        Use 8+ chars, mix of case, numbers & symbols.
                                    </div>
                                </div>
                            )}
                        </div>
                        <Input
                            label="Confirm Password"
                            type="password"
                            icon={Lock}
                            placeholder="••••••••"
                            error={errors.confirmPassword?.message}
                            {...register('confirmPassword')}
                        />

                        <Button type="submit" variant="primary" className="w-full" loading={isSubmitting}>
                            Sign Up <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </form>

                    <p className="text-center mt-6 text-gray-400">
                        Already have an account?{' '}
                        <button onClick={() => navigate('/login')} className="text-blue-400 hover:text-blue-300 font-semibold">
                            Login
                        </button>
                    </p>
                </Card>
            </motion.div>
        </div>
    );
};

export default Signup;
