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

            const companyUser = await User.findOne({ where: { id: company.userId }, transaction: t });
            if (!companyUser) {
                throw { status: 404, message: 'Company user not found' };
            }

            // Calcula la comisión
            const commissionAmount = Number(amount) * 0.013; // 1.3%
            const netAmountForUser = Number(amount) + commissionAmount;

            // Crea el movimiento de fondos del tipo EGRESO para el usuario
            await FundMovementService.createFundMovement({
                userId: user.id,
                paymentMethodId: userPaymentMethod.id,
                type: 'EGRESO',
                status: 'PROCESADA',
                totalAmount: netAmountForUser,
                commissionAmount: commissionAmount,
                netAmount: amount,
                description: `Compra realizada en ${company.name}`,
                transaction: t 
            });

            companyUser.balance = Number(companyUser.balance) + Number(amount);
            await companyUser.save({ transaction: t });
            await t.commit();
            return { message: 'Payment processed successfully' };

        } catch (error) {
            // console.log(error)
            await t.rollback(); 
            throw error; 
        }
    }
    async processDeposit(userId, amount) {
        const t = await sequelize.transaction();

        try {

            const user = await User.findOne({ where: { id: userId }, transaction: t });
            if (!user) {
                throw { status: 404, message: 'User not found' };
            }

            if (Number(user.balance) < Number(amount)) {
                throw { status: 400, message: 'User does not have enough money in balance' };
            }
            // busccando tarjetas se puede agregar atributo isCurrent para validar que sea la por defecto
            const userPaymentMethod = await PaymentMethod.findOne({ where: { userId: user.id, type: 'bank_account'}, transaction: t });
            if (!userPaymentMethod) {
                throw { status: 404, message: 'User payment method not found' };
            }

            // Calcula la comisión
            const commissionAmount = Number(amount) * 0.013; // 1.3%
            const netAmountForUser = Number(amount) - commissionAmount;

            // Crea el movimiento de fondos del tipo EGRESO para el usuario
            await FundMovementService.createFundMovement({
                userId: user.id,
                paymentMethodId: userPaymentMethod.id,
                type: 'INGRESO',
                status: 'PROCESADA',
                totalAmount: netAmountForUser,
                commissionAmount: commissionAmount,
                netAmount: amount,
                description: `Movimiento de fondos a cuenta de banco ${userPaymentMethod.cardNumber}`,
                transaction: t 
            });

            user.balance = Number(user.balance) - Number(amount);
            await user.save({ transaction: t });
            await t.commit();
            return { message: 'Deposit processed successfully', balance: user.balance };

        } catch (error) {
            // console.log(error)
            await t.rollback(); 
            throw error; 
        }
    }
}

export default new PaymentService();
