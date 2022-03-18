import React from 'react';


import NavigationStack from "./navigation/NavigationStack"

import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';


const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <NavigationStack />
        
      </PersistGate>
    </Provider>

  );

};


export default App
