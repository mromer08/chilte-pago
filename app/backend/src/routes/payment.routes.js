import express from 'express';
import { processDeposit, processPayment } from '../controllers/payment.controller.js';
import verifyAppJWT from '../middlewares/verifyAppJWT.middleware.js';
import verifyJWT from '../middlewares/verifyJWT.middleware.js';


const router = express.Router();
router.post('/pay', verifyAppJWT, processPayment);
router.post('/deposit', verifyJWT, processDeposit);

export default router;
