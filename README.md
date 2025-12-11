 HEAD
# FlashyPay - Mobile Recharge Application

> BCA Final Year Project - 2024  
> Made by: Vishal Kumar  
> College: St. Xavier's College, Mumbai  
> Version: 1.0 (December 2024)

---

## About This Project

FlashyPay is a modern mobile recharge web application developed as a college project. It allows users to recharge their mobile phones for all major Indian operators (Jio, Airtel, Vi, BSNL) with a beautiful and user-friendly interface.

**Note:** This is an educational project created for learning purposes and is not intended for commercial use.

---

## Features

- Modern UI with smooth animations
- Dark/Light theme toggle
- Fully responsive design
- Secure OTP-based login
- User profile with recharge history
- Multiple payment options (UPI, Cards, Wallets, Net Banking)
- 21+ recharge plans across 4 categories
- Support for all major Indian operators
- Admin dashboard with analytics

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:5173
```

---

## Project Structure

```
src/
├── components/     # Reusable UI components (Navbar, Footer, Button, Card, Input)
├── context/        # Theme context for dark/light mode
├── pages/          # Application pages
│   ├── Landing.jsx       # Home page with operators section
│   ├── Login.jsx         # OTP-based authentication
│   ├── Plans.jsx         # 21 recharge plans with filters
│   ├── Payment.jsx       # Payment page with multiple methods
│   ├── Profile.jsx       # User profile and history
│   ├── AdminLogin.jsx    # Admin authentication
│   └── AdminDashboard.jsx # Admin panel with analytics
├── App.jsx         # Main app with routing
├── main.jsx        # Entry point
└── index.css       # Global styles
```

---

## Pages

### User Pages

1. **Landing Page** - Hero section, features, offers, operators, and CTA
2. **Login Page** - Phone number + OTP verification with success animation
3. **Profile Page** - User info, wallet balance, recharge history, 6 tabs
4. **Plans Page** - 21 plans categorized into Data, Unlimited, Popular, Cricket
5. **Payment Page** - UPI, Cards, Wallets, Net Banking with success animation

### Admin Pages

1. **Admin Login** - Secure authentication for administrators
2. **Admin Dashboard** - Analytics, charts, user management, transaction monitoring

---

## Tech Stack

- **Frontend:** React 18 + Vite 7.2.7
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Charts:** Recharts

---

## Design Features

- Glassmorphism effects
- Gradient backgrounds
- Smooth animations
- Responsive layout
- Modern color scheme
- Professional UI/UX
- Dark theme for admin panel

---

## Supported Operators

- **Jio** - India's largest telecom operator
- **Airtel** - Leading network provider
- **Vi** (Vodafone Idea) - Merged telecom giant
- **BSNL** - Government telecom service

---

## User Profile Features

The profile page includes 6 comprehensive tabs:

1. **Overview** - User stats, quick actions, recent activity
2. **Wallet** - Balance management, transactions, earnings
3. **Payments** - Saved payment methods (UPI, Cards)
4. **Referral** - Referral code, earnings tracking
5. **Notifications** - Alerts and reminders
6. **Settings** - Account, security, preferences

---

## Admin Dashboard Features

- **Analytics Overview** - Revenue, users, recharges, success rate
- **Revenue Trends** - Line chart showing monthly performance
- **Plan Distribution** - Pie chart of plan categories
- **Operator Performance** - Bar chart comparing operators
- **Transaction Management** - Recent transactions table
- **Sidebar Navigation** - Quick access to all admin features

---

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

---

## Learning Outcomes

Through this project, I learned:
- React.js fundamentals and hooks
- State management and routing
- Responsive web design
- Animation libraries
- Modern CSS frameworks
- UI/UX best practices
- Chart integration with Recharts
- Admin panel development

---

## Acknowledgments

- Thanks to my college professors for guidance
- React and Vite documentation
- Tailwind CSS community
- Framer Motion tutorials
- Recharts library

---

## Contact

**Vishal Kumar**  
BCA Student, St. Xavier's College  
Email: vishal.kumar@student.edu

---

**FlashyPay v1.0** - Educational Project © 2024
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=21892682&assignment_repo_type=AssignmentRepo)
 62d1f7b779cfc53c89ca294b1a01616453645245
