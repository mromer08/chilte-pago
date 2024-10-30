import User from './user.model.js';
import Role from './role.model.js';
import Token from './token.model.js';
import Company from './company.model.js';
import PaymentMethod from './paymentMethod.model.js';
import ErrorLog from './errorLog.model.js';
import FundMovement from './fundMovement.model.js'

// Define relationships
User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });

User.hasMany(Token, { foreignKey: 'userId' });
Token.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(PaymentMethod, { foreignKey: 'userId' });
PaymentMethod.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(FundMovement, { foreignKey: 'userId' });
FundMovement.belongsTo(User, { foreignKey: 'userId' });

PaymentMethod.hasMany(FundMovement, { foreignKey: 'paymentMethodId' });
FundMovement.belongsTo(PaymentMethod, { foreignKey: 'paymentMethodId' });

User.hasMany(Company, { foreignKey: 'userId' });
Company.belongsTo(User, { foreignKey: 'userId' });

FundMovement.hasMany(ErrorLog, { foreignKey: 'fundMovementId' });
ErrorLog.belongsTo(FundMovement, { foreignKey: 'fundMovementId' });

export {
    User,
    Role,
    Token,
    PaymentMethod,
    ErrorLog,
    FundMovement,
    Company,
};