import { View, Text, FlatList,Linking } from 'react-native'
import React from 'react'
import style from './style'
import ScreenHeader from '../../../components/screenHeader/ScreenHeader'
import SettingScreenCard from '../../../components/settingScreenCard/SettingScreenCard'
import { appIcons } from '../../../shared/theme/assets'
import { HP } from '../../../shared/theme/PixelResponsive'
import { UseDispatch, useDispatch } from 'react-redux'
import { signOut } from '../../../redux/Slices/UserSlice'


const Setting = ({ navigation }: any) => {

    // redux staff
    const dispatch=useDispatch()

    const openPlayStoreForRating = () => {
        // Replace 'your-app-package-name' with the actual package name of your app
        const appPackageName = 'your-app-package-name';
        // Replace 'market://' with 'http://' if you want to open in the browser instead of the Play Store app
        const playStoreUrl = `market://details?id=${appPackageName}`;
        Linking.openURL(playStoreUrl).catch((err) => console.error('An error occurred', err));
    };


    const settingScreenData = [
        {
            key: 1,
            label: 'Rate this app',
            icon: appIcons.Rate,
            onClick: () => { navigation.navigate('Rating')}
        },
        {
            key: 2,
            label: 'Contact Us',
            icon: appIcons.ContactUs,
            onClick: () => { navigation.navigate('ContactUs')}
        },
        {
            key: 3,
            label: 'Privacy Policy',
            icon: appIcons.PrivacyPolicy,
            onClick: () => { navigation.navigate('PrivacyPolicy') }
        },
        {
            key: 4,
            label: 'Share this app',
            icon: appIcons.Share,
            onClick: () => { }
        },
        {
            key: 5,
            label: 'Help & Support',
            icon: appIcons.Support,
            onClick: () => { navigation.navigate('HelpAndSupport') }
        },
        {
            key: 6,
            label: 'About',
            icon: appIcons.About,
            onClick: () => { navigation.navigate('About') }
        },
        {
            key: 7,
            label: 'Delete Account',
            icon: appIcons.DeleteAccount,
            onClick: () => { }
        },
        {
            key: 8,
            label: 'Logout',
            icon: appIcons.Logout,
            onClick: () => { 
                dispatch(signOut())
                navigation.replace('AuthStack', { Screen: 'Login' });
            }
        },
    ];

    return (
        <View style={style.container}>
            <ScreenHeader
                heading={'Settings'}
                onClick={() => navigation.goBack()}
            />
            <View style={{ marginTop: HP(3) }}>
                <FlatList
                    data={settingScreenData}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ marginBottom: HP(10) }}
                    keyExtractor={(item) => item.key.toString()}
                    renderItem={({ item, index }) => (
                        <SettingScreenCard
                            icon={item.icon}
                            label={item.label}
                            marginBottom={settingScreenData.length - 1 == index ? HP(6) : HP(0)}
                            onClick={item.onClick}
                        />
                    )}
                />
                <Text style={style.versionTxt}>Build Version 1.1.930.2024</Text>
            </View>



        </View>
    )
}

export default Setting