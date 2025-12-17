import React, { useState, useEffect } from 'react';
import { getAllPlans } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Star, Trophy, Wifi, Phone, Gift, Check } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const Plans = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All Plans', icon: Zap },
        { id: 'popular', name: 'Popular', icon: Star },
        { id: 'data', name: 'Data', icon: Wifi },
        { id: 'unlimited', name: 'Unlimited', icon: Trophy },
        { id: 'cricket', name: 'Cricket', icon: Trophy },
    ];

    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch plans from backend
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await getAllPlans();
                if (data.success) {
                    // Normalize data
                    const normalizedPlans = data.data.map(plan => {
                        let category = 'other';
                        if (plan.planType === 'Truly Unlimited') category = 'unlimited';
                        else if (plan.planType === 'Data Voucher') category = 'data';
                        else if (plan.planType === 'Entertainment') category = 'cricket';

                        // Dynamic Gradient based on Operator
                        const operatorGradients = {
                            'Jio': 'from-blue-600 to-indigo-600',
                            'Airtel': 'from-red-600 to-red-500',
                            'Vi': 'from-yellow-500 to-orange-600',
                            'BSNL': 'from-green-500 to-teal-600',
                        };
                        const gradient = operatorGradients[plan.operator] || 'from-purple-500 to-pink-500';

                        return {
                            ...plan,
                            category: plan.category || category,
                            gradient: gradient,
                            popular: plan.popular || false,
                            bestValue: plan.bestValue || false,
                            // Split description into benefits for better UI
                            benefits: plan.description ? plan.description.split(',').map(b => b.trim()) : [plan.planType, 'High Speed Data'],
                            calls: plan.calls || 'Unlimited',
                            sms: plan.sms || '100/Day'
                        };
                    });
                    setPlans(normalizedPlans);
                } else {
                    setError('Failed to fetch plans');
                }
            } catch (err) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const filteredPlans = selectedCategory === 'all'
        ? plans
        : plans.filter(plan => plan.category === selectedCategory);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3 },
        },
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-4">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                    <Zap className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Oops! Something went wrong</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="container-custom px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-black mb-4">
                        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                            Choose Your Perfect Plan
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        21 amazing plans across 4 categories with exclusive OTT benefits
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`
                px-6 py-3 rounded-full font-bold smooth-transition flex items-center gap-2
                ${selectedCategory === category.id
                                    ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-2xl shadow-purple-500/50'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-xl border-2 border-gray-200 dark:border-gray-700'
                                }
              `}
                        >
                            <category.icon className="w-5 h-5" />
                            {category.name}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Plans Count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mb-8"
                >
                    <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                        Showing {filteredPlans.length} {selectedCategory === 'all' ? 'plans' : `${selectedCategory} plans`}
                    </p>
                </motion.div>

                {/* Plans Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredPlans.map((plan) => (
                            <motion.div
                                key={plan._id || plan.id}
                                variants={itemVariants}
                                layout
                            >
                                <Card
                                    variant="glass"
                                    className="relative overflow-hidden group h-full flex flex-col border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 smooth-transition"
                                >
                                    {/* Badges */}
                                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                                        {plan.popular && (
                                            <motion.div
                                                initial={{ x: 100 }}
                                                animate={{ x: 0 }}
                                            >
                                                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                                    <Star className="w-4 h-4 text-white fill-white" />
                                                    <span className="text-xs font-bold text-white">POPULAR</span>
                                                </div>
                                            </motion.div>
                                        )}
                                        {plan.bestValue && (
                                            <motion.div
                                                initial={{ x: 100 }}
                                                animate={{ x: 0 }}
                                                transition={{ delay: 0.1 }}
                                            >
                                                <div className="bg-gradient-to-r from-green-400 to-emerald-500 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                                    <Trophy className="w-4 h-4 text-white fill-white" />
                                                    <span className="text-xs font-bold text-white">BEST VALUE</span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Gradient Icon */}
                                    <motion.div
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4 shadow-xl`}
                                    >
                                        <Zap className="w-8 h-8 text-white" />
                                    </motion.div>

                                    {/* Price */}
                                    <div className="mb-4">
                                        <div className="flex items-baseline gap-2">
                                            <span className={`text-5xl font-black bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                                                ₹{plan.amount}
                                            </span>
                                            <span className="text-gray-600 dark:text-gray-400 font-semibold">
                                                / {plan.validity}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-3 mb-6 flex-grow">
                                        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-md`}>
                                                <Wifi className="w-5 h-5 text-white" />
                                            </div>
                                            <span className="font-bold text-lg">{plan.data}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-md`}>
                                                <Phone className="w-5 h-5 text-white" />
                                            </div>
                                            <span className="font-bold text-lg">{plan.calls} Calls</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-md`}>
                                                <Gift className="w-5 h-5 text-white" />
                                            </div>
                                            <span className="font-bold text-lg">{plan.sms} SMS</span>
                                        </div>
                                    </div>

                                    {/* Benefits */}
                                    <div className="mb-6 space-y-2 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl">
                                        <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Benefits:</p>
                                        {plan.benefits.map((benefit, index) => (
                                            <div key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                                                <span className="font-medium">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Button */}
                                    <Button
                                        variant="primary"
                                        className="w-full mt-auto text-lg font-bold"
                                        onClick={() => navigate('/payment', { state: { plan } })}
                                    >
                                        Recharge Now
                                    </Button>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Empty State */}
                {filteredPlans.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-xl text-gray-500 dark:text-gray-400">
                            No plans found in this category
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Plans;
