import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, ChevronLeft } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCartStore, useWishlistStore } from '../store';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = getProductById(parseInt(id));
    const [quantity, setQuantity] = useState(1);

    const addToCart = useCartStore(state => state.addItem);
    const { addItem: addToWishlist, isInWishlist } = useWishlistStore();

    if (!product) {
        return (
            <div className="section-container text-center">
                <h2 className="text-2xl font-bold mb-4">Product not found</h2>
                <button onClick={() => navigate('/')} className="btn-primary">
                    Go Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="section-container">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 mb-6 hover:text-accent-cyan transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back</span>
                </button>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="glass-card p-6">
                        <div className="relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-96 object-cover rounded-xl"
                            />
                            {product.discount > 0 && (
                                <div className="absolute top-4 left-4 bg-accent-pink px-4 py-2 rounded-lg font-bold">
                                    {product.discount}% OFF
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-6">
                            <div className="flex items-center space-x-2 text-sm">
                                <Truck className="w-5 h-5 text-green-400" />
                                <span>Free Delivery</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <RotateCcw className="w-5 h-5 text-blue-400" />
                                <span>7 Days Return</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <Shield className="w-5 h-5 text-purple-400" />
                                <span>Warranty</span>
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-white/70 mb-2">{product.brand}</p>
                            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                            <div className="flex items-center space-x-4 mb-4">
                                <div className="flex items-center space-x-2 bg-green-600 px-3 py-1 rounded-lg">
                                    <span className="font-bold">{product.rating}</span>
                                    <Star className="w-4 h-4 fill-white" />
                                </div>
                                <span className="text-white/70">
                                    {product.reviews.toLocaleString()} Ratings & Reviews
                                </span>
                            </div>

                            <p className="text-white/80 leading-relaxed">{product.description}</p>
                        </div>

                        {/* Price */}
                        <div className="glass-card p-6">
                            <div className="flex items-baseline space-x-4 mb-4">
                                <span className="text-4xl font-bold gradient-text">
                                    ₹{product.price.toLocaleString()}
                                </span>
                                {product.discount > 0 && (
                                    <>
                                        <span className="text-2xl text-white/50 line-through">
                                            ₹{product.originalPrice.toLocaleString()}
                                        </span>
                                        <span className="text-green-400 text-xl font-bold">
                                            {product.discount}% off
                                        </span>
                                    </>
                                )}
                            </div>

                            {!product.inStock && (
                                <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4">
                                    <p className="text-red-400 font-bold">Currently Out of Stock</p>
                                    <p className="text-sm text-white/70 mt-1">Get notified when back in stock</p>
                                </div>
                            )}

                            {/* Quantity Selector */}
                            {product.inStock && (
                                <div className="mb-6">
                                    <label className="block mb-2 font-semibold">Quantity:</label>
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="glass-card px-4 py-2 rounded-lg hover:bg-white/20"
                                        >
                                            -
                                        </button>
                                        <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="glass-card px-4 py-2 rounded-lg hover:bg-white/20"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => addToWishlist(product)}
                                    className={`btn-secondary flex items-center justify-center space-x-2 flex-1 ${isInWishlist(product.id) ? 'bg-accent-pink/20' : ''
                                        }`}
                                >
                                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-accent-pink' : ''}`} />
                                    <span>Wishlist</span>
                                </button>

                                <button
                                    onClick={() => {
                                        if (product.inStock) {
                                            addToCart(product, quantity);
                                            navigate('/cart');
                                        }
                                    }}
                                    disabled={!product.inStock}
                                    className="btn-primary flex items-center justify-center space-x-2 flex-1 disabled:opacity-50"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Specifications */}
                        {product.specifications && (
                            <div className="glass-card p-6">
                                <h3 className="text-xl font-bold mb-4">Specifications</h3>
                                <div className="space-y-3">
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <div key={key} className="flex justify-between border-b border-white/10 pb-2">
                                            <span className="text-white/70">{key}</span>
                                            <span className="font-semibold">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
