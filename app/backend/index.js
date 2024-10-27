import server from './server.js';
import { sequelize, testConnection } from './src/config/db.config.js';
import { User, Role, Token, Application, PaymentMethod, Order, ErrorLog, FundMovement } from './src/models/index.js';

const PORT = process.env.PORT || 3500;

// testConnection();
// SOLO PARA PROBAR LA CONEXION Y CREACION DE TABLAS
sequelize.sync({ force: true }).then(() => {
    console.log("Database & tables created!");
  });

  const createTestData = async () => {
    const role = await Role.create({ name: 'Admin' });
    const user = await User.create({ username: 'JohnDoe', email: 'john@example.com', roleId: role.id });
    const token = await Token.create({ userId: user.id, token: 'some-token' });
    const application = await Application.create({ name: 'Test App', userId: user.id });
    const paymentMethod = await PaymentMethod.create({ type: 'Credit Card', userId: user.id });
    const order = await Order.create({ userId: user.id, applicationId: application.id, paymentMethodId: paymentMethod.id });
    const errorLog = await ErrorLog.create({ orderId: order.id, message: 'Test error' });
    const fundMovement = await FundMovement.create({ amount: 100, userId: user.id, paymentMethodId: paymentMethod.id });
  
    console.log("Test data created successfully!");
  };
  
  createTestData().catch(error => console.error(error));

  const verifyRelationships = async () => {
    const user = await User.findOne({ where: { email: 'john@example.com' }, include: [Role, Token, Application, PaymentMethod, Order] });
    console.log(JSON.stringify(user, null, 2));
  };
  
  verifyRelationships().catch(error => console.error(error));
  
// FIN DEL TEST
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
