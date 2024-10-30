import {FundMovement, PaymentMethod, User} from '../models/index.js';

class FundMovementService {
    async createFundMovement(data) {
        const { userId, paymentMethodId, type, status, totalAmount, commissionAmount, netAmount, description } = data;

        if (!userId || !paymentMethodId || !totalAmount || !type) {
            throw { status: 400, message: 'userId, paymentMethodId, tipo and totalAmount are required!' };
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
