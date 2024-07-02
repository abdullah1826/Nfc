
import { View, Text, Alert, FlatList, Platform, SafeAreaView } from 'react-native'
import React, { useCallback, useEffect, useRef,useState } from 'react'
import style from './style'

import ActionCard from '../../../components/card/ActionCard'
import { appIcons,} from '../../../shared/theme/assets'
import RecentRecordsCard from '../../../components/RecentRecordsCard/RecentRecordsCard'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useDispatch, useSelector } from 'react-redux'
import { MyAppHeader, MyStatusBar } from '../../../exporter'
import NfcManager, { NfcTech, Ndef, nfcManager, NfcEvents } from 'react-native-nfc-manager';
import { checkNfcSupport, useNetworkStatus } from '../../../shared/utilities/Helper'
import { getAllTags } from '../../../shared/utilities/services/mainServices'
import { setTagsAllRecord } from '../../../redux/Slices/MainSlice'
import { AppLoader } from '../../../components/AppLoader'
import { getIconOfSocialLink } from '../../../shared/utilities/constants'

const HomeScreen = ({ navigation }: any) => {

// redux
const dispatch = useDispatch()

// redux states
    const userData = useSelector<any>(state => state.user);
    const {TagsAllRecord} =useSelector<any>(state => state.main);
    const tagdata = TagsAllRecord.slice(0, 4)

    // local states
    const [isLoading, setIsLoading] = useState(false)
   

        // internet checking
        const isConnected = useNetworkStatus()

        const readNdef = async () => {
            await NfcManager.start();
      console.log('NFC Manager started successfully!')
            const nfcSupported = await checkNfcSupport();
            if (!nfcSupported) return
                     try {
                             // Start NFC Reading
      await NfcManager.requestTechnology(NfcTech.Ndef);
      NfcManager.setEventListener(NfcTech.Ndef, (tag) => {
        console.log('NFC Tag:', tag);
        NfcManager.setAlertMessageIOS('NFC Tag Detected');
        NfcManager.unregisterTagEvent().catch(() => 0);
      });
      NfcManager.setAlertMessageIOS('Aproxime o NFC Tag do dispositivo.');
      console.log('NFC reading started.');
                        NfcManager.registerTagEvent()
                        .then(() => console.log('NFC reading started.'))
                        .catch(error => console.warn('Error starting NFC reading:', error));
                        const tag = await NfcManager.getTag();
                        if(tag){
                            // const message= await nfcManager.ndefHandler.getNdefMessage();
                            //  const status = await nfcManager.ndefHandler.getNdefStatus();
                             console.log("status+++++++++++++++++++++++++", tag)
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
   
useEffect(()=>{
    getTags()
},[])

const getTags =()=>{
try {
    if (!isConnected) {
        Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
        return;
      }
    setIsLoading(true)
    getAllTags().then((res)=>{
    dispatch(setTagsAllRecord(res?.data?.data))
    setIsLoading(false)
}).catch((error)=>{
    setIsLoading(false)
}).finally(()=>{
    setIsLoading(false)
})
    
} catch (error) {
    
}

}


    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
   
    }, []);


 
    const Recentrecord = ({ item }) => (
        <RecentRecordsCard
        Icon={getIconOfSocialLink(item?.linkName)}
        title={item?.linkName}
        Desc={item?.value}
    />
      );


      const emptyrenderdata =()=>{
        return (
        <View style={style.emptyContainer}>
        <Text style={style.emptyText}>No Tags available</Text>
      </View>
        )
      }

    return (
        <SafeAreaView style={style.container}>       
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
        >
            <MyStatusBar/>
            <AppLoader loading={isLoading}/>
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

                </View>
                <View style={{backgroundColor:"white"}}>
                <FlatList
                style={{flex:1,}}
                contentContainerStyle={style.viewflatlist}
                  data={tagdata}
              renderItem={Recentrecord}
           keyExtractor={(item, index) => index.toString()}
           ListEmptyComponent={emptyrenderdata}
          />
               </View>
            </BottomSheetModalProvider>
        </KeyboardAwareScrollView >
        </SafeAreaView>
    )
}

export default HomeScreen