import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const RechargeHistory = ({ maxItems = 10 }) => {
    const { rechargeHistory, user } = useAppContext();
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'failed':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return '✓';
            case 'pending':
                return '⏳';
            case 'failed':
                return '✗';
            default:
                return '?';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredHistory = rechargeHistory
        .filter(item => {
            if (filter !== 'all' && item.status !== filter) return false;
            if (searchTerm && !item.mobileNumber.includes(searchTerm)) return false;
            return true;
        })
        .slice(0, maxItems);

    if (!user) {
        return (
            <section id="history" className="py-16 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="text-6xl mb-4">🔒</div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                        Login Required
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Please login to view your recharge history
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section id="history" className="py-16 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 gradient-text">
                        Recharge History
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Track all your recharge transactions
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
                    {/* Status Filter */}
                    <div className="flex gap-2">
                        {['all', 'completed', 'pending', 'failed'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all duration-200 ${filter === status
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search by mobile number"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pl-10 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            🔍
                        </span>
                    </div>
                </div>

                {/* History List */}
                {filteredHistory.length > 0 ? (
                    <div className="space-y-4">
                        {filteredHistory.map((item, index) => (
                            <div
                                key={item.id}
                                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-fadeIn"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    {/* Left Section */}
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-2xl flex-shrink-0">
                                            📱
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                                    {item.mobileNumber}
                                                </h4>
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                                                    {getStatusIcon(item.status)} {item.status}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span>📡</span>
                                                    <span className="capitalize">{item.operator}</span>
                                                    {item.circle && (
                                                        <>
                                                            <span>•</span>
                                                            <span>{item.circle}</span>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span>📅</span>
                                                    <span>{formatDate(item.date)}</span>
                                                </div>
                                                {item.plan && (
                                                    <div className="flex items-center gap-2">
                                                        <span>📊</span>
                                                        <span>{item.plan.data} • {item.plan.validity}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Section */}
                                    <div className="flex items-center justify-between md:flex-col md:items-end gap-4">
                                        <div className="text-right">
                                            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                                                ₹{item.amount}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-lg font-semibold hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
                                                📄 Receipt
                                            </button>
                                            <button className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-lg font-semibold hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
                                                🔄 Repeat
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                            No Recharge History
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {searchTerm || filter !== 'all'
                                ? 'No recharges match your filters'
                                : 'You haven\'t made any recharges yet'}
                        </p>
                        <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
                            Make Your First Recharge
                        </button>
                    </div>
                )}

                {/* Summary Stats */}
                {rechargeHistory.length > 0 && (
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white text-center">
                            <div className="text-3xl font-bold">{rechargeHistory.length}</div>
                            <div className="text-sm mt-2">Total Recharges</div>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white text-center">
                            <div className="text-3xl font-bold">
                                {rechargeHistory.filter(r => r.status === 'completed').length}
                            </div>
                            <div className="text-sm mt-2">Successful</div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white text-center">
                            <div className="text-3xl font-bold">
                                ₹{rechargeHistory.reduce((sum, r) => sum + Number(r.amount), 0)}
                            </div>
                            <div className="text-sm mt-2">Total Spent</div>
                        </div>
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white text-center">
                            <div className="text-3xl font-bold">
                                ₹{Math.round(rechargeHistory.reduce((sum, r) => sum + Number(r.amount), 0) * 0.05)}
                            </div>
                            <div className="text-sm mt-2">Cashback Earned</div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default RechargeHistory;
