import express from 'express';
import OrderController from '../controllers/order.controller.js';
import verifyAppJWT from '../middlewares/verifyAppJWT.middleware.js';
import verifyJWT from '../middlewares/verifyJWT.middleware.js';

const router = express.Router();
router.post('/', verifyAppJWT, OrderController.createOrder);
router.get('/', OrderController.getAllOrders);
router.get('/user', verifyJWT, OrderController.getOrdersByUserId);
router.get('/:id', OrderController.getOrderById);
router.put('/:id', verifyJWT, OrderController.updateOrderWithPayment);
router.delete('/:id', OrderController.deleteOrder);

export default router;
