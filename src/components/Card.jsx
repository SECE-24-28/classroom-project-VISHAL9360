import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
    children,
    variant = 'glass',
    hover = true,
    className = '',
    gradient,
    ...props
}) => {
    const baseStyles = 'rounded-3xl p-6 smooth-transition';

    const variants = {
        glass: 'glass-card hover:shadow-premium',
        solid: 'bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700',
        gradient: `bg-gradient-to-br ${gradient || 'from-neon-pink/20 via-neon-purple/20 to-neon-blue/20'} backdrop-blur-xl border border-white/20`,
    };

    const hoverAnimation = hover ? {
        whileHover: {
            scale: 1.02,
            y: -5,
            transition: { duration: 0.2 }
        }
    } : {};

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            {...hoverAnimation}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
