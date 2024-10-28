import axios from 'axios';

class BankService {
    // TODO: LINK WITH CREDIT CARD AND BANK
    async linkPaymentMethod({cardNumber, pin}) {
        return true;
        // try {
        //     const response = await axios.post(`${process.env.PAYMENT_MICROSERVICE_URL}/link-payment-method`, paymentData);
        //     return response.data;
        // } catch (error) {
        //     throw new Error(`Error linking payment method: ${error.message}`);
        // }
    }

    async validatePay({cardNumber, pin}) {
        return true;
        // try {
        //     const response = await axios.post(`${process.env.PAYMENT_MICROSERVICE_URL}/link-payment-method`, paymentData);
        //     return response.data;
        // } catch (error) {
        //     throw new Error(`Error linking payment method: ${error.message}`);
        // }
    }
}

export default new BankService();
