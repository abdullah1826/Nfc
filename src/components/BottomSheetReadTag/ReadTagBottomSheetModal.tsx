import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {
  RefObject,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {colors} from '../../shared/theme/colors';
import {family, size} from '../../shared/theme/sizes';
import {HP, WP} from '../../shared/theme/PixelResponsive';
import {appImages} from '../../shared/theme/assets';
import {isEmail, isLocation, isPhoneNumber, isUrl} from './functions';

interface Props {
  onChange: (index: number) => void;
  content: string;
}

const ReadTagBottomSheetModal = forwardRef<BottomSheetModal, Props>(
  ({content, onChange}, ref) => {
    const snapPoints = useMemo(() => ['25%', '50%', '60%', '80%'], []);

    const renderBackdrop = useCallback(
      (Props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.5}
          {...Props}
        />
      ),
      [],
    );

    const handlePress = (text: string) => {
      if (isUrl(text)) {
        Linking.openURL(text);
      } else if (isPhoneNumber(text)) {
        const phoneNumber = text.match(
          /(\+?\d{1,4}[-.\s]?(\d{1,4}[-.\s]?){1,14})/g,
        )?.[0];
        if (phoneNumber) {
          Linking.openURL(`tel://${phoneNumber}`);
        }
      } else if (isEmail(text)) {
        Linking.openURL(`mailto:${text}`);
      } else if (isLocation(text)) {
        const location = encodeURIComponent(text);
        Linking.openURL(
          `https://www.google.com/maps/search/?api=1&query=${location}`,
        );
      }
    };
    return (
      <BottomSheetModal
        ref={ref}
        index={1}
        snapPoints={snapPoints}
        handleStyle={{borderTopLeftRadius: 30}}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={styles.indi}
        onChange={onChange}
        style={styles.sheet}>
        <BottomSheetView style={styles.bottomSheetContainer}>
          <Text style={styles.headingTxt}>Scan your NFC Tag</Text>
          <Image source={appImages.Nfc} style={styles.nfcImg} />

          <Text style={styles.lastTxt}>
            Please hold your device near the NFC tag
          </Text>
          {content && (
            <View style={{width: '100%', paddingHorizontal: 20, marginTop: 20}}>
              <Text style={styles.title}>NFC Data:</Text>
              <TouchableOpacity onPress={() => handlePress(content)}>
                <Text
                  style={[
                    styles.data,
                    (isUrl(content) || isPhoneNumber(content)) &&
                      styles.clickable,
                  ]}>
                  {content ? content : 'No Data Found'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default ReadTagBottomSheetModal;

const styles = StyleSheet.create({
  bottomSheetRootcontainer: {
    shadowColor: colors.b1,
    elevation: 20,
  },
  indi: {
    backgroundColor: '#DDDDDD',
    width: WP(10),
    height: HP(1),
  },
  clickable: {
    color: '#1E90FF', // Blue color to indicate clickable
    textDecorationLine: 'underline',
  },
  sheet: {
    shadowColor: '#000',
    elevation: 20,
    backgroundColor: colors.bg1,
    borderTopLeftRadius: WP(10),
    borderTopRightRadius: WP(10),
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    textAlign: 'left',
  },
  data: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    textAlign: 'left',
  },
  bottomSheetContainer: {
    backgroundColor: colors.bg1,
    alignItems: 'center',
  },
  headingTxt: {
    color: colors.b1,
    textAlign: 'center',
    fontFamily: family.InterBold,
    fontSize: size.large,
    marginTop: HP(2),
  },
  nfcImg: {
    height: HP(20),
    width: WP(31),
    marginTop: HP(5),
  },
  lastTxt: {
    color: colors.g1,
    fontSize: size.xsmall,
    marginTop: HP(3),
  },
});
