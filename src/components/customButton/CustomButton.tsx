import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { appImages } from '../../shared/theme/assets'
import { HP, WP } from '../../shared/theme/PixelResponsive'
import { appRadius, family, size } from '../../shared/theme/sizes'
import { colors } from '../../shared/theme/colors'

interface Props {
    title: string,
    onClick: () => void
}

const CustomButton: React.FC<Props> = ({ title, onClick }) => {
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => onClick()}
        >
            <ImageBackground source={appImages.ButtonBackground} style={styles.imgBackground} imageStyle={styles.imageRadius} >
                <Text style={styles.btnTxt}>{title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        height: HP(8),
        width: WP(90),
        borderRadius: appRadius.boxRadius,
        marginTop: HP(2),
        alignSelf: 'center',
    },
    imgBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageRadius: {
        borderRadius: appRadius.boxRadius
    },
    btnTxt: {
        color: colors.bg1,
        fontFamily: family.InterSemiBold,
        fontSize: size.xlarge
    }
})