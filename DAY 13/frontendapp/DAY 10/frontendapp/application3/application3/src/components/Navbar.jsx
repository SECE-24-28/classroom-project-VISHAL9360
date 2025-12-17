import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Smartphone, LogOut, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, toggleTheme, isDark } = useTheme();
    const { user, logout, isAuthenticated } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Plans', path: '/plans' },
    ];

    if (isAuthenticated) {
        navLinks.push({ name: 'Profile', path: '/profile' });
        if (user?.role === 'admin') {
            navLinks.push({ name: 'Admin', path: '/admin/dashboard' });
        }
    } else {
        navLinks.push({ name: 'Login', path: '/login' });
        navLinks.push({ name: 'Admin', path: '/admin/login' });
        navLinks.push({ name: 'Signup', path: '/signup' });
    }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg smooth-transition"
        >
            <div className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className="p-2 rounded-2xl bg-gradient-to-br from-neon-pink to-neon-purple shadow-lg"
                        >
                            <Smartphone className="w-6 h-6 text-white" />
                        </motion.div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
                            FlashyPay
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`
                  relative text-lg font-bold smooth-transition
                  ${location.pathname === link.path
                                        ? 'text-purple-600 dark:text-purple-400'
                                        : 'text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400'
                                    }
                  drop-shadow-md
                `}
                            >
                                {link.name}
                                {location.pathname === link.path && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full"
                                    />
                                )}
                            </Link>
                        ))}

                        {isAuthenticated && (
                            <div className="flex items-center gap-4 border-l pl-4 border-gray-300 dark:border-gray-700">
                                <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Hi, {user?.name?.split(' ')[0]}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Theme Toggle & Mobile Menu */}
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleTheme}
                            className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg smooth-transition"
                            aria-label="Toggle theme"
                        >
                            <AnimatePresence mode="wait">
                                {isDark ? (
                                    <motion.div
                                        key="sun"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Sun className="w-5 h-5 text-white" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="moon"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Moon className="w-5 h-5 text-white" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50"
                    >
                        <div className="container-custom py-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`
                    block text-lg font-bold smooth-transition drop-shadow-md
                    ${location.pathname === link.path
                                            ? 'text-purple-600 dark:text-purple-400'
                                            : 'text-gray-800 dark:text-white'
                                        }
                  `}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {isAuthenticated && (
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full text-left text-lg font-bold text-red-500 hover:text-red-600 smooth-transition"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
