import PaymentMethodService from '../services/PaymentMethodService.js';

class PaymentMethodController {
    async createPaymentMethod(req, res) {
        const { type, status, cardNumber, pin, paymentToken } = req.body;
        const userId = req.session.user.id;

        if (!userId || !type) {
            return res.status(400).json({ message: 'userId, type, and status are required.' });
        }

        try {
            const newPaymentMethod = await PaymentMethodService.createPaymentMethod({
                userId,
                type,
                lastFour: cardNumber ? cardNumber.slice(-4) : null,
                cardNumber,
                pin,
                paymentToken,
                status,
            });
            res.status(201).json(newPaymentMethod);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getPaymentMethodById(req, res) {
        const { id } = req.params;

        try {
            const paymentMethod = await PaymentMethodService.findPaymentMethodById(id);
            if (!paymentMethod) {
                return res.status(404).json({ message: 'Payment method not found.' });
            }
            res.json(paymentMethod);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getPaymentMethodsByUserId(req, res) {
        const { userId } = req.params;

        try {
            const paymentMethods = await PaymentMethodService.findPaymentMethodsByUserId(userId);
            res.json(paymentMethods);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updatePaymentMethod(req, res) {
        const { id } = req.params;
        const updates = req.body;

        try {
            const updatedPaymentMethod = await PaymentMethodService.updatePaymentMethod(id, updates);
            if (!updatedPaymentMethod) {
                return res.status(404).json({ message: 'Payment method not found.' });
            }
            res.json(updatedPaymentMethod);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deletePaymentMethod(req, res) {
        const { id } = req.params;

        try {
            await PaymentMethodService.deletePaymentMethod(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new PaymentMethodController();
