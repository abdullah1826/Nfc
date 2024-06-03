import { View, Text, FlatList } from 'react-native'
import React from 'react'
import style from './style'
import ScreenHeader from '../../../components/screenHeader/ScreenHeader'
import SettingScreenCard from '../../../components/settingScreenCard/SettingScreenCard'
import { appIcons } from '../../../shared/theme/assets'
import { HP } from '../../../shared/theme/PixelResponsive'



const Setting = ({ navigation }: any) => {

    const settingScreenData = [
        {
            key: 1,
            label: 'Rate this app',
            icon: appIcons.Rate,
            onClick: () => { }
        },
        {
            key: 2,
            label: 'Contact Us',
            icon: appIcons.ContactUs,
            onClick: () => { }
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
            onClick: () => { }
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