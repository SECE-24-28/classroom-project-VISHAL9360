# Mobile Recharge Web Application - MERN Stack

A full-stack mobile recharge web application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring JWT authentication, role-based access control, and a modern, responsive UI.

## Features

### Frontend
- Modern, responsive UI with Tailwind CSS
- Smooth animations with Framer Motion
- Form validation with React Hook Form + Yup
- Dark mode support
- Role-based routing and access control
- Real-time error handling and user feedback
- Password strength meter
- Loading states and spinners

### Backend
- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- JWT-based authentication
- Password hashing with bcrypt
- Role-based authorization (User/Admin)
- Rate limiting and security headers
- CORS enabled
- Input validation and sanitization

### Security
- JWT token authentication
- Protected routes (frontend & backend)
- Password hashing with bcrypt
- Helmet for secure HTTP headers
- Rate limiting (100 req/15min)
- CORS configuration
- Input validation

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **Yup** - Schema validation
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Helmet** - Security
- **CORS** - Cross-origin requests
- **Morgan** - Logging
- **express-rate-limit** - Rate limiting

## Project Structure

```
DAY 13/
├── frontendapp/
│   └── DAY 10/
│       └── frontendapp/
│           └── application3/
│               └── application3/
│                   ├── src/
│                   │   ├── api/
│                   │   │   └── axios.js          # Axios configuration
│                   │   ├── components/
│                   │   │   ├── Button.jsx
│                   │   │   ├── Card.jsx
│                   │   │   ├── Footer.jsx
│                   │   │   ├── Input.jsx
│                   │   │   ├── Navbar.jsx
│                   │   │   └── RechargeWidget.jsx
│                   │   ├── context/
│                   │   │   ├── AuthContext.jsx   # Authentication state
│                   │   │   └── ThemeContext.jsx  # Dark mode
│                   │   ├── pages/
│                   │   │   ├── AdminDashboard.jsx
│                   │   │   ├── AdminLogin.jsx
│                   │   │   ├── Landing.jsx
│                   │   │   ├── Login.jsx
│                   │   │   ├── Payment.jsx
│                   │   │   ├── Plans.jsx
│                   │   │   ├── Profile.jsx
│                   │   │   └── Signup.jsx
│                   │   ├── routes/
│                   │   │   └── ProtectedRoute.jsx # Route protection
│                   │   ├── services/
│                   │   │   └── api.js            # API functions
│                   │   ├── App.jsx
│                   │   ├── main.jsx
│                   │   └── index.css
│                   ├── package.json
│                   └── vite.config.js
│
├── mern Backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── AuthController.js        # Auth logic
│   │   ├── ProductController.js     # Plans CRUD
│   │   └── TransactionController.js # Transactions
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification
│   │   └── errorMiddleware.js       # Error handling
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   ├── Product.js               # Plan schema
│   │   └── Transaction.js           # Transaction schema
│   ├── routes/
│   │   ├── AuthRoutes.js
│   │   ├── ProductRoutes.js
│   │   └── TransactionRoutes.js
│   ├── .env                         # Environment variables
│   ├── server.js                    # Entry point
│   ├── seeder.js                    # Database seeder
│   └── package.json
│
├── test-integration.js              # Integration tests
├── INTEGRATION_README.md            # Integration docs
└── README.md                        # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd "mern Backend"
```

2. Install dependencies:
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

4. Seed database with sample data:
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
```

Backend runs on: `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd "frontendapp/DAY 10/frontendapp/application3/application3"
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

## Testing the Integration

### Automated Tests

Run the integration test script:
```bash
node test-integration.js
```

This will test:
- Server connection
- User registration
- User login
- Protected route access
- Unauthorized access blocking
- Fetch recharge plans
- Admin route protection
- Invalid token rejection

### Manual Testing

1. **Registration Flow**
   - Go to `/signup`
   - Fill in name, email, password
   - Submit form
   - Should redirect to `/plans`

2. **Login Flow**
   - Go to `/login`
   - Enter credentials
   - Submit form
   - Should redirect based on role

3. **Protected Routes**
   - Try accessing `/payment` without login
   - Should redirect to `/login`

4. **Plans Page**
   - Should load plans from backend
   - Filter by category
   - Click "Recharge Now"

5. **Admin Dashboard**
   - Login as admin
   - Access `/admin/dashboard`
   - Manage plans and users

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `GET /api/auth/users` - Get all users (admin only)

### Recharge Plans
- `GET /api/plans` - Get all plans
- `POST /api/plans` - Create plan (admin only)
- `PUT /api/plans/:id` - Update plan (admin only)
- `DELETE /api/plans/:id` - Delete plan (admin only)

### Transactions
- `GET /api/transactions` - Get all transactions (admin only)
- `GET /api/transactions/my` - Get user's transactions (protected)
- `POST /api/transactions` - Create transaction (protected)

## Default Credentials

After running `seeder.js`:

**Admin:**
- Email: `admin@flashypay.com`
- Password: `Admin@123`

**Test User:**
- Email: `test@example.com`
- Password: `Test@1234`

## Features Implemented

- ✅ User registration with validation
- ✅ User login with JWT
- ✅ Protected routes (frontend & backend)
- ✅ Role-based access control
- ✅ Recharge plans CRUD
- ✅ Dynamic plan fetching
- ✅ Error handling & user feedback
- ✅ Loading states
- ✅ Token auto-attachment
- ✅ Token expiration handling
- ✅ Responsive design
- ✅ Dark mode
- ✅ Form validation
- ✅ Password strength meter

## Deployment

### Frontend (Vercel/Netlify)
1. Build production bundle:
```bash
npm run build
```

2. Update API URL in `src/api/axios.js`:
```javascript
const API_BASE_URL = 'https://your-backend-url.com/api';
```

3. Deploy `dist` folder

### Backend (Heroku/Railway)
1. Set environment variables
2. Update CORS origin to frontend URL
3. Use MongoDB Atlas for database
4. Deploy

## Troubleshooting

### Backend not starting
- Check if MongoDB is running
- Verify `.env` configuration
- Check port 5000 is not in use

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check CORS configuration
- Verify API URL in axios config

### Authentication not working
- Clear localStorage
- Check JWT_SECRET matches
- Verify token format

### Plans not loading
- Run `node seeder.js` to populate database
- Check MongoDB connection
- Verify API endpoint

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create pull request

## License

MIT License

## Author

**VISHAL9360**  
GitHub: [SECE-24-28/classroom-project-VISHAL9360](https://github.com/SECE-24-28/classroom-project-VISHAL9360)

## Acknowledgments

- React Team for React
- Express Team for Express.js
- MongoDB Team for MongoDB
- Tailwind CSS Team
- Framer Motion Team

---

**Last Updated:** December 17, 2025  
**Version:** 1.0.0
