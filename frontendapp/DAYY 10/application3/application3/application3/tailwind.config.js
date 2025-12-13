/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                neon: {
                    pink: '#ff006e',
                    purple: '#8338ec',
                    blue: '#3a86ff',
                    teal: '#06ffa5',
                    gold: '#ffbe0b',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-premium': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'gradient-sunset': 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
                'gradient-ocean': 'linear-gradient(135deg, #667eea 0%, #06ffa5 100%)',
                'gradient-fire': 'linear-gradient(135deg, #ff006e 0%, #ffbe0b 100%)',
                'gradient-cosmic': 'linear-gradient(135deg, #8338ec 0%, #3a86ff 100%)',
            },
            boxShadow: {
                'neon-pink': '0 0 20px rgba(255, 0, 110, 0.5)',
                'neon-purple': '0 0 20px rgba(131, 56, 236, 0.5)',
                'neon-blue': '0 0 20px rgba(58, 134, 255, 0.5)',
                'neon-teal': '0 0 20px rgba(6, 255, 165, 0.5)',
                'neon-gold': '0 0 20px rgba(255, 190, 11, 0.5)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                'premium': '0 20px 60px rgba(0, 0, 0, 0.3)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'shimmer': 'shimmer 2s linear infinite',
                'slide-in': 'slideIn 0.5s ease-out',
                'fade-in': 'fadeIn 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(131, 56, 236, 0.5)' },
                    '100%': { boxShadow: '0 0 20px rgba(131, 56, 236, 0.8)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                slideIn: {
                    '0%': { transform: 'translateY(100px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
