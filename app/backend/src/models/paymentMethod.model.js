import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const PaymentMethod = sequelize.define('PaymentMethod', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.ENUM('credit_card', 'bank_account'), allowNull: false },
    lastFour: { type: DataTypes.STRING(4) },
    cardNumber: { type: DataTypes.STRING, allowNull: true }, // Encrypted storage
    pin: { type: DataTypes.STRING, allowNull: true }, // Encrypted storage
    paymentToken: { type: DataTypes.STRING, allowNull: true },
    status: { 
        type: DataTypes.ENUM('VALIDA', 'INVALIDA', 'ELIMINADO'),
        allowNull: false,
        defaultValue: 'VALIDA'
     }
}, {
    timestamps: true,
    underscored: true
});

export default PaymentMethod;
