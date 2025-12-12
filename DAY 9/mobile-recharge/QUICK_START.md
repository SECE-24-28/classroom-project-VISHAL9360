# Mobile Recharge Application - Quick Start Guide

## Application Status: RUNNING

**Server:** http://localhost:5173/  
**Status:** Active

---

## Available Pages

### 1. Landing Page
**URL:** http://localhost:5173/  
**Features:**
- Hero section with call-to-action
- Quick recharge form
- Featured offers
- Plan highlights
- Footer with links

### 2. Login Page
**URL:** http://localhost:5173/login  
**Features:**
- Email & password login with validation
- React Hook Form + Yup validation
- Form validation with error messages
- Remember me option
- Social login buttons (Google, Phone)
- Link to signup page
- "Forgot password" link

**Test Login:**
- Email: any valid email (e.g., test@example.com)
- Password: any password (min 6 characters)

### 3. Signup Page
**URL:** http://localhost:5173/signup  
**Features:**
- Full name input with validation
- Email with validation
- Password with strength indicator
- Confirm password validation
- Mobile number (10 digits required)
- Terms & conditions
- React Hook Form + Yup validation
- Link to login page

### 4. Recharge Plans
**URL:** http://localhost:5173/plans  
**Features:**
- Grid of recharge plans
- Filter by type (All/Prepaid/Postpaid)
- Search functionality
- Plan details (price, validity, data, calls)
- Select plan button

---

## Features

### Navigation Bar
- **Logo:** RechargeNow with gradient
- **Links:** Home, Plans, Offers, Support
- **Theme Toggle:** Light/Dark mode
- **Notifications:** Bell icon with badge
- **Cart:** Shopping cart with badge
- **Auth Buttons:**
  - When logged out: Login & Signup buttons
  - When logged in: User profile with dropdown
    - Profile
    - Settings
    - **Logout** (red button)

### Authentication Flow
1. Click "Sign Up" in navbar
2. Fill signup form (all fields validated)
3. Submit → Auto-login → Redirect to home
4. Or click "Login" → Enter credentials → Login → Redirect to home
5. When logged in, see profile dropdown with logout option

### Form Validation (Day 9)
**Login Form:**
- Email: Required, must be valid email format
- Password: Required, minimum 6 characters

**Signup Form:**
- Name: Required, 2-50 characters
- Email: Required, valid email format
- Mobile: Required, exactly 10 digits
- Password: Required, min 6 chars, must contain uppercase, lowercase, and number
- Confirm Password: Required, must match password

**Error Display:**
- Errors shown below each input field
- Real-time validation on change
- Form disabled during submission

### State Management
- **AuthContext:** Manages login state, user data
- **AppContext:** Manages theme, cart, notifications
- **LocalStorage:** Persists session across page reloads

---

## Testing the Application

### Test Authentication:
1. Open http://localhost:5173/
2. Click "Sign Up" in navbar
3. Fill the form:
   - Name: Test User
   - Email: test@example.com
   - Mobile: 1234567890
   - Password: Test123 (meets requirements)
   - Confirm Password: Test123
4. Submit → You'll be logged in automatically
5. Notice the navbar now shows your profile
6. Click profile → See dropdown with Logout button

### Test Form Validation:
1. Go to Login or Signup page
2. Try submitting empty form → See error messages
3. Enter invalid email → See email format error
4. Enter short password → See minimum length error
5. Enter mismatched passwords (signup) → See match error
6. Fill correctly → Form submits successfully

### Test Navigation:
1. Click "Plans" in navbar → See recharge plans
2. Click "Home" → Return to landing page
3. Use mobile menu (on small screens) → Hamburger icon

### Test Dark Mode:
1. Click the moon icon in navbar
2. Page switches to dark theme
3. Click sun icon to switch back

### Test Plan Selection:
1. Go to /plans
2. Use filter buttons (All, Prepaid, Postpaid)
3. Use search bar to find plans
4. Click "Select Plan" on any plan

---

## Project Structure

```
mobile-recharge/
├── src/
│   ├── components/        # Reusable components
│   │   ├── Navbar.jsx     # Navigation with auth
│   │   ├── Footer.jsx     # Footer component
│   │   ├── Hero.jsx       # Hero section
│   │   ├── PlanCard.jsx   # Plan display card
│   │   └── ...
│   ├── pages/             # Route pages
│   │   ├── LandingPage.jsx
│   │   ├── Login.jsx      # With React Hook Form
│   │   ├── Signup.jsx     # With React Hook Form
│   │   └── RechargePlans.jsx
│   ├── context/           # State management
│   │   ├── AuthContext.jsx
│   │   └── AppContext.jsx
│   ├── schemas/           # Validation schemas
│   │   └── validationSchemas.js
│   ├── App.jsx            # Main app with routes
│   ├── main.jsx           # Entry point
│   └── index.css          # Tailwind + custom CSS
├── public/                # Static assets
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind config
├── postcss.config.js      # PostCSS config
└── vite.config.js         # Vite config
```

---

## Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## Design Highlights

### Color Scheme
- **Primary:** Indigo (#6366f1)
- **Secondary:** Pink (#ec4899)
- **Accent:** Amber (#f59e0b)
- **Success:** Green (#10b981)
- **Danger:** Red (#ef4444)

### Styling Features
- Gradient backgrounds
- Glassmorphism effects
- Smooth animations (fadeIn, slideIn)
- Hover effects on buttons and cards
- Custom scrollbar
- Responsive grid layouts
- Dark mode support
- Loading spinners
- Form validation styling
- Password strength indicator

---

## Day 8 & Day 9 Assignment Completion

### Day 8 - All Requirements Met:

1. **React Router v6** - Installed and configured
2. **Pages Created:**
   - LandingPage.jsx - With Hero, Offers, Footer
   - Login.jsx - With email, password, validation
   - Signup.jsx - With all required fields
   - RechargePlans.jsx - With PlanCard component
3. **Navigation** - Navbar with all links and logout button
4. **Folder Structure** - Organized as specified
5. **AuthContext** - Complete with login/logout functions
6. **App.jsx Integration** - All routes configured

### Day 9 - All Requirements Met:

1. **Packages Installed:**
   - react-hook-form
   - yup
   - @hookform/resolvers

2. **Validation Applied:**
   - Login page - Email and password validation
   - Signup page - All fields validated with complex rules

3. **Validation Schema:**
   - Created in `src/schemas/validationSchemas.js`
   - Separate schemas for login and signup
   - Comprehensive validation rules

4. **React Hook Form Integration:**
   - useForm hook implemented
   - yupResolver connected
   - register() on all inputs
   - Error messages from formState.errors
   - handleSubmit() for form submission
   - Form reset after successful submission

### Bonus Features:
- Dark mode toggle
- Notification system
- Shopping cart
- Mobile responsive menu
- Profile dropdown
- LocalStorage persistence
- Social login UI
- Password strength indicator
- Plan filtering and search
- Custom animations

---

## Next Steps

1. **Test the application** - Navigate through all pages
2. **Try authentication** - Login and logout
3. **Test form validation** - Try invalid inputs
4. **Check responsiveness** - Resize browser window
5. **Toggle dark mode** - Test theme switching
6. **Browse plans** - Filter and search functionality

---

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify the dev server is running
3. Clear browser cache and reload
4. Check network tab for failed requests

---

**Application is ready for use and demonstration**

Enjoy exploring the Mobile Recharge Application!
