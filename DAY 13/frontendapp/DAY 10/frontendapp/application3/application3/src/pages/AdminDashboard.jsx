
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Users, CreditCard, Package, Settings, LogOut, Bell, Search,
    DollarSign, Activity, Zap, Menu, X, ChevronRight, BarChart3
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';
import { getAllPlans, getAllTransactions, getAllUsers, createPlan, deletePlan, updatePlan } from '../services/api';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeSection, setActiveSection] = useState('dashboard');

    const [stats, setStats] = useState([
        { title: 'Total Revenue', value: '₹0', change: '+0%', icon: DollarSign, color: 'from-green-500 to-emerald-600' },
        { title: 'Active Users', value: '0', change: '+0%', icon: Users, color: 'from-blue-500 to-cyan-600' },
        { title: 'Recharges', value: '0', change: '+0%', icon: Zap, color: 'from-purple-500 to-pink-600' },
        { title: 'Success Rate', value: '100%', change: '+0%', icon: Activity, color: 'from-orange-500 to-red-600' },
    ]);

    const [transactions, setTransactions] = useState([]);
    const [users, setUsers] = useState([]);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingPlanId, setEditingPlanId] = useState(null);

    // Form Data
    const [formData, setFormData] = useState({
        operator: 'Jio',
        planName: '',
        planType: 'Truly Unlimited',
        amount: '',
        validity: '',
        data: '',
        description: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [plansData, txnsData, usersData] = await Promise.all([
                    getAllPlans(),
                    getAllTransactions(),
                    getAllUsers()
                ]);

                if (plansData.success) setPlans(plansData.data);

                // Transactions might be direct array or { data: [] }
                const realTxns = Array.isArray(txnsData) ? txnsData : (txnsData.data || []);
                setTransactions(realTxns);

                // Users
                const realUsers = usersData.data || [];
                setUsers(realUsers);

                // Calculate Stats
                const totalRevenue = realTxns.reduce((acc, txn) => acc + (Number(txn.amount) || 0), 0);
                const totalRecharges = realTxns.length;

                setStats([
                    { title: 'Total Revenue', value: `₹${totalRevenue}`, change: '+10%', icon: DollarSign, color: 'from-green-500 to-emerald-600' },
                    { title: 'Total Users', value: realUsers.length.toString(), change: '+5%', icon: Users, color: 'from-blue-500 to-cyan-600' },
                    { title: 'Total Recharges', value: totalRecharges.toString(), change: '+8%', icon: Zap, color: 'from-purple-500 to-pink-600' },
                    { title: 'Active Plans', value: plansData.count?.toString() || '0', change: '+2%', icon: Package, color: 'from-orange-500 to-red-600' },
                ]);

            } catch (error) {
                console.error("Error fetching admin data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCreatePlan = async (e) => {
        e.preventDefault();
        try {
            if (editingPlanId) {
                await updatePlan(editingPlanId, formData);
                alert('Plan updated successfully!');
            } else {
                await createPlan(formData);
                alert('Plan created successfully!');
            }

            // Refresh plans
            const plansData = await getAllPlans();
            if (plansData.success) setPlans(plansData.data);

            resetForm();
        } catch (error) {
            console.error(error);
            alert(`Failed to ${editingPlanId ? 'update' : 'create'} plan`);
        }
    };

    const resetForm = () => {
        setEditingPlanId(null);
        setFormData({
            operator: 'Jio',
            planName: '',
            planType: 'Truly Unlimited',
            amount: '',
            validity: '',
            data: '',
            description: ''
        });
    };

    const handleEditClick = (plan) => {
        setEditingPlanId(plan._id);
        setFormData({
            operator: plan.operator,
            planName: plan.planName,
            planType: plan.planType,
            amount: plan.amount,
            validity: plan.validity,
            data: plan.data,
            description: plan.description
        });
    };

    const handleDeletePlan = async (id) => {
        if (window.confirm('Are you sure you want to delete this plan?')) {
            try {
                await deletePlan(id);
                // Refresh plans
                setPlans(plans.filter(plan => plan._id !== id));
            } catch (error) {
                console.error(error);
                alert('Failed to delete plan');
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Menu Items
    const menuItems = [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { id: 'users', name: 'Users', icon: Users },
        { id: 'plans', name: 'Plans', icon: Package },
        { id: 'transactions', name: 'Transactions', icon: CreditCard },
        { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    ];

    return (
        <div className="min-h-screen bg-gray-900 flex text-white font-sans overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </div>

            {/* Sidebar */}
            <motion.aside
                initial={{ x: -300 }}
                animate={{ x: sidebarOpen ? 0 : -300 }}
                className="fixed left-0 top-0 h-full w-72 bg-gray-900/80 backdrop-blur-xl border-r border-gray-800 z-50 overflow-y-auto"
            >
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <LayoutDashboard className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white tracking-tight">Flashy<span className="text-blue-500">Admin</span></h2>
                            <p className="text-xs text-gray-400 font-medium">Control Center</p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-all duration-300 relative overflow-hidden group ${activeSection === item.id
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {activeSection === item.id && (
                                    <motion.div
                                        layoutId="active-tab"
                                        className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-sm"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                )}
                                <item.icon className={`w-5 h-5 relative z-10 ${activeSection === item.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                                <span className="relative z-10">{item.name}</span>
                            </button>
                        ))}
                    </nav>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all mt-auto absolute bottom-6 left-0 right-0 mx-6 bg-red-900/10 border border-red-900/20"
                        style={{ width: 'calc(100% - 48px)' }}
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-0'} relative z-10`}>
                {/* Header */}
                <header className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 px-8 py-5 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-800 rounded-xl transition-colors">
                            {sidebarOpen ? <X className="text-gray-400" /> : <Menu className="text-gray-400" />}
                        </button>
                        <div>
                            <h1 className="text-2xl font-black capitalize bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                {activeSection}
                            </h1>
                            <p className="text-sm text-gray-500 font-medium">Overview of your application</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                            <Bell className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <h3 className="font-bold text-sm">A</h3>
                        </div>
                    </div>
                </header>

                <main className="p-6 space-y-6">
                    {/* DASHBOARD VIEW */}
                    {activeSection === 'dashboard' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {stats.map((stat, idx) => (
                                    <Card key={idx} variant="glass" className="bg-gray-800 border border-gray-700">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                                <stat.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-green-400 text-sm font-bold">{stat.change}</span>
                                        </div>
                                        <h3 className="text-gray-400 text-sm">{stat.title}</h3>
                                        <p className="text-3xl font-black">{stat.value}</p>
                                    </Card>
                                ))}
                            </div>

                            {/* Recent Transactions Table */}
                            <Card variant="glass" className="bg-gray-800 border border-gray-700">
                                <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-700/50">
                                            <tr>
                                                <th className="p-3">User</th>
                                                <th className="p-3">Plan</th>
                                                <th className="p-3">Amount</th>
                                                <th className="p-3">Status</th>
                                                <th className="p-3">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transactions.slice(0, 5).map((txn) => (
                                                <tr key={txn._id} className="border-b border-gray-700 font-mono text-sm">
                                                    <td className="p-3">{txn.userMobile || 'Unknown'}</td>
                                                    <td className="p-3">{txn.planName}</td>
                                                    <td className="p-3 font-bold text-green-400">₹{txn.amount}</td>
                                                    <td className="p-3">
                                                        <span className="px-2 py-1 bg-green-900 text-green-300 rounded text-xs">{txn.status}</span>
                                                    </td>
                                                    <td className="p-3 text-gray-400">{new Date(txn.createdAt).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                            {transactions.length === 0 && (
                                                <tr><td colSpan="5" className="p-4 text-center text-gray-500">No transactions found</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </>
                    )}

                    {/* USERS VIEW */}
                    {activeSection === 'users' && (
                        <Card variant="glass" className="bg-gray-800 border border-gray-700">
                            <h3 className="text-xl font-bold mb-4">All Users</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-700/50">
                                        <tr>
                                            <th className="p-3">Name</th>
                                            <th className="p-3">Email</th>
                                            <th className="p-3">Role</th>
                                            <th className="p-3">Joined</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((u) => (
                                            <tr key={u._id} className="border-b border-gray-700">
                                                <td className="p-3 font-semibold">{u.name}</td>
                                                <td className="p-3 text-gray-400">{u.email}</td>
                                                <td className="p-3 capitalize">
                                                    <span className={`px-2 py-1 rounded text-xs ${u.role === 'admin' ? 'bg-purple-900 text-purple-300' : 'bg-blue-900 text-blue-300'}`}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-gray-500 text-sm">{new Date(u.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    )}

                    {/* USERS / TRANSACTIONS FULL VIEW (Reusable Table logic could go here) */}
                    {activeSection === 'transactions' && (
                        <Card variant="glass" className="bg-gray-800 border border-gray-700">
                            <h3 className="text-xl font-bold mb-4">All Transactions</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-700/50">
                                        <tr>
                                            <th className="p-3">User Mobile</th>
                                            <th className="p-3">Plan</th>
                                            <th className="p-3">Amount</th>
                                            <th className="p-3">Payment ID</th>
                                            <th className="p-3">Status</th>
                                            <th className="p-3">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map((txn) => (
                                            <tr key={txn._id} className="border-b border-gray-700 font-mono text-sm">
                                                <td className="p-3">{txn.userMobile}</td>
                                                <td className="p-3">{txn.planName}</td>
                                                <td className="p-3 font-bold text-green-400">₹{txn.amount}</td>
                                                <td className="p-3 text-gray-400 text-xs">{txn.paymentId}</td>
                                                <td className="p-3">
                                                    <span className="px-2 py-1 bg-green-900 text-green-300 rounded text-xs">{txn.status}</span>
                                                </td>
                                                <td className="p-3 text-gray-400">{new Date(txn.createdAt).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    )}

                    {/* PLANS VIEW */}
                    {activeSection === 'plans' && (
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Create Plan Form */}
                            <Card variant="glass" className="bg-gray-800 border border-gray-700 lg:col-span-1">
                                <h3 className="text-xl font-bold text-white mb-6">
                                    {editingPlanId ? 'Update Plan' : 'Create New Plan'}
                                </h3>
                                <form onSubmit={handleCreatePlan} className="space-y-4">
                                    {/* Form fields same as before... */}
                                    <div>
                                        <label className="block text-gray-400 mb-2 text-sm">Operator</label>
                                        <select
                                            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
                                            value={formData.operator}
                                            onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
                                        >
                                            <option>Jio</option>
                                            <option>Airtel</option>
                                            <option>Vi</option>
                                            <option>BSNL</option>
                                        </select>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Plan Name"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
                                        value={formData.planName}
                                        onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Amount"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Validity"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
                                        value={formData.validity}
                                        onChange={(e) => setFormData({ ...formData, validity: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Data"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
                                        value={formData.data}
                                        onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                                        required
                                    />

                                    <textarea
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white h-24"
                                        placeholder="Description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    ></textarea>

                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all"
                                        >
                                            {editingPlanId ? 'Update Plan' : 'Create Plan'}
                                        </button>
                                        {editingPlanId && (
                                            <button
                                                type="button"
                                                onClick={resetForm}
                                                className="px-4 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 transition-all"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </Card>

                            {/* Plan List */}
                            <Card variant="glass" className="bg-gray-800 border border-gray-700 lg:col-span-2">
                                <h3 className="text-xl font-bold text-white mb-6">Existing Plans ({plans.length})</h3>
                                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                                    {plans.map((plan) => (
                                        <div key={plan._id} className="p-4 rounded-xl bg-gray-700/50 flex justify-between items-center hover:bg-gray-700 transition-all">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${plan.operator === 'Jio' ? 'bg-blue-900 text-blue-300' :
                                                        plan.operator === 'Airtel' ? 'bg-red-900 text-red-300' :
                                                            'bg-orange-900 text-orange-300'
                                                        }`}>{plan.operator}</span>
                                                    <h4 className="font-bold text-white">{plan.planName}</h4>
                                                </div>
                                                <p className="text-sm text-gray-400 mt-1">{plan.data} | {plan.validity}</p>
                                            </div>
                                            <div className="text-right flex items-center gap-4">
                                                <p className="font-mono font-bold text-green-400 text-lg">₹{plan.amount}</p>
                                                <button
                                                    onClick={() => handleEditClick(plan)}
                                                    className="p-2 text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors"
                                                    title="Edit Plan"
                                                >
                                                    <Settings className="w-4 h-4" /> {/* Reusing Settings icon for edit, or could import Edit2 */}
                                                </button>
                                                <button
                                                    onClick={() => handleDeletePlan(plan._id)}
                                                    className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                                                    title="Delete Plan"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* ANALYTICS VIEW */}
                    {activeSection === 'analytics' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card variant="glass" className="bg-gray-800 border border-gray-700 h-[400px]">
                                <h3 className="text-xl font-bold mb-6">Revenue Overview</h3>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={transactions.map(t => ({ date: new Date(t.createdAt).toLocaleDateString(), amount: t.amount }))}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="date" stroke="#9ca3af" />
                                        <YAxis stroke="#9ca3af" />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Area type="monotone" dataKey="amount" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorRevenue)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </Card>

                            <Card variant="glass" className="bg-gray-800 border border-gray-700 h-[400px]">
                                <h3 className="text-xl font-bold mb-6">Plans Distribution</h3>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: 'Jio', value: plans.filter(p => p.operator === 'Jio').length },
                                                { name: 'Airtel', value: plans.filter(p => p.operator === 'Airtel').length },
                                                { name: 'Vi', value: plans.filter(p => p.operator === 'Vi').length },
                                                { name: 'BSNL', value: plans.filter(p => p.operator === 'BSNL').length },
                                            ]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            <Cell key="cell-0" fill="#3b82f6" />
                                            <Cell key="cell-1" fill="#ef4444" />
                                            <Cell key="cell-2" fill="#8b5cf6" />
                                            <Cell key="cell-3" fill="#f97316" />
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Card>
                        </div>
                    )}

                    {/* SETTINGS VIEW */}
                    {activeSection === 'settings' && (
                        <Card variant="glass" className="bg-gray-800 border border-gray-700 max-w-2xl mx-auto">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Settings className="w-6 h-6" />
                                System Settings
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                                    <div>
                                        <h4 className="font-bold">Email Notifications</h4>
                                        <p className="text-sm text-gray-400">Receive alerts for new transactions</p>
                                    </div>
                                    <div className="w-12 h-6 bg-green-600 rounded-full relative cursor-pointer">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                                    <div>
                                        <h4 className="font-bold">Maintenance Mode</h4>
                                        <p className="text-sm text-gray-400">Suspend all recharges temporarily</p>
                                    </div>
                                    <div className="w-12 h-6 bg-gray-600 rounded-full relative cursor-pointer">
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                    </div>
                                </div>
                                <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-xl">
                                    <h4 className="font-bold text-red-400 mb-2">Danger Zone</h4>
                                    <p className="text-sm text-red-300 mb-4">Irreversible actions for system administrators</p>
                                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors">
                                        Reset System Database
                                    </button>
                                </div>
                            </div>
                        </Card>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
