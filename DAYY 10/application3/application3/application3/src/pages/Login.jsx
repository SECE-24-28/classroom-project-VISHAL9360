import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Chrome, Apple, CheckCircle, Sparkles, ArrowRight, Home, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';

// Validation Schema
const phoneSchema = yup.object().shape({
    phoneNumber: yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]+$/, 'Must be only digits')
        .length(10, 'Must be exactly 10 digits')
});

const Login = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState('phone'); // 'phone', 'otp', or 'success'
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [countdown, setCountdown] = useState(3);
    const otpRefs = useRef([]);

    // React Hook Form for Phone
    const { register, handleSubmit: handlePhoneSubmit, formState: { errors, isValid }, watch } = useForm({
        resolver: yupResolver(phoneSchema),
        mode: 'onChange'
    });

    const watchPhoneNumber = watch('phoneNumber');

    const onSubmitPhone = (data) => {
        console.log("Phone Submitted", data);
        setStep('otp');
    };

    const handleOtpChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-focus next input
            if (value && index < 5) {
                otpRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length === 6) {
            // Show success screen
            setStep('success');
        }
    };

    // Countdown and redirect effect
    useEffect(() => {
        if (step === 'success') {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        navigate('/profile');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [step, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black font-sans">
            {/* Rich Animated Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-75" />
                <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-pink-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-150" />
            </div>

            {/* Login Card */}
            <div className="container-custom relative z-10 px-4 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-md mx-auto"
                >
                    <Card variant="glass" className="backdrop-blur-2xl border-white/10 bg-white/5 shadow-2xl">
                        <AnimatePresence mode="wait">
                            {/* Success Screen */}
                            {step === 'success' && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="text-center py-10"
                                >
                                    {/* Success Icon with Animation */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                        className="relative mx-auto mb-8"
                                    >
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.5, 0.8, 0.5],
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute inset-0 w-32 h-32 mx-auto bg-green-500/30 rounded-full blur-2xl"
                                        />
                                        <div className="relative w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-500/30">
                                            <CheckCircle className="w-16 h-16 text-white" strokeWidth={3} />
                                        </div>
                                    </motion.div>

                                    {/* Success Text */}
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-4xl font-black mb-4 text-white"
                                    >
                                        Welcome Back!
                                    </motion.h2>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-gray-300 mb-8 text-lg"
                                    >
                                        You have successfully logged in.
                                    </motion.p>

                                    {/* Countdown */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/10"
                                    >
                                        <div className="w-5 h-5 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                                        <span className="text-lg font-medium text-white">
                                            Redirecting in {countdown}s
                                        </span>
                                    </motion.div>
                                </motion.div>
                            )}

                            {/* Phone Number Form */}
                            {step === 'phone' && (
                                <motion.div
                                    key="phone"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Header */}
                                    <div className="text-center mb-8">
                                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                                            <Smartphone className="w-8 h-8 text-white" />
                                        </div>
                                        <h1 className="text-3xl font-bold text-white mb-2">
                                            Mobile Login
                                        </h1>
                                        <p className="text-gray-400">
                                            Access your account securely
                                        </p>
                                    </div>

                                    <form onSubmit={handlePhoneSubmit(onSubmitPhone)} className="space-y-6">
                                        <div className="space-y-4">
                                            <div>
                                                <Input
                                                    label="Mobile Number"
                                                    type="tel"
                                                    icon={Smartphone}
                                                    {...register('phoneNumber')}
                                                    placeholder="Enter 10-digit number"
                                                    className="text-lg tracking-wide"
                                                />
                                                {errors.phoneNumber && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="text-red-400 text-sm mt-2 flex items-center gap-1"
                                                    >
                                                        <AlertCircle size={14} />
                                                        {errors.phoneNumber.message}
                                                    </motion.p>
                                                )}
                                            </div>

                                            <Button
                                                type="submit"
                                                variant="primary"
                                                className="w-full py-4 text-lg font-bold shadow-lg shadow-purple-600/20 group"
                                                disabled={!isValid}
                                            >
                                                <span>Continue</span>
                                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </div>

                                        {/* Divider */}
                                        <div className="relative my-8">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-white/10"></div>
                                            </div>
                                            <div className="relative flex justify-center text-xs uppercase tracking-widest">
                                                <span className="px-4 bg-[#0a0a0a] text-gray-500">Or continue with</span>
                                            </div>
                                        </div>

                                        {/* Social Login */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                type="button"
                                                className="flex items-center justify-center gap-2 py-3 px-4 bg-white rounded-xl hover:bg-gray-100 transition-colors font-semibold text-gray-900"
                                            >
                                                <Chrome className="w-5 h-5 text-blue-500" />
                                                Google
                                            </button>
                                            <button
                                                type="button"
                                                className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors font-semibold text-white border border-gray-700"
                                            >
                                                <Apple className="w-5 h-5 text-white" />
                                                Apple
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}

                            {/* OTP Form */}
                            {step === 'otp' && (
                                <motion.div
                                    key="otp"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Header */}
                                    <div className="text-center mb-8">
                                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                                            <Lock className="w-8 h-8 text-white" />
                                        </div>
                                        <h1 className="text-3xl font-bold text-white mb-2">
                                            Verify OTP
                                        </h1>
                                        <p className="text-gray-400">
                                            Enter the code sent to +91 {watchPhoneNumber}
                                        </p>
                                    </div>

                                    <form onSubmit={handleOtpSubmit} className="space-y-8">
                                        {/* OTP Input Grid */}
                                        <div className="flex gap-2 sm:gap-3 justify-center">
                                            {otp.map((digit, index) => (
                                                <motion.input
                                                    key={index}
                                                    ref={(el) => (otpRefs.current[index] = el)}
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={1}
                                                    value={digit}
                                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                    className="w-10 h-12 sm:w-12 sm:h-14 text-center text-2xl font-bold bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/10 focus:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all caret-blue-500"
                                                />
                                            ))}
                                        </div>

                                        <div className="space-y-4">
                                            <Button
                                                type="submit"
                                                variant="primary"
                                                className="w-full py-4 text-lg font-bold shadow-lg shadow-blue-600/20"
                                                disabled={otp.join('').length !== 6}
                                            >
                                                Verify & Continue
                                            </Button>

                                            <div className="flex items-center justify-between text-sm">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setStep('phone');
                                                        setOtp(['', '', '', '', '', '']);
                                                    }}
                                                    className="text-gray-400 hover:text-white transition-colors"
                                                >
                                                    Change Number
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setOtp(['', '', '', '', '', ''])}
                                                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                                                >
                                                    Resend Code
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center mt-8 space-y-4"
                    >
                        <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium">
                            <Home size={16} /> Return to Home
                        </button>
                        <p className="text-xs text-gray-600">
                            By continuing, you agree to our Terms & Privacy Policy
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
