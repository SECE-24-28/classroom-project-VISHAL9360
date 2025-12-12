import React from 'react';

const PlanCard = ({ plan, onSelect }) => {
    const {
        name,
        price,
        validity,
        data,
        calls,
        sms,
        type = 'prepaid',
        popular = false,
        benefits = []
    } = plan;

    return (
        <div className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${popular ? 'border-2 border-indigo-500' : 'border border-gray-200 dark:border-gray-700'
            }`}>
            {/* Popular Badge */}
            {popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                    Popular
                </div>
            )}

            {/* Plan Header */}
            <div className={`p-6 ${popular ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${type === 'prepaid'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                        {type.toUpperCase()}
                    </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                    <div className="flex items-baseline">
                        <span className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                            ₹{price}
                        </span>
                        <span className="ml-2 text-gray-600 dark:text-gray-400">
                            / {validity}
                        </span>
                    </div>
                </div>
            </div>

            {/* Plan Details */}
            <div className="p-6 space-y-4">
                {/* Data */}
                {data && (
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Data</div>
                            <div className="font-semibold text-gray-900 dark:text-white">{data}</div>
                        </div>
                    </div>
                )}

                {/* Calls */}
                {calls && (
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Calls</div>
                            <div className="font-semibold text-gray-900 dark:text-white">{calls}</div>
                        </div>
                    </div>
                )}

                {/* SMS */}
                {sms && (
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">SMS</div>
                            <div className="font-semibold text-gray-900 dark:text-white">{sms}</div>
                        </div>
                    </div>
                )}

                {/* Additional Benefits */}
                {benefits.length > 0 && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Additional Benefits:
                        </div>
                        <ul className="space-y-2">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Select Button */}
            <div className="p-6 pt-0">
                <button
                    onClick={() => onSelect && onSelect(plan)}
                    className={`w-full py-3 rounded-lg font-bold text-white transition-all duration-300 ${popular
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:scale-105'
                            : 'bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600'
                        }`}
                >
                    Select Plan
                </button>
            </div>
        </div>
    );
};

export default PlanCard;
