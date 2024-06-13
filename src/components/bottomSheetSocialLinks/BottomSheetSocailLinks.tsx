import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { forwardRef, useCallback, useMemo } from 'react'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import { HP, WP } from '../../shared/theme/PixelResponsive';
import { colors } from '../../shared/theme/colors';
import { appRadius, family, size } from '../../shared/theme/sizes';
import {Formik } from 'formik';
import { SocialLinkFields } from '../../shared/utilities/validation';
import { UrlTextInput } from '../UrlTextInput/UrlTextInput';

interface Props {
    onChange: (index: number) => void,
    item: {
        key: number,
        iconName: string,
        icon: any,
    },
};

const BottomSheetSocailLinks = forwardRef<BottomSheetModal, Props>(({ onChange, item }, ref) => {

    const snapPoints = useMemo(() => ['25%', '40%'], []);

    const renderBackdrop = useCallback(
        (Props: any) => <BottomSheetBackdrop
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={.5}
            {...Props}
        />, []);
const handleSubmit =()=>{

}

    return (
        <Formik
        initialValues={SocialLinkFields}
        validationSchema={SocialLinkFields}
        onSubmit={handleSubmit}>
        {({ values, errors, touched, setFieldTouched, handleChange, handleSubmit }) => (
        <BottomSheetModal
            ref={ref}
            index={1}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#DDDDDD', width: WP(10), height: HP(1) }}
            onChange={onChange}
            handleStyle={{ borderTopRightRadius: WP(20) }}
            style={{
                shadowColor: '#000',
                elevation: 20,
                backgroundColor: colors.bg1,
                borderTopLeftRadius: WP(20),
                borderTopRightRadius: WP(20)
            }}>
            <BottomSheetView style={styles.bottomSheetRootcontainer}>

                <Image source={item.icon} style={styles.icon} />
                <Text style={styles.txt}>{item.iconName}</Text>

            
                <UrlTextInput
 placeholder={`Add ${item?.iconName || "" } Link`}
 placeholderTextColor="gray"
value={values.SocailUrl}
onChangeText={handleChange("SocailUrl")}
touched={errors.SocailUrl}
errorMessage={errors.SocailUrl}
/>


                <View style={styles.buttonsBox}>
                    <TouchableOpacity style={styles.cancelBtn}
                        onPress={() => ref?.current?.close()}
                    >

                        <Text style={[styles.btnTxt, { color: colors.g21 }]}>Cancel</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer}>
                        <LinearGradient colors={["#17AE41", '#4DCB2E']}
                            style={styles.button}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.btnTxt}>Save</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>

            </BottomSheetView>
        </BottomSheetModal>
          )}
          </Formik>
    );
});

export default BottomSheetSocailLinks

const styles = StyleSheet.create({
    bottomSheetRootcontainer: {
        alignItems: 'center',
        marginTop: HP(3),
        justifyContent:"center",
        textAlign:"center",
        // backgroundColor: 'red',

    },
    icon: {
        width: WP(17.4),
        height: HP(8.2),
    },
    txt: {
        color: colors.g21,
        fontSize: size.xxsmall,
        marginTop: HP(1)
    },
    input: {
        color: colors.b1,
        borderColor: colors.g21,
        borderWidth: 1,
        width: WP(85),
        borderRadius: appRadius.boxRadius,
        textAlign: 'center',
        marginTop: HP(2)
    },
    buttonsBox: {
        width: WP(83),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: HP(3),
        justifyContent: 'space-between',
        // backgroundColor: 'red',
    },
    cancelBtn: {
        borderRadius: appRadius.boxRadius,
        alignItems: 'center',
        height: HP(6),
        width: WP(40),
        borderWidth: 1,
        borderColor: colors.g21,
        justifyContent: 'center'
    },
    buttonContainer: {

        alignItems: 'center'
    },
    button: {
        borderRadius: appRadius.boxRadius,
        alignItems: 'center',
        height: HP(6),
        width: WP(40),
        justifyContent: 'center'
    },
    btnTxt: {
        color: colors.bg1,
        fontFamily: family.InterSemiBold,
        fontSize: size.normal
    }
});