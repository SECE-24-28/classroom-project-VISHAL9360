import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RechargeWidget = () => {
    const navigate = useNavigate();
    const [mobileNumber, setMobileNumber] = useState('');
    const [operator, setOperator] = useState('');
    const [circle, setCircle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mobileNumber.length === 10) {
            navigate('/plans', { state: { mobileNumber, operator, circle } });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20 dark:border-gray-700 relative z-20 -mt-10 md:-mt-20 mx-4"
        >
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Smartphone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Prepaid Mobile Recharge</h3>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block pl-1">Mobile Number</label>
                    <input
                        type="text"
                        maxLength="10"
                        placeholder="Enter 10 digit mobile number"
                        className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-lg font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    />
                    {mobileNumber.length === 10 && (
                        <CheckCircle2 className="absolute right-4 top-9 w-5 h-5 text-green-500" />
                    )}
                </div>

                <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block pl-1">Operator</label>
                    <select
                        className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3.5 text-gray-700 dark:text-gray-200 font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                        value={operator}
                        onChange={(e) => setOperator(e.target.value)}
                    >
                        <option value="">Select Operator</option>
                        <option value="Jio">Jio</option>
                        <option value="Airtel">Airtel</option>
                        <option value="Vi">Vi</option>
                        <option value="BSNL">BSNL</option>
                    </select>
                </div>

                <div className="flex items-end">
                    <button
                        type="submit"
                        disabled={mobileNumber.length !== 10}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                    >
                        See Plans
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </form>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-yellow-500" /> Instant activation</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> 100% Secure</span>
                <span className="flex items-center gap-1"><Smartphone className="w-4 h-4 text-blue-500" /> No hidden fees</span>
            </div>
        </motion.div>
    );
};

export default RechargeWidget;
