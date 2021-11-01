
const API = "http://192.168.0.13:3000"

export const getMesaExamen = async () => {
    const res = await fetch(`${API}/mesa_examenes`);
    return await res.json();
}/*
export const getRutasLecturista = async (lecturistaId) => {
    const res = await fetch(API);
    return await res.json();
}
/*
export const saveTask = async (newTask) => {
    const res = await fetch(API, { 
        method: 'POST', 
        headers: {
            Accept: 'application/json', 'Content-Type':'application/json'
        },
        body: JSON.stringify(newTask)
    })
    return await res.json();
}*/