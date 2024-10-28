import fundMovementService from '../services/fundMovement.service.js';

class FundMovementController {
    async createFundMovement(req, res) {
        const { paymentMethodId, totalAmount, description } = req.body;
        const userId = req.session.user.id;

        if (!userId || !paymentMethodId || !totalAmount) {
            return res.status(400).json({ error: 'user id, payment method id and total amount are required!' });
        }
        try {
            const fundMovement = await fundMovementService.createFundMovement({
                userId,
                paymentMethodId,
                totalAmount,
                description
            });
            res.status(201).json(fundMovement);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }

    async getUserFundMovements(req, res) {
        const userId = req.session.user.id;
        if (!userId) {
            return res.status(400).json({ error: 'user id is required' });
        }

        try {
            const fundMovements = await fundMovementService.getFundMovementsByUserId(userId);
            res.status(200).json(fundMovements);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new FundMovementController();
