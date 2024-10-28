import OrderService from '../services/order.service.js';

class OrderController {
    async createOrder(req, res) {
        const {description, amount } = req.body;
        const applicationId = req.session.app.id;
        // Validación de campos obligatorios
        if (!applicationId || !amount) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        try {
            const order = await OrderService.createOrder({description, amount, applicationId});
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await OrderService.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getOrderById(req, res) {
        try {
            const { id } = req.params;
            const order = await OrderService.getOrderById(id);
            res.status(200).json(order);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async updateOrderWithPayment(req, res) {
        const { id } = req.params;
        const userId = req.session.user.id;
        const { paymentMethodId } = req.body;

        if (!userId || !paymentMethodId) {
            return res.status(400).json({ error: 'Usuario y método de pago obligatorios' });
        }

        try {
            const order = await OrderService.updateOrderWithPayment(id, userId, paymentMethodId);
            return res.status(200).json(order);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }

    async deleteOrder(req, res) {
        try {
            const { id } = req.params;
            const result = await OrderService.deleteOrder(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async getOrdersByUserId(req, res) {
        const userId = req.session.user.id;

        try {
            const orders = await OrderService.getOrdersByUserId(userId);
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new OrderController();
