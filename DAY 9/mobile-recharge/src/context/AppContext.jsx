import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// Provider Component
export const AppProvider = ({ children }) => {
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // User State
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Cart State
  const [cart, setCart] = useState([]);

  // Recharge History
  const [rechargeHistory, setRechargeHistory] = useState(() => {
    const savedHistory = localStorage.getItem('rechargeHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Notifications
  const [notifications, setNotifications] = useState([]);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Login User
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout User
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCart([]);
    setNotifications([]);
  };

  // Add to Cart
  const addToCart = (item) => {
    setCart((prev) => [...prev, { ...item, id: Date.now() }]);
    addNotification('Item added to cart!', 'success');
  };

  // Remove from Cart
  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    addNotification('Item removed from cart', 'info');
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
  };

  // Add Recharge to History
  const addRecharge = (recharge) => {
    const newRecharge = {
      ...recharge,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'completed'
    };
    setRechargeHistory((prev) => [newRecharge, ...prev]);
    localStorage.setItem('rechargeHistory', JSON.stringify([newRecharge, ...rechargeHistory]));
    addNotification('Recharge successful!', 'success');
  };

  // Add Notification
  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toISOString()
    };
    setNotifications((prev) => [notification, ...prev].slice(0, 5)); // Keep last 5
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      removeNotification(notification.id);
    }, 3000);
  };

  // Remove Notification
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Update theme in localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const value = {
    // State
    theme,
    user,
    cart,
    rechargeHistory,
    notifications,
    
    // Actions
    toggleTheme,
    loginUser,
    logoutUser,
    addToCart,
    removeFromCart,
    clearCart,
    addRecharge,
    addNotification,
    removeNotification
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
