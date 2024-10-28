import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER},
    applicationId: { type: DataTypes.INTEGER, allowNull: false },
    paymentMethodId: { type: DataTypes.INTEGER },
    description: { type: DataTypes.STRING },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { 
        type: DataTypes.ENUM('CREADO', 'CONFIRMADO', 'AUTORIZADO'),
        allowNull: false,
        defaultValue: 'CREADO'
     }
}, {
    timestamps: true,
    underscored: true
});

export default Order;
