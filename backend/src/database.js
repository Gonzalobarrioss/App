import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('db_login', 'root', '', {
    dialect: 'mysql',
    host: 'localhost', 
});

export default sequelize
