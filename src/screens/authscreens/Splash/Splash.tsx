import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import style from './style'
import { applogos } from '../../../shared/theme/assets'
import { useNavigation } from '@react-navigation/native'

const Splash = ({ navigation }: any) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login')
        }, 2000);
    }, [])

    return (
        <View style={style.rootConatiner}>
            <Image source={applogos.logo} style={style.logo} />
        </View>

    )
}

export default Splash

const styles = StyleSheet.create({

})