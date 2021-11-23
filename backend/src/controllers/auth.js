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
            return res.status(409).json({message: "El usuario ya existe"});
        } else if (req.body.username && req.body.password && req.body.id) {
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
                        res.status(200).json({message: "Usuario creado"});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({message: "El id de usuario ya existe"});
                    });
               /* };
            });*/
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

export const login = (req, res, next) => {
    if ( req.body.rol == 'Alumno'){
        User.findOne({ where : {
            username: req.body.username,
            rol: 'Alumno'
        }})
        .then(dbUser => {
            try {
                user = dbUser.dataValues.id
 
            } catch (error) {
                console.log(error)
            } 
            if (!dbUser) {
                return res.status(404).json({message: "Usiario no encontrado"});
            } else {
                // password hash
                if ( req.body.password != dbUser.password){
                    res.status(401).json({message: "Datos incorrectos"});
                }
                else {
                    const token = jwt.sign({ username: req.body.username }, 'secret', { expiresIn: '1h' });
                    res.status(200).json({message: "Usuario logueado", "token": token});
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

            } catch (error) {
                console.log(error)
            } 

            if (!dbUser) {
                return res.status(404).json({message: "Usuario no encontrado"});
            } else {
                // password hash
                if ( req.body.password != dbUser.password){
                    res.status(401).json({message: "Datos incorrectos"});
                }
                else {
                    const token = jwt.sign({ username: req.body.username }, 'secret', { expiresIn: '1h' });
                    res.status(200).json({message: "Usuario logueado", "token": token});
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
        res.status(200).json({ message: 'Ingresando...', nombre: nombre, id: user });
    };
};

export const getAllMesaDeExamenes = async (req , res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT exa.id,examae.descripcion,mat.descripcion as materia,mat.regimen,exa.fecha,exa.llamado,exa.examinador1,exa.examinador2,exa.examinador3 FROM mesa_examen_novedad exa LEFT JOIN alumno_mesa alume ON exa.id = alume.mesa_id INNER JOIN materias mat ON exa.materia_id = mat.id INNER JOIN mesa_examen_maestro examae ON examae.id = exa.maestro_id WHERE exa.id NOT IN (SELECT mesa_id FROM alumno_mesa WHERE alumno_id = ?) AND examae.estado = 1",[
        req.params.id
    ]);
    res.json(rows);
}

export const getAllMesaDeExamenesInscriptas = async (req , res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT exa.id,examae.descripcion,mat.descripcion as materia,mat.regimen,exa.fecha,exa.llamado,exa.examinador1,exa.examinador2,exa.examinador3 FROM alumno_mesa alume INNER JOIN mesa_examen_novedad exa ON alume.mesa_id = exa.id INNER JOIN mesa_examen_maestro examae ON examae.id = exa.maestro_id INNER JOIN materias mat ON exa.materia_id = mat.id WHERE alume.alumno_id = ?",[
        req.params.id
    ]);
    res.json(rows);
}

export const getAllCursos = async (req , res) => {

    const connection = await connect();
    const [rows] = await connection.query("SELECT c.id,a.descripcion,c.nivel,c.turno,c.grado_ano,c.division FROM cursos c INNER JOIN aulas a ON c.aula_id = a.id");
    res.json(rows);
}


export const getAllAlumnosXCurso = async (req , res) => {
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
    res.json(rows);
}

export const getClasesXMateria = async (req , res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT c.id,d.nombre,d.apellido,p.descripcion, a.descripcion,cur.nivel,cur.turno,cur.grado_ano,cur.division, c.dias, c.horario_inicio, c.horario_fin,c.curso_id FROM clases c INNER JOIN cursos cur ON c.curso_id = cur.id INNER JOIN aulas a ON a.id = cur.aula_id INNER JOIN docentes doc ON c.docente_id = doc.id INNER JOIN datos_personales d ON doc.id = d.documento INNER JOIN periodos p ON c.periodo_id = p.id WHERE materia_id = ?",[
        req.params.id
    ])
    res.json(rows);
}

export const getRegimenXMateria = async (req , res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT regimen FROM materias WHERE id = ?",[
        req.params.id
    ])
    res.json(rows);
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

export const saveAsistencia = async (req , res) => {
    const connection = await connect()
    const [result] = await connection.query("INSERT INTO asistencias(alumno_id,clase_id,estado) VALUES(?,?,?)",[
        req.body.alumnoID,
        req.body.claseID,
        req.body.estado
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