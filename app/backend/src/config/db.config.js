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

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to MariaDB has been established successfully.');
  } catch (error) {
    console.error('ERROR: Unable to connect to the database:', error);
  }
};

export {sequelize, testConnection};
