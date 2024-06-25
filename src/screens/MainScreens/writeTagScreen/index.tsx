import { View, Text, Image, TextInput, FlatList } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import style from './style'
import ScreenHeader from '../../../components/screenHeader/ScreenHeader'
import { appIcons, appImages } from '../../../shared/theme/assets'
import { colors } from '../../../shared/theme/colors'
import WriteTagScreenCard from '../../../components/writeTagScreenCard/WriteTagScreenCard'
import { writeTagScreenCardData } from '../../../shared/utilities/constants'
import { HP, WP } from '../../../shared/theme/PixelResponsive'
import { Contactsheet, EmailSheet, Locationsheet, PhoneSheet, TextAction, UrlActionSheet } from '../../../exporter'


const WriteTag = ({ navigation }: any) => {
// ref sheets
const refTextSheet = useRef();
const refUrlSheet = useRef();
const refPhoneSheet = useRef();
const refContectSheet = useRef();
const refEmailShet = useRef();
const refLocationsheet = useRef();
    
// local states
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [search, setSearch] = useState('');
    const [selectedData, setSelectedData] = useState(null);

    // refs
    const filteredData = writeTagScreenCardData?.filter(item =>
        item?.title.toLowerCase().includes(search.toLowerCase())
      );


const handleOnclicked=(item:any)=>{
  // console.log("itemmmm", item)
    setSelectedData(item);
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
      case 'Socail Links':
        navigation.navigate('SocailLinksScreen');
        break;
      case 'QR Code':
        navigation.navigate('QRCodeScreen');
        break;
      default:
        break;
    }


}


    return (
            <View style={style.container}>
                <ScreenHeader
                    heading={'Write Tag'}
                    onClick={() => navigation.goBack()}
                />
                <View style={style.searchBox}>
                    <Image source={appIcons.Search} style={style.searchIcon} />
                    <TextInput
                        placeholder='Search'
                        placeholderTextColor={colors.g21}
                        style={style.input}
                        onChangeText={setSearch}
                        value={search}
                    />
                </View>

                <View>
                    <FlatList
                        contentContainerStyle={{ marginHorizontal: WP(1), height: HP(80) }}
                        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
                        data={filteredData}
                        numColumns={2}
                        keyExtractor={(item) => item.key.toString()}
                        renderItem={({ item, index }) => (
                            
                            <WriteTagScreenCard
                                title={item?.title}
                                icon={item?.icon}
                                onClick={() => handleOnclicked(item)}
                            />
                        )}
                    />
                </View>

<TextAction 
ref={refTextSheet}
textdata={selectedData}
/>



<UrlActionSheet
ref={refUrlSheet}
textdata={selectedData}
/>
<PhoneSheet
ref={refPhoneSheet}
textdata={selectedData}
/>
<Contactsheet
ref={refContectSheet}
textdata={selectedData}
/>

<EmailSheet
ref={refEmailShet}
textdata={selectedData}
/>

<Locationsheet
ref={refLocationsheet}
textdata={selectedData}
/>

            </View>
    )
}

export default WriteTag