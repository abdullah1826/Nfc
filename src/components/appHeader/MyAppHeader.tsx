import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { appIcons, applogos } from '../../shared/theme/assets'
import { HP, WP } from '../../shared/theme/PixelResponsive'

interface Props {
    onClick: () => void
}

const MyAppHeader: React.FC<Props> = ({ onClick }) => {
    return (
        <View style={styles.Container}>
            <Image source={applogos.logo} style={styles.icon} />
            <TouchableOpacity
                onPress={() => onClick()}
            >
                <Image source={appIcons.Setting} style={[styles.icon, { height: HP(4) }]} />
            </TouchableOpacity>
        </View>
    )
}

export {MyAppHeader}

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    icon: {
        height: HP(3),
        width: WP(10)
    }
})