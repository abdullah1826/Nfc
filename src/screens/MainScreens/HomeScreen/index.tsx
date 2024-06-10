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
import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useRef, } from 'react'
import style from './style'
import MyAppHeader from '../../../components/appHeader/MyAppHeader'
import ActionCard from '../../../components/card/ActionCard'
import { appIcons, appImages } from '../../../shared/theme/assets'
import RecentRecordsCard from '../../../components/RecentRecordsCard/RecentRecordsCard'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ReadTagBottomSheetModal from '../../../components/BottomSheetReadTag/ReadTagBottomSheetModal'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useSelector } from 'react-redux'

const HomeScreen = ({ navigation }: any) => {

    // const [readTagBottomSheet, setReadTagBottomSheet] = useState(false);

    const userData = useSelector<any>(state => state.user);

    useEffect(() => {
        if (userData) {
            console.log('Home UserData=>>>>>>>>>>>>>>>>>', userData);
        }
    }, []);

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);


    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
        >
            <BottomSheetModalProvider>
                <View style={style.rootContainer}>
                    <MyAppHeader
                        onClick={() => navigation.navigate('Setting')}
                    />
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
                            desc={"Write anything over NFC!"}
                            onClick={() => { navigation.navigate('WriteTag') }}
                        />
                        <ActionCard
                            Icon={appIcons.Locked}
                            title={'Locked Tag'}
                            desc={"Lock device to make it secure!"}
                            onClick={() => { }}
                        />
                    </View>

                    <View style={style.RecordsHeadingBox}>
                        <Text style={style.RecordsHeading}>Recent Records</Text>
                        <Text style={style.seeAllTxt}
                            onPress={() => { navigation.navigate('RecentRecordsScreen') }}
                        >See All</Text>
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
                    />

                </View>
            </BottomSheetModalProvider>
        </KeyboardAwareScrollView >
    )
}

export default HomeScreen