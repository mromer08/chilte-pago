import {FundMovement, User} from '../models/index.js';

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

    async getTotalUsers(req, res) {
        try {
            // Contar el total de usuarios en la base de datos
            const totalUsers = await User.count();

            // Retornar el total de usuarios en la respuesta
            return res.status(200).json({
                success: true,
                totalUsers: totalUsers || 0 // Asegurar que se retorne 0 si no hay usuarios
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener el total de usuarios: ' + error.message
            });
        }
    }
}

export default new ReportController();
