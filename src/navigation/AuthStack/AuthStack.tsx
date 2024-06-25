import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Splash from '../../screens/authscreens/Splash/Splash';
import Login from '../../screens/authscreens/Login';
import Signup from '../../screens/authscreens/Signup';
import resetPassword from '../../screens/authscreens/resetPassword/resetPassword';
import newPassword from '../../screens/authscreens/newPaawordScreen/newPassword';
import otppassword from '../../screens/authscreens/otpPasswordScreen/otppassword';
const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Splash' component={Splash} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Signup' component={Signup} />
            <Stack.Screen name='resetPassword' component={resetPassword} />
            <Stack.Screen name='otppassword' component={otppassword} />
            <Stack.Screen name='newPassword' component={newPassword} />
        </Stack.Navigator>
    )
}

export default AuthStack