import axios from 'axios';

const BANK_MICROSERVICE_URL = process.env.BANK_MICROSERVICE_URL;
const TOKEN_BANK_SERVICE = process.env.TOKEN_BANK_SERVICE;

class BankService {
    // TODO: LINK WITH CREDIT CARD AND BANK
    async linkPaymentMethod({ cardNumber, pin }) { return true;
        try {
            console.log(`${BANK_MICROSERVICE_URL}/cuenta/verificar-saldo/${cardNumber}`)
            const response = await axios.post(
                `${BANK_MICROSERVICE_URL}/cuenta/verificar-saldo/${cardNumber}`,
                { monto:1 }, // El PIN se envía en el cuerpo de la petición
                {
                    headers: {
                        'Authorization': `Bearer ${TOKEN_BANK_SERVICE}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Procesar la respuesta según la estructura esperada
            return response.data.saldoSuficiente || false;
        } catch (error) {
            console.error('Error al vincular el método de pago:', error.message);
            throw new Error('Error al vincular el método de pago: ' + error.message);
        }
    }
    
    async validateTransactionBank(cardNumber, pin, type, amount, description) {
        return true;
    }
}

export default new BankService();
