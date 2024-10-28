import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    balance: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
    status: {
        type: DataTypes.ENUM('ACTIVO', 'BANEADO', 'ELIMINADO'),
        allowNull: false,
        defaultValue: 'ACTIVO'
    },
    roleId: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: true,
    underscored: true
});

export default User;
