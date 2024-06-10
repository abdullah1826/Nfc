import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import style from './style'
import RecentRecordsScreenCard from '../../../components/RecentRecordsScreenCard/RecentRecordsScreenCard'
import { appIcons, appImages } from '../../../shared/theme/assets'
import ScreenHeader from '../../../components/screenHeader/ScreenHeader'
import { HP } from '../../../shared/theme/PixelResponsive'
import { colors } from '../../../shared/theme/colors'

const RecentRecordsScreen = ({ navigation }: any) => {
    // Define your original data
    const originalData = [
        { id: 1, Icon: appImages.Email, title: 'Email', Desc: '2343weewabc1234@gmail.com' },
        { id: 2, Icon: appImages.Map, title: 'Location', Desc: '23232, St low Dhaka, Bangladesh' },
        { id: 3, Icon: appImages.QrScan, title: 'QR Code', Desc: 'Lorem Ipsum doler zebta roakl locki' },
        { id: 4, Icon: appImages.Url, title: 'URL', Desc: 'www.konsasosssdnasnskmks.com' },
    ];

    // State variable for search query and filtered data
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(originalData);

    // Function to handle search query changes
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        // Filter the original data based on the search query
        const filtered = originalData.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );
        // Update the filtered data state
        setFilteredData(filtered);
    };

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
                    onChangeText={handleSearch}
                    value={searchQuery}
                />
            </View>
            <View>
                {filteredData.map(item => (
                    <RecentRecordsScreenCard
                        key={item.id}
                        Icon={item.Icon}
                        title={item.title}
                        Desc={item.Desc}
                    />
                ))}
            </View>
        </View>
    )
}

export default RecentRecordsScreen
