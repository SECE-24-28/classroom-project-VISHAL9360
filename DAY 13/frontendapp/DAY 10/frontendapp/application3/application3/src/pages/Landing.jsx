import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Smartphone, CreditCard, Award, Users, ChevronRight, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import RechargeWidget from '../components/RechargeWidget';

const Landing = () => {
    const navigate = useNavigate();

    const stats = [
        { label: 'Active Users', value: '50k+' },
        { label: 'Daily Recharges', value: '10k+' },
        { label: 'Success Rate', value: '99.9%' },
    ];

    const testimonials = [
        { name: 'Rahul Kumar', role: 'Student', text: 'FlashyPay is incredibly fast. I got my cashback instantly!', rating: 5 },
        { name: 'Priya Sharma', role: 'Professional', text: 'The interface is so beautiful and easy to use. Love the dark mode.', rating: 5 },
        { name: 'Amit Patel', role: 'Shop Owner', text: 'Best app for bulk recharges. Reliable and secure.', rating: 4 },
    ];

    return (
        <div className="overflow-x-hidden min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gray-900">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=2076&auto=format&fit=crop"
                        alt="Digital Future"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-purple-900/20"></div>
                </div>

                <div className="container-custom grid lg:grid-cols-2 gap-12 items-center pb-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left pt-10 lg:pt-0"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-sm font-semibold text-white">Fastest Recharges in India</span>
                        </motion.div>

                        <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
                            Pay Less, <br />
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Connect More
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
                            Experience lightning-fast mobile recharges with exclusive cashback offers and bank-grade security.
                        </p>

                        <div className="flex justify-center lg:justify-start">
                            <Button
                                onClick={() => navigate('/plans')}
                                variant="primary"
                                className="h-14 px-8 text-lg shadow-lg shadow-purple-500/30"
                            >
                                View Plans <ChevronRight className="w-5 h-5 ml-1" />
                            </Button>
                        </div>

                        {/* Stats Row */}
                        <div className="mt-12 flex justify-center lg:justify-start gap-8 border-t border-white/10 pt-8">
                            {stats.map((stat, index) => (
                                <div key={index}>
                                    <h3 className="text-2xl font-black text-white">{stat.value}</h3>
                                    <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10 animate-float">
                            <img
                                src="https://cdni.iconscout.com/illustration/premium/thumb/mobile-payment-2978253-2476839.png"
                                alt="Mobile Recharge Illustration"
                                className="w-full drop-shadow-2xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Recharge Widget Section (Overlapping) */}
            <div className="relative z-20 container-custom -mt-32 lg:-mt-48">
                <RechargeWidget />
            </div>

            {/* Offers Section */}
            <section className="py-24 bg-gray-50 dark:bg-gray-900 mt-20">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Hot Offers</h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white border-none transform hover:scale-105 transition-all">
                            <div className="h-full flex flex-col p-6">
                                <span className="bg-white/20 w-fit px-3 py-1 rounded-full text-xs font-bold mb-4">JIO SPECIAL</span>
                                <h3 className="text-2xl font-bold mb-2">Double Data</h3>
                                <p className="mb-6 text-blue-100">Get 2x data on annual plans</p>
                                <Button variant="secondary" className="mt-auto bg-white text-blue-600 hover:bg-blue-50">View Details</Button>
                            </div>
                        </Card>
                        <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white border-none transform hover:scale-110 shadow-2xl z-10">
                            <div className="h-full flex flex-col relative overflow-hidden p-6">
                                <div className="absolute top-0 right-0 p-2">
                                    <Star className="w-12 h-12 text-yellow-300 opacity-50" />
                                </div>
                                <span className="bg-yellow-400 text-purple-900 w-fit px-3 py-1 rounded-full text-xs font-bold mb-4">BEST SELLER</span>
                                <h3 className="text-3xl font-black mb-2">5% Cashback</h3>
                                <p className="mb-6 text-purple-100">On all UPI payments above ₹200</p>
                                <Button variant="secondary" className="mt-auto bg-white text-purple-600 hover:bg-purple-50 font-bold">Claim Now</Button>
                            </div>
                        </Card>
                        <Card className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white border-none transform hover:scale-105 transition-all">
                            <div className="h-full flex flex-col p-6">
                                <span className="bg-white/20 w-fit px-3 py-1 rounded-full text-xs font-bold mb-4">Limited Time</span>
                                <h3 className="text-2xl font-bold mb-2">Free Amazon Prime</h3>
                                <p className="mb-6 text-orange-100">With select Airtel post-paid plans</p>
                                <Button variant="secondary" className="mt-auto bg-white text-orange-600 hover:bg-orange-50">Check Eligibility</Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-white dark:bg-gray-800">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Shield, title: 'Secure Payments', desc: 'Starting with 256-bit encryption', color: 'text-green-500' },
                            { icon: Zap, title: 'Instant Activation', desc: 'Less than 10 seconds to recharge', color: 'text-yellow-500' },
                            { icon: CreditCard, title: 'Zero Failures', desc: '99.9% Success Rate guaranteed', color: 'text-blue-500' },
                            { icon: Users, title: '24/7 Support', desc: 'Round the clock assistance', color: 'text-purple-500' },
                        ].map((feature, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <div className={`w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-6`}>
                                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                                <p className="text-gray-500">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">User Love</h2>
                        <p className="text-gray-600 dark:text-gray-400">Join millions of happy users</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <Card key={i} variant="glass" className="bg-white dark:bg-gray-800 hover:border-purple-500 transition-colors border border-gray-200 dark:border-gray-700">
                                <div className="p-6">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{t.text}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                                            {t.name[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">{t.name}</h4>
                                            <p className="text-xs text-gray-500 uppercase">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Indian Operators */}
            <section className="py-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-800">
                <div className="container-custom text-center">
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">Supported Operators</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="text-3xl font-black text-blue-700">Jio</div>
                        <div className="text-3xl font-black text-red-600 italic">airtel</div>
                        <div className="text-3xl font-black text-orange-500">Vi</div>
                        <div className="text-3xl font-black text-teal-600">BSNL</div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 -z-10"></div>
                <div className="container-custom text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Ready to Recharge?</h2>
                    <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">Join FlashyPay today and experience the fastest, most secure way to pay.</p>
                    <Button onClick={() => navigate('/plans')} className="h-16 px-10 text-xl font-bold bg-white text-purple-900 hover:bg-blue-50 hover:shadow-2xl hover:scale-105 transition-all rounded-full">
                        Start Recharging Now
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Landing;
