import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { HP, WP } from '../../shared/theme/PixelResponsive'
import { appRadius, family, size } from '../../shared/theme/sizes'
import { colors } from '../../shared/theme/colors'
import { appIcons } from '../../exporter'


interface props {
    Icon: any,
    title: string,
    Desc: string,
    deletepress?:()=>void,
    editpress?:()=>void,
}

const RecentRecordsScreenCard: React.FC<props> = ({ Icon, title, Desc,deletepress,editpress }) => {
    return (
        <View style={styles.container}>
            <Image source={Icon} style={styles.cardIcon} />
            <View style={styles.innerContainer}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDesc}>{Desc}</Text>
            </View>
            <TouchableOpacity
            onPress={editpress}
            >
                <Image source={appIcons.Edit} style={[styles.icon, { marginLeft: WP(.5) }]} />
            </TouchableOpacity>

            <TouchableOpacity
            onPress={deletepress}
            >
                <Image source={appIcons.Delete} style={styles.icon} />
            </TouchableOpacity>
        </View>
    )
}

export default RecentRecordsScreenCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: appRadius.boxRadius,
        backgroundColor: colors.bg1,
        elevation: 10,
        shadowColor: colors.b1,
        height: HP(12),
        alignItems: 'center',
        marginTop: HP(2),
    },
    cardIcon: {
        height: HP(6.5),
        width: WP(14),
        marginLeft: WP(8)
    },
    cardTitle: {
        color: colors.b1,
        fontFamily: family.InterBold,
        fontSize: size.small
    },
    cardDesc: {
        color: colors.b1,
        fontSize: size.tiny,
        // backgroundColor: 'red',
        marginTop: HP(.1),
        width: WP(43),
    },
    innerContainer: {
        marginLeft: WP(3)
    },
    icon: {
        width: WP(7),
        height: HP(3.3),
        marginLeft: WP(1.2),
        resizeMode:"contain"

    }
})