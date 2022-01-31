import { connect } from "../database-mysql.js"

export const getClasesPorMateria = async (req , res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT c.id,d.nombre,d.apellido,p.descripcion, a.descripcion,cur.nivel,cur.turno,cur.grado_ano,cur.division, c.dias, c.horario_inicio, c.horario_fin,c.curso_id FROM clases c INNER JOIN cursos cur ON c.curso_id = cur.id INNER JOIN aulas a ON a.id = cur.aula_id INNER JOIN docentes doc ON c.docente_id = doc.id INNER JOIN datos_personales d ON doc.id = d.documento INNER JOIN periodos p ON c.periodo_id = p.id WHERE materia_id = ? AND c.estado = 1",[
        req.params.id
    ])
    res.json(rows);   
    connection.destroy() 
}