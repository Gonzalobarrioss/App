import express from 'express';

import { register, login, isAuth } from '../controllers/Autenticacion.js'
import { bajaMesaExamen, getAllMesaDeExamenes,getAllMesaDeExamenesInscriptas, inscripcionMesaExamen } from '../controllers/MesaDeExamenes.js'
import { getAllCursos, getAllAlumnosPorCurso } from '../controllers/Cursos.js'
import { getAllMateriasPorProfesor, getRegimenPorMateria } from '../controllers/Materias.js'
import { addSancion } from '../controllers/Sanciones.js'
import { addNota } from '../controllers/Calificaciones.js'
import { addAsistencia, getAsistencias } from '../controllers/Asistencias.js'
import { getClasesPorMateria } from '../controllers/Clases.js';


const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.get('/private', isAuth);

router.get('/mesa_examenes/:id', getAllMesaDeExamenes)

router.get('/mesa_examenes_inscriptas/:id', getAllMesaDeExamenesInscriptas)

router.post('/inscripcion_mesa', inscripcionMesaExamen)

router.delete('/baja_mesa', bajaMesaExamen)

router.get('/cursos', getAllCursos)

router.get('/alu_cursos/:id', getAllAlumnosPorCurso)

router.get('/materias/:id', getAllMateriasPorProfesor)

router.get('/clase_materia/:id', getClasesPorMateria)

router.get('/regimen_materia/:id', getRegimenPorMateria)

router.post('/sancion', addSancion)

router.post('/guardar_nota', addNota)

router.post('/guardar_asistencia', addAsistencia)

router.get('/asistencias/:id/:fecha', getAsistencias)

router.get('/', (req, res, next) => {
    res.status(404).json({error : "page not founds"});
});

router.all('*', (req, res) => {
    res.status(404).json({error:'Endpoint Not Found' })
});
export default router;