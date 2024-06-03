// import React, { useState } from 'react';
// import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
// import Header from './src/components/Header';
// import AddItem, { IItem } from './src/components/AddItem'; /* import AddItem and interface*/
// const App = () => {
//   const [shoppingList, setShoppingList] = useState<IItem[]>([]); // set the type of what the hook expects to be an array of IItems.

//   console.log('shoppingList =>>>>>>>>>>>>>>>>>>>>>.', shoppingList);
//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Shopping List" />
//       <View style={styles.contentWrapper}>
//         <AddItem
//           setShoppingList={setShoppingList}
//           shoppingList={shoppingList}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#9e9e9e',
//   },
//   contentWrapper: {
//     padding: 20,
//   },
// });
// export default App;

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainNavigation from './src/navigation'
import { Provider } from 'react-redux'
import { persistor, store } from './src/redux/store'
import { PersistGate } from 'redux-persist/es/integration/react'

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

const styles = StyleSheet.create({})