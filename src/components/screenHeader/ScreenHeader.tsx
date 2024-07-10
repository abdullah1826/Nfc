import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { appIcons } from '../../shared/theme/assets'
import { HP, WP } from '../../shared/theme/PixelResponsive'
import { colors } from '../../shared/theme/colors'
import { family, size } from '../../shared/theme/sizes'
import { Platform } from 'react-native'

interface Props {
    heading: string,
    onClick: () => void
}

const ScreenHeader: React.FC<Props> = ({ heading, onClick }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { onClick() }}>
                <Image source={appIcons.Back} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.txt}>{heading}</Text>
            <Text> </Text>
        </View>
    )
}

export default ScreenHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:Platform.OS==="android"? WP("4"):WP("2")
    },
    icon: {
        height: HP(3),
        width: WP(3.3),
        resizeMode:"contain",
    },
    txt: {
        color: colors.b1,
        fontSize: size.small,
        fontFamily: family.InterSemiBold
    }
})