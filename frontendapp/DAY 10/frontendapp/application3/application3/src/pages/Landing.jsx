import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Shield, Clock, Award, Smartphone, CreditCard, Star, Gift, TrendingUp, Users } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const Landing = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: Zap,
            title: 'Instant Recharge',
            description: 'Lightning-fast mobile recharge in seconds',
            gradient: 'from-yellow-400 via-orange-500 to-red-500',
            bgColor: 'bg-gradient-to-br from-yellow-400/20 via-orange-500/20 to-red-500/20',
        },
        {
            icon: Shield,
            title: 'Secure Payments',
            description: 'Bank-grade security for all transactions',
            gradient: 'from-blue-400 via-purple-500 to-pink-500',
            bgColor: 'bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20',
        },
        {
            icon: Clock,
            title: '24/7 Service',
            description: 'Round-the-clock customer support',
            gradient: 'from-green-400 via-teal-500 to-cyan-500',
            bgColor: 'bg-gradient-to-br from-green-400/20 via-teal-500/20 to-cyan-500/20',
        },
        {
            icon: Award,
            title: 'Best Offers',
            description: 'Exclusive deals and cashback rewards',
            gradient: 'from-pink-400 via-rose-500 to-purple-500',
            bgColor: 'bg-gradient-to-br from-pink-400/20 via-rose-500/20 to-purple-500/20',
        },
    ];

    const offers = [
        {
            icon: Gift,
            title: '50% Cashback',
            description: 'On your first recharge',
            color: 'from-pink-500 to-rose-600',
        },
        {
            icon: Star,
            title: 'Exclusive Deals',
            description: 'Special offers daily',
            color: 'from-yellow-500 to-orange-600',
        },
        {
            icon: TrendingUp,
            title: 'Earn Rewards',
            description: 'With every recharge',
            color: 'from-green-500 to-emerald-600',
        },
        {
            icon: Users,
            title: 'Refer & Earn',
            description: '₹100 per referral',
            color: 'from-blue-500 to-cyan-600',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: 'url(/hero-bg.jpg)',
                        }}
                    />
                    {/* Very light overlay to show natural background clearly */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/15 via-blue-900/10 to-pink-900/15 dark:from-purple-900/30 dark:via-blue-900/20 dark:to-pink-900/30" />

                    {/* Multiple Animated Gradient Orbs for more color */}
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.5, 0.3],
                            x: [0, 50, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-3xl opacity-30"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.3, 0.5, 0.3],
                            x: [0, -50, 0],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-3xl opacity-30"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.2, 0.4, 0.2],
                            y: [0, -30, 0],
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-3xl opacity-25"
                    />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 container-custom text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Animated Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block"
                        >
                            <motion.div
                                animate={{
                                    boxShadow: [
                                        '0 0 20px rgba(255, 0, 110, 0.5)',
                                        '0 0 40px rgba(131, 56, 236, 0.8)',
                                        '0 0 20px rgba(255, 0, 110, 0.5)',
                                    ],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="glass px-8 py-4 rounded-full inline-flex items-center gap-3 border-2 border-white/30"
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                >
                                    <Smartphone className="w-6 h-6 text-yellow-300" />
                                </motion.div>
                                <span className="text-base font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                                    🏆 India's #1 Recharge Platform
                                </span>
                            </motion.div>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-6xl md:text-8xl lg:text-9xl font-black leading-tight"
                        >
                            <motion.span
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent drop-shadow-2xl"
                                style={{ backgroundSize: '200% 200%' }}
                            >
                                Recharge
                            </motion.span>
                            <br />
                            <motion.span
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                                className="bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl"
                                style={{ backgroundSize: '200% 200%' }}
                            >
                                Made Simple
                            </motion.span>
                        </motion.h1>

                        {/* Colorful Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-xl md:text-3xl text-white font-bold max-w-4xl mx-auto drop-shadow-lg"
                        >
                            ⚡ Experience <span className="text-yellow-300">lightning-fast</span> mobile recharges with{' '}
                            <span className="text-pink-300">exclusive offers</span>,{' '}
                            <span className="text-cyan-300">instant processing</span>, and{' '}
                            <span className="text-purple-300">premium rewards</span>! 🎁
                        </motion.p>

                        {/* Colorful CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant="primary"
                                    size="lg"
                                    icon={Zap}
                                    onClick={() => navigate('/plans')}
                                    className="text-xl px-12 py-6 shadow-2xl shadow-pink-500/50"
                                >
                                    🚀 Recharge Now
                                </Button>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant="gold"
                                    size="lg"
                                    icon={Gift}
                                    onClick={() => navigate('/plans')}
                                    className="text-xl px-12 py-6 shadow-2xl shadow-yellow-500/50"
                                >
                                    🎁 View Offers
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* Colorful Stats with Icons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="grid grid-cols-3 gap-6 max-w-3xl mx-auto pt-16"
                        >
                            {[
                                { value: '10M+', label: 'Happy Users', icon: Users, color: 'from-pink-400 to-rose-500' },
                                { value: '99.9%', label: 'Success Rate', icon: TrendingUp, color: 'from-green-400 to-emerald-500' },
                                { value: '24/7', label: 'Support', icon: Clock, color: 'from-blue-400 to-cyan-500' },
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    className="glass-strong p-6 rounded-3xl text-center border-2 border-white/30"
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className={`w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                                    >
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </motion.div>
                                    <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                        {stat.value}
                                    </div>
                                    <div className="text-sm font-semibold text-white mt-2">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Animated Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <div className="w-8 h-12 border-3 border-white/50 rounded-full flex justify-center shadow-lg shadow-purple-500/50">
                        <motion.div
                            animate={{ y: [0, 16, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 bg-gradient-to-b from-yellow-300 to-pink-400 rounded-full mt-3"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Offers Section - Super Colorful */}
            <section className="py-24 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 dark:from-gray-900 dark:via-purple-900/30 dark:to-pink-900/30 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full blur-3xl opacity-20"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-r from-pink-300 to-purple-400 rounded-full blur-3xl opacity-20"
                    />
                </div>

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-6xl font-black mb-4">
                            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                                🎉 Amazing Offers 🎉
                            </span>
                        </h2>
                        <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                            Grab these <span className="text-pink-600 dark:text-pink-400">exclusive deals</span> today!
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                    >
                        {offers.map((offer, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <motion.div
                                    whileHover={{ scale: 1.05, rotate: 2 }}
                                    className={`glass-strong p-8 rounded-3xl text-center border-2 border-white/40 ${offer.color} bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-900/60`}
                                >
                                    <motion.div
                                        animate={{
                                            rotate: [0, 10, -10, 0],
                                            scale: [1, 1.1, 1]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className={`w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br ${offer.color} flex items-center justify-center shadow-2xl`}
                                    >
                                        <offer.icon className="w-10 h-10 text-white" />
                                    </motion.div>
                                    <h3 className={`text-2xl font-black mb-2 bg-gradient-to-r ${offer.color} bg-clip-text text-transparent`}>
                                        {offer.title}
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 font-semibold">
                                        {offer.description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features Section - More Colorful */}
            <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-6xl font-black mb-4">
                            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                ✨ Why Choose Us? ✨
                            </span>
                        </h2>
                        <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                            Experience the <span className="text-purple-600 dark:text-purple-400">future</span> of mobile recharges
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {features.map((feature, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -10 }}
                                    className={`${feature.bgColor} backdrop-blur-xl border-2 border-white/20 dark:border-white/10 rounded-3xl p-8 h-full text-center group cursor-pointer shadow-xl`}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                        className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-2xl`}
                                    >
                                        <feature.icon className="w-10 h-10 text-white" />
                                    </motion.div>
                                    <h3 className={`text-2xl font-black mb-3 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Indian Operators Section */}
            <section className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-purple-900/20 dark:to-pink-900/20">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-6xl font-black mb-4">
                            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                📱 All Major Operators 📱
                            </span>
                        </h2>
                        <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                            Recharge for <span className="text-blue-600 dark:text-blue-400">any network</span> instantly!
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        {[
                            { name: 'Jio', color: 'from-blue-600 to-blue-800', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
                            { name: 'Airtel', color: 'from-red-600 to-red-800', bgColor: 'bg-red-50 dark:bg-red-900/20' },
                            { name: 'Vi', color: 'from-purple-600 to-pink-600', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
                            { name: 'BSNL', color: 'from-orange-500 to-yellow-600', bgColor: 'bg-orange-50 dark:bg-orange-900/20' },
                        ].map((operator, index) => (
                            <motion.div
                                key={operator.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.1, y: -10 }}
                                className={`${operator.bgColor} p-8 rounded-3xl border-2 border-gray-200 dark:border-gray-700 cursor-pointer shadow-lg hover:shadow-2xl transition-all`}
                            >
                                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${operator.color} flex items-center justify-center shadow-xl`}>
                                    <Smartphone className="w-10 h-10 text-white" />
                                </div>
                                <h3 className={`text-2xl font-black bg-gradient-to-r ${operator.color} bg-clip-text text-transparent text-center`}>
                                    {operator.name}
                                </h3>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="text-center mt-12"
                    >
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                            ✨ Supporting all major networks across India ✨
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section - Ultra Colorful */}
            <section className="py-32 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 relative overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl"
                />

                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-6xl md:text-7xl font-black text-white mb-8 drop-shadow-2xl">
                            🚀 Ready to Get Started? 🚀
                        </h2>
                        <p className="text-2xl md:text-3xl text-white font-bold mb-12 max-w-3xl mx-auto drop-shadow-lg">
                            Join <span className="text-yellow-300">10 million+</span> users and experience the{' '}
                            <span className="text-cyan-300">fastest</span>, most{' '}
                            <span className="text-pink-300">secure</span> mobile recharge platform
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="ghost"
                                size="lg"
                                onClick={() => navigate('/login')}
                                className="bg-white text-purple-600 hover:bg-yellow-300 hover:text-purple-700 text-2xl px-16 py-8 shadow-2xl font-black"
                            >
                                ✨ Get Started Now ✨
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
