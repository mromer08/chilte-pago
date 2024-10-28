import axios from 'axios';

class PaymentGatewayService {
    static async linkPaymentMethod(paymentData) {
        try {
            const response = await axios.post(`${process.env.PAYMENT_MICROSERVICE_URL}/link-payment-method`, paymentData);
            return response.data;
        } catch (error) {
            throw new Error(`Error linking payment method: ${error.message}`);
        }
    }
}

export default PaymentGatewayService;
