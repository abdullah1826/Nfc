import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import style from './style'
import RecentRecordsScreenCard from '../../../components/RecentRecordsScreenCard/RecentRecordsScreenCard'
import { appIcons, appImages } from '../../../shared/theme/assets'
import ScreenHeader from '../../../components/screenHeader/ScreenHeader'
import { HP } from '../../../shared/theme/PixelResponsive'
import { colors } from '../../../shared/theme/colors'

const RecentRecordsScreen = ({ navigation }: any) => {
    return (
        <View style={style.container}>

            <ScreenHeader
                heading={'Recent Records'}
                onClick={() => { navigation.goBack() }}
            />

            <View style={style.searchBox}>
                <Image source={appIcons.Search} style={style.searchIcon} />
                <TextInput
                    placeholder='Search'
                    placeholderTextColor={colors.g21}
                    style={style.input}
                />
            </View>

            <View>
                <RecentRecordsScreenCard
                    Icon={appImages.Email}
                    title={'Email'}
                    Desc={'2343weewabc1234@gmail.com'}
                />

                <RecentRecordsScreenCard
                    Icon={appImages.Map}
                    title={'Location'}
                    Desc={'23232, St low Dhaka, Bangladesh'}
                />

                <RecentRecordsScreenCard
                    Icon={appImages.QrScan}
                    title={'QR Code'}
                    Desc={'Lorem Ipsum doler zebta roakl locki'}
                />

                <RecentRecordsScreenCard
                    Icon={appImages.Url}
                    title={'URL'}
                    Desc={'www.konsasosssdnasnskmks.com'}
                />
            </View>
        </View>
    )
}

export default RecentRecordsScreen
