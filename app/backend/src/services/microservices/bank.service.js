import axios from 'axios';

const PAYMENT_MICROSERVICE_URL = process.env.PAYMENT_MICROSERVICE_URL;
const CREDIT_CLIENT_ID = process.env.CREDIT_CLIENT_ID;
const CREDIT_CLIENT_SECRET = process.env.CREDIT_CLIENT_SECRET;

class BankService {
    // TODO: LINK WITH CREDIT CARD AND BANK
    async linkPaymentMethod({ cardNumber, pin }) {
        return true;
    }
    
    async validateTransactionBank(cardNumber, pin, type, amount, description) {
        return true;
    }
}

export default new BankService();
