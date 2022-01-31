import {API} from "./constants";
/*
export const login = async (data) => {
    const res = await fetch(`${API}/login`, { 
        method: 'POST', 
        headers: {
            Accept: 'application/json', 'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    return res.json();
}

export const register = async (data) => {
    const res = await fetch(`${API}/register`, { 
        method: 'POST', 
        headers: {
            Accept: 'application/json', 'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    return res.json();
}*/

export const getMesaExamen = async (id) => {
    const res = await fetch(`${API}/mesa_examenes/${id}`);
    return res.json();
}

export const getMesaExamenInscriptas = async (id) => {
    const res = await fetch(`${API}/mesa_examenes_inscriptas/${id}`);
    return res.json();
}

export const inscripcionMesaExamen = async (Alumno) => {
    const res = await fetch(`${API}/inscripcion_mesa`, { 
        method: 'POST', 
        headers: {
            Accept: 'application/json', 'Content-Type':'application/json'
        },
        body: JSON.stringify(Alumno)
    })
    return res.json();
}

export const bajaMesaExamen = async (Alumno) => {
    const res = await fetch(`${API}/baja_mesa`, { 
        method: 'DELETE', 
        headers: {
            Accept: 'application/json', 'Content-Type':'application/json'
        },
        body: JSON.stringify(Alumno)
    })
    //console.log(res.json())
    return res
}

export const getAllCursos = async () => {
    const res = await fetch(`${API}/cursos`);
    return res.json();
}

export const getAlumnosXCurso = async (curso) => {
    const res = await fetch(`${API}/alu_cursos/${curso}`);
    return res.json();
}

export const getAllMateriasPorProfesor = async (id) => {
    const res = await fetch(`${API}/materias/${id}`);
    return res.json();
}

export const getClaseXMateria = async (materia) => {
    const res = await fetch(`${API}/clase_materia/${materia}`);
    return res.json();
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

export const saveAsistencia = async (newAsistencia) => {
    const res = await fetch(`${API}/guardar_asistencia`, { 
        method: 'POST', 
        headers: {
            Accept: 'application/json', 'Content-Type':'application/json'
        },
        body: JSON.stringify(newAsistencia)
    })
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

export const getAsistencias = async (datos) => {
    const res = await fetch(`${API}/asistencias/${datos.claseId}/${datos.fecha}`);
    return res.json();
}