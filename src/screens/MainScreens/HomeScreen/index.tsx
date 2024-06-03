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