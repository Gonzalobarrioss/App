import  {Sequelize}  from 'sequelize';

import sequelize from '../database.js';

export const User = sequelize.define('users', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: false,
      allowNull: false,
      primaryKey: true,
   },
   username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
   },
   password: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   rol: {
      type: Sequelize.STRING,
      allowNull: true,
   }, 
}, {
   createdAt: false,
   updatedAt:false
});

export const Alumno = sequelize.define('alumnos',{
   
},{
   createdAt: false,
   updatedAt:false
}
)

export const Docente = sequelize.define('docentes',{
   
},{
   createdAt: false,
   updatedAt:false
}
)


//export default User;