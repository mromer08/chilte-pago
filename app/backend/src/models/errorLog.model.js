import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const ErrorLog = sequelize.define('ErrorLog', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    errorMessage: { type: DataTypes.STRING, allowNull: false },
    fundMovementId: { type: DataTypes.INTEGER, allowNull: false },
    resolved: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
    timestamps: true,
    underscored: true
});

export default ErrorLog;
