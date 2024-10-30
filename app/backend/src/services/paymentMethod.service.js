import {PaymentMethod} from '../models/index.js';
import BankService from './microservices/creditCard.service.js'

class PaymentMethodService {
    async createPaymentMethod({ userId, type, lastFour, cardNumber, pin, status }) {
        try {
            // Validar el método de pago con el servicio bancario
            const isValid = await BankService.linkPaymentMethod({ cardNumber, pin });
            if (!isValid) {
                throw { status: 400, message: 'Payment method validation failed.' };
            }

            // Crear el método de pago si la validación fue exitosa
            const paymentMethod = await PaymentMethod.create({ userId, type, lastFour, cardNumber, pin, status });
            return paymentMethod;
        } catch (error) {
            throw { status: error.status || 500, message: 'Error creating payment method: ' + error.message };
        }
    }

    async findPaymentMethodById(id) {
        try {
            const paymentMethod = await PaymentMethod.findByPk(id);
            return paymentMethod;
        } catch (error) {
            throw new Error('Error finding payment method by ID: ' + error.message);
        }
    }

    async findPaymentMethodsByUserId(userId) {
        try {
            const paymentMethods = await PaymentMethod.findAll({ where: { userId } });
            return paymentMethods;
        } catch (error) {
            throw new Error('Error finding payment methods for user: ' + error.message);
        }
    }

    async updatePaymentMethod(id, updates) {
        try {
            const paymentMethod = await this.findPaymentMethodById(id);
            if (!paymentMethod) throw new Error('Payment method not found');

            await paymentMethod.update(updates);
            return paymentMethod;
        } catch (error) {
            throw new Error('Error updating payment method: ' + error.message);
        }
    }

    async deletePaymentMethod(id) {
        try {
            const paymentMethod = await this.findPaymentMethodById(id);
            if (!paymentMethod) throw new Error('Payment method not found');

            await paymentMethod.destroy();
        } catch (error) {
            throw new Error('Error deleting payment method: ' + error.message);
        }
    }
}

export default new PaymentMethodService();
