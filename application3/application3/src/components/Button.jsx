import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    loading = false,
    icon: Icon,
    ...props
}) => {
    const baseStyles = 'btn-premium smooth-transition font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';

    const variants = {
        primary: 'bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue text-white hover:shadow-neon-purple hover:shadow-2xl',
        secondary: 'bg-gradient-to-r from-neon-teal to-neon-blue text-white hover:shadow-neon-teal hover:shadow-2xl',
        outline: 'border-2 border-neon-purple text-neon-purple dark:text-neon-teal hover:bg-neon-purple/10 hover:shadow-neon-purple',
        ghost: 'bg-white/5 backdrop-blur-md text-white hover:bg-white/10 border border-white/20',
        gold: 'bg-gradient-to-r from-neon-gold to-neon-pink text-white hover:shadow-neon-gold hover:shadow-2xl',
    };

    const sizes = {
        sm: 'px-6 py-2 text-sm rounded-full',
        md: 'px-8 py-4 text-base rounded-full',
        lg: 'px-10 py-5 text-lg rounded-full',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={loading}
            {...props}
        >
            {loading ? (
                <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                </>
            ) : (
                <>
                    {Icon && <Icon size={20} />}
                    {children}
                </>
            )}
        </motion.button>
    );
};

export default Button;
