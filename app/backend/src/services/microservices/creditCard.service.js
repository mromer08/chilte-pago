import axios from 'axios';

const PAYMENT_MICROSERVICE_URL = process.env.PAYMENT_MICROSERVICE_URL;
const CREDIT_CLIENT_ID = process.env.CREDIT_CLIENT_ID;
const CREDIT_CLIENT_SECRET = process.env.CREDIT_CLIENT_SECRET;

class CreditCardService {
    // TODO: LINK WITH CREDIT CARD AND BANK
    async linkPaymentMethod({ cardNumber, pin }) {
        try {
            // Obtener el token de autenticación
            const authResponse = await axios.get(`${PAYMENT_MICROSERVICE_URL}/api/auth/token`, {
                data: {
                    clientId: CREDIT_CLIENT_ID,
                    clientSecret: CREDIT_CLIENT_SECRET
                }
            });

            const { token } = authResponse.data;
            if (!token) throw new Error('Token retrieval failed.');
            console.log(token);
            // Llamada para vincular el método de pago usando el token
            const response = await axios.get(
                `${process.env.PAYMENT_MICROSERVICE_URL}/api/card`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    data: { cardNumber, pin }
                }
            );

            return response.data.exist;
        } catch (error) {
            console.log(error);
            throw { status: 500, message: `Error linking payment method` };
        }
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

export default new CreditCardService();
