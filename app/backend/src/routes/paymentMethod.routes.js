import express from 'express';
import PaymentMethodController from '../controllers/paymentMethodController.js';

const router = express.Router();

router.post('/',PaymentMethodController.createPaymentMethod);
router.get('/:id',PaymentMethodController.getPaymentMethodById);
router.get('/user/:userId',PaymentMethodController.getPaymentMethodsByUserId);
router.put('/:id',PaymentMethodController.updatePaymentMethod);
router.delete('/:id',PaymentMethodController.deletePaymentMethod);

export default router;
