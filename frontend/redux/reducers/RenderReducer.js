import { RENDER } from "../actions/RenderAction";

const initialState = {
    render: false
}


function RenderReducer (state = initialState, action){
    switch (action.type) {
        case RENDER:
            return { ...state, render: action.payload }
        default:
            return state
    }
}

export default RenderReducer