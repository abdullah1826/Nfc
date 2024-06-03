import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import style from './style'
import ScreenHeader from '../../../components/screenHeader/ScreenHeader'
import { appIcons } from '../../../shared/theme/assets'

const QRCodeScreen = ({ navigation }: any) => {
    return (
        <View style={style.container}>
            <ScreenHeader
                heading={'Scan QR'}
                onClick={() => navigation.goBack()}
            />
            <View style={style.scanQRBox}>

            </View>

            <View style={style.footerContainer}>
                <TouchableOpacity>
                    <Image source={appIcons.SelectImage} style={style.imagePicker} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image source={appIcons.QrClick} style={style.ClickQrIcon} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image source={appIcons.Flash} style={style.flashIcon} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default QRCodeScreen

const styles = StyleSheet.create({})