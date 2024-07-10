import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { ChangeEvent, useState } from 'react'
import { colors } from '../../shared/theme/colors'
import { HP, WP } from '../../shared/theme/PixelResponsive'
import { appRadius } from '../../shared/theme/sizes'
import { appIcons } from '../../shared/theme/assets'

interface Props {
    placeholder: string,
    value: string,
    error: any,
    onChangeText: (e: string | ChangeEvent<any>) => void;
    onBlur: () => void,
}

const CustomTextInput: React.FC<Props> = ({ placeholder, value, error, onChangeText, onBlur,style = {},inputStyle={} }) => {

    const [secureText, setSecureText] = useState(false);
    return (
        <View style={[styles.inputContainer,style]}>
            <TextInput
                style={[styles.input,inputStyle]}
                placeholder={placeholder}
                placeholderTextColor={colors.g21}
                value={value}
                onChangeText={onChangeText}
                onBlur={() => onBlur()}
                secureTextEntry={secureText}
            />
            {placeholder == 'Password'  &&
                < TouchableOpacity onPress={() => setSecureText(secure => !secure)}>
                    <Image source={secureText ? appIcons.EyeOff : appIcons.Eye} style={styles.icon} />
                </TouchableOpacity>}
        </View >
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        width: WP(85),
        height: HP(8),
        backgroundColor: colors.bg1,
        shadowColor: colors.b1,
        elevation: 5,
        borderRadius: appRadius.boxRadius - 2,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: HP(2),
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    input: {
        color: colors.b1,
        marginLeft: WP(8),
        width: WP(65),
    },
    icon: {
        width: WP(6.2),
        height: HP(2),
        marginLeft: WP(3)
    }
})