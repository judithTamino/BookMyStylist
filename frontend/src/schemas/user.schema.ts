import * as Yup from 'yup';

const phoneRegex = /^0(([23489]\d{7})|(5[0-9]{8}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const userSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters long.')
    .max(50, 'Name must be less than 50 characters long.')
    .required('Name is required.'),

  email: Yup.string()
    .email('Email must be a standard email address.')
    .required('Email is required.'),

  phone: Yup.string().matches(
    phoneRegex,
    'Phone must be standard Israeli phone number.'
  ),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long.')
    .matches(
      passwordRegex,
      'Password must contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-.'
    )
    .required('Password is required.'),
});

export const editUserSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters long.')
    .max(50, 'Name must be less than 50 characters long.')
    .required('Name is required.'),

  email: Yup.string()
    .email('Email must be a standard email address.')
    .required('Email is required.'),

  phone: Yup.string().matches(
    phoneRegex,
    'Phone must be standard Israeli phone number.'
  ),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long.')
    .matches(
      passwordRegex,
      'Password must contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-.'
    ),
});

export const workingHoursSchema = Yup.object({
  day: Yup.string()
    .required('Day is required.')
    .oneOf(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday']),

  startTime: Yup.string()
    .required('Strat time is required.')
    .matches(timeRegex, 'Start time must be in HH:MM format'),

  endTime: Yup.string()
    .required('End time is required.')
    .matches(timeRegex, 'End time must be in HH:MM format'),
    
  dayOff: Yup.boolean(),
});
