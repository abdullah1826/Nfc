
import { View, Text, Alert } from 'react-native'
import React, { useCallback, useEffect, useRef, } from 'react'
import style from './style'

import ActionCard from '../../../components/card/ActionCard'
import { appIcons, appImages } from '../../../shared/theme/assets'
import RecentRecordsCard from '../../../components/RecentRecordsCard/RecentRecordsCard'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ReadTagBottomSheetModal from '../../../components/BottomSheetReadTag/ReadTagBottomSheetModal'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useSelector } from 'react-redux'
import { MyAppHeader, MyStatusBar } from '../../../exporter'
import NfcManager, { NfcTech, Ndef, nfcManager } from 'react-native-nfc-manager';
import { checkNfcSupport } from '../../../shared/utilities/Helper'
import { getAllTags } from '../../../shared/utilities/services/mainServices'

const HomeScreen = ({ navigation }: any) => {

    // const [readTagBottomSheet, setReadTagBottomSheet] = useState(false);

    const userData = useSelector<any>(state => state.user);

    useEffect(() => {
                 const initNfc = async () => {
                     try {
                         await NfcManager.start();
                         console.log('NFC Manager started successfully!');
                    } catch (error) {
                         console.error('Failed to start NFC Manager:', error);
                     }
                 };
        
                 initNfc();
        }, []);


        const readNdef = async () => {
            const nfcSupported = await checkNfcSupport();
            if (!nfcSupported) return
                     try {
                        NfcManager.registerTagEvent()
                        .then(() => console.log('NFC reading started.'))
                        .catch(error => console.warn('Error starting NFC reading:', error));
                        const tag = await NfcManager.getTag();
                        if(tag){
                            // const message= await nfcManager.ndefHandler.getNdefMessage();
                            //  const status = await nfcManager.ndefHandler.getNdefStatus();
                            //  console.log("status++++", message)
                            //  console.log("status___________", status)
                        } 
                     } catch (ex) {
                        console.log("tagsssss++++++", ex)
                         if (ex instanceof Error) {
                             if (ex.message.includes('NFC tag is not connected')) {
                                 Alert.alert('Error', 'NFC tag is not connected. Please try again.');
                             } else if (ex.message.includes('NDEF not supported')) {
                                 Alert.alert('Error', 'NFC tag does not support NDEF format.');
                             } else {
                                Alert.alert('Error', `An unexpected error occurred: ${ex.message}`);
                             }
                         } else {
                             Alert.alert('Error', 'An unexpected error occurred. Please try again.');
                         }
                     } finally {
                         await NfcManager.cancelTechnologyRequest();
                     }
                 }
            
                // // const writeNdef = async () => {
                //      console.log("Attempting to write NFC tag...");
                //     if (!checkNfcSupport()) return;
            
                //      try {
                //          await NfcManager.requestTechnology(NfcTech.Ndef);
            
                //          const message = [Ndef.textRecord('Hello NFC')];
                //      await NfcManager.writeNdefMessage(message);
                //          Alert.alert('Success', 'NFC tag written successfully!');
                //      } catch (ex) {
                //         if (ex instanceof Error) {
                //              if (ex.message.includes('NFC tag is not connected')) {
                //                  Alert.alert('Error', 'NFC tag is not connected. Please try again.');
                //              } else if (ex.message.includes('NDEF not supported')) {
                //                  Alert.alert('Error', 'NFC tag does not support NDEF format.');
                //              } else if (ex.message.includes('write operation failed')) {
                //                 Alert.alert('Error', 'Failed to write to NFC tag. Please try again.');
                //              } else {
                //                  Alert.alert('Error', `An unexpected error occurred: ${ex.message}`);
                //          }
                //         } else {
                //             Alert.alert('Error', 'An unexpected error occurred. Please try again.');
                //          }
                //          console.warn('NFC Write Error:', ex);
                //      } finally {
                //          await NfcManager.cancelTechnologyRequest();
                //      }
                //  }

useEffect(()=>{
    getTags()
},[])

const getTags =()=>{
getAllTags().then((res)=>{
console.log("respomseeeee", res?.data)
}).catch((error)=>{
console.log("errrrrr", error.response.data)
}).finally(()=>{

})
}


    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
   
    }, []);

    return (
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
        >
            <MyStatusBar/>
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
                            onClick={readNdef}
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

<View style={{flex:1, backgroundColor:"red"}}>
    <Text>helooo</Text>
</View>


                    {/* Recent Record Cards */}

                    {/* <RecentRecordsCard
                        Icon={appImages.Email}
                        title={'Email'}
                        Desc={'2343weewabc1234@gmail.com'}
                    /> */}
                    {/* <RecentRecordsCard
                        Icon={appImages.Map}
                        title={'Location'}
                        Desc={'23232, St lowrence, Dhaka, Bangladesh'}
                    /> */}
                    {/* <RecentRecordsCard
                        Icon={appImages.QrScan}
                        title={'QR Code'}
                        Desc={'Lorem Ipsum doler zebta roakl locki grnjdw'}
                    /> */}
                    {/* <RecentRecordsCard
                        Icon={appImages.Url}
                        title={'URL'}
                        Desc={'www.konsasosssdnasnskmks.com'}
                    /> */}

                

                </View>
            </BottomSheetModalProvider>
        </KeyboardAwareScrollView >
    )
}

export default HomeScreen