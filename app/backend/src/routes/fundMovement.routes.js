import express from 'express';
import fundMovementController from '../controllers/fundMovement.controller.js';
import verifyRoles from '../middlewares/verifyRoles.middleware.js';
import { ADMIN, CUSTOMER } from '../config/roles.config.js';

const router = express.Router();

router.get('/user', verifyRoles(CUSTOMER), fundMovementController.getFundMovementsByUserAuth);
router.get('/user/:id', verifyRoles(ADMIN), fundMovementController.getFundMovementsByUserId);

export default router;
