import axios from 'axios';

const PAYMENT_MICROSERVICE_URL = process.env.PAYMENT_MICROSERVICE_URL;
const CREDIT_CLIENT_ID = process.env.CREDIT_CLIENT_ID;
const CREDIT_CLIENT_SECRET = process.env.CREDIT_CLIENT_SECRET;

class CreditCardService {
    // TODO: LINK WITH CREDIT CARD AND BANK
    async linkPaymentMethod({ cardNumber, pin }) {
        try {
            // Obtener el token de autenticación
            const authResponse = await axios.post(`${PAYMENT_MICROSERVICE_URL}/api/auth/token`, {
                clientId: CREDIT_CLIENT_ID,
                clientSecret: CREDIT_CLIENT_SECRET
            });

            const { token } = authResponse.data;
            if (!token) throw new Error('Token retrieval failed.');
            console.log(token);
            // Llamada para vincular el método de pago usando el token
            const response = await axios.post(
                `${process.env.PAYMENT_MICROSERVICE_URL}/api/card`,
                {cardNumber, pin},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            

            return response.data.exist || false;
        } catch (error) {
            console.log(error);
            throw { status: 500, message: `Error linking payment method` };
        }
    }
    
    async validateTransactionCredit(cardNumber, pin, type, amount, description) {
        try {
            // Obtener el token de autenticación
            const authResponse = await axios.post(`${process.env.PAYMENT_MICROSERVICE_URL}/api/auth/token`, {
                clientId: process.env.CREDIT_CLIENT_ID,
                clientSecret: process.env.CREDIT_CLIENT_SECRET
            });

            const { token } = authResponse.data;
            if (!token) throw new Error('Token retrieval failed.');
            
            // Llamada para validar la transacción usando el token
            console.log({ cardNumber, pin, amount, description })
            const response = await axios.post(
                `${process.env.PAYMENT_MICROSERVICE_URL}/api/pay`,
                { cardNumber, pin, amount, description },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Retorna true si la transacción es válida, false si no
            return response.data.isAuthorized || false;
        } catch (error) {
console.log(error)
            // console.error(`Error validating credit transaction: ${error.message}`);
            throw { status: 500, message: 'Error validating credit transaction' };
        }
    }
}

export default new CreditCardService();
