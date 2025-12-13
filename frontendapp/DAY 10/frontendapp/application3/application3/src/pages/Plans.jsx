import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Star, TrendingUp, Gift, Check, Trophy, Wifi, Phone } from 'lucide-react';
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

    const plans = [
        // POPULAR PLANS
        {
            id: 1,
            amount: 299,
            validity: '28 Days',
            data: '1.5 GB/Day',
            calls: 'Unlimited',
            sms: '100/Day',
            popular: true,
            bestValue: false,
            category: 'popular',
            gradient: 'from-pink-500 via-rose-500 to-red-500',
            benefits: ['Disney+ Hotstar Mobile', 'Free Hellotunes', 'Weekend Data Rollover'],
        },
        {
            id: 2,
            amount: 479,
            validity: '56 Days',
            data: '1.5 GB/Day',
            calls: 'Unlimited',
            sms: '100/Day',
            popular: true,
            bestValue: true,
            category: 'popular',
            gradient: 'from-blue-500 via-cyan-500 to-teal-500',
            benefits: ['Amazon Prime Mobile', 'Free Hellotunes', 'Unlimited 5G Data'],
        },
        {
            id: 3,
            amount: 666,
            validity: '77 Days',
            data: '1.5 GB/Day',
            calls: 'Unlimited',
            sms: '100/Day',
            popular: true,
            bestValue: false,
            category: 'popular',
            gradient: 'from-purple-500 via-pink-500 to-rose-500',
            benefits: ['Sony LIV', 'Voot Select', 'Free Hellotunes'],
        },
        {
            id: 4,
            amount: 719,
            validity: '84 Days',
            data: '1.5 GB/Day',
            calls: 'Unlimited',
            sms: '100/Day',
            popular: true,
            bestValue: false,
            category: 'popular',
            gradient: 'from-yellow-500 via-orange-500 to-red-500',
            benefits: ['Netflix Mobile', 'Disney+ Hotstar', 'Unlimited 5G'],
        },
        {
            id: 5,
            amount: 999,
            validity: '84 Days',
            data: '2 GB/Day',
            calls: 'Unlimited',
            sms: '100/Day',
            popular: true,
            bestValue: true,
            category: 'popular',
            gradient: 'from-indigo-500 via-purple-500 to-pink-500',
            benefits: ['All OTT Apps', 'Netflix', 'Prime', 'Hotstar', 'Unlimited 5G'],
        },
        {
            id: 6,
            amount: 2999,
            validity: '365 Days',
            data: '2 GB/Day',
            calls: 'Unlimited',
            sms: '100/Day',
            popular: true,
            bestValue: true,
            category: 'popular',
            gradient: 'from-pink-600 via-purple-600 to-indigo-600',
            benefits: ['Premium OTT Bundle', 'Priority Support', 'Unlimited 5G', 'Free International Roaming'],
        },

        // DATA PLANS
        {
            id: 7,
            amount: 149,
            validity: '14 Days',
            data: '1 GB/Day',
            calls: 'Unlimited',
            sms: '100/Day',
            popular: false,
            bestValue: false,
            category: 'data',
            gradient: 'from-green-500 via-emerald-500 to-teal-500',
            benefits: ['Basic Plan', 'No OTT', 'Unlimited Calls'],
        },
        {
            id: 8,
            amount: 239,
            validity: '28 Days',
            data: '1.5 GB/Day',
            calls: 'Unlimited',
            sms: '100/Day',
            popular: false,
            bestValue: false,
            category: 'data',
            gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
            benefits: ['Starter Pack', 'Unlimited Calls', 'Weekend Bonus'],
        },
        {
            id: 9,
            amount: 299,
            validity: '28 Days',
            data: '2 GB/Day',
            calls: 'Unlimited',
            sms: '100/Day',
            popular: false,
            bestValue: true,
            category: 'data',
            gradient: 'from-lime-500 via-green-500 to-emerald-500',
            benefits: ['High Speed Data', 'Unlimited Calls', 'Free Hellotunes'],
        },
        {
            id: 10,
            amount: 549,
            validity: '56 Days',
            data: '2 GB/Day',
            calls: 'Unlimited',
            sms: '100/Day',
            popular: false,
            bestValue: true,
            category: 'data',
            gradient: 'from-orange-500 via-amber-500 to-yellow-500',
            benefits: ['Extra Data', 'Unlimited 5G', 'Weekend Rollover'],
        },
        {
            id: 11,
            amount: 839,
            validity: '84 Days',
            data: '2 GB/Day',
            calls: 'Unlimited',
            sms: '100/Day',
            popular: false,
            bestValue: false,
            category: 'data',
            gradient: 'from-red-500 via-pink-500 to-rose-500',
            benefits: ['Premium Data', 'Unlimited 5G', 'Priority Network'],
        },
        {
            id: 12,
            amount: 1799,
            validity: '180 Days',
            data: '2 GB/Day',
            calls: 'Unlimited',
            sms: '100/Day',
            popular: false,
            bestValue: true,
            category: 'data',
            gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
            benefits: ['Long Validity', 'Unlimited 5G', 'Free Roaming'],
        },

        // UNLIMITED PLANS
        {
            id: 13,
            amount: 179,
            validity: '28 Days',
            data: '1.5 GB/Day',
            calls: 'Truly Unlimited',
            sms: 'Unlimited',
            popular: false,
            bestValue: false,
            category: 'unlimited',
            gradient: 'from-sky-500 via-blue-500 to-indigo-500',
            benefits: ['Unlimited Everything', 'No FUP', 'Free Hellotunes'],
        },
        {
            id: 14,
            amount: 399,
            validity: '56 Days',
            data: '2 GB/Day',
            calls: 'Truly Unlimited',
            sms: 'Unlimited',
            popular: false,
            bestValue: true,
            category: 'unlimited',
            gradient: 'from-emerald-500 via-green-500 to-lime-500',
            benefits: ['Unlimited Everything', 'Unlimited 5G', 'Weekend Bonus'],
        },
        {
            id: 15,
            amount: 699,
            validity: '84 Days',
            data: '2.5 GB/Day',
            calls: 'Truly Unlimited',
            sms: 'Unlimited',
            popular: false,
            bestValue: true,
            category: 'unlimited',
            gradient: 'from-amber-500 via-orange-500 to-red-500',
            benefits: ['Unlimited Everything', 'Unlimited 5G', 'Premium Support'],
        },
        {
            id: 16,
            amount: 1499,
            validity: '180 Days',
            data: '2 GB/Day',
            calls: 'Truly Unlimited',
            sms: 'Unlimited',
            popular: false,
            bestValue: false,
            category: 'unlimited',
            gradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
            benefits: ['Unlimited Everything', 'Unlimited 5G', 'Free Roaming'],
        },
        {
            id: 17,
            amount: 3999,
            validity: '365 Days',
            data: '2.5 GB/Day',
            calls: 'Truly Unlimited',
            sms: 'Unlimited',
            popular: false,
            bestValue: true,
            category: 'unlimited',
            gradient: 'from-purple-600 via-indigo-600 to-blue-600',
            benefits: ['Unlimited Everything', 'Unlimited 5G', 'All OTT Apps', 'Priority Support'],
        },

        // CRICKET/SPORTS PLANS
        {
            id: 18,
            amount: 499,
            validity: 'IPL Season',
            data: '1.5 GB/Day',
            calls: 'Unlimited',
            sms: '100/Day',
            popular: false,
            bestValue: false,
            category: 'cricket',
            gradient: 'from-orange-500 via-red-500 to-pink-500',
            benefits: ['Hotstar Sports', 'Live IPL Matches', 'Unlimited 5G'],
        },
        {
            id: 19,
            amount: 599,
            validity: '90 Days',
            data: '2 GB/Day',
            calls: 'Unlimited',
            sms: '100/Day',
            popular: false,
            bestValue: true,
            category: 'cricket',
            gradient: 'from-green-500 via-emerald-500 to-cyan-500',
            benefits: ['Sports Pack', 'All Sports Channels', 'Live Cricket'],
        },
        {
            id: 20,
            amount: 799,
            validity: 'Cricket Season',
            data: '2 GB/Day',
            calls: 'Unlimited',
            sms: '100/Day',
            popular: false,
            bestValue: false,
            category: 'cricket',
            gradient: 'from-blue-600 via-indigo-600 to-purple-600',
            benefits: ['All Sports Channels', 'Live Cricket', 'Highlights', 'Unlimited 5G'],
        },
        {
            id: 21,
            amount: 1299,
            validity: '180 Days',
            data: '2.5 GB/Day',
            calls: 'Unlimited',
            sms: '100/Day',
            popular: false,
            bestValue: true,
            category: 'cricket',
            gradient: 'from-yellow-500 via-amber-500 to-orange-500',
            benefits: ['Premium Sports', 'All Tournaments', 'Live Streaming', 'Unlimited 5G'],
        },
    ];

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
                                key={plan.id}
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
