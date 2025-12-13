import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    User, Phone, Mail, Calendar, CreditCard, History, Edit2, LogOut, Zap, TrendingUp,
    Wallet, Gift, Bell, Settings, Share2, Shield, Plus, ChevronRight, Award, Star
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const Profile = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    // Mock user data
    const [user] = useState({
        name: 'Rahul Kumar',
        phone: '+91 98765 43210',
        email: 'rahul.kumar@email.com',
        memberSince: 'January 2024',
        balance: 150,
        totalRecharges: 24,
        totalSpent: 7250,
        referralCode: 'RAHUL2024',
        referralEarnings: 450
    });

    const rechargeHistory = [
        { id: 1, date: '10 Dec 2024', amount: 299, plan: '28 Days - 1.5 GB/Day', operator: 'Jio', status: 'Success' },
        { id: 2, date: '12 Nov 2024', amount: 479, plan: '56 Days - 1.5 GB/Day', operator: 'Airtel', status: 'Success' },
        { id: 3, date: '15 Oct 2024', amount: 666, plan: '77 Days - 1.5 GB/Day', operator: 'Vi', status: 'Success' },
        { id: 4, date: '20 Sep 2024', amount: 299, plan: '28 Days - 1.5 GB/Day', operator: 'Jio', status: 'Success' },
        { id: 5, date: '25 Aug 2024', amount: 719, plan: '84 Days - 1.5 GB/Day', operator: 'Airtel', status: 'Success' },
    ];

    const savedPayments = [
        { id: 1, type: 'UPI', details: 'rahul@paytm', default: true },
        { id: 2, type: 'Card', details: '**** **** **** 4532', default: false },
        { id: 3, type: 'UPI', details: 'rahul@gpay', default: false },
    ];

    const notifications = [
        { id: 1, title: 'Recharge Reminder', message: 'Your plan expires in 3 days', time: '2 hours ago', type: 'warning' },
        { id: 2, title: 'New Offer', message: '50% cashback on recharges above ₹500', time: '1 day ago', type: 'success' },
        { id: 3, title: 'Referral Bonus', message: 'You earned ₹50 from referral', time: '2 days ago', type: 'info' },
    ];

    const tabs = [
        { id: 'overview', name: 'Overview', icon: User },
        { id: 'wallet', name: 'Wallet', icon: Wallet },
        { id: 'payments', name: 'Payments', icon: CreditCard },
        { id: 'referral', name: 'Referral', icon: Gift },
        { id: 'notifications', name: 'Alerts', icon: Bell },
        { id: 'settings', name: 'Settings', icon: Settings },
    ];

    const handleLogout = () => {
        navigate('/');
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
                    <h1 className="text-5xl font-black mb-4">
                        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                            My Profile
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Manage your account and preferences
                    </p>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex overflow-x-auto gap-2 mb-8 pb-2"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-2xl'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg border-2 border-gray-200 dark:border-gray-700'
                                }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.name}
                        </button>
                    ))}
                </motion.div>

                <AnimatePresence mode="wait">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="grid lg:grid-cols-3 gap-8"
                        >
                            {/* Profile Card */}
                            <Card variant="glass" className="border-2 border-gray-200 dark:border-gray-700 text-center">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-2xl"
                                >
                                    <User className="w-16 h-16 text-white" strokeWidth={2.5} />
                                </motion.div>

                                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                                    {user.name}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Member since {user.memberSince}
                                </p>

                                <div className="space-y-4 mb-8 text-left">
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
                                        <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">{user.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
                                        <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{user.email}</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Button variant="primary" icon={Edit2} className="w-full">
                                        Edit Profile
                                    </Button>
                                    <Button variant="ghost" icon={LogOut} className="w-full" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </div>
                            </Card>

                            {/* Stats & Actions */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Card variant="glass" className="border-2 border-gray-200 dark:border-gray-700 text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg">
                                            <Wallet className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-2">
                                            ₹{user.balance}
                                        </div>
                                        <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                            Wallet Balance
                                        </div>
                                    </Card>

                                    <Card variant="glass" className="border-2 border-gray-200 dark:border-gray-700 text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center shadow-lg">
                                            <Zap className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent mb-2">
                                            {user.totalRecharges}
                                        </div>
                                        <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                            Total Recharges
                                        </div>
                                    </Card>

                                    <Card variant="glass" className="border-2 border-gray-200 dark:border-gray-700 text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center shadow-lg">
                                            <TrendingUp className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">
                                            ₹{user.totalSpent}
                                        </div>
                                        <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                            Total Spent
                                        </div>
                                    </Card>
                                </div>

                                {/* Quick Actions */}
                                <Card variant="glass" className="border-2 border-gray-200 dark:border-gray-700">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Button variant="primary" icon={Zap} onClick={() => navigate('/plans')} className="w-full">
                                            Recharge Now
                                        </Button>
                                        <Button variant="ghost" icon={Plus} className="w-full">
                                            Add Money
                                        </Button>
                                    </div>
                                </Card>

                                {/* Recent Activity */}
                                <Card variant="glass" className="border-2 border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                            <History className="w-6 h-6" />
                                            Recent Recharges
                                        </h3>
                                        <button className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">
                                            View All
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {rechargeHistory.slice(0, 3).map((recharge) => (
                                            <div key={recharge.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white">{recharge.plan}</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{recharge.date} • {recharge.operator}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-black text-gray-900 dark:text-white">₹{recharge.amount}</p>
                                                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-bold">
                                                        {recharge.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </motion.div>
                    )}

                    {/* Wallet Tab */}
                    {activeTab === 'wallet' && (
                        <motion.div
                            key="wallet"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-4xl mx-auto space-y-8"
                        >
                            <Card variant="glass" className="border-2 border-gray-200 dark:border-gray-700">
                                <div className="text-center mb-8">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Available Balance</p>
                                    <h2 className="text-6xl font-black bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-6">
                                        ₹{user.balance}
                                    </h2>
                                    <Button variant="primary" icon={Plus} size="lg">
                                        Add Money to Wallet
                                    </Button>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <div className="text-center p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                                        <Award className="w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                                        <p className="text-2xl font-black text-blue-600 dark:text-blue-400">₹{user.referralEarnings}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Referral Earnings</p>
                                    </div>
                                    <div className="text-center p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                                        <Star className="w-8 h-8 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
                                        <p className="text-2xl font-black text-purple-600 dark:text-purple-400">₹250</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Cashback Earned</p>
                                    </div>
                                    <div className="text-center p-4 rounded-xl bg-pink-50 dark:bg-pink-900/20">
                                        <Gift className="w-8 h-8 mx-auto mb-2 text-pink-600 dark:text-pink-400" />
                                        <p className="text-2xl font-black text-pink-600 dark:text-pink-400">₹100</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Bonus Credits</p>
                                    </div>
                                </div>
                            </Card>

                            <Card variant="glass" className="border-2 border-gray-200 dark:border-gray-700">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Wallet Transactions</h3>
                                <div className="space-y-3">
                                    {[
                                        { type: 'Credit', amount: 500, desc: 'Added to wallet', date: '10 Dec 2024' },
                                        { type: 'Debit', amount: 299, desc: 'Recharge payment', date: '10 Dec 2024' },
                                        { type: 'Credit', amount: 50, desc: 'Referral bonus', date: '8 Dec 2024' },
                                    ].map((txn, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                            <div>
                                                <p className="font-bold text-gray-900 dark:text-white">{txn.desc}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{txn.date}</p>
                                            </div>
                                            <p className={`font-black text-xl ${txn.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
                                                {txn.type === 'Credit' ? '+' : '-'}₹{txn.amount}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {/* Saved Payments Tab */}
                    {activeTab === 'payments' && (
                        <motion.div
                            key="payments"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-4xl mx-auto space-y-8"
                        >
                            <Card variant="glass" className="border-2 border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Payment Methods</h3>
                                    <Button variant="primary" icon={Plus} size="sm">
                                        Add New
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {savedPayments.map((payment) => (
                                        <div key={payment.id} className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                                    <CreditCard className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white">{payment.type}</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{payment.details}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {payment.default && (
                                                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold">
                                                        Default
                                                    </span>
                                                )}
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <ChevronRight className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {/* Referral Tab */}
                    {activeTab === 'referral' && (
                        <motion.div
                            key="referral"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-4xl mx-auto space-y-8"
                        >
                            <Card variant="glass" className="border-2 border-gray-200 dark:border-gray-700 text-center">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl">
                                    <Gift className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                                    Refer & Earn ₹100
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-8">
                                    Share your code and earn rewards for every successful referral
                                </p>

                                <div className="max-w-md mx-auto mb-8">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your Referral Code</p>
                                    <div className="flex gap-3">
                                        <div className="flex-1 p-4 rounded-xl bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-purple-500">
                                            <p className="text-3xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                                {user.referralCode}
                                            </p>
                                        </div>
                                        <Button variant="primary" icon={Share2}>
                                            Share
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-900/20">
                                        <p className="text-4xl font-black text-green-600 dark:text-green-400 mb-2">₹{user.referralEarnings}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Earnings</p>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20">
                                        <p className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2">9</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Successful Referrals</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <motion.div
                            key="notifications"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-4xl mx-auto space-y-8"
                        >
                            <Card variant="glass" className="border-2 border-gray-200 dark:border-gray-700">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Notifications</h3>
                                <div className="space-y-4">
                                    {notifications.map((notif) => (
                                        <div key={notif.id} className={`p-6 rounded-2xl border-l-4 ${notif.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500' :
                                            notif.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-500' :
                                                'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                                            }`}>
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">{notif.title}</h4>
                                                    <p className="text-gray-600 dark:text-gray-400 mb-2">{notif.message}</p>
                                                    <p className="text-xs text-gray-500">{notif.time}</p>
                                                </div>
                                                <Bell className="w-5 h-5 text-gray-400" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <motion.div
                            key="settings"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-4xl mx-auto space-y-8"
                        >
                            <Card variant="glass" className="border-2 border-gray-200 dark:border-gray-700">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h3>
                                <div className="space-y-4">
                                    {[
                                        { icon: Shield, title: 'Security', desc: 'Password, 2FA, and security settings' },
                                        { icon: Bell, title: 'Notifications', desc: 'Manage notification preferences' },
                                        { icon: User, title: 'Account', desc: 'Update personal information' },
                                        { icon: CreditCard, title: 'Billing', desc: 'Payment methods and billing info' },
                                    ].map((setting, idx) => (
                                        <button key={idx} className="w-full flex items-center justify-between p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                                    <setting.icon className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white">{setting.title}</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{setting.desc}</p>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-400" />
                                        </button>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Profile;
