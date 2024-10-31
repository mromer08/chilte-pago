import fundMovementService from '../services/fundMovement.service.js';

class FundMovementController {
    // Controlador para obtener todos los movimientos de fondos
    async getAllFundMovements(req, res) {
        try {
            const fundMovements = await fundMovementService.getAllFundMovements();
            res.status(200).json(fundMovements);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Controlador para obtener movimiento de fondos por ID
    async getFundMovementById(req, res) {
        try {
            const fundMovement = await fundMovementService.getFundMovementById(req.params.id);
            res.status(200).json(fundMovement);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Controlador para actualizar movimiento de fondos
    async updateFundMovement(req, res) {
        try {
            const updatedFundMovement = await fundMovementService.updateFundMovement(req.params.id, req.body);
            res.status(200).json(updatedFundMovement);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Controlador para eliminar movimiento de fondos
    async deleteFundMovement(req, res) {
        try {
            const result = await fundMovementService.deleteFundMovement(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    async getFundMovementsByUserId(req, res) {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        try {
            const fundMovements = await fundMovementService.getFundMovementsByUserId(id);
            res.json(fundMovements);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Error retrieving fund movements' });
        }
    }
    
    async getFundMovementsByUserAuth(req, res) {
        const userId = req.session.user.id;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        try {
            const fundMovements = await fundMovementService.getFundMovementsByUserId(userId);
            res.json(fundMovements);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Error retrieving fund movements' });
        }
    }
}

export default new FundMovementController();
