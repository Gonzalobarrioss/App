import express from 'express';

import { register, login, isAuth } from '../controllers/Autenticacion.js'
import { getAllMesaDeExamenes,getAllMesaDeExamenesInscriptas, inscripcionMesaExamen } from '../controllers/MesaDeExamenes.js'
import { getAllCursos, getAllAlumnosPorCurso } from '../controllers/Cursos.js'
import { getAllMaterias, getClasesPorMateria, getRegimenPorMateria } from '../controllers/Materias.js'
import { addSancion } from '../controllers/Sanciones.js'
import { addNota } from '../controllers/Calificaciones.js'
import { addAsistencia } from '../controllers/Asistencias.js'

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.get('/private', isAuth);

router.get('/mesa_examenes/:id', getAllMesaDeExamenes)

router.get('/mesa_examenes_inscriptas/:id', getAllMesaDeExamenesInscriptas)

router.post('/inscripcion_mesa', inscripcionMesaExamen)

router.get('/cursos', getAllCursos)

router.get('/alu_cursos/:id', getAllAlumnosPorCurso)

router.get('/materias', getAllMaterias)

router.get('/clase_materia/:id', getClasesPorMateria)

router.get('/regimen_materia/:id', getRegimenPorMateria)

router.post('/sancion', addSancion)

router.post('/guardar_nota', addNota)

router.post('/guardar_asistencia', addAsistencia)

export default router;