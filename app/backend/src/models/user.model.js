import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
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
