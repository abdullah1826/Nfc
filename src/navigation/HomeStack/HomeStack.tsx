import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../../screens/MainScreens/HomeScreen'
import WriteTag from '../../screens/MainScreens/writeTagScreen';
import RecentRecordsScreen from '../../screens/MainScreens/recentRecordsScreen';
import Setting from '../../screens/MainScreens/settingScreen';
import QRCodeScreen from '../../screens/MainScreens/qrCodeScreen';
import SocailLinksScreen from '../../screens/MainScreens/socialLinksScreen';
import PrivacyPolicyScreen from '../../screens/MainScreens/settingScreen/privacyPolicyScreen';
import HelpAndSupportScreen from '../../screens/MainScreens/settingScreen/helpAndSupportScreen';
import About from '../../screens/MainScreens/settingScreen/aboutScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='WriteTag' component={WriteTag} />
            <Stack.Screen name='QRCodeScreen' component={QRCodeScreen} />
            <Stack.Screen name='SocailLinksScreen' component={SocailLinksScreen} />
            <Stack.Screen name='RecentRecordsScreen' component={RecentRecordsScreen} />
            <Stack.Screen name='Setting' component={Setting} />
            <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicyScreen} />
            <Stack.Screen name='HelpAndSupport' component={HelpAndSupportScreen} />
            <Stack.Screen name='About' component={About} />

        </Stack.Navigator>
    )
}

export default HomeStack