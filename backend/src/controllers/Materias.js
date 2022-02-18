import { connect } from "../database-mysql.js"

export const getAllMateriasPorProfesor = async (req , res) => {
        const connection = await connect();
        const [rows] = await connection.query("SELECT DISTINCT mat.id,mat.descripcion,mat.regimen,mat.plan_estudio FROM materias mat INNER JOIN docente_materia doc ON mat.id = doc.materia_id AND doc.docente_id = ? WHERE mat.estado = 1",[
            req.params.id
        ]);
        res.json(rows);
        connection.destroy()   
}



export const getRegimenPorMateria = async (req , res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT regimen FROM materias WHERE id = ?",[
        req.params.id
    ])
    res.json(rows);
    connection.destroy()
}