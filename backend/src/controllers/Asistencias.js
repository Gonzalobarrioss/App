import { connect } from "../database-mysql.js"

export const addAsistencia = async (req , res) => {
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