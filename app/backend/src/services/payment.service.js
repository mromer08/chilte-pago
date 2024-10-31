import {sequelize} from '../config/db.config.js';
import {Company, PaymentMethod, User} from '../models/index.js';
import FundMovementService from './fundMovement.service.js';

class PaymentService {
    async processPayment(companyCode, userEmail, amount) {
        const t = await sequelize.transaction();

        try {
            const company = await Company.findOne({ where: { code: companyCode }, transaction: t });
            if (!company) {
                throw { status: 404, message: 'Company not found' };
            }

            const user = await User.findOne({ where: { email: userEmail }, transaction: t });
            if (!user) {
                throw { status: 404, message: 'User not found' };
            }
            // busccando tarjetas se puede agregar atributo isCurrent para validar que sea la por defecto
            const userPaymentMethod = await PaymentMethod.findOne({ where: { userId: user.id }, transaction: t });
            if (!userPaymentMethod) {
                throw { status: 404, message: 'User payment method not found' };
            }

            const companyPaymentMethod = await PaymentMethod.findOne({ where: { userId: company.userId, type: 'bank_account' }, transaction: t });
            if (!companyPaymentMethod) {
                throw { status: 404, message: 'Company payment method not found' };
            }

            // Calcula la comisión
            const commissionAmount = amount * 0.013; // 1.3%
            const netAmountForUser = amount; // Mismo monto para el usuario
            const netAmountForCompany = amount - commissionAmount; // Monto menos la comisión para la compañía

            // Crea el movimiento de fondos del tipo INGRESO para la compañía
            await FundMovementService.createFundMovement({
                userId: company.userId,
                paymentMethodId: companyPaymentMethod.id,
                type: 'INGRESO',
                status: 'PROCESADA',
                totalAmount: amount,
                commissionAmount: commissionAmount,
                netAmount: netAmountForCompany,
                description: `Ingreso por compra realizada por ${user.firstname} ${user.lastname}`,
                transaction: t 
            });
            // Crea el movimiento de fondos del tipo EGRESO para el usuario
            await FundMovementService.createFundMovement({
                userId: user.id,
                paymentMethodId: userPaymentMethod.id,
                type: 'EGRESO',
                status: 'PROCESADA',
                totalAmount: amount,
                commissionAmount: 0,
                netAmount: netAmountForUser,
                description: `Compra realizada en ${company.name}`,
                transaction: t 
            });

            await t.commit();
            return { message: 'Payment processed successfully' };

        } catch (error) {
            await t.rollback(); 
            throw error; 
        }
    }
}

export default new PaymentService();
