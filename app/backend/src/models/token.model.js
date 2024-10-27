import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const Token = sequelize.define('Token', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    validatedAt: { type: DataTypes.DATE },
    tokenString: {type: DataTypes.STRING, allowNull: false},
    code: {type: DataTypes.INTEGER},
    userId: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: true,
    underscored: true
});

export default Token;
