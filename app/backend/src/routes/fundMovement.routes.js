import express from 'express';
import fundMovementController from '../controllers/fundMovement.controller.js';

const router = express.Router();

router.post('/', fundMovementController.createFundMovement);
router.get('/user', fundMovementController.getUserFundMovements);

export default router;
