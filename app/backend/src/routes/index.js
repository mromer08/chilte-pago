import express from 'express';
import userRoutes from './user.routes.js';
import roleRoutes from './role.routes.js';
import authRoutes from './auth.routes.js';
import paymentMethodRoutes from './paymentMethod.routes.js';

export {
    userRoutes,
    roleRoutes,
    authRoutes,
    paymentMethodRoutes
};
