import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import style from './style'
import ScreenHeader from '../../../components/screenHeader/ScreenHeader'
import { SocialLinksScreenData } from '../../../shared/utilities/constants'
import { HP, WP } from '../../../shared/theme/PixelResponsive'
import { appIcons } from '../../../shared/theme/assets'
import { colors } from '../../../shared/theme/colors'
import { MyStatusBar, SocialSheet } from '../../../exporter'



const SocailLinksScreen = ({ navigation }: any) => {

    // local states
    const [selectedItem, setSelectedItem] = useState<selectedItemProps | null>(null);
    const [search, setSearch] = useState('');
   

// ref
const refsociallink = useRef();

  

 

    const filteredData = SocialLinksScreenData?.filter(item =>
        item?.iconName.toLowerCase().includes(search.toLowerCase())
      );

    const handleopen =(item:any)=>{
        setSelectedItem(item)
refsociallink.current.open();
    }

    return (
            <View style={style.container}>
                <MyStatusBar backgroundColor={"white"}/>
                <ScreenHeader
                    heading={'Social Links'}
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
                        data={filteredData}
                        numColumns={3}
                        contentContainerStyle={{ marginTop: HP(5), gap: HP(4), paddingHorizontal: WP(5) }}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity key={item.key} style={style.socialLinksBox}
                                onPress={() =>handleopen(item)}>
                                <Image source={item.icon} style={style.icon} />
                                <Text style={style.iconName}>{item.iconName}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                
<SocialSheet
ref={refsociallink}
textdata={selectedItem}
/>
            </View>
    )
}

export default SocailLinksScreen

const styles = StyleSheet.create({})