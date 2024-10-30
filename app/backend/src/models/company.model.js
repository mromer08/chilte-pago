import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const Company = sequelize.define('Company', {
    code: { 
        type: DataTypes.STRING, 
        primaryKey: true 
    },
    secretKey: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    status: {
        type: DataTypes.ENUM('ELIMINADO', 'ACTIVO', 'SUSPENDIDO'),
        allowNull: false,
        defaultValue: 'ACTIVO'
    },
    userId: { 
        type: DataTypes.INTEGER, 
        allowNull: true, 
    }
}, {
    timestamps: true,
    underscored: true
});

export default Company;
