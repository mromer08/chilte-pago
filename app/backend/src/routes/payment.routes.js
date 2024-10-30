import express from 'express';
import { processPayment } from '../controllers/payment.controller.js';
import verifyAppJWT from '../middlewares/verifyAppJWT.middleware.js';


const router = express.Router();
router.post('/', verifyAppJWT, processPayment);

export default router;
