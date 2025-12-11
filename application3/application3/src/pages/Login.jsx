import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Chrome, Apple, CheckCircle, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';

const Login = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState('phone'); // 'phone', 'otp', or 'success'
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [countdown, setCountdown] = useState(3);
    const otpRefs = useRef([]);

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        if (phoneNumber.length === 10) {
            setStep('otp');
        }
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
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900">
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
                    className="absolute top-20 left-20 w-96 h-96 bg-neon-pink/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute bottom-20 right-20 w-96 h-96 bg-neon-teal/20 rounded-full blur-3xl"
                />
            </div>

            {/* Login Card */}
            <div className="container-custom relative z-10 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-md mx-auto"
                >
                    <Card variant="glass" className="backdrop-blur-2xl">
                        <AnimatePresence mode="wait">
                            {/* Success Screen */}
                            {step === 'success' && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="text-center py-8"
                                >
                                    {/* Success Icon with Animation */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                        className="relative mx-auto mb-6"
                                    >
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.5, 0.8, 0.5],
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute inset-0 w-32 h-32 mx-auto bg-green-500/30 rounded-full blur-2xl"
                                        />
                                        <div className="relative w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl">
                                            <CheckCircle className="w-16 h-16 text-white" strokeWidth={3} />
                                        </div>
                                    </motion.div>

                                    {/* Success Text */}
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-4xl font-black mb-4"
                                    >
                                        <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                                            Login Successful! ✨
                                        </span>
                                    </motion.h2>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-gray-300 mb-8 text-lg"
                                    >
                                        Welcome back! Redirecting you to plans...
                                    </motion.p>

                                    {/* Countdown */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-xl border-2 border-white/20"
                                    >
                                        <Sparkles className="w-5 h-5 text-yellow-400" />
                                        <span className="text-2xl font-bold text-white">
                                            {countdown}
                                        </span>
                                    </motion.div>

                                    {/* Confetti Effect */}
                                    {[...Array(20)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{
                                                opacity: 1,
                                                x: 0,
                                                y: 0,
                                                scale: 1,
                                            }}
                                            animate={{
                                                opacity: 0,
                                                x: (Math.random() - 0.5) * 400,
                                                y: Math.random() * -400,
                                                scale: 0,
                                            }}
                                            transition={{
                                                duration: 2,
                                                delay: i * 0.05,
                                                ease: "easeOut",
                                            }}
                                            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                                            style={{
                                                backgroundColor: ['#ff0080', '#7928ca', '#00d4ff', '#ffd700', '#00ff88'][i % 5],
                                            }}
                                        />
                                    ))}
                                </motion.div>
                            )}

                            {/* Phone Number Form */}
                            {step === 'phone' && (
                                <motion.div
                                    key="phone"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    {/* Header */}
                                    <div className="text-center mb-8">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: "spring" }}
                                            className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center shadow-neon-purple"
                                        >
                                            <Smartphone className="w-10 h-10 text-white" />
                                        </motion.div>
                                        <h1 className="text-3xl font-bold gradient-text mb-2">
                                            Welcome Back
                                        </h1>
                                        <p className="text-gray-400">
                                            Enter your mobile number to continue
                                        </p>
                                    </div>

                                    <form onSubmit={handlePhoneSubmit} className="space-y-6">
                                        <Input
                                            label="Mobile Number"
                                            type="tel"
                                            icon={Smartphone}
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                            placeholder="Enter 10-digit mobile number"
                                        />

                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="w-full"
                                            disabled={phoneNumber.length !== 10}
                                        >
                                            Continue
                                        </Button>

                                        {/* Divider */}
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-white/20"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-4 bg-transparent text-gray-400">Or continue with</span>
                                            </div>
                                        </div>

                                        {/* Social Login */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <Button
                                                variant="ghost"
                                                icon={Chrome}
                                                onClick={() => { }}
                                                className="w-full"
                                            >
                                                Google
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                icon={Apple}
                                                onClick={() => { }}
                                                className="w-full"
                                            >
                                                Apple
                                            </Button>
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
                                >
                                    {/* Header */}
                                    <div className="text-center mb-8">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: "spring" }}
                                            className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center shadow-neon-purple"
                                        >
                                            <Smartphone className="w-10 h-10 text-white" />
                                        </motion.div>
                                        <h1 className="text-3xl font-bold gradient-text mb-2">
                                            Enter OTP
                                        </h1>
                                        <p className="text-gray-400">
                                            Enter the OTP sent to your mobile
                                        </p>
                                    </div>

                                    <form onSubmit={handleOtpSubmit} className="space-y-6">
                                        {/* OTP Input Grid */}
                                        <div className="flex gap-3 justify-center">
                                            {otp.map((digit, index) => (
                                                <motion.input
                                                    key={index}
                                                    ref={(el) => (otpRefs.current[index] = el)}
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={1}
                                                    value={digit}
                                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                    className="w-12 h-14 text-center text-2xl font-bold bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl text-white focus:outline-none focus:border-neon-purple focus:shadow-neon-purple smooth-transition"
                                                />
                                            ))}
                                        </div>

                                        {/* Resend OTP */}
                                        <div className="text-center">
                                            <button
                                                type="button"
                                                onClick={() => setOtp(['', '', '', '', '', ''])}
                                                className="text-sm text-neon-teal hover:text-neon-blue smooth-transition"
                                            >
                                                Resend OTP
                                            </button>
                                        </div>

                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="w-full"
                                            disabled={otp.join('').length !== 6}
                                        >
                                            Verify & Continue
                                        </Button>

                                        {/* Back Button */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setStep('phone');
                                                setOtp(['', '', '', '', '', '']);
                                            }}
                                            className="w-full text-center text-sm text-gray-400 hover:text-white smooth-transition"
                                        >
                                            Change mobile number
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>

                    {/* Terms */}
                    {step !== 'success' && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-center text-sm text-gray-400 mt-6"
                        >
                            By continuing, you agree to our{' '}
                            <a href="#" className="text-neon-teal hover:text-neon-blue smooth-transition">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#" className="text-neon-teal hover:text-neon-blue smooth-transition">
                                Privacy Policy
                            </a>
                        </motion.p>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
