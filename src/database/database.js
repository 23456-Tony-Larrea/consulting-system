import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT || 5432;
const dbName = process.env.DB_NAME;

export const sequelize = new Sequelize('identityEcuador', 'postgres', '123456', {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres'
});