import express from 'express';
import { login, refreshTokenHandler, register } from '../controllers/auth.controller.js';

const router = express.Router();
router.post('/login', login);
router.post('/register', register);
router.get('/refresh', refreshTokenHandler);

export default router;
