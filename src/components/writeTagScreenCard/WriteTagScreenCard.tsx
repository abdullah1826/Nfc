import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../shared/theme/colors'
import { HP, WP } from '../../shared/theme/PixelResponsive'
import { appRadius, size } from '../../shared/theme/sizes'

interface Props {
    icon: any,
    title: string,
    onClick: () => void
}

const WriteTagScreenCard: React.FC<Props> = ({ title, icon, onClick }) => {
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => onClick()}
        >
            <Image source={icon} style={styles.icon} />
            <Text style={styles.txt}>{title}</Text>
        </TouchableOpacity>
    )
}

export default WriteTagScreenCard

const styles = StyleSheet.create({
    container: {
        width: WP(37),
        height: HP(12),
        shadowColor: colors.b1,
        elevation: 5,
        backgroundColor: colors.bg1,
        marginTop: HP(4),
        borderRadius: appRadius.boxRadius,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: WP(6.8),
        height: HP(3.2),
        marginBottom: HP(.8)
    },
    txt: {
        color: colors.g21,
        fontSize: size.xxsmall
    }
})