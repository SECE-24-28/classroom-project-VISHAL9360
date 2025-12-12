import React, { useState, useEffect } from 'react';

const Hero = ({
    title = 'Instant Mobile Recharge',
    subtitle = 'Recharge your mobile in seconds with exclusive offers',
    showAnimation = true
}) => {
    const [currentOffer, setCurrentOffer] = useState(0);

    const offers = [
        { text: '🎉 Get 10% Cashback on First Recharge', color: 'from-purple-500 to-pink-500' },
        { text: '⚡ Lightning Fast Recharge in 5 Seconds', color: 'from-blue-500 to-cyan-500' },
        { text: '🎁 Exclusive Offers on All Operators', color: 'from-green-500 to-emerald-500' },
        { text: '💰 Save Up to ₹500 Every Month', color: 'from-orange-500 to-red-500' }
    ];

    useEffect(() => {
        if (showAnimation) {
            const interval = setInterval(() => {
                setCurrentOffer((prev) => (prev + 1) % offers.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [showAnimation, offers.length]);

    return (
        <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                {/* Main Title */}
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fadeIn">
                    <span className="gradient-text">{title}</span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                    {subtitle}
                </p>

                {/* Rotating Offers */}
                <div className="mb-12 h-16 flex items-center justify-center">
                    <div className={`px-8 py-4 bg-gradient-to-r ${offers[currentOffer].color} text-white rounded-full text-lg font-semibold shadow-2xl transform transition-all duration-500 animate-fadeIn`}>
                        {offers[currentOffer].text}
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                    <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        🚀 Recharge Now
                    </button>
                    <button className="px-8 py-4 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-indigo-600">
                        📱 View Plans
                    </button>
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">10M+</div>
                        <div className="text-gray-600 dark:text-gray-400 mt-2">Happy Users</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">50M+</div>
                        <div className="text-gray-600 dark:text-gray-400 mt-2">Recharges</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-pink-600 dark:text-pink-400">99.9%</div>
                        <div className="text-gray-600 dark:text-gray-400 mt-2">Success Rate</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
                        <div className="text-gray-600 dark:text-gray-400 mt-2">Support</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
