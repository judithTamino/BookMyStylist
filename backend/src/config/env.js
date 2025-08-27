import { config } from 'dotenv';

config({ path: '.env', quiet: true });

export const { PORT, MONGODB_LOCAL_URI, JWT_SECRET, ADMIN_EMAIL, EMAIL_PASSWORD } = process.env;