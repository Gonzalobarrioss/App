import { SET_ESTADO, SET_ID_ALUMNO, SET_LISTA_ALUMNOS } from "../actions/AsistenciaAction"

const initialState = {
    alumno:[{
      estado: "Presente",
        id: 2,
        nombre:"Joseph"
    }],
};

function AsistenciaReducer(state = initialState, action) {
    //console.log("action",action.payload)
    switch (action.type) {
        case SET_ESTADO:
           return {...state, estado: [...state.estado, action.payload]}
        case SET_ID_ALUMNO:
            return {...state, alumno: [...state.alumno.id, action.payload]}
        case SET_LISTA_ALUMNOS:
           // return { 
            const test = state.alumno.filter(alu => {
                //console.log("alumno", alu)
                if(alu.id === action.payload.id){
                  console.log("action", action.payload)
                  return {...state, alumno: [state.alumno.estado,action.payload.estado] }
                }

            })
           // return {...state, alumno : [...state.alumno, action.payload]}
           //console.log("test", test)
            return test
        default:
            return state;
    }
}
  
  export default AsistenciaReducer;