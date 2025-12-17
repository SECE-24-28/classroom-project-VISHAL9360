# Frontend & Backend Integration - MERN Stack

## Overview
This document outlines the complete integration between the React frontend and Express + MongoDB backend for the Mobile Recharge Web Application.

## Architecture

### Frontend Stack
- **React** with Vite
- **React Router** for navigation
- **Axios** for API calls
- **Context API** for state management
- **React Hook Form + Yup** for form validation
- **Framer Motion** for animations
- **Tailwind CSS** for styling

### Backend Stack
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcrypt** for password hashing
- **Helmet** for security
- **CORS** enabled

## Integration Features Implemented

### 1. API Configuration 
**File:** `src/services/api.js`

**Features:**
- Centralized Axios instance with base URL configuration
- Automatic JWT token attachment via request interceptors
- Global error handling via response interceptors
- Automatic logout on 401 (token expiration)
- Permission error handling on 403

**Configuration:**
```javascript
Base URL: http://localhost:5000/api
Headers: 
  - Content-Type: application/json
  - Authorization: Bearer <token> (auto-attached)
```

### 2. Authentication Integration
**Files:** 
- `src/context/AuthContext.jsx`
- `src/pages/Login.jsx`
- `src/pages/Signup.jsx`

**Features:**

#### Login Flow
1. User submits email and password
2. Frontend calls `/api/auth/login`
3. Backend validates credentials
4. On success:
   - JWT token stored in localStorage
   - User data stored in localStorage
   - Token attached to axios headers
   - User redirected to `/plans` (regular user) or `/admin/dashboard` (admin)
5. On failure:
   - Error message displayed

#### Signup Flow
1. User submits name, email, and password
2. Frontend validates with Yup schema (8+ chars, uppercase, lowercase, number, special char)
3. Frontend calls `/api/auth/register`
4. Backend creates user account
5. On success:
   - Auto-login (token stored)
   - Redirect to `/plans`
6. On failure:
   - Error message displayed

#### Logout Flow
1. User clicks logout
2. Token and user data removed from localStorage
3. Authorization header cleared
4. User redirected to home page

### 3. AuthContext for JWT Handling
**File:** `src/context/AuthContext.jsx`

**State Management:**
```javascript
{
  user: {
    id: string,
    name: string,
    email: string,
    role: 'user' | 'admin'
  },
  token: string (stored in localStorage),
  isAuthenticated: boolean,
  loading: boolean
}
```

**Methods:**
- `login(email, password)` - Authenticate user
- `register(userData)` - Register new user
- `logout()` - Clear authentication
- Auto-load auth state on app refresh

### 4. Protected Routes 
**File:** `src/components/ProtectedRoute.jsx`

**Features:**
- Role-based access control
- Redirects unauthenticated users to `/login`
- Redirects unauthorized users based on role
- Loading state handling

**Protected Routes:**
- `/payment` - User & Admin
- `/profile` - User & Admin
- `/admin/dashboard` - Admin only

### 5. Recharge Plans Integration 
**File:** `src/pages/Plans.jsx`

**Features:**
- Fetches plans from `/api/plans`
- Loading state with spinner
- Error handling with retry option
- Empty state handling
- Dynamic plan rendering with categories
- Plan normalization for consistent UI

**Data Flow:**
1. Component mounts
2. Calls `getAllPlans()` from API service
3. Normalizes plan data (categories, gradients, benefits)
4. Renders plans in grid layout
5. Handles errors gracefully

### 6. Automatic Token Attachment 
**Implementation:** Axios Request Interceptor

**How it works:**
1. Every API request checks localStorage for token
2. If token exists, adds `Authorization: Bearer <token>` header
3. Backend middleware validates token
4. Protected routes accessible with valid token

### 7. Error Handling & User Feedback 

**Error Types Handled:**

| Status Code | Handling |
|------------|----------|
| 401 | Auto-logout, redirect to login, show "Session expired" |
| 403 | Show "Permission denied" message |
| 400-499 | Display backend error message |
| 500+ | Show "Server error" message |
| Network | Show "Network error" message |

**User Feedback:**
- Loading indicators on buttons and pages
- Success messages (toast-style)
- Error messages (inline and toast)
- Form validation errors
- Password strength meter

## Folder Structure

```
src/
├── api/
│   └── axios.js (deprecated - using services/api.js)
├── components/
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Footer.jsx
│   ├── Input.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx 
│   └── RechargeWidget.jsx
├── context/
│   ├── AuthContext.jsx 
│   └── ThemeContext.jsx
├── pages/
│   ├── AdminDashboard.jsx
│   ├── AdminLogin.jsx
│   ├── Landing.jsx
│   ├── Login.jsx 
│   ├── Payment.jsx
│   ├── Plans.jsx 
│   ├── Profile.jsx
│   └── Signup.jsx 
├── services/
│   └── api.js  (Main API configuration)
├── App.jsx 
└── main.jsx
```

## API Endpoints Used

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `GET /api/auth/users` - Get all users (admin only)

### Recharge Plans
- `GET /api/plans` - Get all plans (public)
- `POST /api/plans` - Create plan (admin only)
- `PUT /api/plans/:id` - Update plan (admin only)
- `DELETE /api/plans/:id` - Delete plan (admin only)

### Transactions
- `GET /api/transactions` - Get all transactions (admin only)
- `GET /api/transactions/my` - Get user's transactions (protected)
- `POST /api/transactions` - Create transaction (protected)

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (running locally or cloud)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd "c:\Users\Admin\Desktop\DAY 13\mern Backend"
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Configure environment variables (`.env`):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/recharge-backend
NODE_ENV=development
JWT_SECRET=supersecretkey12345
```

4. Seed database with sample data (optional):
```bash
node seeder.js
```

5. Create admin user (optional):
```bash
node create_admin.js
```

6. Start backend server:
```bash
npm start
# or for development with nodemon
npm run dev
```

Backend should be running on: `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd "c:\Users\Admin\Desktop\DAY 13\frontendapp\DAY 10\frontendapp\application3\application3"
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend should be running on: `http://localhost:5173`

## Testing the Integration

### Test Checklist

#### 1. Authentication Flow
- [ ] Register new user
  - [ ] Form validation works
  - [ ] Password strength meter displays
  - [ ] Success redirects to plans page
  - [ ] Token stored in localStorage
- [ ] Login existing user
  - [ ] Form validation works
  - [ ] Success redirects based on role
  - [ ] Token stored in localStorage
- [ ] Logout
  - [ ] Token removed from localStorage
  - [ ] Redirects to home page

#### 2. Protected Routes
- [ ] Access `/payment` without login → redirects to `/login`
- [ ] Access `/profile` without login → redirects to `/login`
- [ ] Access `/admin/dashboard` as user → redirects to home
- [ ] Access `/admin/dashboard` as admin → shows dashboard

#### 3. Plans Page
- [ ] Plans load from backend
- [ ] Loading spinner shows while fetching
- [ ] Error message shows if backend is down
- [ ] Plans display correctly
- [ ] Category filtering works
- [ ] "Recharge Now" button navigates to payment

#### 4. Token Handling
- [ ] Token automatically attached to protected API calls
- [ ] Token expiration triggers logout
- [ ] Refresh page maintains auth state

#### 5. Error Handling
- [ ] Network error shows appropriate message
- [ ] 401 error triggers logout
- [ ] 403 error shows permission denied
- [ ] Form errors display correctly

## Common Issues & Solutions

### Issue: "Network Error" on API calls
**Solution:** Ensure backend is running on port 5000

### Issue: CORS errors
**Solution:** Backend already has CORS enabled with `origin: '*'` for development

### Issue: Token not attaching to requests
**Solution:** Check that token exists in localStorage and axios interceptor is configured

### Issue: 401 errors on protected routes
**Solution:** Ensure you're logged in and token is valid

### Issue: Plans not loading
**Solution:** 
1. Check backend is running
2. Verify MongoDB is running
3. Seed database if empty: `node seeder.js`

## Security Features

1. **JWT Authentication** - Secure token-based auth
2. **Password Hashing** - bcrypt with salt rounds
3. **Helmet** - Secure HTTP headers
4. **Rate Limiting** - 100 requests per 15 minutes
5. **Input Validation** - Frontend (Yup) and Backend (Mongoose)
6. **Role-Based Access Control** - Admin vs User permissions
7. **HTTPS Ready** - Production deployment ready

## Production Deployment Checklist

- [ ] Update `API_URL` in `src/services/api.js` to production backend URL
- [ ] Set `CORS origin` in backend to specific frontend domain
- [ ] Use strong `JWT_SECRET` (32+ random characters)
- [ ] Enable HTTPS on both frontend and backend
- [ ] Set `NODE_ENV=production`
- [ ] Use MongoDB Atlas or production database
- [ ] Enable rate limiting and security middleware
- [ ] Add logging and monitoring
- [ ] Set up error tracking (e.g., Sentry)

## Additional Features to Implement

### Future Enhancements
1. **Email Verification** - Verify user email on signup
2. **Password Reset** - Forgot password functionality
3. **2FA** - Two-factor authentication
4. **Refresh Tokens** - Auto-refresh expired tokens
5. **Social Login** - Google, Facebook OAuth
6. **Transaction History** - User dashboard with past recharges
7. **Payment Gateway** - Razorpay, Stripe integration
8. **Admin Analytics** - Charts and statistics
9. **Push Notifications** - Real-time updates
10. **Mobile App** - React Native version

## Conclusion

The frontend and backend are now fully integrated with:
-  Working authentication flow
-  JWT token management
-  Protected routes
- Dynamic data fetching
-  Error handling
-  Role-based access control
-  Clean and scalable architecture

The application is ready for testing and further development!

---

**Last Updated:** December 17, 2025  
**Version:** 1.0.0  
**Author:** VISHAL9360
