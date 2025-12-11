import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Filter, ChevronDown, X, Heart, ShoppingCart, Star } from 'lucide-react';
import { products as allProducts, filterProducts, sortProducts, categories } from '../data/products';
import { useCartStore, useWishlistStore } from '../store';

const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [displayProducts, setDisplayProducts] = useState(allProducts);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('popularity');
    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        subCategory: searchParams.get('subCategory') || '',
        brand: [],
        priceRange: { min: 0, max: 300000 },
        rating: 0,
        inStock: false
    });

    const addToCart = useCartStore(state => state.addItem);
    const { addItem: addToWishlist, isInWishlist } = useWishlistStore();

    // Get unique brands
    const brands = [...new Set(allProducts.map(p => p.brand))];

    useEffect(() => {
        let filtered = filterProducts(filters);
        filtered = sortProducts(filtered, sortBy);
        setDisplayProducts(filtered);
    }, [filters, sortBy]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const toggleBrandFilter = (brand) => {
        setFilters(prev => ({
            ...prev,
            brand: prev.brand.includes(brand)
                ? prev.brand.filter(b => b !== brand)
                : [...prev.brand, brand]
        }));
    };

    const clearFilters = () => {
        setFilters({
            category: '',
            subCategory: '',
            brand: [],
            priceRange: { min: 0, max: 300000 },
            rating: 0,
            inStock: false
        });
    };

    return (
        <div className="min-h-screen">
            <div className="section-container">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            {filters.category || 'All Products'}
                        </h1>
                        <p className="text-white/70">{displayProducts.length} products found</p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="btn-secondary flex items-center space-x-2"
                        >
                            <Filter className="w-5 h-5" />
                            <span>Filters</span>
                        </button>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="input-glass px-4 py-2"
                        >
                            <option value="popularity">Popularity</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Customer Rating</option>
                            <option value="discount">Discount</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-6">
                    {/* Filters Sidebar */}
                    {showFilters && (
                        <div className="w-80 flex-shrink-0">
                            <div className="glass-card p-6 sticky top-24">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold">Filters</h3>
                                    <button onClick={clearFilters} className="text-accent-cyan text-sm">
                                        Clear All
                                    </button>
                                </div>

                                {/* Category Filter */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3">Category</h4>
                                    <div className="space-y-2">
                                        {categories.map(cat => (
                                            <label key={cat.id} className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    checked={filters.category === cat.name}
                                                    onChange={() => handleFilterChange('category', cat.name)}
                                                    className="form-radio text-primary-500"
                                                />
                                                <span>{cat.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Brand Filter */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3">Brand</h4>
                                    <div className="space-y-2 max-h-48 overflow-y-auto">
                                        {brands.map(brand => (
                                            <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={filters.brand.includes(brand)}
                                                    onChange={() => toggleBrandFilter(brand)}
                                                    className="form-checkbox text-primary-500"
                                                />
                                                <span>{brand}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3">Price Range</h4>
                                    <input
                                        type="range"
                                        min="0"
                                        max="300000"
                                        step="1000"
                                        value={filters.priceRange.max}
                                        onChange={(e) => handleFilterChange('priceRange', { ...filters.priceRange, max: parseInt(e.target.value) })}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-sm mt-2">
                                        <span>₹0</span>
                                        <span>₹{filters.priceRange.max.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Rating Filter */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3">Customer Rating</h4>
                                    <div className="space-y-2">
                                        {[4, 3, 2, 1].map(rating => (
                                            <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    checked={filters.rating === rating}
                                                    onChange={() => handleFilterChange('rating', rating)}
                                                    className="form-radio text-primary-500"
                                                />
                                                <div className="flex items-center">
                                                    <span>{rating}</span>
                                                    <Star className="w-4 h-4 ml-1 fill-yellow-400 text-yellow-400" />
                                                    <span className="ml-1">& above</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* In Stock */}
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={filters.inStock}
                                        onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                                        className="form-checkbox text-primary-500"
                                    />
                                    <span>In Stock Only</span>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Products Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayProducts.map(product => (
                                <div key={product.id} className="glass-card-hover p-4 cursor-pointer">
                                    <div onClick={() => navigate(`/product/${product.id}`)}>
                                        <div className="relative mb-4">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-48 object-cover rounded-lg"
                                            />
                                            {product.discount > 0 && (
                                                <div className="absolute top-2 left-2 bg-accent-pink px-2 py-1 rounded-lg text-sm font-bold">
                                                    {product.discount}% OFF
                                                </div>
                                            )}
                                            {!product.inStock && (
                                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                                                    <span className="text-white font-bold">Out of Stock</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="font-semibold line-clamp-2">{product.name}</h3>

                                            <div className="flex items-center space-x-2">
                                                <div className="flex items-center space-x-1 bg-green-600 px-2 py-0.5 rounded text-sm">
                                                    <span>{product.rating}</span>
                                                    <Star className="w-3 h-3 fill-white" />
                                                </div>
                                                <span className="text-sm text-white/70">({product.reviews.toLocaleString()})</span>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <span className="text-2xl font-bold">₹{product.price.toLocaleString()}</span>
                                                {product.discount > 0 && (
                                                    <>
                                                        <span className="text-white/50 line-through">₹{product.originalPrice.toLocaleString()}</span>
                                                        <span className="text-green-400 text-sm">{product.discount}% off</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-white/10">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToWishlist(product);
                                            }}
                                            className={`flex-1 btn-secondary flex items-center justify-center space-x-2 ${isInWishlist(product.id) ? 'bg-accent-pink/20' : ''
                                                }`}
                                        >
                                            <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-accent-pink' : ''}`} />
                                        </button>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (product.inStock) {
                                                    addToCart(product);
                                                }
                                            }}
                                            disabled={!product.inStock}
                                            className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ShoppingCart className="w-5 h-5" />
                                            <span>Add to Cart</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {displayProducts.length === 0 && (
                            <div className="glass-card p-12 text-center">
                                <p className="text-2xl mb-4">No products found</p>
                                <p className="text-white/70 mb-6">Try adjusting your filters</p>
                                <button onClick={clearFilters} className="btn-primary">
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
