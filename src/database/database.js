import  Sequelize  from 'sequelize';

export const sequelize = new Sequelize(
    'conadies',
    'postgres',
    '123456',
    {
    host: 'localhost',
    dialect: 'postgres',

});