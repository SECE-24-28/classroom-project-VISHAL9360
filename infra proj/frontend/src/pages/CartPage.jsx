import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store';

const CartPage = () => {
    const navigate = useNavigate();
    const { items, updateQuantity, removeItem, getTotal, clearCart } = useCartStore();

    if (items.length === 0) {
        return (
            <div className="section-container">
                <div className="glass-card p-12 text-center max-w-2xl mx-auto">
                    <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-white/50" />
                    <h2 className="text-3xl font-bold mb-4" >Your Cart is Empty</h2>
                    <p className="text-white/70 mb-8">Add some amazing products to get started!</p>
                    <button onClick={() => navigate('/products')} className="btn-primary">
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    const total = getTotal();
    const deliveryFee = total > 500 ? 0 : 40;
    const finalTotal = total + deliveryFee;

    return (
        <div className="min-h-screen">
            <div className="section-container">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold">Shopping Cart</h1>
                    <button
                        onClick={clearCart}
                        className="text-red-400 hover:text-red-300 flex items-center space-x-2"
                    >
                        <Trash2 className="w-5 h-5" />
                        <span>Clear Cart</span>
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map(item => (
                            <div key={item.id} className="glass-card p-6">
                                <div className="flex gap-6">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                                    />

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3
                                                    className="text-xl font-semibold mb-1 cursor-pointer hover:text-accent-cyan"
                                                    onClick={() => navigate(`/product/${item.id}`)}
                                                >
                                                    {item.name}
                                                </h3>
                                                <p className="text-white/70 text-sm">{item.brand}</p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center space-x-4">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="glass-card p-2 rounded-lg hover:bg-white/20"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="text-lg font-bold w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="glass-card p-2 rounded-lg hover:bg-white/20"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-2xl font-bold gradient-text">
                                                    ₹{(item.price * item.quantity).toLocaleString()}
                                                </p>
                                                {item.discount > 0 && (
                                                    <p className="text-sm text-green-400">
                                                        Saved ₹{((item.originalPrice - item.price) * item.quantity).toLocaleString()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Price Summary */}
                    <div className="lg:col-span-1">
                        <div className="glass-card p-6 sticky top-24">
                            <h3 className="text-2xl font-bold mb-6">Price Details</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-white/70">Price ({items.length} items)</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-white/70">Delivery Fee</span>
                                    {deliveryFee === 0 ? (
                                        <span className="text-green-400 font-semibold">FREE</span>
                                    ) : (
                                        <span>₹{deliveryFee}</span>
                                    )}
                                </div>

                                <div className="border-t border-white/10 pt-4">
                                    <div className="flex justify-between text-xl font-bold">
                                        <span>Total Amount</span>
                                        <span className="gradient-text">₹{finalTotal.toLocaleString()}</span>
                                    </div>
                                </div>

                                {deliveryFee > 0 && (
                                    <div className="bg-accent-cyan/20 border border-accent-cyan rounded-lg p-3 text-sm">
                                        Add ₹{(500 - total).toLocaleString()} more for FREE delivery
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="btn-primary w-full flex items-center justify-center space-x-2"
                            >
                                <span>Proceed to Checkout</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            <div className="mt-6 space-y-2 text-sm text-white/70">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span>Safe and Secure Payments</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span>Easy Returns & Refunds</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span>100% Authentic Products</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
