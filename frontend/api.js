const API = "http://192.168.1.122:3000/routes"

export const getRutasLecturista = async (lecturistaEmail) => {
    const res = await fetch(`${API}/${lecturistaEmail}`);
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