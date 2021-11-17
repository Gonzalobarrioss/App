import { RESET_ASISTENCIA, SET_ASISTENCIA_ALUMNO } from "../actions/AsistenciaAction"
import alumnosCursoReducer from "./AlumnoCursoReducer";

const initialState = {
  alumno: []
}


function AsistenciaReducer(state = initialState, action) {
    //console.log("action",action.payload)
    switch (action.type) {
        case RESET_ASISTENCIA:
          console.log("Reset")
            return {state, alumno: {}}
        case SET_ASISTENCIA_ALUMNO:
          console.log("asistencia")
          return {...state, alumno: [...state.alumno, action.payload]}
        default:
            return state;
    }
}
  
  export default AsistenciaReducer;