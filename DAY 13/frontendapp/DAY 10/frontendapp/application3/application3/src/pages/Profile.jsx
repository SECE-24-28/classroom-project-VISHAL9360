import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Clock, CreditCard, Shield, LogOut } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { getMyTransactions } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getMyTransactions();
                setTransactions(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Failed to fetch transactions', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchTransactions();
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card variant="glass" className="bg-gradient-to-r from-blue-600 to-purple-600 border-none text-white">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl font-bold border-4 border-white/30">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-3xl font-black mb-2">{user.name}</h1>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-blue-100">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        <span>{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-4 h-4" />
                                        <span className="capitalize">{user.role}</span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                onClick={handleLogout}
                                className="bg-white/20 hover:bg-white/30 text-white border-0"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </Card>
                </motion.div>

                {/* Main Content */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Stats/Info Side */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card variant="glass" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-purple-500" />
                                    Account Status
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                                        <span className="font-semibold">Active</span>
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Member since {new Date().toLocaleDateString()}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Transaction History */}
                    <motion.div
                        className="md:col-span-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card variant="glass" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-full">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <Clock className="w-6 h-6 text-blue-500" />
                                Recent Transactions
                            </h3>

                            {loading ? (
                                <div className="text-center py-12 text-gray-500">Loading history...</div>
                            ) : transactions.length > 0 ? (
                                <div className="space-y-4">
                                    {transactions.map((txn) => (
                                        <div
                                            key={txn._id}
                                            className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="font-bold text-gray-900 dark:text-white">{txn.planName}</h4>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(txn.createdAt).toLocaleDateString()}
                                                        <span className="mx-1">•</span>
                                                        <span className="font-mono">{txn.userMobile}</span>
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                                                        ₹{txn.amount}
                                                    </div>
                                                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${txn.status === 'Success'
                                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                        }`}>
                                                        {txn.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                                                <span className="font-mono">ID: {txn.paymentId}</span>
                                                <div className="flex items-center gap-1">
                                                    <CreditCard className="w-3 h-3" />
                                                    Online Paid
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Clock className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">No transactions yet</h4>
                                    <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto mt-2">
                                        Your recharge history will appear here once you make your first payment.
                                    </p>
                                    <Button
                                        onClick={() => navigate('/plans')}
                                        className="mt-6"
                                        variant="outline"
                                    >
                                        Browse Plans
                                    </Button>
                                </div>
                            )}
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
