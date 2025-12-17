import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, ChevronRight, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';

const AdminLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const res = await login(formData.email, formData.password);

        setLoading(false);
        if (res.success) {
            if (res.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                setError('Access Denied: Admin privileges required.');
            }
        } else {
            setError(res.message || 'Authentication failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-mono">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop"
                    alt="Cyber Security"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/90 backdrop-blur-[2px]"></div>
            </div>


            {/* Glowing Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-8">
                    <motion.div
                        animate={{ boxShadow: ['0 0 0px #10b981', '0 0 20px #10b981', '0 0 0px #10b981'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-16 h-16 mx-auto bg-black border-2 border-green-500/50 rounded-full flex items-center justify-center mb-4 relative"
                    >
                        <ShieldCheck className="w-8 h-8 text-green-500" />
                        <div className="absolute inset-0 rounded-full border border-green-500/30 animate-ping"></div>
                    </motion.div>
                    <h1 className="text-2xl font-black text-white tracking-widest uppercase">
                        Admin <span className="text-green-500">Console</span>
                    </h1>
                    <p className="text-green-500/60 mt-1 text-[10px] tracking-[0.2em]">SYSTEM LEVEL ACCESS ONLY</p>
                </div>

                <div className="bg-black/80 backdrop-blur-md border border-green-500/30 p-8 rounded-sm relative overflow-hidden group">
                    {/* Scanning Line Effect */}
                    <motion.div
                        animate={{ top: ['-100%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-green-500/10 to-transparent pointer-events-none"
                    />

                    {error && (
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="mb-8 p-4 bg-red-900/20 border border-red-500/50 flex items-center gap-3 text-red-500 text-sm font-bold tracking-wide"
                        >
                            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                            {error.toUpperCase()}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-xs font-bold text-green-500 mb-2 uppercase tracking-widest">Identity</label>
                            <div className="relative">
                                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-green-700 w-5 h-5" />
                                <input
                                    type="email"
                                    required
                                    className="block w-full pl-12 pr-4 py-4 bg-black border border-green-900 text-green-400 placeholder-green-900/50 focus:outline-none focus:border-green-500 focus:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all rounded-sm uppercase tracking-wider"
                                    placeholder="ADMIN ID"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-green-500 mb-2 uppercase tracking-widest">Access Key</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-green-700 w-5 h-5" />
                                <input
                                    type="password"
                                    required
                                    className="block w-full pl-12 pr-4 py-4 bg-black border border-green-900 text-green-400 placeholder-green-900/50 focus:outline-none focus:border-green-500 focus:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all rounded-sm tracking-widest"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-green-600 hover:bg-green-500 text-black font-black uppercase tracking-[0.2em] transition-all hover:shadow-[0_0_20px_rgba(22,163,74,0.6)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loading ? 'AUTHENTICATING...' : 'INITIALIZE SESSION'}
                            {!loading && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-12 space-y-2">
                    <p className="text-green-900 text-[10px] uppercase tracking-widest">Secure Connection Established via TLS 1.3</p>
                    <p className="text-green-900 text-[10px] uppercase tracking-widest">IP Logged for Security Audit</p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
