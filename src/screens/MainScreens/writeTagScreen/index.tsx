import { View, Text, Image, TextInput, FlatList } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import style from './style'
import ScreenHeader from '../../../components/screenHeader/ScreenHeader'
import { appIcons, appImages } from '../../../shared/theme/assets'
import { colors } from '../../../shared/theme/colors'
import WriteTagScreenCard from '../../../components/writeTagScreenCard/WriteTagScreenCard'
import { writeTagScreenCardData } from '../../../shared/utilities/constants'
import { HP, WP } from '../../../shared/theme/PixelResponsive'
import BottomSheetForWriteTag from '../../../components/bottomSheetForWriteTag/BottomSheetForWriteTag'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'

interface selectedItemProps {
    key: number;
    title: string;
    icon: any; // Adjust this type based on what the icon is, e.g., string or a specific type if you're using a particular icon library
}

const WriteTag = ({ navigation }: any) => {
// local states
    const [selectedItem, setSelectedItem] = useState<selectedItemProps | null>(null);
    const [search, setSearch] = useState('');

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
    }, []);

    useEffect(() => {
        if (selectedItem) {
            handlePresentModalPress();
        }
    }, [selectedItem]);

    const fieldConfigurations = {
        text: [{ type: 'text', label: 'Text', value: '' }],
        url: [{ type: 'text', label: 'URL', value: '' }],
        phonecall: [{ type: 'text', label: 'Phone Call', value: '' }],
        email: [
            { type: 'text', label: 'Recipient Email', value: '' },
            { type: 'text', label: 'Email Subject', value: '' },
            { type: 'text', label: 'Email Body', value: '' },
        ],
        contact: [
            { type: 'text', label: 'Contact Name', value: '' },
            { type: 'text', label: 'Company', value: '' },
            { type: 'text', label: 'Address', value: '' },
            { type: 'text', label: 'Phone Number', value: '' },
            { type: 'text', label: 'Website', value: '' }
        ],
        location: [
            { type: 'text', label: 'Latitude', value: '' },
            { type: 'text', label: 'Longitude', value: '' }
        ],
        // Add other item types and their fields as needed
    };
    const filteredData = writeTagScreenCardData?.filter(item =>
        item?.title.toLowerCase().includes(search.toLowerCase())
      );

    return (
        <BottomSheetModalProvider>
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
                                title={item.title}
                                icon={item.icon}
                                onClick={() => {
                                    if (item.title == 'QR Code') {
                                        navigation.navigate('QRCodeScreen');
                                        bottomSheetModalRef?.current?.close();
                                    } else if (item.title == 'Socail Links') {
                                        navigation.navigate('SocailLinksScreen');
                                        bottomSheetModalRef?.current?.close();
                                    } else {
                                        setSelectedItem(null);
                                        setTimeout(() => {
                                            setSelectedItem(item);
                                        }, 0);
                                    }
                                }}
                            />
                        )}
                    />
                </View>
                {
                    selectedItem &&

                    <BottomSheetForWriteTag
                        ref={bottomSheetModalRef}
                        onChange={handleSheetChanges}
                        item={selectedItem}
                        fields={fieldConfigurations[selectedItem.title.toLowerCase()]}
                    />
                }
            </View>
        </BottomSheetModalProvider>
    )
}

export default WriteTag