import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useCartStore, useWishlistStore } from '../store';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const addToCart = useCartStore(state => state.addItem);
    const { addItem: addToWishlist, isInWishlist } = useWishlistStore();

    return (
        <div className="glass-card-hover p-4 cursor-pointer group">
            <div onClick={() => navigate(`/product/${product.id}`)}>
                {/* Image */}
                <div className="relative mb-4 overflow-hidden rounded-lg">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-2">
                        {product.trending && (
                            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                🔥 Trending
                            </span>
                        )}
                        {product.aiRecommended && (
                            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                ✨ AI Pick
                            </span>
                        )}
                        {product.discount > 0 && (
                            <span className="bg-accent-pink text-white px-3 py-1 rounded-full text-xs font-bold">
                                {product.discount}% OFF
                            </span>
                        )}
                    </div>

                    {!product.inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">Out of Stock</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                    {/* Brand */}
                    <p className="text-white/70 text-sm">{product.brand}</p>

                    {/* Name */}
                    <h3 className="font-semibold line-clamp-2 group-hover:text-accent-cyan transition-colors">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 bg-green-600 px-2 py-1 rounded text-sm font-semibold">
                            <span>{product.rating}</span>
                            <Star className="w-3 h-3 fill-white" />
                        </div>
                        <span className="text-sm text-white/70">
                            ({product.reviews.toLocaleString()})
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold gradient-text">
                            ₹{product.price.toLocaleString()}
                        </span>
                        {product.discount > 0 && (
                            <>
                                <span className="text-white/50 line-through text-sm">
                                    ₹{product.originalPrice.toLocaleString()}
                                </span>
                                <span className="text-green-400 text-sm font-semibold">
                                    {product.discount}% off
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-white/10">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        addToWishlist(product);
                    }}
                    className={`flex-1 btn-secondary flex items-center justify-center space-x-2 ${isInWishlist(product.id) ? 'bg-accent-pink/30 border-accent-pink' : ''
                        }`}
                >
                    <Heart
                        className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-accent-pink text-accent-pink' : ''}`}
                    />
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (product.inStock) {
                            addToCart(product);
                        }
                    }}
                    disabled={!product.inStock}
                    className="flex-[2] btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ShoppingCart className="w-5 h-5" />
                    <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
