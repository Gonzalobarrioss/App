import { RENDER, DATOS_VALIDOS } from "../actions/RenderAction";

const initialState = {
    render: false,
    datosValidos: true
}


function RenderReducer (state = initialState, action){
    switch (action.type) {
        case RENDER:
            return { ...state, render: action.payload }
        case DATOS_VALIDOS:
            return { ...state, datosValidos: action.payload }
        default:
            return state
    }
}

export default RenderReducer