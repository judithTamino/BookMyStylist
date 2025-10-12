export const bookingSteps = [
  'Choose a service',
  'Pick a time',
  'Confirm your appointment',
];

export const links = [
  { name: 'HOME', path: '/' },
  { name: 'ABOUT', path: '/about' },
  { name: 'SERVICES', path: '/services' },
];

export const adminLinks = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: 'ri-home-line' },
  { name: 'Appointments', path: '/admin/appointments', icon: 'ri-calendar-line' },
  { name: 'Services', path: '/admin/services', icon: 'ri-scissors-line' },
  { name: 'Working Hours', path: '/admin/working-hours', icon: 'ri-time-line' },
];

export const specialties = [
  {
    title: 'Precision Cuts',
    desc: 'Tailored cuts that fit your personality and lifestyle.',
  },
  {
    title: 'Creative Color',
    desc: 'Highlights, balayage, and bold colors that pop.',
  },
  {
    title: 'Bridal & Event Styling',
    desc: 'Elegant looks for weddings, parties, and events.',
  },
  {
    title: 'Hair Treatments',
    desc: 'Restorative treatments for shine and strength.',
  },
];

export const loginFields = [
  {
    label: 'Email',
    name: 'email',
    type: 'text',
    placeholder: 'john@example.com',
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: '@Johndoe',
  },
];

export const signupFields = [
  { 
    label: 'Name', 
    name: 'name', 
    type: 'text', 
    placeholder: 'john doe',
    requiredField: true, 
  },
  {
    label: 'Email',
    name: 'email',
    type: 'text',
    placeholder: 'john@example.com',
    requiredField: true, 
  },
  { 
    label: 'Phone', 
    name: 'phone', 
    type: 'text', 
    placeholder: '053 526 5696',
    requiredField: false, 
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: '@Johndoe',
    requiredField: true, 
  },
];

export const editFields = [
  { label: 'Name', name: 'name', type: 'text', placeholder: 'john doe' },
  {
    label: 'Email',
    name: 'email',
    type: 'text',
    placeholder: 'john@example.com',
  },
  { label: 'Phone', name: 'phone', type: 'text', placeholder: '053 526 5696' },
];
