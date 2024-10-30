import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 10,       
    min: 0,        
    acquire: 30000,
    idle: 10000    
  }
});

const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({alter:true});
    console.log('Connection to MariaDB has been established successfully.');
  } catch (error) {
    throw new Error(error);
  }
};

export {sequelize, dbConnection};
