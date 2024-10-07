// import { View, Text, Alert } from 'react-native';
// import React, { useCallback, useEffect, useRef } from 'react';
// import style from './style';
// import MyAppHeader from '../../../components/appHeader/MyAppHeader';
// import ActionCard from '../../../components/card/ActionCard';
// import { appIcons, appImages } from '../../../shared/theme/assets';
// import RecentRecordsCard from '../../../components/RecentRecordsCard/RecentRecordsCard';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import ReadTagBottomSheetModal from '../../../components/BottomSheetReadTag/ReadTagBottomSheetModal';
// import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// import { useSelector } from 'react-redux';
// import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

// const HomeScreen = ({ navigation }: any) => {
//     const userData = useSelector<any>(state => state.user);

//     useEffect(() => {
//         if (userData) {
//             console.log('Home UserData=>>>>>>>>>>>>>>>>>', userData);
//         }

//         const initNfc = async () => {
//             try {
//                 await NfcManager.start();
//                 console.log('NFC Manager started successfully!');
//             } catch (error) {
//                 console.error('Failed to start NFC Manager:', error);
//             }
//         };

//         initNfc();
//     }, [userData]);

//     const bottomSheetModalRef = useRef<BottomSheetModal>(null);

//     const checkNfcSupport = async () => {
//         const supported = await NfcManager.isSupported();
//         if (!supported) {
//             Alert.alert('NFC Not Supported', 'Your device does not support NFC.');
//             return false;
//         }
//         const enabled = await NfcManager.isEnabled();
//         if (!enabled) {
//             Alert.alert('NFC Disabled', 'Please enable NFC in settings.');
//             return false;
//         }
//         return true;
//     }

//     const readNdef = async () => {
//         console.log("Attempting to read NFC tag...");
//         if (!await checkNfcSupport()) return;

//         try {
//             await NfcManager.requestTechnology(NfcTech.Ndef);
//             console.log("NFC technology requested successfully.");

//             const tag = await NfcManager.getTag();
//             console.warn('Tag found', tag);
//         } catch (ex) {
//             console.warn('Oops!', ex);
//             if (ex instanceof Error) {
//                 if (ex.message.includes('NFC tag is not connected')) {
//                     Alert.alert('Error', 'NFC tag is not connected. Please try again.');
//                 } else if (ex.message.includes('NDEF not supported')) {
//                     Alert.alert('Error', 'NFC tag does not support NDEF format.');
//                 } else {
//                     Alert.alert('Error', `An unexpected error occurred: ${ex.message}`);
//                 }
//             } else {
//                 Alert.alert('Error', 'An unexpected error occurred. Please try again.');
//             }
//         } finally {
//             await NfcManager.cancelTechnologyRequest();
//         }
//     }

//     const writeNdef = async () => {
//         console.log("Attempting to write NFC tag...");
//         if (!await checkNfcSupport()) return;

//         try {
//             await NfcManager.requestTechnology(NfcTech.Ndef);

//             const message = [Ndef.textRecord('Hello NFC')];
//             await NfcManager.writeNdefMessage(message);
//             Alert.alert('Success', 'NFC tag written successfully!');
//         } catch (ex) {
//             if (ex instanceof Error) {
//                 if (ex.message.includes('NFC tag is not connected')) {
//                     Alert.alert('Error', 'NFC tag is not connected. Please try again.');
//                 } else if (ex.message.includes('NDEF not supported')) {
//                     Alert.alert('Error', 'NFC tag does not support NDEF format.');
//                 } else if (ex.message.includes('write operation failed')) {
//                     Alert.alert('Error', 'Failed to write to NFC tag. Please try again.');
//                 } else {
//                     Alert.alert('Error', `An unexpected error occurred: ${ex.message}`);
//                 }
//             } else {
//                 Alert.alert('Error', 'An unexpected error occurred. Please try again.');
//             }
//             console.warn('NFC Write Error:', ex);
//         } finally {
//             await NfcManager.cancelTechnologyRequest();
//         }
//     }

//     const handleSheetChanges = useCallback((index: number) => {
//         console.log('handleSheetChanges', index);
//     }, []);

//     return (
//         <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
//             <BottomSheetModalProvider>
//                 <View style={style.rootContainer}>
//                     <MyAppHeader onClick={() => navigation.navigate('Setting')} />
//                     <View style={style.actionCardBox}>
//                         <ActionCard
//                             Icon={appIcons.Read}
//                             title={'Read Tag'}
//                             desc={"Read the NFC tag and see what's inside!"}
//                             onClick={readNdef}
//                         />
//                         <ActionCard
//                             Icon={appIcons.Write}
//                             title={'Write Tag'}
//                             desc={"Write anything over NFC!"}
//                             onClick={writeNdef}
//                         />
//                         <ActionCard
//                             Icon={appIcons.Locked}
//                             title={'Locked Tag'}
//                             desc={"Lock device to make it secure!"}
//                             onClick={() => { }}
//                         />
//                     </View>

//                     <View style={style.RecordsHeadingBox}>
//                         <Text style={style.RecordsHeading}>Recent Records</Text>
//                         <Text style={style.seeAllTxt} onPress={() => { navigation.navigate('RecentRecordsScreen') }}>See All</Text>
//                     </View>

//                     <RecentRecordsCard Icon={appImages.Email} title={'Email'} Desc={'2343weewabc1234@gmail.com'} />
//                     <RecentRecordsCard Icon={appImages.Map} title={'Location'} Desc={'23232, St lowrence, Dhaka, Bangladesh'} />
//                     <RecentRecordsCard Icon={appImages.QrScan} title={'QR Code'} Desc={'Lorem Ipsum doler zebta roakl locki grnjdw'} />
//                     <RecentRecordsCard Icon={appImages.Url} title={'URL'} Desc={'www.konsasosssdnasnskmks.com'} />

//                     <ReadTagBottomSheetModal ref={bottomSheetModalRef} onChange={handleSheetChanges} />
//                 </View>
//             </BottomSheetModalProvider>
//         </KeyboardAwareScrollView>
//     );
// }

// export default HomeScreen;
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import style from './style';

import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
import {useSelector} from 'react-redux';
import ReadTagBottomSheetModal from '../../../components/BottomSheetReadTag/ReadTagBottomSheetModal';
import ActionCard from '../../../components/card/ActionCard';
import RecentRecordsCard from '../../../components/RecentRecordsCard/RecentRecordsCard';
import {MyAppHeader} from '../../../exporter';
import {appIcons, appImages} from '../../../shared/theme/assets';
import CustomAlert from '../../../components/customAlert';

const HomeScreen = ({navigation}: any) => {
  const userData = useSelector<any>(state => state.user);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [nfcData, setNfcData] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState({title: '', message: ''});

  const checkNfcSupport = async () => {
    const supported = await NfcManager.isSupported();
    if (!supported) {
      setAlertMessage({
        title: 'NFC Not Supported',
        message: 'Your device does not support NFC.',
      });
      setAlertVisible(true);
      return false;
    }
    const enabled = await NfcManager.isEnabled();
    if (!enabled) {
      setAlertMessage({
        title: 'NFC Disabled',
        message: 'Please enable NFC in settings.',
      });
      setAlertVisible(true);
      return false;
    }
    return true;
  };

  const readNfc = async () => {
    if (!(await checkNfcSupport())) return;
    try {
      await NfcManager.start();
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      if (tag) {
        const ndefMessage = tag.ndefMessage[0];
        const payload = Ndef.text.decodePayload(ndefMessage.payload);
        setNfcData(payload); // Update bottom sheet content with the NFC data
      } else {
        setNfcData('No Data Found');
      }
    } catch (error) {
      setAlertMessage({
        title: 'Error',
        message: 'Unable to read NFC tag.',
      });
      setAlertVisible(true);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  useEffect(() => {
    checkNfcSupport(); // Check NFC support on component mount
  }, []);

  const handlePresentModalPress = useCallback(async () => {
    const isNfcSupported = await checkNfcSupport();
    if (isNfcSupported) {
      bottomSheetModalRef.current?.present();
      readNfc(); // Start NFC reading when the bottom sheet is opened
    }
  }, []);

  const handlePressWriteModal = useCallback(async () => {
    const isNfcSupported = await checkNfcSupport();
    if (isNfcSupported) {
      navigation.navigate('WriteTag');
    }
  }, []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <BottomSheetModalProvider>
        <View style={style.rootContainer}>
          <MyAppHeader onClick={() => navigation.navigate('Setting')} />
          <View style={style.actionCardBox}>
            <ActionCard
              Icon={appIcons.Read}
              title={'Read Tag'}
              desc={"Read the NFC tag and see what's inside!"}
              onClick={handlePresentModalPress}
            />
            <ActionCard
              Icon={appIcons.Write}
              title={'Write Tag'}
              desc={'Write anything over NFC!'}
              onClick={handlePressWriteModal}
            />
            <ActionCard
              Icon={appIcons.Locked}
              title={'Locked Tag'}
              desc={'Lock device to make it secure!'}
              onClick={() => {}}
            />
          </View>

          <View style={style.RecordsHeadingBox}>
            <Text style={style.RecordsHeading}>Recent Records</Text>
            <Text
              style={style.seeAllTxt}
              onPress={() => {
                navigation.navigate('RecentRecordsScreen');
              }}>
              See All
            </Text>
          </View>

          {/* Recent Record Cards */}

          <RecentRecordsCard
            Icon={appImages.Email}
            title={'Email'}
            Desc={'2343weewabc1234@gmail.com'}
          />
          <RecentRecordsCard
            Icon={appImages.Map}
            title={'Location'}
            Desc={'23232, St lowrence, Dhaka, Bangladesh'}
          />
          <RecentRecordsCard
            Icon={appImages.QrScan}
            title={'QR Code'}
            Desc={'Lorem Ipsum doler zebta roakl locki grnjdw'}
          />
          <RecentRecordsCard
            Icon={appImages.Url}
            title={'URL'}
            Desc={'www.konsasosssdnasnskmks.com'}
          />

          <ReadTagBottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
            content={nfcData}
          />
        </View>
      </BottomSheetModalProvider>
      <CustomAlert
        visible={alertVisible}
        title={alertMessage.title}
        message={alertMessage.message}
        onClose={() => setAlertVisible(false)} // Close alert on press
      />
    </KeyboardAwareScrollView>
  );
};

export default HomeScreen;
