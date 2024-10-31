import {FundMovement} from '../models/index.js';

class ReportController {
    // Método para obtener el total de ganancias generadas por comisiones
    async getTotalCommissions(req, res) {
        try {
            // Sumar las comisiones de todos los movimientos
            const totalCommissions = await FundMovement.sum('commission_amount', {
                where: {
                    status: 'PROCESADA' // Filtrar solo movimientos procesados
                }
            });

            // Retornar el total de comisiones en la respuesta
            return res.status(200).json({
                success: true,
                totalCommissions: totalCommissions || 0 // Asegurarse de retornar 0 si no hay comisiones
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener el total de comisiones: ' + error.message
            });
        }
    }
}

export default new ReportController();
