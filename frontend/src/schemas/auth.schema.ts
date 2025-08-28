import * as Yup from 'yup';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Email must be a standard email address.')
    .required('Email is required.'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long.')
    .matches(
      passwordRegex,
      'Password must contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-.'
    )
    .required('Password is required.'),
});
