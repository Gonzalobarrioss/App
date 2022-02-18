import { connect } from "../database-mysql.js"

export const addNota = async (req , res) => {
    const connection = await connect()
    const [result] = await connection.query("INSERT INTO calificaciones(alumno_id,docente_id,materia_id,regimen,etapa,nota,descripcion,fecha,curso_id) VALUES(?,?,?,?,?,?,?,?,?)",[
        req.body.alumnoID,
        req.body.docenteID,
        req.body.materiaID,
        req.body.regimen,
        req.body.etapa,
        req.body.nota,
        req.body.descripcion,
        req.body.fecha,
        req.body.curso
    ]);
    res.json({
        ...req.body,
        id: result.insertId
    })
    connection.destroy()
}

export const getDescripcionNota = async(req,res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT DISTINCT descripcion,fecha FROM calificaciones WHERE docente_id = ? and materia_id = ? and etapa = ? and curso_id = ?", [
        req.params.docente,
        req.params.materia,
        req.params.etapa,
        req.params.curso
    ]);
    res.json(rows);
    connection.destroy()
}


export const getNotas = async(req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT c.id,da.nombre,da.apellido, c.nota, c.descripcion FROM calificaciones c INNER JOIN datos_personales da ON c.alumno_id = da.documento WHERE c.descripcion = ? and c.fecha = ? and c.curso_id = ?", [
        req.params.descripcion,
        req.params.fecha,
        req.params.curso
    ]);
    res.json(rows);
    connection.destroy()
}