import React from 'react';
import { useAppContext } from '../context/AppContext';

const Notifications = () => {
    const { notifications, removeNotification } = useAppContext();

    const getNotificationStyle = (type) => {
        switch (type) {
            case 'success':
                return 'bg-green-500 text-white';
            case 'error':
                return 'bg-red-500 text-white';
            case 'warning':
                return 'bg-yellow-500 text-white';
            case 'info':
            default:
                return 'bg-blue-500 text-white';
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'success':
                return '✓';
            case 'error':
                return '✗';
            case 'warning':
                return '⚠';
            case 'info':
            default:
                return 'ℹ';
        }
    };

    if (notifications.length === 0) return null;

    return (
        <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
            {notifications.map((notification, index) => (
                <div
                    key={notification.id}
                    className={`${getNotificationStyle(notification.type)} rounded-lg shadow-2xl p-4 flex items-start space-x-3 animate-slideIn`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold">
                        {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold">{notification.message}</p>
                    </div>
                    <button
                        onClick={() => removeNotification(notification.id)}
                        className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Notifications;
