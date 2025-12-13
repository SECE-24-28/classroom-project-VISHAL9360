import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-800 py-8">
            <div className="container-custom px-4">
                <div className="text-center space-y-4">
                    {/* Simple Footer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                    >
                        <p className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center justify-center gap-2">
                            Made with <Heart className="w-5 h-5 text-red-500 fill-red-500" /> for India
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <div className="flex justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                        <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                            About
                        </a>
                        <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                            Contact
                        </a>
                        <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                            Terms
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                            © 2024 FlashyPay. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
