import dotenv from 'dotenv';
dotenv.config();
export const ADMIN = Number(process.env.ADMIN_ROLE_CODE);
export const CUSTOMER = Number(process.env.CUSTOMER_ROLE_CODE);
