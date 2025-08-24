import * as Yup from 'yup';

const phoneRegex = /^0(([23489]\d{7})|(5[0-9]{8}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const userSchema = [
  Yup.object({
    name: Yup.string()
    .min(2, 'Name must be at least 2 characters long.')
    .max(50, 'Name must be less than 50 characters long.')
    .required('Name is required.'),
    email: Yup.string()
    .email('Email must be a standard email address.')
    .required('Email is required.'),
    phone: Yup.string()
    .matches(phoneRegex, 'Phone must be standard Israeli phone number.'),
    password: Yup.string()
    .min(8, 'Password must be at least 8 characters long.')
    .matches(passwordRegex, 'Password must contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-.')
    .required('Password is required.')
  })
];