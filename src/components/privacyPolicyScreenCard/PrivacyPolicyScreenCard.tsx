import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HP, WP } from '../../shared/theme/PixelResponsive'
import { appRadius, family, size } from '../../shared/theme/sizes'
import { colors } from '../../shared/theme/colors'
import { appIcons } from '../../shared/theme/assets'

interface Props {
    icon: any,
    title: string,
    desc: string
}

const PrivacyPolicyScreenCard: React.FC<Props> = ({ icon, title, desc }) => {
    return (
        <View style={styles.container}>
            <Image source={icon} style={styles.icon} />

            <View style={styles.detailBox}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.desc}>{desc}</Text>
            </View>

        </View>
    )
}

export default PrivacyPolicyScreenCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: WP(90),
        height: HP(25),
        backgroundColor: colors.bg1,
        borderRadius: appRadius.boxRadius + 5,
        shadowColor: colors.b1,
        elevation: 5,
        alignSelf: 'center',
        marginTop: HP(2)
    },
    icon: {
        width: WP(8.5),
        height: HP(4),
        marginTop: HP(4),
        marginLeft: WP(6)
    },
    detailBox: {
        marginLeft: WP(3)
    },
    title: {
        color: colors.b1,
        fontSize: size.normal,
        fontFamily: family.InterSemiBold,
        marginTop: HP(3.7),

    },
    desc: {
        color: colors.b1,
        fontSize: size.xxtiny,
        width: WP(68)
    }
})