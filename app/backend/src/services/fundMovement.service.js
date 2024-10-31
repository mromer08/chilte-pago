import {ErrorLog, FundMovement, PaymentMethod, User} from '../models/index.js';
import bankService from './microservices/bank.service.js';
import creditCardService from './microservices/creditCard.service.js';

class FundMovementService {
    async createFundMovement(data) {
        const { userId, paymentMethodId, type, status = 'PROCESADA', totalAmount, commissionAmount, netAmount, description } = data;

        // Validación de campos obligatorios
        if (!userId || !paymentMethodId || !totalAmount || !type) {
            throw { status: 400, message: 'userId, paymentMethodId, type, and totalAmount are required!' };
        }

        // Verificar si el usuario existe
        const userExists = await User.findByPk(userId);
        if (!userExists) {
            throw { status: 404, message: 'User not found' };
        }

        // Verificar si el método de pago existe
        const paymentMethodExists = await PaymentMethod.findByPk(paymentMethodId);
        if (!paymentMethodExists) {
            throw { status: 404, message: 'Payment method not found' };
        }

        try {
            if (paymentMethodExists.type==='credit_card' && type==='INGRESO') throw new Error('you cannot deposit money to a credit card')
            // Validar transacción según el tipo de método de pago
            const isTransactionValid = paymentMethodExists.type === 'credit_card'
                ? await creditCardService.validateTransactionCredit(paymentMethodExists.cardNumber, paymentMethodExists.pin, type, totalAmount, description)
                : await bankService.validateTransactionBank(paymentMethodExists.cardNumber, paymentMethodExists.pin, type, totalAmount, description);

            if (!isTransactionValid) {
                throw { status: 400, message: 'Transaction validation failed' };
            }
            // Crear y retornar el nuevo movimiento de fondos
            const newFundMovement = await FundMovement.create({
                userId,
                paymentMethodId,
                type,
                status,
                totalAmount,
                commissionAmount,
                netAmount,
                description
            });

            return newFundMovement;

        } catch (error) {
            // Registrar el movimiento como FALLIDA
            const failedFundMovement = await FundMovement.create({
                userId,
                paymentMethodId,
                type,
                status: 'FALLIDA',
                totalAmount,
                commissionAmount,
                netAmount,
                description: description || 'Error al procesar el movimiento'
            });

            // Crear un registro en ErrorLog
            await ErrorLog.create({
                errorMessage: error.message || 'Unknown error occurred',
                fundMovementId: failedFundMovement.id,
                resolved: false
            });

            throw { status: 500, message: 'Error creating fund movement: ' + error.message };
        }
    }

    // Obtener todos los movimientos de fondos
    async getAllFundMovements() {
        return await FundMovement.findAll();
    }

    // Obtener movimiento de fondos por ID
    async getFundMovementById(id) {
        const fundMovement = await FundMovement.findByPk(id);
        if (!fundMovement) {
            throw { status: 404, message: 'Fund movement not found' };
        }
        return fundMovement;
    }

    // Actualizar movimiento de fondos por ID
    async updateFundMovement(id, data) {
        const fundMovement = await FundMovement.findByPk(id);
        if (!fundMovement) {
            throw { status: 404, message: 'Fund movement not found' };
        }

        // Validar campos obligatorios
        if (!data.userId || !data.paymentMethodId || !data.totalAmount) {
            throw { status: 400, message: 'userId, paymentMethodId, and totalAmount are required!' };
        }

        // Actualizar los datos del movimiento de fondos y guardar
        await fundMovement.update(data);
        return fundMovement;
    }

    // Eliminar movimiento de fondos por ID
    async deleteFundMovement(id) {
        const fundMovement = await FundMovement.findByPk(id);
        if (!fundMovement) {
            throw { status: 404, message: 'Fund movement not found' };
        }

        // Eliminar el movimiento de fondos
        await fundMovement.destroy();
        return { message: 'Fund movement deleted successfully' };
    }


}

export default new FundMovementService();
