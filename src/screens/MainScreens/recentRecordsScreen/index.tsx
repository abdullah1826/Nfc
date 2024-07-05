import { Image,ScrollView,TextInput, View } from 'react-native'
import React, { useState,useRef } from 'react'
import style from './style'
import RecentRecordsScreenCard from '../../../components/RecentRecordsScreenCard/RecentRecordsScreenCard'
import { appIcons, } from '../../../shared/theme/assets'
import ScreenHeader from '../../../components/screenHeader/ScreenHeader'
import { colors } from '../../../shared/theme/colors'
import { Contactsheet, EmailSheet, Locationsheet, PhoneSheet, SocialSheet, TextAction, UrlActionSheet, WP } from '../../../exporter'
import { useDispatch, useSelector } from 'react-redux'
import { getIconOfSocialLink } from '../../../shared/utilities/constants'
import { deleteTags } from '../../../shared/utilities/services/mainServices'
import { AppLoader } from '../../../components/AppLoader'
import { setdeleteTags } from '../../../redux/Slices/MainSlice'
import { showErrorToast, showSuccessToast } from '../../../shared/utilities/Helper'

const RecentRecordsScreen = ({ navigation }: any) => {

// redux stafs
  const {TagsAllRecord} =useSelector<any>((state:any) => state.main);
  const dispatch = useDispatch()
    // refs
    const refTextSheet = useRef();
const refUrlSheet = useRef();
const refPhoneSheet = useRef();
const refContectSheet = useRef();
const refEmailShet = useRef();
const refLocationsheet = useRef();
const refRBSheet = useRef();


    // local states
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedData, setSelectedData] = useState(null);
    const [isUpdated, setIsUpdated] = useState(false);

    // Function to handle search query changes

    const filteredData = TagsAllRecord?.filter((item:any) => {
      const linkName = item.linkName ? item.linkName.toLowerCase() : '';
      const query = searchQuery ? searchQuery.toLowerCase() : '';
      return linkName.includes(query);
    });


    // handle Edit button data
    const handleEditData = (item) => {
        setSelectedData(item);
        setIsUpdated(true); 
        switch (item.linkName) {
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
            case 'Youtube':
              refRBSheet.current.open();
              break;
              case 'Tiktok':
                refRBSheet.current.open();
                break;
                case 'Instagram':
                  refRBSheet.current.open();
                  break;
                  case 'Facebook':
                    refRBSheet.current.open();
                    break;
                    case 'SnapChat':
                      refRBSheet.current.open();
                      break;
                      case 'LinkedIn':
                        refRBSheet.current.open();
                        break;
                        case 'Spotify':
                          refRBSheet.current.open();
                          break;
                          case 'Discored':
                            refRBSheet.current.open();
                            break;
                            case 'Reddit':
                              refRBSheet.current.open();
                              break;
                              case 'Pinterest':
                                refRBSheet.current.open();
                                break;
                                case 'Twitter':
                                  refRBSheet.current.open();
                                  break;
                                  case 'Github':
                                    refRBSheet.current.open();
                                    break;
          case 'Social Links':
            navigation.navigate('SocialLinksScreen');
            break;
          case 'QR Code':
            navigation.navigate('QRCodeScreen',{textupdate:true, selected:item});
            break;
          default:
            break;
        }
      };

// handle delete
const handleDeleteData =(item:any)=>{
  if(item.status ===1){
    showErrorToast('Failed','Cannot deleted this tag because data store in Nfc tag ');
    return
  }
  try {
    setIsLoading(true)
    deleteTags(item?.id).then((res)=>{
dispatch(setdeleteTags(item?.id))
showSuccessToast("Tag Successfully deleted")
setIsLoading(false)
    }).catch((error)=>{
console.log("error", error)
showErrorToast('Tags Failed', error?.response?.data?.message || 'An error occurred');
setIsLoading(false)
    }).finally(()=>{
      setIsLoading(false)

    })
  } catch (error) {
    
  }
}

    return (
        <View style={style.container}>
            <ScreenHeader
                heading={'Recent Records'}
                onClick={() => { navigation.goBack() }}
            />
            <AppLoader loading={isLoading}/>
            <View style={style.searchBox}>
                <Image source={appIcons.Search} style={style.searchIcon} />
                <TextInput
                    placeholder='Search'
                    placeholderTextColor={colors.g21}
                    style={style.input}
                    onChangeText={text => setSearchQuery(text)}
                    value={searchQuery}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{flex:1,padding:WP("2"),justifyContent:"center", alignItems:"center",alignSelf:"center"}}>
                {filteredData.map((item:any) => (
                    <RecentRecordsScreenCard
                        key={item.id}
                        Icon={getIconOfSocialLink(item?.linkName)}
                        title={item?.linkName}
                        Desc={item.value}
                        editpress={()=>handleEditData(item)}
                        deletepress={()=>handleDeleteData(item)}
                        showDeleteButton={item}
                    />
                ))}
                 </View>
            </ScrollView>
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

<SocialSheet
ref={refRBSheet}
textdata={selectedData}
isUpdated={isUpdated}
setIsUpdated={setIsUpdated}
/>


        </View>
    )
}

export default RecentRecordsScreen
