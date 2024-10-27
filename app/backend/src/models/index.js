import User from './user.model.js';
import Role from './role.model.js';
import Token from './token.model.js';
import Application from './application.model.js';
import PaymentMethod from './paymentMethod.model.js';
import Order from './order.model.js';
import ErrorLog from './errorLog.model.js';
import FundMovement from './fundMovement.model.js'

// Define relationships
User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });

User.hasMany(Token, { foreignKey: 'userId' });
Token.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Application, { foreignKey: 'userId' });
Application.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(PaymentMethod, { foreignKey: 'userId' });
PaymentMethod.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.belongsTo(Application, { foreignKey: 'applicationId' });
Application.hasMany(Order, { foreignKey: 'applicationId' });

Order.belongsTo(PaymentMethod, { foreignKey: 'paymentMethodId' });
PaymentMethod.hasMany(Order, { foreignKey: 'paymentMethodId' });

Order.hasOne(ErrorLog, { foreignKey: 'orderId' });
ErrorLog.belongsTo(Order, { foreignKey: 'orderId' });

User.hasMany(FundMovement, { foreignKey: 'userId' });
FundMovement.belongsTo(User, { foreignKey: 'userId' });

PaymentMethod.hasMany(FundMovement, { foreignKey: 'paymentMethodId' });
FundMovement.belongsTo(PaymentMethod, { foreignKey: 'paymentMethodId' });

export {
    User,
    Role,
    Token,
    Application,
    PaymentMethod,
    Order,
    ErrorLog,
    FundMovement
};