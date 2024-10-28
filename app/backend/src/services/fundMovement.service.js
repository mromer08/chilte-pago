import {FundMovement} from '../models/index.js';
import paymentMethodService from './paymentMethod.service.js';
import userService from './user.service.js';

class FundMovementService {
    async createFundMovement({ userId, paymentMethodId, totalAmount, description }) {
        // Validar campos obligatorios
        if (!userId || !paymentMethodId || !totalAmount) {
            throw new Error('User ID, Payment Method ID, and Total Amount are required');
        }

        // Validar existencia del usuario
        const user = await userService.getUserById(userId);
        if (!user) throw { status: 404, message: 'User not found' };

        // Validar existencia del método de pago
        const paymentMethod = await paymentMethodService.findPaymentMethodById(paymentMethodId);
        if (!paymentMethod) throw { status: 404, message: 'Payment method not found' };

        // Verificar que el usuario tenga suficiente balance
        if (user.balance < totalAmount) {
            throw { status: 400, message: 'Insufficient balance' };
        }

        // Calcular comisión (1.3% del totalAmount)
        const commissionAmount = parseFloat((totalAmount * 0.013).toFixed(2));
        const netAmount = parseFloat((totalAmount - commissionAmount).toFixed(2));

        try {
            user.balance -= totalAmount;
            await user.save();

            // Crear el movimiento de fondos
            const fundMovement = await FundMovement.create({
                userId,
                paymentMethodId,
                totalAmount,
                commissionAmount,
                netAmount,
                status: 'CONFIRMADO', // Inicialmente en estado 'CONFIRMADO'
                description
            });

            return fundMovement;
        } catch (error) {
            throw new Error('Error creating fund movement: ' + error.message);
        }
    }

    async getFundMovementsByUserId(userId) {
        return await FundMovement.findAll({ where: { userId } });
    }
}

export default new FundMovementService();
