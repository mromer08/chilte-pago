import express from 'express';
import { login, refreshTokenHandler, register, validateApplication } from '../controllers/auth.controller.js';

const router = express.Router();
router.post('/login', login);
router.post('/register', register);
router.get('/refresh', refreshTokenHandler);
router.post('/app', validateApplication);

export default router;
