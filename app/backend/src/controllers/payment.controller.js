import paymentService from '../services/payment.service.js';

export const processPayment = async (req, res) => {
    const { userEmail, amount } = req.body;
    const companyCode = req.session.company.id; // El código de la compañía desde la sesión decodificada

    // Validar campos requeridos
    if (!companyCode || !userEmail || !amount) {
        return res.status(400).json({ message: 'Company code, user email, and amount are required.' });
    }

    try {
        // Llamar al servicio para procesar el pago
        const response = await paymentService.processPayment(companyCode, userEmail, amount);
        res.status(200).json(response); // Responder con el mensaje de éxito
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};
