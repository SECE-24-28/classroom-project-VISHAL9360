import React, { useState, forwardRef } from 'react';
import { motion } from 'framer-motion';

const Input = forwardRef(({
    label,
    type = 'text',
    error,
    icon: Icon,
    className = '',
    onChange,
    onBlur,
    ...props
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleChange = (e) => {
        setHasValue(e.target.value !== '');
        if (onChange) {
            onChange(e);
        }
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        setHasValue(e.target.value !== '');
        if (onBlur) {
            onBlur(e);
        }
    };

    const handleFocus = (e) => {
        setIsFocused(true);
    };

    return (
        <div className="relative w-full">
            <div className="relative">
                {Icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Icon size={20} />
                    </div>
                )}

                <input
                    ref={ref}
                    type={type}
                    className={`
            w-full px-4 py-4 ${Icon ? 'pl-12' : 'pl-4'} pr-4
            bg-white/10 dark:bg-white/5
            backdrop-blur-xl
            border-2 border-white/20
            rounded-2xl
            text-gray-900 dark:text-white
            placeholder-transparent
            focus:outline-none
            focus:border-neon-purple
            focus:shadow-neon-purple
            smooth-transition
            ${error ? 'border-red-500 focus:border-red-500' : ''}
            ${className}
          `}
                    placeholder={label}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    {...props}
                />

                {label && (
                    <motion.label
                        initial={false}
                        animate={{
                            top: isFocused || hasValue || props.value ? '-10px' : '50%',
                            fontSize: isFocused || hasValue || props.value ? '0.75rem' : '1rem',
                            translateY: isFocused || hasValue || props.value ? '0' : '-50%',
                        }}
                        className={`
              absolute ${Icon ? 'left-12' : 'left-4'}
              px-2
              bg-white dark:bg-gray-900
              text-gray-500 dark:text-gray-400
              pointer-events-none
              smooth-transition
              ${isFocused ? 'text-neon-purple' : ''}
              ${error ? 'text-red-500' : ''}
            `}
                    >
                        {label}
                    </motion.label>
                )}
            </div>

            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-500 ml-4"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
