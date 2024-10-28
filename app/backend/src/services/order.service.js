import {Order, User} from "../models/index.js";
import applicationService from "./application.service.js";
import bankService from "./microservices/bank.service.js";
import paymentMethodService from "./paymentMethod.service.js";
import userService from "./user.service.js";

class OrderService {
    async createOrder(data) {
        try {
            const order = await Order.create(data);
            return order;
        } catch (error) {
            throw new Error('Error creating order: ' + error.message);
        }
    }

    async getAllOrders() {
        try {
            return await Order.findAll();
        } catch (error) {
            throw new Error('Error fetching orders: ' + error.message);
        }
    }

    async getOrderById(id) {
        try {
            const order = await Order.findByPk(id);
            if (!order) throw new Error('Order not found');
            return order;
        } catch (error) {
            throw new Error('Error fetching order: ' + error.message);
        }
    }

    async updateOrderWithPayment(orderId, userId, paymentMethodId) {
        const order = await this.getOrderById(orderId);
        if (!order) throw { status: 404, message: 'Order not found' };
    
        const paymentMethod = await paymentMethodService.findPaymentMethodById(paymentMethodId);
        if (!paymentMethod) throw { status: 404, message: 'Payment method not found' };
    
        order.userId = userId;
        order.paymentMethodId = paymentMethodId;
        order.status = 'CONFIRMADO';
        await order.save();
    
        // Validar el pago con el banco
        const paymentData = { cardNumber: paymentMethod.cardNumber, pin: paymentMethod.pin };
        const isAuthorized = await bankService.validatePay(paymentData);
    
        if (!isAuthorized) {
            throw { status: 400, message: 'Payment not authorized' };
        }
    
        order.status = 'AUTORIZADO';
        await order.save();
    
        // Sumar al balance del usuario la cantidad de la orden
        const amount = order.amount;
        const application = await applicationService.getApplicationById(order.applicationId);
        const user = await userService.getUserById(application.userId);
        if (!user) throw { status: 404, message: 'User not found' };
    
        user.balance += amount;
        await user.save();
    
        return order;
    }

    async deleteOrder(id) {
        try {
            const order = await Order.findByPk(id);
            if (!order) throw new Error('Order not found');
            await order.destroy();
            return { message: 'Order deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting order: ' + error.message);
        }
    }

    async getOrdersByUserId(userId) {
        try {
            const orders = await Order.findAll({
                where: { userId },
                include: [
                    {
                        model: User,
                        attributes: ['name', 'lastname']
                    }
                ]
            });

            if (!orders.length) {
                throw new Error('No orders found for this user');
            }

            return orders;
        } catch (error) {
            throw new Error('Error fetching orders by user ID: ' + error.message);
        }
    }
}

export default new OrderService();
