import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { rechargeSchema } from '../schemas/validationSchemas';
import { useAppContext } from '../context/AppContext';

const RechargeForm = ({ operators = [] }) => {
    const { addRecharge, addNotification, user } = useAppContext();
    const [isProcessing, setIsProcessing] = useState(false);
    const [showPlans, setShowPlans] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
        trigger
    } = useForm({
        resolver: yupResolver(rechargeSchema),
        defaultValues: {
            mobileNumber: '',
            operator: '',
            circle: '',
            amount: '',
            plan: null
        },
        mode: 'onChange'
    });

    // Watch form values for UI updates
    const currentOperator = watch('operator');
    const currentAmount = watch('amount');
    const currentPlan = watch('plan');
    const currentMobile = watch('mobileNumber');

    const defaultOperators = [
        { id: 'jio', name: 'Jio', icon: '📱', color: 'from-blue-500 to-blue-600' },
        { id: 'airtel', name: 'Airtel', icon: '📡', color: 'from-red-500 to-red-600' },
        { id: 'vi', name: 'Vi (Vodafone Idea)', icon: '📶', color: 'from-red-600 to-yellow-500' },
        { id: 'bsnl', name: 'BSNL', icon: '📞', color: 'from-green-500 to-green-600' }
    ];

    const circles = [
        'Delhi NCR', 'Mumbai', 'Karnataka', 'Tamil Nadu', 'Maharashtra',
        'Gujarat', 'Rajasthan', 'UP East', 'UP West', 'Kerala'
    ];

    const quickAmounts = [99, 199, 299, 499, 699, 999];

    const plans = {
        jio: [
            { id: 1, amount: 199, validity: '28 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day' },
            { id: 2, amount: 299, validity: '28 days', data: '3GB/day', calls: 'Unlimited', sms: '100/day' },
            { id: 3, amount: 499, validity: '56 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day' },
            { id: 4, amount: 699, validity: '84 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day' }
        ],
        airtel: [
            { id: 1, amount: 179, validity: '28 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day' },
            { id: 2, amount: 299, validity: '28 days', data: '2.5GB/day', calls: 'Unlimited', sms: '100/day' },
            { id: 3, amount: 479, validity: '56 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day' },
            { id: 4, amount: 719, validity: '84 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day' }
        ]
    };

    const handleOperatorSelect = (operatorId) => {
        setValue('operator', operatorId, { shouldValidate: true });
        setShowPlans(true);
    };

    const handleAmountClick = (amount) => {
        setValue('amount', amount.toString(), { shouldValidate: true });
    };

    const handlePlanSelect = (plan) => {
        setValue('amount', plan.amount.toString(), { shouldValidate: true });
        setValue('plan', plan);
    };

    const onSubmit = async (data) => {
        if (!user) {
            addNotification('Please login to continue', 'error');
            return;
        }

        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            addRecharge({
                mobileNumber: data.mobileNumber,
                operator: data.operator,
                circle: data.circle,
                amount: data.amount,
                plan: data.plan
            });

            addNotification('Recharge Successful!', 'success');

            // Reset form
            reset();
            setShowPlans(false);
            setIsProcessing(false);
        }, 2000);
    };

    const operatorList = operators.length > 0 ? operators : defaultOperators;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center mb-8 gradient-text">
                    Quick Recharge
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Mobile Number */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            Mobile Number
                        </label>
                        <input
                            type="tel"
                            {...register('mobileNumber')}
                            placeholder="Enter 10-digit mobile number"
                            maxLength="10"
                            className={`w-full px-4 py-3 rounded-lg border-2 ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                } focus:border-indigo-500 focus:outline-none transition-colors dark:bg-gray-700 dark:text-white`}
                        />
                        {errors.mobileNumber && (
                            <p className="text-red-500 text-sm mt-1">{errors.mobileNumber.message}</p>
                        )}
                    </div>

                    {/* Operator Selection */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            Select Operator
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {operatorList.map((op) => (
                                <button
                                    key={op.id}
                                    type="button"
                                    onClick={() => handleOperatorSelect(op.id)}
                                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${currentOperator === op.id
                                        ? `bg-gradient-to-r ${op.color} text-white border-transparent shadow-lg scale-105`
                                        : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500 dark:bg-gray-700'
                                        }`}
                                >
                                    <div className="text-3xl mb-2">{op.icon}</div>
                                    <div className="font-semibold text-sm">{op.name}</div>
                                </button>
                            ))}
                        </div>
                        {errors.operator && (
                            <p className="text-red-500 text-sm mt-1">{errors.operator.message}</p>
                        )}
                    </div>

                    {/* Circle Selection */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            Select Circle
                        </label>
                        <select
                            {...register('circle')}
                            className={`w-full px-4 py-3 rounded-lg border-2 ${errors.circle ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                } focus:border-indigo-500 focus:outline-none transition-colors dark:bg-gray-700 dark:text-white`}
                        >
                            <option value="">Choose your circle</option>
                            {circles.map((circle) => (
                                <option key={circle} value={circle}>{circle}</option>
                            ))}
                        </select>
                        {errors.circle && (
                            <p className="text-red-500 text-sm mt-1">{errors.circle.message}</p>
                        )}
                    </div>

                    {/* Quick Amount Selection */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            Quick Amount
                        </label>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                            {quickAmounts.map((amount) => (
                                <button
                                    key={amount}
                                    type="button"
                                    onClick={() => handleAmountClick(amount)}
                                    className={`py-3 rounded-lg font-semibold transition-all duration-200 ${currentAmount === amount.toString()
                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
                                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    ₹{amount}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Custom Amount */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            Or Enter Custom Amount
                        </label>
                        <input
                            type="number"
                            {...register('amount')}
                            placeholder="Enter amount"
                            className={`w-full px-4 py-3 rounded-lg border-2 ${errors.amount ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                } focus:border-indigo-500 focus:outline-none transition-colors dark:bg-gray-700 dark:text-white`}
                        />
                        {errors.amount && (
                            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
                        )}
                    </div>

                    {/* Available Plans */}
                    {showPlans && plans[currentOperator] && (
                        <div className="animate-fadeIn">
                            <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                                Popular Plans
                            </label>
                            <div className="grid md:grid-cols-2 gap-4">
                                {plans[currentOperator].map((plan) => (
                                    <div
                                        key={plan.id}
                                        onClick={() => handlePlanSelect(plan)}
                                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${currentPlan?.id === plan.id
                                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 shadow-lg scale-105'
                                            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-300 dark:bg-gray-700'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                                ₹{plan.amount}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {plan.validity}
                                            </div>
                                        </div>
                                        <div className="space-y-1 text-sm">
                                            <div className="flex items-center">
                                                <span className="mr-2">📊</span>
                                                <span>{plan.data}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="mr-2">📞</span>
                                                <span>{plan.calls}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="mr-2">💬</span>
                                                <span>{plan.sms}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isProcessing}
                        className={`w-full py-4 rounded-lg font-bold text-lg text-white shadow-xl transition-all duration-300 ${isProcessing
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-2xl hover:scale-105'
                            }`}
                    >
                        {isProcessing ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            '⚡ Recharge Now'
                        )}
                    </button>
                </form>

                {/* Trust Indicators */}
                <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                        <span className="mr-2">🔒</span>
                        <span>100% Secure</span>
                    </div>
                    <div className="flex items-center">
                        <span className="mr-2">⚡</span>
                        <span>Instant Recharge</span>
                    </div>
                    <div className="flex items-center">
                        <span className="mr-2">💰</span>
                        <span>Best Offers</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RechargeForm;
