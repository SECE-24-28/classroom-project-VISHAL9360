import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Users, CreditCard, Package, Settings, LogOut, Bell, Search,
    TrendingUp, DollarSign, Activity, Zap, Menu, X, ChevronRight, BarChart3, PieChart,
    Plus, Edit, Trash2, Shield, Lock, FileText, Download, CheckCircle, AlertCircle
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';
import Card from '../components/Card';

// Helper Components for new Features

const DashboardOverview = () => {
    // Mock data for charts
    const revenueData = [
        { month: 'Jan', revenue: 45000, recharges: 1200 },
        { month: 'Feb', revenue: 52000, recharges: 1400 },
        { month: 'Mar', revenue: 48000, recharges: 1300 },
        { month: 'Apr', revenue: 61000, recharges: 1600 },
        { month: 'May', revenue: 55000, recharges: 1450 },
        { month: 'Jun', revenue: 67000, recharges: 1750 },
    ];

    const planDistribution = [
        { name: 'Popular Plans', value: 45, color: '#8b5cf6' },
        { name: 'Data Plans', value: 30, color: '#3b82f6' },
        { name: 'Unlimited', value: 20, color: '#10b981' },
        { name: 'Cricket', value: 5, color: '#f59e0b' },
    ];

    const operatorData = [
        { name: 'Jio', value: 40 },
        { name: 'Airtel', value: 30 },
        { name: 'Vi', value: 20 },
        { name: 'BSNL', value: 10 },
    ];

    const stats = [
        { title: 'Total Revenue', value: '₹3,28,000', change: '+12.5%', icon: DollarSign, color: 'from-green-500 to-emerald-600' },
        { title: 'Active Users', value: '8,549', change: '+8.2%', icon: Users, color: 'from-blue-500 to-cyan-600' },
        { title: 'Recharges Today', value: '234', change: '+15.3%', icon: Zap, color: 'from-purple-500 to-pink-600' },
        { title: 'Success Rate', value: '99.2%', change: '+0.8%', icon: Activity, color: 'from-orange-500 to-red-600' },
    ];

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card variant="glass" className="bg-gray-800 border border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-green-400 text-sm font-bold">{stat.change}</span>
                            </div>
                            <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
                            <p className="text-3xl font-black text-white">{stat.value}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <Card variant="glass" className="bg-gray-800 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-6">Revenue Trends</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="month" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                                labelStyle={{ color: '#fff' }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} />
                            <Line type="monotone" dataKey="recharges" stroke="#3b82f6" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>

                {/* Plan Distribution */}
                <Card variant="glass" className="bg-gray-800 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-6">Plan Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <RePieChart>
                            <Pie
                                data={planDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {planDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                            />
                        </RePieChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* Operator Performance */}
            <Card variant="glass" className="bg-gray-800 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-6">Operator Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={operatorData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                            labelStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </Card>

            {/* Recent Transactions */}
            <Card variant="glass" className="bg-gray-800 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
                    <button className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1">
                        View All <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="text-left py-3 px-4 text-gray-400 font-semibold">ID</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-semibold">User</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Plan</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Amount</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Status</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { id: 'TXN001', user: 'Rahul Kumar', plan: '₹299 - 28 Days', amount: '₹299', status: 'Success', date: '10 Dec 2024' },
                                { id: 'TXN002', user: 'Priya Sharma', plan: '₹479 - 56 Days', amount: '₹479', status: 'Success', date: '10 Dec 2024' },
                                { id: 'TXN003', user: 'Amit Patel', plan: '₹666 - 77 Days', amount: '₹666', status: 'Pending', date: '10 Dec 2024' },
                                { id: 'TXN004', user: 'Sneha Reddy', plan: '₹299 - 28 Days', amount: '₹299', status: 'Success', date: '9 Dec 2024' },
                                { id: 'TXN005', user: 'Vikram Singh', plan: '₹719 - 84 Days', amount: '₹719', status: 'Success', date: '9 Dec 2024' },
                            ].map((txn) => (
                                <tr key={txn.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                                    <td className="py-4 px-4 text-gray-300 font-mono text-sm">{txn.id}</td>
                                    <td className="py-4 px-4 text-white font-semibold">{txn.user}</td>
                                    <td className="py-4 px-4 text-gray-300">{txn.plan}</td>
                                    <td className="py-4 px-4 text-white font-bold">{txn.amount}</td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${txn.status === 'Success' ? 'bg-green-900/30 text-green-400' :
                                                txn.status === 'Pending' ? 'bg-yellow-900/30 text-yellow-400' :
                                                    'bg-red-900/30 text-red-400'
                                            }`}>
                                            {txn.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-gray-400 text-sm">{txn.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

// Feature 1: Users Management
const UsersManager = () => {
  const users = [
    { id: 1, name: 'Rahul Kumar', email: 'rahul@example.com', status: 'Active', balance: '₹450', joined: '12 Jan 2024' },
    { id: 2, name: 'Priya Sharma', email: 'priya@example.com', status: 'Active', balance: '₹120', joined: '15 Jan 2024' },
    { id: 3, name: 'Amit Patel', email: 'amit@example.com', status: 'Inactive', balance: '₹0', joined: '20 Jan 2024' },
    { id: 4, name: 'Sneha Reddy', email: 'sneha@example.com', status: 'Active', balance: '₹890', joined: '22 Jan 2024' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">User Management</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus size={20} /> Add User
        </button>
      </div>
      <Card variant="glass" className="bg-gray-800 border border-gray-700">
        <table className="w-full">
            <thead>
                <tr className="border-b border-gray-700 text-gray-400">
                    <th className="py-4 text-left">User</th>
                    <th className="py-4 text-left">Status</th>
                    <th className="py-4 text-left">Wallet Balance</th>
                    <th className="py-4 text-left">Joined Date</th>
                    <th className="py-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                        <td className="py-4">
                            <div>
                                <div className="text-white font-bold">{user.name}</div>
                                <div className="text-gray-500 text-sm">{user.email}</div>
                            </div>
                        </td>
                        <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                {user.status}
                            </span>
                        </td>
                        <td className="py-4 text-white">{user.balance}</td>
                        <td className="py-4 text-gray-400">{user.joined}</td>
                        <td className="py-4 text-right">
                            <button className="text-blue-400 hover:text-blue-300 mr-2"><Edit size={18} /></button>
                            <button className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </Card>
    </div>
  );
};

// Feature 2: Plans Management
const PlansManager = () => {
    const plans = [
        { id: 1, name: 'Super Saver 299', price: '₹299', validity: '28 Days', data: '1.5GB/Day', operator: 'Jio' },
        { id: 2, name: 'Unlimited 479', price: '₹479', validity: '56 Days', data: '1.5GB/Day', operator: 'Airtel' },
        { id: 3, name: 'Data Booster 19', price: '₹19', validity: 'Base plan', data: '1GB', operator: 'Vi' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Recharge Plans</h2>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <Plus size={20} /> Add Plan
                </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map(plan => (
                    <Card key={plan.id} variant="glass" className="bg-gray-800 border border-gray-700 p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                                <div className="text-sm text-gray-400">{plan.operator}</div>
                            </div>
                            <span className="text-2xl font-bold text-green-400">{plan.price}</span>
                        </div>
                        <div className="space-y-2 text-gray-300 mb-6">
                            <div className="flex justify-between">
                                <span>Validity:</span>
                                <span className="font-semibold text-white">{plan.validity}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Data:</span>
                                <span className="font-semibold text-white">{plan.data}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30">Edit</button>
                            <button className="flex-1 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30">Delete</button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

// Feature 3: Analytics & Reports
const AnalyticsView = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">System Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <Card variant="glass" className="bg-gray-800 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">Traffic Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={[
                        { name: '00:00', uv: 4000 }, { name: '04:00', uv: 3000 },
                        { name: '08:00', uv: 2000 }, { name: '12:00', uv: 2780 },
                        { name: '16:00', uv: 1890 }, { name: '20:00', uv: 2390 },
                        { name: '24:00', uv: 3490 },
                    ]}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </Card>

             <Card variant="glass" className="bg-gray-800 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">System Health</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                <CheckCircle className="text-green-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">API Server</h4>
                                <p className="text-xs text-green-400">Operational</p>
                            </div>
                        </div>
                        <span className="text-gray-400 text-sm">99.9% Uptime</span>
                    </div>
                     <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                <AlertCircle className="text-yellow-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Database Load</h4>
                                <p className="text-xs text-yellow-400">High Usage</p>
                            </div>
                        </div>
                        <span className="text-gray-400 text-sm">82% Load</span>
                    </div>
                </div>
            </Card>
        </div>
    </div>
);

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeSection, setActiveSection] = useState('dashboard');

    const menuItems = [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { id: 'users', name: 'Users', icon: Users },
        { id: 'plans', name: 'Plans', icon: Package },
        { id: 'transactions', name: 'Transactions', icon: CreditCard },
        { id: 'analytics', name: 'Analytics', icon: BarChart3 },
        { id: 'settings', name: 'Settings', icon: Settings },
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard': return <DashboardOverview />;
            case 'users': return <UsersManager />;
            case 'plans': return <PlansManager />;
            case 'analytics': return <AnalyticsView />;
             // Reuse dashboard for others as placeholder or build more
            default: return <div className="text-white text-center py-20">Work in Progress</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex">
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -300 }}
                animate={{ x: sidebarOpen ? 0 : -300 }}
                className="fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700 z-50 overflow-y-auto"
            >
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                            <LayoutDashboard className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-black text-white">Admin Panel</h2>
                    </div>

                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeSection === item.id
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </button>
                        ))}
                    </nav>

                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-red-400 hover:bg-red-900/20 transition-all mt-8"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className={`flex-1 transition-all ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
                {/* Top Bar */}
                <header className="sticky top-0 z-40 bg-gray-800 border-b border-gray-700 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 rounded-lg hover:bg-gray-700 text-white"
                            >
                                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                            <h1 className="text-2xl font-black text-white capitalize">{activeSection} Overview</h1>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <button className="relative p-2 rounded-lg hover:bg-gray-700 text-white">
                                <Bell className="w-6 h-6" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                <span className="text-white font-bold">A</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-6 relative min-h-[calc(100vh-80px)]">
                   {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
