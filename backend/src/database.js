import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('db_web_alumnos', 'root', '', {
    dialect: 'mysql',
    host: 'localhost', 
});

export default sequelize
