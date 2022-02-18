import { SET_ETAPA, SET_DESCRIPCION, SET_FECHA } from "../actions/CalificacionesAction";

const initialState = {
    etapa: "",
    descripcion: "",
    fecha: ""
}


function CalificacionesReducer (state = initialState, action){
    switch (action.type) {
        case SET_ETAPA:
            return { ...state, etapa: action.payload }
        case SET_DESCRIPCION:
            return { ...state, descripcion: action.payload }
        case SET_FECHA:
            return { ...state, fecha: action.payload }
        default:
            return state
    }
}

export default CalificacionesReducer