import { SET_ETAPA, SET_DESCRIPCION } from "../actions/CalificacionesAction";

const initialState = {
    etapa: "",
    descripcion: ""
}


function CalificacionesReducer (state = initialState, action){
    switch (action.type) {
        case SET_ETAPA:
            return { ...state, etapa: action.payload }
        case SET_DESCRIPCION:
            return { ...state, descripcion: action.payload }
        default:
            return state
    }
}

export default CalificacionesReducer