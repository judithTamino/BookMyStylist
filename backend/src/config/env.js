import { config } from 'dotenv';

config({ path: '.env', quiet: true });

export const {ENV, PORT, MONGODB_LOCAL_URI, JWT_SECRET, ADMIN_EMAIL, EMAIL_PASSWORD } = process.env;