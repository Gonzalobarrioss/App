import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('brunoemasn_web_alumnos','250475_jojo', 'steelballrun', {
    dialect: 'mysql',
    host: 'mysql-brunoemasn.alwaysdata.net', 
});
/*
const sequelize = new Sequelize('db_web_alumnos','root','',{
    dialect: 'mysql',
    host: 'localhost'
})
*/
export default sequelize
