import express from 'express';

import {    
    signup, 
    login, 
    isAuth, 
    getAllMesaDeExamenes, 
    getAllCursos, 
    getAllAlumnosXCurso, 
    sancionarAlumno, 
    inscripcionMesaExamen, 
    getAllMaterias, 
    getClasesXMateria, 
    saveNota, 
    getIdAlumno,
    CursoPorClase,
    getRegimenXMateria
} from '../controllers/auth.js';

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

router.get('/private', isAuth);

router.get('/mesa_examenes', getAllMesaDeExamenes)

router.get('/cursos', getAllCursos)

router.get('/alu_cursos/:id', getAllAlumnosXCurso)

router.post('/sancion', sancionarAlumno)

router.post('/inscripcion_mesa', inscripcionMesaExamen)

router.get('/materias', getAllMaterias)

router.get('/clase_materia/:id', getClasesXMateria)

router.post('/guardar_nota', saveNota)

router.get('/id_alumno/:nombre', getIdAlumno)

router.get('/curso_clase/:id', CursoPorClase)

router.get('/regimen_materia/:id', getRegimenXMateria)


router.get('/public', (req, res, next) => {
    res.status(200).json({ message: "here is your public resource" });
});

// will match any other path
router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});

export default router;