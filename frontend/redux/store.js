import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import alumnosCursoReducer from './reducers/AlumnoCursoReducer';
import PersonaReducer from './reducers/PersonaReducer';
import MateriasReducer from './reducers/MateriaReducer';
import ClasesReducer from './reducers/ClaseReducer';
import CursosReducer from './reducers/CursoReducer';
import AsistenciaReducer from './reducers/AsistenciaReducer';
import GuardarCalificacionReducer from './reducers/GuardarCalificacionReducer';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    //whitelist: ['curso']
  };

const rootReducer = combineReducers({ 
    alumnosCursoReducer: persistReducer(persistConfig, alumnosCursoReducer),
    PersonaReducer,
    MateriasReducer,
    ClasesReducer,
    CursosReducer,
    AsistenciaReducer,
    GuardarCalificacionReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
