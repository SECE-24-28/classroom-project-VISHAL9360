import * as yup from 'yup';

// Login Schema
export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .required('Email is required')
        .email('Invalid email format')
        .trim(),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(50, 'Password must not exceed 50 characters'),
});

// Signup Schema
export const signupSchema = yup.object().shape({
    name: yup
        .string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must not exceed 50 characters')
        .trim(),
    email: yup
        .string()
        .required('Email is required')
        .email('Invalid email format')
        .trim(),
    mobile: yup
        .string()
        .required('Mobile number is required')
        .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
        .trim(),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(50, 'Password must not exceed 50 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ),
    confirmPassword: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

// Recharge Form Schema
export const rechargeSchema = yup.object().shape({
    mobileNumber: yup
        .string()
        .required('Mobile number is required')
        .matches(/^[6-9]\d{9}$/, 'Mobile number must be 10 digits and start with 6-9')
        .trim(),
    operator: yup
        .string()
        .required('Please select an operator'),
    circle: yup
        .string()
        .required('Please select a circle'),
    amount: yup
        .number()
        .transform((value, originalValue) => (originalValue === '' ? undefined : value))
        .required('Amount is required')
        .min(10, 'Minimum recharge amount is ₹10')
        .max(10000, 'Maximum recharge amount is ₹10000')
        .typeError('Amount must be a number'),
});
