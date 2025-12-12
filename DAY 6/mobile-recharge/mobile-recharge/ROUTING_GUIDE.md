# React Router Implementation Guide

## Routes Configuration

### App.jsx Structure
```javascript
<Router>
  <AuthProvider>
    <AppProvider>
      <Navbar />
      <Notifications />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/plans" element={<RechargePlans />} />
      </Routes>
    </AppProvider>
  </AuthProvider>
</Router>
```

## Navigation Methods

### 1. Link Component (Declarative)
Used in Navbar and throughout the app for navigation links.

```javascript
import { Link } from 'react-router-dom';

<Link to="/">Home</Link>
<Link to="/plans">Plans</Link>
<Link to="/login">Login</Link>
<Link to="/signup">Sign Up</Link>
```

### 2. useNavigate Hook (Programmatic)
Used in Login, Signup pages for redirecting after authentication.

```javascript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Navigate to home after login
navigate('/');

// Navigate with state
navigate('/', { state: { selectedPlan: plan } });
```

## Authentication Flow with Routing

### Login Flow
```
User visits /login
  ↓
Fills email & password
  ↓
Clicks "Login" button
  ↓
Form validates
  ↓
login(userData) called (AuthContext)
  ↓
navigate('/') redirects to home
  ↓
Navbar updates to show user profile
```

### Signup Flow
```
User visits /signup
  ↓
Fills all required fields
  ↓
Clicks "Create Account" button
  ↓
Form validates
  ↓
login(userData) called (AuthContext)
  ↓
navigate('/') redirects to home
  ↓
User is logged in
```

### Logout Flow
```
User clicks profile dropdown
  ↓
Clicks "Logout"
  ↓
logout() called (AuthContext)
  ↓
navigate('/') redirects to home
  ↓
Navbar updates to show Login/Signup buttons
```

## Context Providers Hierarchy

```
Router (BrowserRouter)
  └── AuthProvider (Authentication state)
      └── AppProvider (Global app state)
          └── Application Components
              ├── Navbar (uses both contexts)
              ├── Notifications (uses AppContext)
              └── Routes
                  ├── LandingPage
                  ├── Login (uses AuthContext)
                  ├── Signup (uses AuthContext)
                  └── RechargePlans
```

## Page Components

### LandingPage (/)
- Home route
- Shows Hero, RechargeForm, Offers, Features, etc.
- Includes Footer
- No authentication required

### Login (/login)
- Standalone authentication page
- Form with email & password
- Redirects to home on success
- Link to signup page
- No Navbar/Footer (standalone layout)

### Signup (/signup)
- Standalone registration page
- Form with name, email, mobile, password, confirmPassword
- Redirects to home on success
- Link to login page
- No Navbar/Footer (standalone layout)

### RechargePlans (/plans)
- Plans listing page
- Filters for type and operator
- Uses PlanCard component
- Includes Navbar (from App.jsx)
- No authentication required

## Navbar Behavior

### When Not Logged In
```javascript
<Link to="/login">Login</Link>
<Link to="/signup">Sign Up</Link>
```

### When Logged In
```javascript
<button onClick={() => setProfileDropdown(!profileDropdown)}>
  {user.name}
</button>

// Dropdown menu
<Link to="/profile">Profile</Link>
<Link to="/settings">Settings</Link>
<button onClick={handleLogout}>Logout</button>
```

## Navigation Links in Navbar

```javascript
const navLinks = [
  { name: 'Home', to: '/', icon: '🏠' },
  { name: 'Plans', to: '/plans', icon: '📱' },
  { name: 'Offers', to: '/#offers', icon: '🎁' },
  { name: 'Support', to: '/#support', icon: '💬' }
];
```

## Hash Navigation (Anchor Links)

For same-page navigation to sections:
```javascript
<Link to="/#offers">Offers</Link>
<Link to="/#support">Support</Link>
```

## Route Protection (Future Enhancement)

To add protected routes:
```javascript
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

// Usage
<Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  } 
/>
```

## Browser History

React Router automatically manages browser history:
- Back button works correctly
- Forward button works correctly
- URL updates on navigation
- Bookmarkable URLs
- Shareable links

## Testing Navigation

### Manual Testing
1. Click all navbar links
2. Use browser back/forward buttons
3. Refresh page on each route
4. Test mobile menu navigation
5. Test login/signup redirects
6. Test logout redirect

### Expected Behavior
- All links navigate correctly
- No page reloads (SPA behavior)
- URL updates in address bar
- Browser history works
- State persists across navigation

## Common Patterns

### Navigate After Action
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  // Process form
  login(userData);
  navigate('/'); // Redirect after success
};
```

### Navigate with State
```javascript
navigate('/', { state: { message: 'Login successful' } });

// Access in destination component
const location = useLocation();
const message = location.state?.message;
```

### Conditional Navigation
```javascript
const handleLogout = () => {
  logout();
  setProfileDropdown(false);
  navigate('/'); // Always go home after logout
};
```

## File Locations

- **Router Setup**: `src/App.jsx`
- **Auth Context**: `src/context/AuthContext.jsx`
- **Navbar with Links**: `src/components/Navbar.jsx`
- **Login Page**: `src/pages/Login.jsx`
- **Signup Page**: `src/pages/Signup.jsx`
- **Landing Page**: `src/pages/LandingPage.jsx`
- **Plans Page**: `src/pages/RechargePlans.jsx`

## Key Imports

```javascript
// In App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// In components/pages
import { Link, useNavigate, useLocation } from 'react-router-dom';

// In any component needing auth
import { useAuth } from '../context/AuthContext';
```

## Summary

- React Router v6 provides client-side routing
- Link components for declarative navigation
- useNavigate hook for programmatic navigation
- AuthContext manages authentication state
- Navbar shows different UI based on auth state
- Login/Signup pages redirect after success
- All routes work with browser history
- No page reloads (Single Page Application)
