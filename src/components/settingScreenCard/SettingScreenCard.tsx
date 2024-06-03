import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { HP, WP } from '../../shared/theme/PixelResponsive'
import { colors } from '../../shared/theme/colors'
import { appRadius, family, size } from '../../shared/theme/sizes'
import { appIcons } from '../../shared/theme/assets'

interface Props {
    icon: any,
    label: string,
    marginBottom: number,
    onClick: () => void
}

const SettingScreenCard: React.FC<Props> = ({ icon, label, marginBottom, onClick }) => {
    return (
        <TouchableOpacity style={[styles.container, { marginBottom: marginBottom }]}
            onPress={() => onClick()}
        >
            <Image source={icon} style={styles.icon} />
            <Text style={styles.txt}>{label}</Text>
        </TouchableOpacity>
    )
}

export default SettingScreenCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: WP(85),
        height: HP(10),
        backgroundColor: colors.bg1,
        shadowColor: colors.b1,
        elevation: 6,
        alignSelf: 'center',
        marginTop: HP(2),
        borderRadius: appRadius.boxRadius,
        alignItems: 'center'
    },
    icon: {
        width: WP(9),
        height: HP(4.2),
        marginLeft: WP(8)
    },
    txt: {
        color: colors.b1,
        fontSize: size.normal,
        fontFamily: family.InterSemiBold,
        marginLeft: WP(4)
    }
})