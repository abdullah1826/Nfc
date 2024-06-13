
import {LogBox} from 'react-native'
import React from 'react'
import MainNavigation from './src/navigation'
import { Provider } from 'react-redux'
import { persistor, store } from './src/redux/store'
import { PersistGate } from 'redux-persist/es/integration/react'

LogBox.ignoreAllLogs()
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainNavigation />
      </PersistGate>
    </Provider>
  )
}

export default App
