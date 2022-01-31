import { connect } from "../database-mysql.js"

export const getAllMesaDeExamenes = async (req , res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT DISTINCT exa.id,examae.descripcion,mat.descripcion as materia,mat.regimen,exa.fecha,exa.llamado,exa.examinador1,exa.examinador2,exa.examinador3 FROM mesa_examen_novedad exa LEFT JOIN alumno_mesa alume ON exa.id = alume.mesa_id INNER JOIN materias mat ON exa.materia_id = mat.id INNER JOIN mesa_examen_maestro examae ON examae.id = exa.maestro_id INNER JOIN alumno_materia aluma ON exa.materia_id = aluma.materia_id WHERE exa.id NOT IN (SELECT mesa_id FROM alumno_mesa WHERE alumno_id = ?) AND examae.estado = 1 ORDER BY exa.id",[
        req.params.id
    ]);
    res.json(rows);
    connection.destroy()
}

export const getAllMesaDeExamenesInscriptas = async (req , res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT DISTINCT exa.id,examae.descripcion,mat.descripcion as materia,mat.regimen,exa.fecha,exa.llamado,exa.examinador1,exa.examinador2,exa.examinador3 FROM alumno_mesa alume INNER JOIN mesa_examen_novedad exa ON alume.mesa_id = exa.id INNER JOIN mesa_examen_maestro examae ON examae.id = exa.maestro_id INNER JOIN materias mat ON exa.materia_id = mat.id WHERE alume.alumno_id = ?",[
        req.params.id
    ]);
    res.json(rows);
    connection.destroy()
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
    connection.destroy()
}

export const bajaMesaExamen = async (req , res) => {
    //console.log("hola")
    const connection = await connect()
    await connection.query("DELETE FROM alumno_mesa WHERE alumno_id = ? and mesa_id = ?",[
        req.body.alumnoID,
        req.body.mesaID
    ]);
    res.sendStatus(204)
    connection.destroy()
}