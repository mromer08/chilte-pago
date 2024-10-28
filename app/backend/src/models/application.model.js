import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const Application = sequelize.define('Application', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    clientId: { type: DataTypes.STRING, allowNull: false, unique: true },
    secretKey: { type: DataTypes.STRING, allowNull: false },
    status: {
        type: DataTypes.ENUM('ELIMINADO', 'ACTIVO', 'SUSPENDIDO'),
        allowNull: false,
        defaultValue: 'ACTIVO'
     },
    paymentMethodId: { type: DataTypes.INTEGER }
}, {
    timestamps: true,
    underscored: true
});

export default Application;
