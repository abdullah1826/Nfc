import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { RefObject, forwardRef, useCallback, useMemo, useRef } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { colors } from '../../shared/theme/colors';
import { family, size } from '../../shared/theme/sizes';
import { HP, WP } from '../../shared/theme/PixelResponsive';
import { appImages } from '../../shared/theme/assets';

interface Props {
    onChange: (index: number) => void,
}

const ReadTagBottomSheetModal = forwardRef<BottomSheetModal, Props>(({ onChange }, ref) => {

    const snapPoints = useMemo(() => ['25%', '50%'], []);

    const renderBackdrop = useCallback(
        (Props: any) => <BottomSheetBackdrop appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={.5}
            {...Props}
        />, []);

    return (
        <BottomSheetModal
            ref={ref}
            index={1}
            snapPoints={snapPoints}
            handleStyle={{ borderTopLeftRadius: 30 }}
            backdropComponent={renderBackdrop}
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
            <BottomSheetView style={styles.bottomSheetContainer}>
                <Text style={styles.headingTxt}>Scan your NFC Tag</Text>
                <Image source={appImages.Nfc} style={styles.nfcImg} />

                <Text style={styles.lastTxt}>Please hold your device near the NFC tag</Text>
            </BottomSheetView>
        </BottomSheetModal>
    );
});

export default ReadTagBottomSheetModal



const styles = StyleSheet.create({
    bottomSheetRootcontainer: {
        shadowColor: colors.b1,
        elevation: 20
    },
    bottomSheetContainer: {
        backgroundColor: colors.bg1,
        alignItems: 'center'
    },
    headingTxt: {
        color: colors.b1,
        textAlign: 'center',
        fontFamily: family.InterBold,
        fontSize: size.large,
        marginTop: HP(2)
    },
    nfcImg: {
        height: HP(20),
        width: WP(31),
        marginTop: HP(5)
    },
    lastTxt: {
        color: colors.g1,
        fontSize: size.xsmall,
        marginTop: HP(3)
    }
});