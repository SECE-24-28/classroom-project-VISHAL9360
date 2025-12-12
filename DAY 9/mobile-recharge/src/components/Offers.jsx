import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const Offers = ({ title = 'Exclusive Offers', showFilter = true }) => {
    const { addNotification } = useAppContext();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [copiedCode, setCopiedCode] = useState(null);

    const categories = [
        { id: 'all', name: 'All Offers', icon: '🎁' },
        { id: 'cashback', name: 'Cashback', icon: '💰' },
        { id: 'discount', name: 'Discount', icon: '🏷️' },
        { id: 'bonus', name: 'Bonus', icon: '🎉' }
    ];

    const offers = [
        {
            id: 1,
            category: 'cashback',
            title: '10% Cashback on First Recharge',
            description: 'Get instant 10% cashback on your first recharge. Maximum cashback ₹100.',
            code: 'FIRST10',
            discount: '10% OFF',
            validTill: '31 Dec 2025',
            minAmount: 100,
            color: 'from-purple-500 to-pink-500',
            icon: '💰'
        },
        {
            id: 2,
            category: 'discount',
            title: 'Flat ₹50 Off on ₹500',
            description: 'Recharge for ₹500 or more and get flat ₹50 discount instantly.',
            code: 'SAVE50',
            discount: '₹50 OFF',
            validTill: '25 Dec 2025',
            minAmount: 500,
            color: 'from-blue-500 to-cyan-500',
            icon: '🏷️'
        },
        {
            id: 3,
            category: 'bonus',
            title: 'Extra 2GB Data Free',
            description: 'Get extra 2GB data absolutely free on recharges above ₹299.',
            code: 'DATA2GB',
            discount: '2GB FREE',
            validTill: '30 Dec 2025',
            minAmount: 299,
            color: 'from-green-500 to-emerald-500',
            icon: '📊'
        },
        {
            id: 4,
            category: 'cashback',
            title: '20% Cashback with UPI',
            description: 'Pay using UPI and get 20% cashback. Maximum cashback ₹200.',
            code: 'UPI20',
            discount: '20% OFF',
            validTill: '28 Dec 2025',
            minAmount: 200,
            color: 'from-orange-500 to-red-500',
            icon: '💳'
        },
        {
            id: 5,
            category: 'discount',
            title: 'Weekend Special - ₹100 Off',
            description: 'Recharge on weekends and save ₹100 on recharges above ₹1000.',
            code: 'WEEKEND100',
            discount: '₹100 OFF',
            validTill: '31 Dec 2025',
            minAmount: 1000,
            color: 'from-indigo-500 to-purple-500',
            icon: '🎊'
        },
        {
            id: 6,
            category: 'bonus',
            title: 'Free Subscription Worth ₹299',
            description: 'Get 3 months free subscription to premium content on ₹699 recharge.',
            code: 'PREMIUM299',
            discount: 'FREE SUB',
            validTill: '31 Dec 2025',
            minAmount: 699,
            color: 'from-pink-500 to-rose-500',
            icon: '🎁'
        }
    ];

    const filteredOffers = selectedCategory === 'all'
        ? offers
        : offers.filter(offer => offer.category === selectedCategory);

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        addNotification(`Coupon code ${code} copied!`, 'success');

        setTimeout(() => {
            setCopiedCode(null);
        }, 2000);
    };

    return (
        <section id="offers" className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 gradient-text">
                        {title}
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Save more with our exclusive deals and offers
                    </p>
                </div>

                {/* Category Filter */}
                {showFilter && (
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category.id
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                                    }`}
                            >
                                <span className="mr-2">{category.icon}</span>
                                {category.name}
                            </button>
                        ))}
                    </div>
                )}

                {/* Offers Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredOffers.map((offer, index) => (
                        <div
                            key={offer.id}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden card-hover animate-fadeIn"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Offer Header */}
                            <div className={`bg-gradient-to-r ${offer.color} p-6 text-white`}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="text-5xl">{offer.icon}</div>
                                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-sm">
                                        {offer.discount}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                            </div>

                            {/* Offer Body */}
                            <div className="p-6">
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {offer.description}
                                </p>

                                {/* Offer Details */}
                                <div className="space-y-2 mb-6 text-sm">
                                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                                        <span className="mr-2">💵</span>
                                        <span>Min. Recharge: ₹{offer.minAmount}</span>
                                    </div>
                                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                                        <span className="mr-2">📅</span>
                                        <span>Valid till: {offer.validTill}</span>
                                    </div>
                                </div>

                                {/* Coupon Code */}
                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 mb-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                COUPON CODE
                                            </div>
                                            <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                                                {offer.code}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleCopyCode(offer.code)}
                                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${copiedCode === offer.code
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800'
                                                }`}
                                        >
                                            {copiedCode === offer.code ? '✓ Copied' : 'Copy'}
                                        </button>
                                    </div>
                                </div>

                                {/* Apply Button */}
                                <button className={`w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r ${offer.color} hover:shadow-lg transition-all duration-200`}>
                                    Apply Offer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Offers Message */}
                {filteredOffers.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">😔</div>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            No offers available in this category
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Offers;
