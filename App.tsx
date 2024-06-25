
import {LogBox} from 'react-native'
import React, { useEffect } from 'react'
import MainNavigation from './src/navigation'
import { Provider } from 'react-redux'
import { persistor, store } from './src/redux/store'
import { PersistGate } from 'redux-persist/es/integration/react'
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/shared/utilities/Helper'
import { initialConfig } from './src/exporter'
LogBox.ignoreAllLogs()
const App = () => {
useEffect(()=>{
  initialConfig()
},[])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainNavigation />
        <Toast config={toastConfig} ref={(ref:any) => Toast.setRef(ref)} />
      </PersistGate>
    </Provider>
  )
}

export default App
