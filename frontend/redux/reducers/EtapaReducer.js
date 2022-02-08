import { SET_ETAPA } from "../actions/EtapaAction";

const initialState = {
    etapa: ""
}


function EtapaReducer (state = initialState, action){
    switch (action.type) {
        case SET_ETAPA:
            return { ...state, etapa: action.payload }
        default:
            return state
    }
}

export default EtapaReducer