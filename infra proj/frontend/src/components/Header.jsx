import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore, useWishlistStore, useSearchStore } from '../store';
import { searchProducts, categories } from '../data/products';

const Header = () => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [showCategories, setShowCategories] = useState(false);

    const cartItemCount = useCartStore(state => state.getItemCount());
    const wishlistItems = useWishlistStore(state => state.items);
    const { setSearchQuery, setSearchResults, addRecentSearch } = useSearchStore();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            const results = searchProducts(searchInput);
            setSearchQuery(searchInput);
            setSearchResults(results);
            addRecentSearch(searchInput);
            navigate('/products');
        }
    };

    return (
        <header className="sticky top-0 z-50 glass-card border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4">
                {/* Top Bar */}
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-pink rounded-lg flex items-center justify-center">
                            <span className="text-2xl font-bold">S</span>
                        </div>
                        <span className="text-2xl font-bold gradient-text hidden sm:block">ShopAI</span>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search for products, brands and more..."
                                className="input-glass w-full pl-12 pr-4"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary py-2 px-6"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-6">
                        <button
                            className="relative hover:scale-110 transition-transform"
                            onClick={() => navigate('/wishlist')}
                        >
                            <Heart className="w-6 h-6" />
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-accent-pink rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </button>

                        <button
                            className="relative hover:scale-110 transition-transform"
                            onClick={() => navigate('/cart')}
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary-500 rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>

                        <button
                            className="hover:scale-110 transition-transform"
                            onClick={() => navigate('/account')}
                        >
                            <User className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Categories Navigation */}
                <div className="flex items-center space-x-6 py-3 border-t border-white/10 overflow-x-auto">
                    <button
                        onClick={() => setShowCategories(!showCategories)}
                        className="flex items-center space-x-2 hover:text-accent-cyan transition-colors whitespace-nowrap"
                    >
                        <Menu className="w-5 h-5" />
                        <span className="font-medium">Categories</span>
                    </button>

                    {categories.slice(0, 5).map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => {
                                navigate(`/products?category=${cat.name}`);
                            }}
                            className="hover:text-accent-cyan transition-colors whitespace-nowrap"
                        >
                            {cat.name}
                        </button>
                    ))}

                    <button
                        onClick={() => navigate('/deals')}
                        className="text-accent-pink hover:text-pink-400 transition-colors whitespace-nowrap font-medium"
                    >
                        🔥 Top Deals
                    </button>
                </div>
            </div>

            {/* Categories Dropdown */}
            {showCategories && (
                <div className="absolute left-0 right-0 glass-card mt-2 mx-4 p-6 rounded-2xl shadow-2xl">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">All Categories</h3>
                            <button onClick={() => setShowCategories(false)}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {categories.map(cat => (
                                <div key={cat.id} className="space-y-2">
                                    <h4
                                        className="font-semibold text-primary-400 cursor-pointer hover:text-primary-300"
                                        onClick={() => {
                                            navigate(`/products?category=${cat.name}`);
                                            setShowCategories(false);
                                        }}
                                    >
                                        {cat.name}
                                    </h4>
                                    <ul className="space-y-1 text-sm text-white/70">
                                        {cat.subCategories.map(sub => (
                                            <li
                                                key={sub}
                                                className="cursor-pointer hover:text-white hover:translate-x-1 transition-all"
                                                onClick={() => {
                                                    navigate(`/products?category=${cat.name}&subCategory=${sub}`);
                                                    setShowCategories(false);
                                                }}
                                            >
                                                {sub}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
