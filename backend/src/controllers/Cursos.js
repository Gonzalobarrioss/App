import { connect } from "../database-mysql.js"

export const getAllCursos = async (req , res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT c.id,a.descripcion,c.nivel,c.turno,c.grado_ano,c.division FROM cursos c INNER JOIN aulas a ON c.aula_id = a.id WHERE c.estado = 1");
    res.json(rows);
}

export const getAllAlumnosPorCurso = async (req , res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT a.id,d.nombre,d.apellido, a.curso_id FROM alumnos a INNER JOIN datos_personales d ON a.id = d.documento where a.curso_id = ?", [
        req.params.id,
    ]);
    res.json(rows);
}