import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { forwardRef, useCallback, useMemo, useState,useEffect } from 'react'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { HP, WP } from '../../shared/theme/PixelResponsive'
import { colors } from '../../shared/theme/colors'
import { appRadius, family, size } from '../../shared/theme/sizes'
import LinearGradient from 'react-native-linear-gradient'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface Field {
    type: string;
    label: string;
    value: any;
    [key: string]: any; // This allows for additional properties with any key of type string
}

interface Props {
    onChange: (index: number) => void,
    item: {
        key: number,
        title: string,
        icon: any,
    },
    fields: Field[]
};

const BottomSheetForWriteTag = forwardRef<BottomSheetModal, Props>(({ onChange, item, fields }, ref) => {
    const [fieldValues, setFieldValues] = useState<any>({});

    // useEffect(() => {
    //     // Set initial field values based on the fields prop
    //     const initialFieldValues: { [key: string]: any } = {};
    //     fields.forEach(field => {
    //         initialFieldValues[field.label] = field.value;
    //     });
    //     setFieldValues(initialFieldValues);
    // }, [fields]);
// console.log("fieldValues",fieldValues)
    const snapPoints = useMemo(() => ['25%', fields.length > 3 ? '80%' : fields.length >= 2 ? '60%' : '40%'], [fields.length]);

    // const renderBackdrop = useCallback(
    //     (props: any) => <BottomSheetBackdrop
    //         appearsOnIndex={0}
    //         disappearsOnIndex={-1}
    //         opacity={.5}
    //         {...props}
    //     />, [])

        const handleInputChange = (label: string, text: string) => {
            setFieldValues(prevValues => ({
                ...prevValues,
                [label]: text
            }));
        };
    


    return (
        <BottomSheetModal
            ref={ref}
            index={1}
            snapPoints={snapPoints}
            // backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#DDDDDD', width: WP(10), height: HP(1) }}
            onChange={onChange}
            style={{
                shadowColor: '#000',
                elevation: 20,
                backgroundColor: colors.bg1,
                borderTopLeftRadius: WP(10),
                borderTopRightRadius: WP(10)
            }}
        >
            <KeyboardAwareScrollView style={{flex:1}}>
            <BottomSheetView style={styles.bottomSheetRootcontainer}>

                <Image source={item?.icon} style={styles?.icon} />
                <Text style={styles.txt}>{item?.title}</Text>
                {
                    fields.map((item, index) => (
                        <TextInput
                            key={index}
                            style={[styles.input, { marginTop: index == 0 ? HP(4) : HP(2) }]}
                            placeholder={`Add ${item.label}`}
                            placeholderTextColor={colors.g21}
                            onFocus={() => {
                                if (ref.current) {
                                    ref.current.expand();
                                }
                            }}
                            onChangeText={(text) => handleInputChange(item?.label, text)} // Handle text change
                          
                        />
                    ))
                }
                {
                    item?.title == 'Location' &&
                    <LinearGradient colors={["#17AE41", '#4DCB2E']}
                        style={styles.gradientBorder}
                    >
                        <TouchableOpacity style={styles.locationBtn}>
                            <LinearGradient
                                colors={['#FFFFFF', '#FFFFFF']}
                                style={styles.innerButton}
                            >
                                <Text style={styles.buttonText}>Use Current Location</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </LinearGradient>

                }

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
            </KeyboardAwareScrollView>

        </BottomSheetModal>
    )
})

export default BottomSheetForWriteTag

const styles = StyleSheet.create({
    bottomSheetRootcontainer: {
        alignItems: 'center',
        marginTop: HP(3),
        // backgroundColor: 'red'
    },
    icon: {
        width: WP(14.8),
        height: HP(7),
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
    },
    gradientBorder: {
        borderRadius: appRadius.boxRadius,
        padding: 2, // Adjust padding to control border width,
        marginTop: HP(2),
        width: WP(85)
    },
    locationBtn: {
        borderRadius: appRadius.boxRadius,
        overflow: 'hidden',
        paddingHorizontal: 1,
        paddingVertical: 1
    },
    innerButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: appRadius.boxRadius - 2,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: size.xxsmall,
        color: '#17AE41', // Set the text color to match the gradient
        fontFamily: family.InterBold
    },
});