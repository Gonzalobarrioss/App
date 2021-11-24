import { connect } from "../database-mysql.js"

export const addNota = async (req , res) => {
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