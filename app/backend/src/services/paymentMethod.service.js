import PaymentMethod from '../models/index.js';

class PaymentMethodService {
    async createPaymentMethod(data) {
        try {
            const paymentMethod = await PaymentMethod.create(data);
            return paymentMethod;
        } catch (error) {
            throw new Error('Error creating payment method: ' + error.message);
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
