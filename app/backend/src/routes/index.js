import express from 'express';
import userRoutes from './user.routes.js';
import roleRoutes from './role.routes.js';
import authRoutes from './auth.routes.js';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/role', roleRoutes);
router.use('/auth', authRoutes);

export default router;
