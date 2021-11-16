import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import User from '../models/user.js';

import { connect } from "../database-mysql.js"



export const signup = (req, res, next) => {
    // checks if email already exists
    User.findOne({ where : {
        username: req.body.username, 
    }})
    .then(dbUser => {
        if (dbUser) {
            return res.status(409).json({message: "username already exists"});
        } else if (req.body.username && req.body.password) {
            // password hash
           /* bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({message: "couldnt hash the password"}); 
                } else if (passwordHash) {*/
                    return User.create(({
                        id: req.body.id,
                        username: req.body.username,
                        password: req.body.password,
                        rol: req.body.rol
                    }))
                    .then(() => {
                        res.status(200).json({message: "user created"});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({message: "error while creating the user"});
                    });
               /* };
            });*/
        } else if (!req.body.password) {
            return res.status(400).json({message: "password not provided"});
        } else if (!req.body.username) {
            return res.status(400).json({message: "username not provided"});
        };
    })
    .catch(err => {
        console.log('error', err);
    });
}; 

let user

export const login = (req, res, next) => {
    if ( req.body.rol == 'Alumno'){
        User.findOne({ where : {
            username: req.body.username,
            rol: 'Alumno'
        }})
        .then(dbUser => {
            try {
                user = dbUser.dataValues.id
                //console.log("user", user)
                //console.log("user", dbUser.dataValues.id)
            } catch (error) {
                console.log(error)
            } 
            if (!dbUser) {
                return res.status(404).json({message: "user not found"});
            } else {
                // password hash
                if ( req.body.password != dbUser.password){
                    res.status(401).json({message: "invalid credentials"});
                }
                else {
                    const token = jwt.sign({ username: req.body.username }, 'secret', { expiresIn: '1h' });
                    res.status(200).json({message: "user logged in", "token": token});
                }

            };
        })
        .catch(err => {
            console.log('error', err);
        });


    }else {
        User.findOne({ where : {
            username: req.body.username,
            rol: 'Docente'
        }})
        .then(dbUser => {
            try {
                user = dbUser.dataValues.id
                //console.log("user", user)
                //console.log("user", dbUser.dataValues.id)
            } catch (error) {
                console.log(error)
            } 

            if (!dbUser) {
                return res.status(404).json({message: "user not found"});
            } else {
                // password hash
                if ( req.body.password != dbUser.password){
                    res.status(401).json({message: "invalid credentials"});
                }
                else {
                    const token = jwt.sign({ username: req.body.username }, 'secret', { expiresIn: '1h' });
                    res.status(200).json({message: "user logged in", "token": token});
                }

            };
        })
        .catch(err => {
            console.log('error', err);
        });
    }    
};


export const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    const nombre = req.get("username")
    /*try {
        const id = req.get("id")
        console.log("id",id)
    } catch (error) {
        console.log("error", error)
    }
    */
    //HACER GET CURSO POR CLASE DESDE 0
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
        res.status(401).json({ message: 'unauthorized' });
    } else {
        res.status(200).json({ message: 'here is your resource', nombre: nombre, id: user });
    };
};

export const getAllMesaDeExamenes = async (req , res) => {

    const connection = await connect();
    const [rows] = await connection.query("SELECT exa.id,mat.descripcion,mat.regimen,exa.llamado,exa.examinador1,exa.examinador2,exa.examinador3 FROM mesa_examen_novedad exa INNER JOIN materias mat ON exa.materia_id = mat.id");
    //console.log(res.json(rows))
    res.json(rows);
}

export const getAllCursos = async (req , res) => {

    const connection = await connect();
    const [rows] = await connection.query("SELECT c.id,a.descripcion,c.nivel,c.turno,c.grado_ano,c.division FROM cursos c INNER JOIN aulas a ON c.id = a.id");
    //console.log(res.json(rows))
    res.json(rows);
}


export const getAllAlumnosXCurso = async (req , res) => {
    //console.log("banckend recibe", req.params.id)
    const connection = await connect();
    const [rows] = await connection.query("SELECT a.id,d.nombre,d.apellido, a.curso_id FROM alumnos a INNER JOIN datos_personales d ON a.id = d.documento where a.curso_id = ?", [
        req.params.id,
    ]);
    res.json(rows);
}

export const sancionarAlumno = async (req , res) => {
    const connection = await connect()
    const [result] = await connection.query("INSERT INTO sanciones(alumno_id,docente_id,tipo_sancion,descripcion,fecha) VALUES(?,?,?,?,?)",[
        req.body.alumnoID,
        req.body.docenteID,
        req.body.tipoSancion,
        req.body.descripcion,
        req.body.fecha,
    ]);
    res.json({
        ...req.body,
        id: result.insertId
    })
}

export const inscripcionMesaExamen = async (req , res) => {
    const connection = await connect()
    const [result] = await connection.query("INSERT INTO alumno_mesa(alumno_id,mesa_id) VALUES(?,?)",[
        req.body.alumnoID,
        req.body.mesaID,
    ]);
    res.json({
        ...req.body,
        id: result.insertId
    })
}


export const getAllMaterias = async (req , res) => {

    const connection = await connect();
    const [rows] = await connection.query("SELECT id,descripcion,regimen,plan_estudio FROM materias");
    //console.log(res.json(rows))
    res.json(rows);
}

export const getClasesXMateria = async (req , res) => {
    //console.log("req.params", req.params.id)
    const connection = await connect();
    const [rows] = await connection.query("SELECT c.id,d.nombre,d.apellido,p.descripcion, a.descripcion,cur.nivel,cur.turno,cur.grado_ano,cur.division, c.dias, c.horario_inicio, c.horario_fin,c.curso_id FROM clases c INNER JOIN cursos cur ON c.curso_id = cur.id INNER JOIN aulas a ON a.id = cur.aula_id INNER JOIN docente doc ON c.docente_id = doc.id INNER JOIN datos_personales d ON doc.id = d.documento INNER JOIN periodos p ON c.periodo_id = p.id WHERE materia_id = ?",[
        req.params.id
    ])
    //
    //console.log("asd",res.json(rows))
    res.json(rows);
}

export const getIdAlumno = async (req , res) => {

    const connection = await connect();
    const [rows] = await connection.query("SELECT id FROM users WHERE username = ?",[
        req.params.nombre
    ])
    //console.log(res.json(rows))
    res.json(rows[0]);
}

export const saveNota = async (req , res) => {
    const connection = await connect()
    const [result] = await connection.query("INSERT INTO calificaciones(alumno_id,docente_id,materia_id,regimen,etapa,nota,descripcion) VALUES(?,?,?,?,?,?,?)",[
        req.body.alumnoID,
        req.body.docenteID,
        req.body.materiaID,
        req.body.regimen,
        req.body.etapa,
        req.body.nota,
        req.body.descripcion
    ]);
    res.json({
        ...req.body,
        id: result.insertId
    })
}

export const CursoPorClase = async (req , res) => {
    
    const connection = await connect();
    const [rows] = await connection.query("SELECT cur.id 'id curso',cur.grado_ano,cur.division,cur.turno,cur.nivel,a.descripcion FROM cursos cur INNER JOIN clases c ON cur.id =  c.curso_id INNER JOIN aulas a ON a.id = cur.aula_id WHERE cur.id = ?", [
        req.params.id,
    ]);
    await res.json(rows);
}