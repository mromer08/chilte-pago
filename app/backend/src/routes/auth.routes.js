import express from 'express';
import { login, refreshTokenHandler, register, validateCompany } from '../controllers/auth.controller.js';

const router = express.Router();
router.post('/login', login);
router.post('/register', register);
router.get('/refresh', refreshTokenHandler);
router.post('/company', validateCompany);

export default router;
