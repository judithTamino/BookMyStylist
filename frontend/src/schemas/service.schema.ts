import * as Yup from 'yup';

const priceRegex = /^\d+(\.\d{1,2})?$/;

export const serviceSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters long.')
    .max(200, 'Name must be less than 200 characters long.')
    .required('Name is required.'),

  price: Yup.number()
    .min(30, 'Price must be at least 30 ILS.')
    .test(
      'max-2-decimals',
      'Price can have at most 2 decimal places',
      (value) =>
        value === undefined || value === null
          ? true
          : priceRegex.test(value.toString())
    )
    .required('Price is required.'),

  duration: Yup.number()
    .min(15, 'Duration must be at least 15 minutes')
    .max(360, 'Duration must be less than 360 minutes')
    .required('Duration is required.'),

  description: Yup.string()
    .max(500, 'Description must be less than 500 characters long.'),


  category: Yup.string()
    .oneOf([
      'haircuts & styling',
      'hair coloring',
      'hair treatments',
      'texture service',
      'extensions & add-ons',
      'bridal & events',
    ])
    .required('Category is required.'),
    
  active: Yup.boolean(),
});
