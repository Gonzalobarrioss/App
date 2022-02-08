import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import alumnosCursoReducer from './reducers/AlumnoCursoReducer';
import PersonaReducer from './reducers/PersonaReducer';
import MateriasReducer from './reducers/MateriaReducer';
import ClasesReducer from './reducers/ClaseReducer';
import LoadingReducer from './reducers/LoadingReducer';
import AsistenciasReducer from './reducers/AsistenciasReducer'
import EtapaReducer from './reducers/EtapaReducer'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

const rootReducer = combineReducers({ 
    alumnosCursoReducer: persistReducer(persistConfig, alumnosCursoReducer),
    PersonaReducer,
    MateriasReducer,
    ClasesReducer,
    LoadingReducer,
    AsistenciasReducer,
    EtapaReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
