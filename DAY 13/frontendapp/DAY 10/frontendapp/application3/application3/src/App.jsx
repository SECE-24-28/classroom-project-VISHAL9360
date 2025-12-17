import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Plans from './pages/Plans';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import Footer from './components/Footer';

import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white smooth-transition">
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/plans" element={<Plans />} />

                {/* Protected User Routes */}
                <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>

                {/* Protected Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Route>
              </Routes>
            </AnimatePresence>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
