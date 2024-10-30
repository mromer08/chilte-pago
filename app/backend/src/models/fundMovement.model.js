import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const FundMovement = sequelize.define('FundMovement', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    userId: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    paymentMethodId: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    type: { 
        type: DataTypes.ENUM('INGRESO', 'EGRESO'), 
        allowNull: false 
    },
    status: { 
        type: DataTypes.ENUM('PROCESADA', 'FALLIDA'), 
        allowNull: false 
    },
    totalAmount: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    },
    commissionAmount: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    },
    netAmount: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    },
    description: { 
        type: DataTypes.STRING, 
        allowNull: true 
    }
}, {
    timestamps: true,
    underscored: true
});

export default FundMovement;
