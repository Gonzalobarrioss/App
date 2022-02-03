import { LOADING } from "../actions/LoadingAction";

const initialState = {
    loading: false
}


function LoadingReducer (state = initialState, action){
    switch (action.type) {
        case LOADING:
            return { ...state, loading: action.payload }
        default:
            return state
    }
}

export default LoadingReducer