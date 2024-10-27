import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const Role = sequelize.define('Role', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
    timestamps: true,
    underscored: true
});

export default Role;
