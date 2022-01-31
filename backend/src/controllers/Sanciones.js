import { connect } from "../database-mysql.js"

export const addSancion = async (req , res) => {
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
    connection.destroy()
}