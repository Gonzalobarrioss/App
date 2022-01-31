import { connect } from "../database-mysql.js"

export const addAsistencia = async (req , res) => {
    const connection = await connect()
    const [result] = await connection.query("INSERT INTO asistencias(alumno_id,clase_id,fecha,estado) VALUES(?,?,?,?)",[
        req.body.alumnoID,
        req.body.claseID,
        req.body.fecha,
        req.body.estado
    ]);
    res.json({
        ...req.body,
        id: result.insertId
    })
    connection.destroy()
}

export const getAsistencias = async (req, res) => {
    //console.log("req", typeof(req.params.fecha))
    const connection = await connect();
    const [rows] = await connection.query(`SELECT a.id,a.estado,d.nombre nombre,d.apellido apellido FROM asistencias a inner join datos_personales d on a.alumno_id = d.documento WHERE clase_id = ? AND fecha = ? AND a.id_docente = ?`,[
        req.params.id,
        req.params.fecha,
        req.params.docente
    ]);
    res.json(rows);
    connection.destroy()
}