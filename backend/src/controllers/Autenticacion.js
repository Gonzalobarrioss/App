import jwt from 'jsonwebtoken';

import bcrypt from 'bcryptjs';

import {User,Alumno, Docente} from '../models/user.js';

export const register = (req, res) => {
    User.findOne({ where : {
        username: req.body.username, 
    }})
    .then(dbUser => {
        if (dbUser) {
            return res.status(409).json({message: "El nombre de usuario ya existe"});
        } else if (req.body.username && req.body.password && req.body.id) {
            if (req.body.rol == "Alumno"){
                Alumno.findOne({ where : {
                    id: req.body.id
                }})
                .then(dbAlumno => {
                    if(dbAlumno){
                        bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                            if (err) {
                                return res.status(500).json({message: "No se pudo encriptar contraseña."}); 
                            } else if (passwordHash) {
                                return User.create(({
                                    id: req.body.id,
                                    username: req.body.username,
                                    password: passwordHash,
                                    rol: req.body.rol
                                }))
                                .then(() => {
                                    res.status(200).json({message: "Usuario creado"});
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(502).json({message: "El id de usuario ya existe"});
                                });
                            }
                        })
                        
                    }
                    else{
                        res.status(502).json({message: "No existe alumno en sistema."})
                    }
                })
            }
            else if(req.body.rol == "Docente"){
                Docente.findOne({ where : {
                    id: req.body.id
                }})
                .then(dbDocente => {
                    if(dbDocente){
                        bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                            if (err) {
                                return res.status(500).json({message: "No se pudo encriptar contraseña."}); 
                            } else if (passwordHash) {
                                return User.create(({
                                    id: req.body.id,
                                    username: req.body.username,
                                    password: passwordHash,
                                    rol: req.body.rol
                                }))
                                .then(() => {
                                    res.status(200).json({message: "Usuario creado"});
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(502).json({message: "El id de usuario ya existe"});
                                });
                            }
                        })
                    }
                    else{
                        res.status(502).json({message: "No existe docente en sistema."})
                    }
                })
            } 
        } else if (!req.body.password) {
            return res.status(400).json({message: "Ingrese una contraseña"});
        } else if (!req.body.username) {
            return res.status(400).json({message: "Ingrese un usuario"});
        } else if (!req.body.id) {
            return res.status(400).json({message: "Ingrese un ID"})
        }
    })
    .catch(err => {
        console.log('error', err);
    });
}; 

let user

export const login = (req, res) => {
    if ( req.body.rol == 'Alumno'){
        User.findOne({ where : {
            username: req.body.username,
            rol: 'Alumno'
        }})
        .then(dbUser => {
            try {
                user = dbUser.dataValues.id
            } catch (error) {
                console.log("Error al obtener el id", error)
            } 
            if (!dbUser) {
                return res.status(404).json({message: "Usuario no encontrado"});
            } else {
                bcrypt.compare(req.body.password, dbUser.password, (err, compareRes) => {
                    if (err) { // error while comparing
                        res.status(502).json({message: "Error al verificar la contraseña"});
                    }
                    else if (compareRes) { 
                        Alumno.findOne ({ where: {
                            id: user,
                            estado: 1
                        }})
                        .then(dbAlumno => {
                            if(dbAlumno){
                                const token = jwt.sign({ username: req.body.username }, 'secret', { expiresIn: '1h' });
                                res.status(200).json({message: "Usuario logueado", "token": token});
                            }
                            else{
                                res.status(502).json({message: "Alumno dado de baja."})
                            }
                        })
                    }
                    else{
                        res.status(401).json({message: "Contraseña incorrecta"});
                    }
                })
            };
        })
        .catch(err => {
            console.log('error', err);
        });
    }else {
        //console.log("docente")
        User.findOne({ where : {
            username: req.body.username,
            rol: 'Docente'
        }})
        .then(dbUser => {
            try {
                user = dbUser.dataValues.id
            } catch (error) {
                console.log("Error al obtener el id",error)
            } 
            if (!dbUser) {
                return res.status(404).json({message: "Usuario no encontrado"});
            }
            else {
                bcrypt.compare(req.body.password, dbUser.password, (err, compareRes) => {
                    if (err) { // error while comparing
                        res.status(502).json({message: "Error al verificar la contraseña"});
                    }
                    else if (compareRes) { 
                        Docente.findOne ({ where: {
                            id: user,
                            estado: 1
                        }})
                        .then(dbDocente => {
                            if(dbDocente){
                                const token = jwt.sign({ username: req.body.username }, 'secret', { expiresIn: '1h' });
                                res.status(200).json({message: "Usuario logueado", "token": token});
                            }
                            else{
                                res.status(502).json({message: "Docente dado de baja."})
                            }
                        })
                    }
                    else{
                        res.status(401).json({message: "Contraseña incorrecta"});
                    }
                })
            }
        })
        .catch(err => {
            console.log('error', err);
        });
    }    
};

export const isAuth = (req, res) => {
    const authHeader = req.get("Authorization");
    const nombre = req.get("username")
    
    if (!authHeader) {
        return res.status(401).json({ message: 'not authenticated' });
    };
    const token = authHeader.split(' ')[1];
    let decodedToken; 
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        return res.status(500).json({ message: err.message || 'could not decode the token' });
    };
    if (!decodedToken) {
        res.status(401).json({ message: 'No autorizado' });
    } else {
        res.status(200).json({ message: 'Ingresando...', nombre: nombre, id: user });
    };
};
