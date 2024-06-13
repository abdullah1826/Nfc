import { Image,TextInput, View } from 'react-native'
import React, { useState,useRef } from 'react'
import style from './style'
import RecentRecordsScreenCard from '../../../components/RecentRecordsScreenCard/RecentRecordsScreenCard'
import { appIcons, appImages } from '../../../shared/theme/assets'
import ScreenHeader from '../../../components/screenHeader/ScreenHeader'
import { HP } from '../../../shared/theme/PixelResponsive'
import { colors } from '../../../shared/theme/colors'
import { Contactsheet, EmailSheet, Locationsheet, PhoneSheet, TextAction, UrlActionSheet } from '../../../exporter'

const RecentRecordsScreen = ({ navigation }: any) => {

    // refs
    const refTextSheet = useRef();
const refUrlSheet = useRef();
const refPhoneSheet = useRef();
const refContectSheet = useRef();
const refEmailShet = useRef();
const refLocationsheet = useRef();


    // Define your original data
    const originalData = [
        { id: 1, icon: appImages.Email, title: 'Email', Desc: '2343weewabc1234@gmail.com' },
        { id: 2, icon: appImages.Map, title: 'Location', Desc: '23232, St low Dhaka, Bangladesh' },
        { id: 3, icon: appImages.QrScan, title: 'QR Code', Desc: 'Lorem Ipsum doler zebta roakl locki' },
        { id: 4, icon: appImages.Url, title: 'URL', Desc: 'www.konsasosssdnasnskmks.com' },
    ];

    // all local states staffs
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(originalData);
    const [selectedData, setSelectedData] = useState(null);
    const [isUpdated, setIsUpdated] = useState(false);

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

    const handleEditData = (item) => {
        setSelectedData(item);
        setIsUpdated(true); 
        switch (item.title) {
          case 'Text':
            refTextSheet.current.open();
            break;
          case 'URL':
            refUrlSheet.current.open();
            break;
          case 'PhoneCall':
            refPhoneSheet.current.open();
            break;
          case 'Contact':
            refContectSheet.current.open();
            break;
          case 'Email':
            refEmailShet.current.open();
            break;
          case 'Location':
            refLocationsheet.current.open();
            break;
          case 'Social Links':
            navigation.navigate('SocialLinksScreen');
            break;
          case 'QR Code':
            navigation.navigate('QRCodeScreen');
            break;
          default:
            break;
        }
      };


const handleDeleteData =(item:any)=>{
    console.log("deleetd dataaa",item)
}

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
                        Icon={item.icon}
                        title={item.title}
                        Desc={item.Desc}
                        editpress={()=>handleEditData(item)}
                        deletepress={()=>handleDeleteData(item)}
                    />
                ))}
            </View>
<TextAction 
ref={refTextSheet}
textdata={selectedData}
isUpdated={isUpdated}
setIsUpdated={setIsUpdated}
/>
<UrlActionSheet
ref={refUrlSheet}
textdata={selectedData}
isUpdated={isUpdated}
setIsUpdated={setIsUpdated}
/>
<PhoneSheet
ref={refPhoneSheet}
textdata={selectedData}
isUpdated={isUpdated}
setIsUpdated={setIsUpdated}
/>
<Contactsheet
ref={refContectSheet}
textdata={selectedData}
isUpdated={isUpdated}
setIsUpdated={setIsUpdated}
/>

<EmailSheet
ref={refEmailShet}
textdata={selectedData}
isUpdated={isUpdated}
setIsUpdated={setIsUpdated}
setIsUpdated={setIsUpdated}
/>

<Locationsheet
ref={refLocationsheet}
textdata={selectedData}
isUpdated={isUpdated}
setIsUpdated={setIsUpdated}
/>
        </View>
    )
}

export default RecentRecordsScreen
