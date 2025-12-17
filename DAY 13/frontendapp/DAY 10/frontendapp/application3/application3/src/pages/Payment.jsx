import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle2, Smartphone, Calendar, TrendingUp, Wallet, Building2, Gift, Shield } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import { createTransaction } from '../services/api';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const plan = location.state?.plan || {
        amount: 299,
        validity: '28 Days',
        data: '1.5 GB/Day',
        planName: 'Standard Plan' // Default name
    };

    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [selectedUPI, setSelectedUPI] = useState('gpay');
    const [upiId, setUpiId] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const paymentMethods = [
        { id: 'upi', name: 'UPI', icon: Smartphone },
        { id: 'card', name: 'Card', icon: CreditCard },
        { id: 'wallet', name: 'Wallet', icon: Wallet },
        { id: 'netbanking', name: 'Net Banking', icon: Building2 },
    ];

    const upiApps = [
        { id: 'gpay', name: 'Google Pay', color: 'from-blue-500 to-green-500' },
        { id: 'phonepe', name: 'PhonePe', color: 'from-purple-600 to-purple-800' },
        { id: 'paytm', name: 'Paytm', color: 'from-blue-600 to-cyan-500' },
        { id: 'bhim', name: 'BHIM UPI', color: 'from-orange-500 to-red-500' },
    ];

    const wallets = [
        { id: 'paytm-wallet', name: 'Paytm Wallet', color: 'from-blue-600 to-cyan-500' },
        { id: 'phonepe-wallet', name: 'PhonePe Wallet', color: 'from-purple-600 to-purple-800' },
        { id: 'amazon-pay', name: 'Amazon Pay', color: 'from-yellow-500 to-orange-500' },
        { id: 'mobikwik', name: 'Mobikwik', color: 'from-red-500 to-pink-500' },
    ];

    const [mobileNumber, setMobileNumber] = useState('');

    const totalAmount = Math.round(plan.amount * 1.08);

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!mobileNumber) {
            alert('Please enter a mobile number');
            return;
        }

        setIsProcessing(true);

        try {
            // Simulate payment processing delay for UX
            await new Promise(resolve => setTimeout(resolve, 2000));

            const transactionData = {
                userMobile: mobileNumber,
                planId: plan._id || 'plan_' + Date.now(), // Fallback if plan doesn't have _id
                planName: plan.planName || 'Unknown Plan', // Fallback
                amount: totalAmount,
                paymentId: 'PAY_' + Date.now(),
                status: 'Success'
            };

            await createTransaction(transactionData);

            setIsProcessing(false);
            setIsSuccess(true);

            // Redirect after success
            setTimeout(() => {
                navigate('/');
            }, 4000);
        } catch (error) {
            setIsProcessing(false);
            alert('Transaction failed: ' + (error.message || 'Unknown error'));
        }
    };

    const formatCardNumber = (value) => {
        const cleaned = value.replace(/\s/g, '');
        const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
        return formatted.slice(0, 19);
    };

    const formatExpiryDate = (value) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length >= 2) {
            return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
        }
        return cleaned;
    };

    return (
        <div className="min-h-screen py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="container-custom px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl font-black mb-4">
                            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                                Complete Payment
                            </span>
                        </h1>
                        <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                            <Shield className="w-5 h-5 text-green-500" />
                            <p className="text-lg">100% Secure & Encrypted Payment</p>
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Payment Form - Takes 2 columns */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-2"
                        >
                            <Card variant="glass" className="border-2 border-gray-200 dark:border-gray-700">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Payment Methods</h2>

                                {/* Payment Method Selection */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                                    {paymentMethods.map((method) => (
                                        <motion.button
                                            key={method.id}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setPaymentMethod(method.id)}
                                            className={`
                        p-4 rounded-2xl flex flex-col items-center justify-center gap-2 font-bold smooth-transition border-2
                        ${paymentMethod === method.id
                                                    ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white border-transparent shadow-2xl shadow-purple-500/50'
                                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-purple-500'
                                                }
                      `}
                                        >
                                            <method.icon size={24} />
                                            <span className="text-sm">{method.name}</span>
                                        </motion.button>
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    {!isSuccess ? (
                                        <motion.form
                                            key="payment-form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onSubmit={handlePayment}
                                            className="space-y-6"
                                        >
                                            {/* Mobile Number Input */}
                                            <div className="mb-6">
                                                <Input
                                                    label="Mobile Number"
                                                    type="text"
                                                    icon={Smartphone}
                                                    value={mobileNumber}
                                                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                    placeholder="Enter 10-digit mobile number"
                                                />
                                            </div>

                                            {/* UPI Payment */}
                                            {paymentMethod === 'upi' && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="space-y-6"
                                                >
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Select UPI App</h3>
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                            {upiApps.map((app) => (
                                                                <motion.button
                                                                    key={app.id}
                                                                    type="button"
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={() => setSelectedUPI(app.id)}
                                                                    className={`
                                    p-4 rounded-xl font-semibold smooth-transition border-2
                                    ${selectedUPI === app.id
                                                                            ? `bg-gradient-to-r ${app.color} text-white border-transparent shadow-lg`
                                                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                                                                        }
                                  `}
                                                                >
                                                                    {app.name}
                                                                </motion.button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="relative">
                                                        <div className="absolute inset-0 flex items-center">
                                                            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                                                        </div>
                                                        <div className="relative flex justify-center text-sm">
                                                            <span className="px-4 bg-white dark:bg-gray-900 text-gray-500">Or enter UPI ID</span>
                                                        </div>
                                                    </div>

                                                    <Input
                                                        label="UPI ID"
                                                        type="text"
                                                        icon={Smartphone}
                                                        value={upiId}
                                                        onChange={(e) => setUpiId(e.target.value)}
                                                        placeholder="yourname@upi"
                                                    />
                                                </motion.div>
                                            )}

                                            {/* Card Payment */}
                                            {paymentMethod === 'card' && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="space-y-6"
                                                >
                                                    <Input
                                                        label="Card Number"
                                                        type="text"
                                                        icon={CreditCard}
                                                        value={cardNumber}
                                                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                                        placeholder="1234 5678 9012 3456"
                                                    />

                                                    <Input
                                                        label="Cardholder Name"
                                                        type="text"
                                                        value={cardName}
                                                        onChange={(e) => setCardName(e.target.value)}
                                                        placeholder="John Doe"
                                                    />

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <Input
                                                            label="Expiry Date"
                                                            type="text"
                                                            icon={Calendar}
                                                            value={expiryDate}
                                                            onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                                                            placeholder="MM/YY"
                                                        />
                                                        <Input
                                                            label="CVV"
                                                            type="password"
                                                            icon={Lock}
                                                            value={cvv}
                                                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                                            placeholder="123"
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* Wallet Payment */}
                                            {paymentMethod === 'wallet' && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="space-y-4"
                                                >
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Select Wallet</h3>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {wallets.map((wallet) => (
                                                            <motion.button
                                                                key={wallet.id}
                                                                type="button"
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                className={`p-6 rounded-2xl font-bold text-white bg-gradient-to-r ${wallet.color} shadow-lg hover:shadow-2xl smooth-transition`}
                                                            >
                                                                {wallet.name}
                                                            </motion.button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* Net Banking */}
                                            {paymentMethod === 'netbanking' && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="space-y-4"
                                                >
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Select Bank</h3>
                                                    <select className="w-full p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium focus:outline-none focus:border-purple-500">
                                                        <option>State Bank of India</option>
                                                        <option>HDFC Bank</option>
                                                        <option>ICICI Bank</option>
                                                        <option>Axis Bank</option>
                                                        <option>Kotak Mahindra Bank</option>
                                                        <option>Punjab National Bank</option>
                                                    </select>
                                                </motion.div>
                                            )}

                                            {/* Coupon Code */}
                                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border-2 border-green-200 dark:border-green-700">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Gift className="w-5 h-5 text-green-600 dark:text-green-400" />
                                                    <h3 className="font-bold text-gray-900 dark:text-white">Have a Coupon Code?</h3>
                                                </div>
                                                <div className="flex gap-3">
                                                    <input
                                                        type="text"
                                                        value={couponCode}
                                                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                                        placeholder="Enter code"
                                                        className="flex-1 p-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium focus:outline-none focus:border-green-500"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold smooth-transition"
                                                    >
                                                        Apply
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Security Badge */}
                                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border-2 border-blue-200 dark:border-blue-700">
                                                <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white">256-bit SSL Encrypted</p>
                                                    <p>Your payment information is completely secure</p>
                                                </div>
                                            </div>

                                            <Button
                                                type="submit"
                                                variant="primary"
                                                className="w-full text-xl font-black py-4"
                                                loading={isProcessing}
                                            >
                                                {isProcessing ? 'Processing Payment...' : `Pay ₹${totalAmount}`}
                                            </Button>
                                        </motion.form>
                                    ) : (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-12"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.2, type: "spring" }}
                                                className="relative mx-auto mb-6"
                                            >
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 1.2, 1],
                                                        opacity: [0.5, 0.8, 0.5],
                                                    }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="absolute inset-0 w-32 h-32 mx-auto bg-green-500/30 rounded-full blur-2xl"
                                                />
                                                <div className="relative w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl">
                                                    <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={3} />
                                                </div>
                                            </motion.div>

                                            <h3 className="text-4xl font-black mb-4">
                                                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                                                    Payment Successful! 🎉
                                                </span>
                                            </h3>
                                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
                                                Your recharge has been processed successfully
                                            </p>
                                            <p className="text-lg text-gray-500 dark:text-gray-500">
                                                Transaction ID: TXN{Date.now().toString().slice(-10)}
                                            </p>
                                            <p className="text-sm text-gray-400 mt-4">
                                                Redirecting to home page...
                                            </p>

                                            {/* Confetti */}
                                            {[...Array(15)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                                                    animate={{
                                                        opacity: 0,
                                                        x: (Math.random() - 0.5) * 400,
                                                        y: Math.random() * -400,
                                                        scale: 0,
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        delay: i * 0.05,
                                                        ease: "easeOut",
                                                    }}
                                                    className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                                                    style={{
                                                        backgroundColor: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'][i % 5],
                                                    }}
                                                />
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Card>
                        </motion.div>

                        {/* Order Summary - Takes 1 column */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card variant="glass" className="border-2 border-gray-200 dark:border-gray-700 sticky top-24">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

                                {/* Plan Details */}
                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border border-pink-200 dark:border-pink-700">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-lg">
                                            <Smartphone className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Validity</div>
                                            <div className="font-bold text-gray-900 dark:text-white">{plan.validity}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-700">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                                            <TrendingUp className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Data</div>
                                            <div className="font-bold text-gray-900 dark:text-white">{plan.data}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Price Breakdown */}
                                <div className="space-y-3 py-6 border-t border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                                        <span>Plan Amount</span>
                                        <span className="font-semibold">₹{plan.amount}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                                        <span>GST (18%)</span>
                                        <span className="font-semibold">₹{Math.round(plan.amount * 0.18)}</span>
                                    </div>
                                    <div className="flex justify-between text-green-600 dark:text-green-400 font-semibold">
                                        <span>Discount (10%)</span>
                                        <span>-₹{Math.round(plan.amount * 0.1)}</span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-center mt-6">
                                    <span className="text-xl font-bold text-gray-900 dark:text-white">Total Amount</span>
                                    <span className="text-3xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                                        ₹{totalAmount}
                                    </span>
                                </div>

                                {/* Benefits */}
                                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-700">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                                        <div className="text-sm text-gray-700 dark:text-gray-300">
                                            <p className="font-bold">Cashback Offer!</p>
                                            <p>Get ₹{Math.round(plan.amount * 0.05)} cashback on your next recharge</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
