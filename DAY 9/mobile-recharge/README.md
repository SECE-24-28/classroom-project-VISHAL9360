# Mobile Recharge Web Application

A modern, feature-rich mobile recharge application built with **React 19**, **Tailwind CSS**, and advanced state management using **Context API**.

## Day 7 Assignment - Features Implemented

### 1. Tailwind CSS Integration
- **Complete Tailwind Setup**: Configured with custom utilities and animations
- **Responsive Design**: Mobile-first approach with breakpoints for all screen sizes
- **Custom Theme**: CSS variables for consistent color scheme
- **Glassmorphism Effects**: Modern UI with backdrop blur and transparency
- **Gradient Utilities**: Beautiful gradient text and backgrounds
- **Animations**: Custom fadeIn, slideIn, and pulse animations

### 2. Props Implementation
All components are dynamic and reusable through props:

- **Navbar**: `logo`, `showAuth` props
- **Hero**: `title`, `subtitle`, `showAnimation` props
- **RechargeForm**: `operators` prop for custom operator list
- **Offers**: `title`, `showFilter` props
- **RechargeHistory**: `maxItems` prop
- **Footer**: `companyName`, `showNewsletter` props
- **AuthModal**: `isOpen`, `onClose` props

### 3. State Management (useState)
Interactive components with local state:

- **Navbar**: 
  - Mobile menu toggle state
  - Profile dropdown state
  
- **Hero**: 
  - Current offer rotation state
  - Auto-rotating offers with useEffect
  
- **RechargeForm**: 
  - Form data state (mobile, operator, circle, amount, plan)
  - Validation errors state
  - Processing state
  - Plan visibility state
  
- **Offers**: 
  - Category filter state
  - Copied coupon code state
  
- **RechargeHistory**: 
  - Filter state (all/completed/pending/failed)
  - Search term state
  
- **AuthModal**: 
  - Login/Signup toggle state
  - Form data state
  - Validation errors state
  
- **Footer**: 
  - Newsletter email state

### 4. Context API (Global State)
Comprehensive global state management in `AppContext.jsx`:

#### State Variables:
- **theme**: Light/Dark mode with localStorage persistence
- **user**: User authentication data
- **cart**: Shopping cart items
- **rechargeHistory**: All recharge transactions
- **notifications**: Toast notifications system

#### Actions:
- `toggleTheme()`: Switch between light/dark mode
- `loginUser(userData)`: Authenticate user
- `logoutUser()`: Clear user session
- `addToCart(item)`: Add items to cart
- `removeFromCart(itemId)`: Remove cart items
- `clearCart()`: Empty the cart
- `addRecharge(recharge)`: Save recharge to history
- `addNotification(message, type)`: Show toast notifications
- `removeNotification(id)`: Dismiss notifications

### 5. Component Structure

```
src/
├── components/
│   ├── Navbar.jsx           - Navigation with auth, cart, notifications
│   ├── Hero.jsx             - Hero section with rotating offers
│   ├── RechargeForm.jsx     - Complete recharge form with validation
│   ├── Offers.jsx           - Filterable offers with coupon codes
│   ├── RechargeHistory.jsx  - Transaction history with filters
│   ├── Footer.jsx           - Footer with newsletter subscription
│   ├── AuthModal.jsx        - Login/Signup modal
│   └── Notifications.jsx    - Toast notification system
├── context/
│   └── AppContext.jsx       - Global state management
├── App.jsx                  - Main app with all integrations
├── main.jsx                 - React entry point
└── index.css                - Tailwind + custom styles
```

## Features Showcase

### 1. Navbar Component
- Responsive navigation with mobile menu
- Theme toggle (light/dark mode)
- User profile dropdown
- Cart and notification badges
- Smooth animations and transitions

### 2. Hero Section
- Eye-catching gradient background
- Animated background blobs
- Auto-rotating offer banners
- Statistics display (10M+ users, 50M+ recharges)
- Call-to-action buttons

### 3. Recharge Form
- Mobile number validation
- Visual operator selection
- Circle/state selection
- Quick amount buttons
- Custom amount input
- Dynamic plan display based on operator
- Plan selection with details (data, calls, SMS)
- Form validation with error messages
- Processing state with loading indicator
- Trust indicators (secure, instant, best offers)

### 4. Offers Section
- Category filtering (All, Cashback, Discount, Bonus)
- Beautiful offer cards with gradients
- Coupon code copy functionality
- Offer details (min amount, validity)
- Animated card hover effects

### 5. Recharge History
- Login-required protection
- Status filtering (all/completed/pending/failed)
- Mobile number search
- Detailed transaction cards
- Receipt and repeat recharge buttons
- Summary statistics (total recharges, successful, spent, cashback)

### 6. Additional Sections
- **Why Choose Us**: Feature highlights with icons
- **Supported Operators**: All major telecom providers
- **Testimonials**: User reviews with ratings

### 7. Footer
- Newsletter subscription with validation
- Company, Support, and Legal links
- Social media links
- Payment methods display
- Trust indicators

### 8. Authentication
- Login/Signup modal
- Form validation
- Social login options
- Smooth transitions

### 9. Notifications System
- Toast notifications
- Auto-dismiss after 3 seconds
- Different types (success, error, warning, info)
- Dismissible manually

## Technologies Used

- **React 19.1.1**: Latest React with improved hooks
- **Tailwind CSS 3.4.18**: Utility-first CSS framework
- **Vite 7.1.7**: Fast build tool and dev server
- **Context API**: Built-in React state management
- **LocalStorage**: Persistent data storage

## Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Assignment Requirements Met

### Set Up and Use Tailwind CSS
- Tailwind configured in `tailwind.config.js`
- Custom utilities in `index.css`
- Consistent responsive design across all components

### Use Props to Make Components Dynamic
- All components accept props for customization
- Components render different content based on props
- Reusable component architecture

### Add Interactivity Using State
- `useState` implemented in all interactive components
- Form handling with validation
- Toggle states for menus, dropdowns, modals
- Search and filter functionality

### Implement Global State with Context API
- `AppContext` created with comprehensive state
- Multiple components consume the context
- Theme, user, cart, history, and notifications managed globally
- LocalStorage integration for persistence

### Build All Necessary Components
- 9 major components created
- Proper component structure under `src/components`
- Clean separation of concerns

### Integrate Everything in App
- All components imported and used in `App.jsx`
- State, props, and context demonstrated throughout
- Complete, functional UI

## Design Highlights

- **Modern Aesthetics**: Vibrant gradients and smooth animations
- **Dark Mode Support**: Complete theme switching capability
- **Glassmorphism**: Modern glass effects with backdrop blur
- **Micro-animations**: Hover effects and transitions
- **Responsive**: Mobile-first design with perfect tablet/desktop views
- **Accessibility**: Semantic HTML and ARIA labels

## Key Features

1. **Lightning Fast Recharge**: Simulated instant recharge
2. **100% Secure**: Form validation and secure practices
3. **Best Cashback**: Offer system with coupon codes
4. **Exclusive Offers**: Filterable offers section
5. **Transaction History**: Complete recharge tracking
6. **Multi-operator Support**: All major telecom operators
7. **Theme Switching**: Light/Dark mode
8. **Notifications**: Real-time toast notifications
9. **User Authentication**: Login/Signup system
10. **Newsletter**: Email subscription

## Live Preview

The application is running at: **http://localhost:5173/**

Open your browser and explore:
- Try the recharge form
- Filter offers by category
- Toggle dark mode
- View the responsive design on different screen sizes
- Test form validations
- Copy coupon codes
- Subscribe to newsletter

## Learning Outcomes

This project demonstrates mastery of:
- React component architecture
- Props for component communication
- useState for local state management
- Context API for global state
- Tailwind CSS for modern styling
- Form handling and validation
- Responsive design principles
- Modern UI/UX patterns

---

**Built with React + Tailwind CSS**
