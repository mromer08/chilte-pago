import server from './server.js';
import { sequelize, dbConnection } from './src/config/db.config.js';

const PORT = process.env.PORT || 3500;

dbConnection();
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
