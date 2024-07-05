import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { appIcons } from '../../shared/theme/assets'
import { HP, WP } from '../../shared/theme/PixelResponsive'
import { size } from '../../shared/theme/sizes'
import { colors } from '../../shared/theme/colors'

interface Props {
    Desc: string
}

const MoreText: React.FC<Props> = ({ Desc }) => {
    return (
        <View style={styles.container}>
            <Image source={appIcons.Dot} style={{ width: WP(1.5), height: HP(1.5) }} />
            <Text style={styles.txt}>{Desc} </Text>
        </View>
    )
}

export default MoreText

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: HP(2),
        alignItems:"center"
    },
    txt: {
        fontSize: size.tiny,
        marginLeft: WP(2),
        color: colors.b1,
    
    }
})