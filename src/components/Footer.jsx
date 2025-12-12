import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const Footer = ({ companyName = 'RechargeNow', showNewsletter = true }) => {
  const { addNotification } = useAppContext();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email && /\S+@\S+\.\S+/.test(email)) {
      addNotification('Successfully subscribed to newsletter!', 'success');
      setEmail('');
    } else {
      addNotification('Please enter a valid email', 'error');
    }
  };

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' },
      { name: 'Blog', href: '#blog' }
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'FAQs', href: '#faq' },
      { name: 'Live Chat', href: '#chat' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Refund Policy', href: '#refund' },
      { name: 'Cookie Policy', href: '#cookies' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: '📘', href: '#facebook' },
    { name: 'Twitter', icon: '🐦', href: '#twitter' },
    { name: 'Instagram', icon: '📷', href: '#instagram' },
    { name: 'LinkedIn', icon: '💼', href: '#linkedin' }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        {showNewsletter && (
          <div className="mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center">
            <h3 className="text-3xl font-bold mb-2">Stay Updated!</h3>
            <p className="text-white/80 mb-6">
              Subscribe to get exclusive offers and updates
            </p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        )}

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-2xl font-bold">{companyName}</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              India's fastest and most trusted mobile recharge platform. Recharge in seconds with exclusive offers and cashback.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 text-xl"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="text-center text-sm font-semibold mb-4 text-gray-400">
            WE ACCEPT
          </h4>
          <div className="flex flex-wrap justify-center gap-4">
            {['💳 Cards', '🏦 UPI', '💰 Wallets', '🏧 Net Banking', '📱 EMI'].map((method) => (
              <div
                key={method}
                className="px-4 py-2 bg-gray-800 rounded-lg text-sm font-semibold"
              >
                {method}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center">
              <span className="mr-2">🔒</span>
              <span>100% Secure</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">⚡</span>
              <span>Instant Recharge</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">🏆</span>
              <span>Trusted by 10M+</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
