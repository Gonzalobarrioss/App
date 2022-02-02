import {SET_ASISTENCIAS} from '../actions/AsistenciasAction'

const initialState = {
    asistencias: []
};

function AsistenciasReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ASISTENCIAS:
            return { ...state, asistencias: action.payload };
        default:
            return state;
    }
}

export default AsistenciasReducer;