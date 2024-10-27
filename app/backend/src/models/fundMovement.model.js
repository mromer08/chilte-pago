import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const FundMovement = sequelize.define('FundMovement', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    paymentMethodId: { type: DataTypes.INTEGER, allowNull: false },
    totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    commissionAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    netAmount: { 
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        // defaultValue: sequelize.literal('totalAmount - commissionAmount') 
    },
    status: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING }
}, {
    timestamps: true,
    underscored: true
});

export default FundMovement;
