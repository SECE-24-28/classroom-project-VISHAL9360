import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import RechargeForm from '../components/RechargeForm';
import Offers from '../components/Offers';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <Hero
                title="Instant Mobile Recharge"
                subtitle="Recharge your mobile in seconds with exclusive offers and cashback"
                showAnimation={true}
            />

            {/* Quick Recharge Section */}
            <section id="recharge" className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-purple-900 dark:to-indigo-900 py-16">
                <RechargeForm />
            </section>

            {/* Featured Plans Section */}
            <section className="py-16 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                            Featured Recharge Plans
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Popular plans chosen by millions of users
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        {[
                            {
                                name: 'Basic Plan',
                                price: 199,
                                validity: '28 days',
                                data: '2GB/day',
                                color: 'from-blue-500 to-cyan-500'
                            },
                            {
                                name: 'Premium Plan',
                                price: 299,
                                validity: '28 days',
                                data: '3GB/day',
                                color: 'from-purple-500 to-pink-500',
                                popular: true
                            },
                            {
                                name: 'Value Plan',
                                price: 499,
                                validity: '56 days',
                                data: '2GB/day',
                                color: 'from-green-500 to-emerald-500'
                            }
                        ].map((plan, index) => (
                            <div
                                key={index}
                                className={`relative bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 card-hover ${plan.popular ? 'border-2 border-indigo-500' : ''
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                                        Most Popular
                                    </div>
                                )}
                                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                                    ₹{plan.price}
                                </div>
                                <h3 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">
                                    {plan.name}
                                </h3>
                                <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                                    {plan.validity}
                                </p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center justify-center text-gray-700 dark:text-gray-300">
                                        <span className="mr-2">📊</span>
                                        <span>{plan.data}</span>
                                    </div>
                                    <div className="flex items-center justify-center text-gray-700 dark:text-gray-300">
                                        <span className="mr-2">📞</span>
                                        <span>Unlimited Calls</span>
                                    </div>
                                    <div className="flex items-center justify-center text-gray-700 dark:text-gray-300">
                                        <span className="mr-2">💬</span>
                                        <span>100 SMS/day</span>
                                    </div>
                                </div>
                                <Link
                                    to="/plans"
                                    className={`block w-full py-3 rounded-lg font-bold text-white text-center bg-gradient-to-r ${plan.color} hover:shadow-lg transition-all duration-200`}
                                >
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link
                            to="/plans"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-200"
                        >
                            View All Plans
                        </Link>
                    </div>
                </div>
            </section>

            {/* Offers Section */}
            <Offers
                title="Exclusive Offers"
                showFilter={true}
            />

            {/* Why Choose Us Section */}
            <section className="py-16 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                            Why Choose RechargeNow?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Experience the best mobile recharge service in India
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: '⚡',
                                title: 'Lightning Fast',
                                description: 'Recharge completed in less than 5 seconds',
                                color: 'from-yellow-400 to-orange-500'
                            },
                            {
                                icon: '🔒',
                                title: '100% Secure',
                                description: 'Bank-grade security for all transactions',
                                color: 'from-green-400 to-emerald-500'
                            },
                            {
                                icon: '💰',
                                title: 'Best Cashback',
                                description: 'Get up to 20% cashback on every recharge',
                                color: 'from-purple-400 to-pink-500'
                            },
                            {
                                icon: '🎁',
                                title: 'Exclusive Offers',
                                description: 'Access to special deals and promotions',
                                color: 'from-blue-400 to-cyan-500'
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 text-center card-hover animate-fadeIn"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-4xl shadow-lg`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Supported Operators Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                            All Operators Supported
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Recharge for any mobile operator across India
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {[
                            { name: 'Jio', icon: '📱', color: 'from-blue-500 to-blue-600' },
                            { name: 'Airtel', icon: '📡', color: 'from-red-500 to-red-600' },
                            { name: 'Vi', icon: '📶', color: 'from-red-600 to-yellow-500' },
                            { name: 'BSNL', icon: '📞', color: 'from-green-500 to-green-600' },
                            { name: 'MTNL', icon: '📲', color: 'from-orange-500 to-orange-600' },
                            { name: 'Jio Fiber', icon: '🌐', color: 'from-indigo-500 to-purple-600' }
                        ].map((operator, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center card-hover animate-fadeIn"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-r ${operator.color} rounded-lg flex items-center justify-center text-3xl shadow-lg`}>
                                    {operator.icon}
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white">
                                    {operator.name}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                            What Our Users Say
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Trusted by millions of happy customers
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Rahul Sharma',
                                rating: 5,
                                comment: 'Super fast recharge! Got my recharge in just 3 seconds. Amazing service!',
                                avatar: '👨'
                            },
                            {
                                name: 'Priya Patel',
                                rating: 5,
                                comment: 'Best cashback offers! Saved over ₹500 last month. Highly recommended!',
                                avatar: '👩'
                            },
                            {
                                name: 'Amit Kumar',
                                rating: 5,
                                comment: 'Very reliable and secure. Been using for 2 years without any issues.',
                                avatar: '👨‍💼'
                            }
                        ].map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 card-hover animate-fadeIn"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-2xl mr-4">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white">
                                            {testimonial.name}
                                        </h4>
                                        <div className="text-yellow-400">
                                            {'⭐'.repeat(testimonial.rating)}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 italic">
                                    "{testimonial.comment}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-indigo-500 to-purple-500">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join millions of users and experience the fastest mobile recharge service
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/signup"
                            className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
                        >
                            Sign Up Now
                        </Link>
                        <Link
                            to="/plans"
                            className="px-8 py-4 bg-transparent border-2 border-white rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
                        >
                            Browse Plans
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer
                companyName="RechargeNow"
                showNewsletter={true}
            />
        </div>
    );
};

export default LandingPage;
