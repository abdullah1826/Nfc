import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack/AuthStack';
import HomeStack from './HomeStack/HomeStack';

const AppStack = createStackNavigator();

const MainNavigation = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator initialRouteName='AuthStack' screenOptions={{ headerShown: false }}>
                <AppStack.Screen name='AuthStack' component={AuthStack} />
                <AppStack.Screen name='HomeStack' component={HomeStack} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigation