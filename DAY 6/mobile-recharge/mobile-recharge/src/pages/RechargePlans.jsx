import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanCard from '../components/PlanCard';

const RechargePlans = () => {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState('all');
    const [selectedOperator, setSelectedOperator] = useState('all');

    const plans = [
        {
            id: 1,
            name: 'Basic Plan',
            price: 199,
            validity: '28 days',
            data: '2GB/day',
            calls: 'Unlimited',
            sms: '100/day',
            type: 'prepaid',
            operator: 'jio',
            popular: false,
            benefits: ['Free subscription to JioTV', 'JioSaavn Pro']
        },
        {
            id: 2,
            name: 'Premium Plan',
            price: 299,
            validity: '28 days',
            data: '3GB/day',
            calls: 'Unlimited',
            sms: '100/day',
            type: 'prepaid',
            operator: 'jio',
            popular: true,
            benefits: ['Free subscription to JioTV', 'JioSaavn Pro', 'JioCinema Premium']
        },
        {
            id: 3,
            name: 'Value Plan',
            price: 499,
            validity: '56 days',
            data: '2GB/day',
            calls: 'Unlimited',
            sms: '100/day',
            type: 'prepaid',
            operator: 'jio',
            popular: false,
            benefits: ['Free subscription to JioTV', 'JioSaavn Pro', 'Long validity']
        },
        {
            id: 4,
            name: 'Super Plan',
            price: 699,
            validity: '84 days',
            data: '2GB/day',
            calls: 'Unlimited',
            sms: '100/day',
            type: 'prepaid',
            operator: 'jio',
            popular: false,
            benefits: ['Free subscription to JioTV', 'JioSaavn Pro', 'Disney+ Hotstar Mobile']
        },
        {
            id: 5,
            name: 'Airtel Starter',
            price: 179,
            validity: '28 days',
            data: '2GB/day',
            calls: 'Unlimited',
            sms: '100/day',
            type: 'prepaid',
            operator: 'airtel',
            popular: false,
            benefits: ['Airtel Xstream Premium', 'Wynk Music']
        },
        {
            id: 6,
            name: 'Airtel Premium',
            price: 299,
            validity: '28 days',
            data: '2.5GB/day',
            calls: 'Unlimited',
            sms: '100/day',
            type: 'prepaid',
            operator: 'airtel',
            popular: true,
            benefits: ['Airtel Xstream Premium', 'Wynk Music', 'Amazon Prime Lite']
        },
        {
            id: 7,
            name: 'Vi Basic',
            price: 199,
            validity: '28 days',
            data: '1.5GB/day',
            calls: 'Unlimited',
            sms: '100/day',
            type: 'prepaid',
            operator: 'vi',
            popular: false,
            benefits: ['Vi Movies & TV', 'Weekend data rollover']
        },
        {
            id: 8,
            name: 'Vi Premium',
            price: 359,
            validity: '28 days',
            data: '3GB/day',
            calls: 'Unlimited',
            sms: '100/day',
            type: 'prepaid',
            operator: 'vi',
            popular: false,
            benefits: ['Vi Movies & TV', 'Weekend data rollover', 'Binge All Night']
        },
        {
            id: 9,
            name: 'Postpaid Basic',
            price: 399,
            validity: '30 days',
            data: '40GB',
            calls: 'Unlimited',
            sms: 'Unlimited',
            type: 'postpaid',
            operator: 'jio',
            popular: false,
            benefits: ['Bill payment flexibility', 'Data rollover', 'Family add-on']
        },
        {
            id: 10,
            name: 'Postpaid Premium',
            price: 599,
            validity: '30 days',
            data: '75GB',
            calls: 'Unlimited',
            sms: 'Unlimited',
            type: 'postpaid',
            operator: 'airtel',
            popular: true,
            benefits: ['Bill payment flexibility', 'Data rollover', 'Netflix Basic', 'Amazon Prime']
        }
    ];

    const operators = [
        { id: 'all', name: 'All Operators' },
        { id: 'jio', name: 'Jio' },
        { id: 'airtel', name: 'Airtel' },
        { id: 'vi', name: 'Vi' }
    ];

    const filteredPlans = plans.filter(plan => {
        if (selectedType !== 'all' && plan.type !== selectedType) return false;
        if (selectedOperator !== 'all' && plan.operator !== selectedOperator) return false;
        return true;
    });

    const handleSelectPlan = (plan) => {
        console.log('Selected plan:', plan);
        // Navigate to recharge page or show confirmation
        navigate('/', { state: { selectedPlan: plan } });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                        Recharge Plans
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Choose the perfect plan for your needs
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Plan Type Filter */}
                        <div>
                            <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                                Plan Type
                            </label>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => setSelectedType('all')}
                                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${selectedType === 'all'
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    All Plans
                                </button>
                                <button
                                    onClick={() => setSelectedType('prepaid')}
                                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${selectedType === 'prepaid'
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    Prepaid
                                </button>
                                <button
                                    onClick={() => setSelectedType('postpaid')}
                                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${selectedType === 'postpaid'
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    Postpaid
                                </button>
                            </div>
                        </div>

                        {/* Operator Filter */}
                        <div>
                            <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                                Operator
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {operators.map(operator => (
                                    <button
                                        key={operator.id}
                                        onClick={() => setSelectedOperator(operator.id)}
                                        className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${selectedOperator === operator.id
                                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        {operator.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-400">
                            Showing <span className="font-bold text-indigo-600 dark:text-indigo-400">{filteredPlans.length}</span> plans
                        </p>
                    </div>
                </div>

                {/* Plans Grid */}
                {filteredPlans.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPlans.map((plan, index) => (
                            <div
                                key={plan.id}
                                className="animate-fadeIn"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <PlanCard plan={plan} onSelect={handleSelectPlan} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                            No Plans Found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            No plans match your selected filters
                        </p>
                        <button
                            onClick={() => {
                                setSelectedType('all');
                                setSelectedOperator('all');
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Info Section */}
                <div className="mt-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-8 text-white text-center">
                    <h3 className="text-3xl font-bold mb-4">Need Help Choosing?</h3>
                    <p className="text-lg mb-6 opacity-90">
                        Our experts are available 24/7 to help you find the perfect plan
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                            Chat with Us
                        </button>
                        <button className="px-8 py-3 bg-transparent border-2 border-white rounded-lg font-bold hover:bg-white/10 transition-colors">
                            Call Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RechargePlans;
