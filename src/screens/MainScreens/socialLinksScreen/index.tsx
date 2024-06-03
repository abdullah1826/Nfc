import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import style from './style'
import ScreenHeader from '../../../components/screenHeader/ScreenHeader'
import { SocialLinksScreenData } from '../../../shared/utilities/constants'
import { HP, WP } from '../../../shared/theme/PixelResponsive'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import BottomSheetSocailLinks from '../../../components/bottomSheetSocialLinks/BottomSheetSocailLinks'
import { appIcons } from '../../../shared/theme/assets'
import { colors } from '../../../shared/theme/colors'

interface selectedItemProps {
    key: number;
    iconName: string;
    icon: any; // Adjust this type based on what the icon is, e.g., string or a specific type if you're using a particular icon library
}

const SocailLinksScreen = ({ navigation }: any) => {

    const [selectedItem, setSelectedItem] = useState<selectedItemProps | null>(null);

    console.log('Icon Select =>>>>>>>>>>>...', selectedItem);

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    useEffect(() => {
        if (selectedItem) {
            handlePresentModalPress();
        }
    }, [selectedItem]);

    return (
        <BottomSheetModalProvider>
            <View style={style.container}>
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
                    />
                </View>

                <View>
                    <FlatList
                        data={SocialLinksScreenData}
                        numColumns={3}
                        contentContainerStyle={{ marginTop: HP(5), gap: HP(4), paddingHorizontal: WP(5) }}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity key={item.key} style={style.socialLinksBox}
                                onPress={() => {
                                    setSelectedItem(null);
                                    setTimeout(() => {
                                        setSelectedItem(item);
                                    }, 0);

                                }}
                            >
                                <Image source={item.icon} style={style.icon} />
                                <Text style={style.iconName}>{item.iconName}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {
                    selectedItem &&

                    <BottomSheetSocailLinks
                        ref={bottomSheetModalRef}
                        onChange={handleSheetChanges}
                        item={selectedItem}
                    />
                }

            </View>
        </BottomSheetModalProvider>
    )
}

export default SocailLinksScreen

const styles = StyleSheet.create({})