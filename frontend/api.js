
const API = "http://192.168.0.127:3000"

export const getMesaExamen = async () => {
    const res = await fetch(`${API}/mesa_examenes`);
    return await res.json();
}
export const getIdAlumno = async (nombreAlumno) => {
    const res = await fetch(`${API}/id_alumno/${nombreAlumno}`);
    return await res.json();
}

export const saveNota = async (newNota) => {
    const res = await fetch(`${API}/guardar_nota`, { 
        method: 'POST', 
        headers: {
            Accept: 'application/json', 'Content-Type':'application/json'
        },
        body: JSON.stringify(newNota)
    })
    return await res.json();
}

export const getAllMaterias = async () => {
    const res = await fetch(`${API}/materias`);
    return await res.json();
}

export const getAllCursos = async () => {
    const res = await fetch(`${API}/cursos`);
    return await res.json();
}

export const inscripcionMesaExamen = async (newAlumno) => {
    const res = await fetch(`${API}/inscripcion_mesa`, { 
        method: 'POST', 
        headers: {
            Accept: 'application/json', 'Content-Type':'application/json'
        },
        body: JSON.stringify(newAlumno)
    })
    return await res.json();
}

export const getAlumnosXCurso = async (curso) => {
    const res = await fetch(`${API}/alu_cursos/${curso}`);
    return await res.json();
}

export const getClaseXMateria = async (materia) => {
    const res = await fetch(`${API}/clase_materia/${materia}`);
    //console.log(res.json())
    return await res.json();
}

export const sancionarAlumno = async (newSancion) => {
    const res = await fetch(`${API}/sancion`, { 
        method: 'POST', 
        headers: {
            Accept: 'application/json', 'Content-Type':'application/json'
        },
        body: JSON.stringify(newSancion)
    })
    return await res.json();
}

export const getCursoPorClase = async (clase) => {
    const res = await fetch(`${API}/curso_clase/${clase}`);
    //console.log(res.json())
    return await res.json();
}