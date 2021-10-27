import  {Sequelize}  from 'sequelize';

import sequelize from '../database.js';

const User = sequelize.define('users', {
   id_user: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   email: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   name: {
      type: Sequelize.STRING,
   },
   password: {
      type: Sequelize.STRING,
      allowNull: false,
   },
}, {
   createdAt: false,
   updatedAt:false
});


export default User;