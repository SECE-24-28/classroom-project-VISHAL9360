import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, TrendingUp, Award, Zap, ShoppingCart } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = () => {
    const navigate = useNavigate();

    const featuredProducts = products.slice(0, 6);
    const trendingProducts = products.filter(p => p.trending).slice(0, 4);

    const stats = [
        { icon: Sparkles, label: 'AI-Powered', value: 'Recommendations', color: 'from-purple-500 to-pink-500' },
        { icon: TrendingUp, label: 'Trending', value: '10,000+ Products', color: 'from-cyan-500 to-blue-500' },
        { icon: Award, label: 'Premium', value: 'Quality Assured', color: 'from-yellow-500 to-orange-500' },
        { icon: Zap, label: 'Fast', value: 'Same Day Delivery', color: 'from-green-500 to-emerald-500' },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="section-container pt-20">
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-6xl font-bold mb-6 text-shadow">
                        Discover Your Perfect
                        <span className="block gradient-text mt-2">AI-Powered Shopping</span>
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                        Experience the future of e-commerce with personalized recommendations powered by Azure AI
                    </p>

                    <button
                        onClick={() => navigate('/products')}
                        className="btn-primary text-lg px-12 py-4"
                    >
                        <ShoppingCart className="w-6 h-6 mr-2 inline" />
                        Start Shopping
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="glass-card-hover p-6 text-center animate-slide-up"
                            style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} mb-4`}>
                                <stat.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-bold text-lg mb-1">{stat.label}</h3>
                            <p className="text-white/70 text-sm">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Featured Products */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-4xl font-bold gradient-text">Featured Products</h2>
                        <button
                            onClick={() => navigate('/products')}
                            className="btn-secondary flex items-center gap-2"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            View All
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>

                {/* Trending Section */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-3">
                            <TrendingUp className="w-8 h-8 text-accent-pink" />
                            <h2 className="text-4xl font-bold gradient-text">Trending Now</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {trendingProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="glass-card p-12 text-center mb-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-pink-600/20 animate-pulse"></div>
                    <div className="relative z-10">
                        <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary-300 animate-float" />
                        <h2 className="text-4xl font-bold mb-4">Experience AI Shopping Assistant</h2>
                        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                            Get personalized recommendations, instant answers, and smart product suggestions
                        </p>
                        <button className="btn-primary text-lg px-8 py-4">
                            Try AI Assistant Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
