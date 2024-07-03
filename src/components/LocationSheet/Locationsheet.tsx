import React, { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity, Dimensions,PermissionsAndroid, Alert, } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { HP, WP, appRadius, colors, family, size } from '../../exporter';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import NfcManager, { NfcTech, Ndef, } from 'react-native-nfc-manager';
import { checkNfcSupport, showErrorToast, showSuccessToast } from '../../shared/utilities/Helper';
import { createTags, upadteTags } from '../../shared/utilities/services/mainServices';
import { useDispatch } from 'react-redux';
import { AppLoader } from '../AppLoader';
import { addTag, updateTagAction } from '../../redux/Slices/MainSlice';
import { getIconOfSocialLink } from '../../shared/utilities/constants';
const Locationsheet = forwardRef(({textdata,isUpdated,setIsUpdated}, ref) => {



    // locaal states
    const [location, setLocation] = useState(null);
    const dispatch = useDispatch()
    const mapRef = useRef(null);
    const requestLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Geolocation Permission',
              message: 'Can we access your location?',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
         
          if (granted === 'granted') {
        
            return true;
          } else {
         
            return false;
          }
        } catch (err) {
          return false;
        }
      };

    const refRBSheet = useRef();
    const screenHeight = Dimensions.get('window').height;
    // local states
    const [isLoading, setIsLoading] = useState(false)

    useImperativeHandle(ref, () => ({
        open: () => {
            refRBSheet.current.open();
        },
        close: () => {
            refRBSheet.current.close();
        },
    }));
const handleSubmit = async()=>{
  try {
    if (!location || !location.latitude || !location.longitude) {
      Alert.alert("Warning!", "Please select a location.");
      return;
    }
    const nfcSupported = await checkNfcSupport();
    if (!nfcSupported) return
    await NfcManager.start();
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const geoUri = `geo:${location.latitude},${location.longitude}`;
    const record = Ndef.uriRecord(geoUri);
    const bytes = Ndef.encodeMessage([record]);
    if (bytes) {
      await NfcManager.ndefHandler.writeNdefMessage(bytes);
      showSuccessToast("Tag Successfully Writte","Scan to access")
      {isUpdated ===true ?
        handleupdate(geoUri):
        HandleApidata(geoUri)
                 }
    } else {
      showErrorToast("Tag Write Failed", "Unable to encode message.");
    }
  } catch (error) {
    showErrorToast("Tag Scanned Failed", "Kindly Tag the scan properly");

  } finally {
    NfcManager.cancelTechnologyRequest();
  }
}


const HandleApidata =(value:any)=>{
  try {
      setIsLoading(true)
      const params = {
    type:textdata?.iconName || "",
    linkName:textdata?.iconName ||"",
       value:value || "",
   }
  createTags(params).then((res:any)=>{
      dispatch(addTag(res?.data?.data))
      showSuccessToast("Tag Successfully Writte","Scan to access")
      setIsLoading(false)
      refRBSheet.current.close();
      setLocation(null)
  }).catch((error)=>{
      showErrorToast('Tags Failed', error?.response?.data?.message || 'An error occurred');
      setIsLoading(false)
  }).finally(()=>{
setIsLoading(false)
  })
  } catch (error: any) {
      console.log("error",error)
      setIsLoading(false)
  }
}
const handleupdate=(value)=>{
  try {
      setIsLoading(true)
      const params = {
     type:textdata?.linkName || "",
     linkName:textdata?.linkName ||"",
       value:value || "",
    }
   upadteTags(textdata?.id, params).then((res:any)=>{
      dispatch(updateTagAction(res?.data?.data))
     showSuccessToast("Tag Successfully updated","Scan to access")
    refRBSheet.current.close();
    setLocation(null)
   }).catch((error)=>{
       showErrorToast('Tags Failed', error?.response?.data?.message || 'An error occurred');
      setIsLoading(false)
   }).finally(()=>{
setIsLoading(false)
  })
  } catch (error: any) {
      console.log("error",error)
       setIsLoading(false)
   }
}




const getLocation = () => {
   try {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position?.coords || {};
            setLocation({
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
    
            if (mapRef.current) {
              mapRef.current.animateToRegion({
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }, 1000);
            }
          } ,
          error => {
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
   } catch (error) {
    
   }
   
  };
  const handleMapPress = (event:any) => {
    try {
        const { coordinate } = event?.nativeEvent;
        const { latitude, longitude } = coordinate;
        setLocation({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
    } catch (error) {
        
    }
  };
const cancelbtn =()=>{
    refRBSheet.current.close();
}

const handlePress = (data, details = null) => {
    try {
        setLocation({
            latitude: details?.geometry?.location?.lat,
            longitude: details?.geometry?.location?.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }); 
    } catch (error) {
        
    }
  };

  const handleError = (error) => {
    console.error("Error occurred:", error);
  };

    return (       
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
          closeOnPressMask={true}
          animationType="slide"
          height={screenHeight-300}
            customStyles={{
                    wrapper: {
                        flex:1,
                    },
                    container: {
                        borderTopLeftRadius: 30, // Rounded top-left corner
                        borderTopRightRadius: 30, // Rounded top-right corner
                        marginTop:WP("3")
                    },


                draggableIcon: {
                    backgroundColor: '#000',
                },
            }}>
                 <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
                <View style={styles.viewsecond}>
                  <AppLoader loading={isLoading}/>
                  {isUpdated  ?
                 <Image 
              source={getIconOfSocialLink(textdata?.linkName) || ""}
            style={styles.img}
                /> :
           <Image 
           source={ textdata?.icon || ""}
            style={styles.img}
            /> }
                {isUpdated ?
               <Text style={styles.txt}>{textdata?.linkName || ""}</Text>:
             <Text style={styles.txt}>{textdata?.iconName || ""}</Text>
                }

             <GooglePlacesAutocomplete
        placeholder='Enter Location'
        minLength={2}
        autoFocus={false}
        returnKeyType={'default'}
        fetchDetails={true}
        enablePoweredByContainer={false}
        onPress={handlePress}
        onError={handleError}
        styles={{
            textInputContainer: {
              backgroundColor: '#FFFFFF',
              width:WP("80"),
              height:HP("20"),
              marginTop:WP("5")
            },
            textInput: {
              height: HP("6"),
              color: '#A0A0A0',
              fontSize: 18,
            //   backgroundColor:"#D4D4D4",
              borderRadius:20,
              borderColor:"#D4D4D4",
              borderWidth:1,
            //   paddingVertical: 1,
              paddingHorizontal: 20,
            },
            predefinedPlacesDescription: {
              color: 'blue',
            },
            description: {
                fontWeight: 'bold',
                borderTopWidth: 0,
                borderBottomWidth: 0,
                opacity: 0.9,
              },
              listView: {
                color: 'black',
                position: 'absolute',
                top: 70,
                // left: -40,
                width: WP("80"),
                elevation: 1,
              },
          }}
  
      query={{
        key: 'AIzaSyCTlurrGV8SDK2kAONF8l_3KC7v4vIdu4g',
        language: 'en',
      }}
    
    
    />




<View style={{width:WP("80"),height:HP("30"), justifyContent:"center", alignItems:"center",}}>

<MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            region={location}
        showsUserLocation={true}
        onPress={handleMapPress}
            zoomEnabled={true}
            showsUserLocation={true}>
{location && (
          <Marker coordinate={location} />
        )}
        </MapView>
</View>

<TouchableOpacity style={styles.btnlocation}
onPress={()=>getLocation()}
>
<Text style={styles.txtlocation}>Use Current Location</Text>
</TouchableOpacity>
<View style={styles.buttonsBox}>
      <TouchableOpacity style={styles.cancelBtn}
          onPress={cancelbtn}>
          <Text style={[styles.btnTxt, { color: colors.g21 }]}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}
      onPress={handleSubmit}>
          <LinearGradient colors={["#17AE41", '#4DCB2E']}
              style={styles.button}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
          >
              <Text style={styles.btnTxt}>{isUpdated?"Update":"Save"}</Text>
          </LinearGradient>
      </TouchableOpacity>

  </View>

            </View>
            </View>
            </KeyboardAwareScrollView>
        </RBSheet>
        
    );
});

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:"center"
    },
viewsecond:{
    marginTop:WP("4"),
     justifyContent:"center",
      alignItems:"center"
},
    txt: {
        color: colors.g21,
        fontSize: size.small,
        // marginTop: HP(1)
    },
    buttonsBox: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: HP(3),
        justifyContent: 'space-between',
        // backgroundColor: 'red',

    },
    cancelBtn: {
        borderRadius: appRadius.boxRadius,
        alignItems: 'center',
        height: HP(6),
        width: WP(40),
        borderWidth: 1,
        borderColor: colors.g21,
        justifyContent: 'center',
        marginRight:2

    },
    buttonContainer: {
    
        alignItems: 'center'
    },
    button: {
        borderRadius: appRadius.boxRadius,
        alignItems: 'center',
        height: HP(6),
        width: WP(40),
        justifyContent: 'center',
        marginLeft:5
    },
    btnTxt: {
      color: colors.bg1,
      fontFamily: family.InterSemiBold,
      fontSize: size.normal
    },

    img:{
        width:40,
         height:40, 
         resizeMode:"center"
    },
    btnlocation:{
        width:WP("80"),
        height:HP("6"),
         borderColor:"#4DCB2E",
          borderWidth:1,
           borderRadius:10,
            justifyContent:"center",
            alignItems:"center",
             alignSelf:"center",
              marginTop:WP("5")
    },
    txtlocation:{
       fontSize:size.small,
       color:"#4DCB2E",
       fontFamily:family.InterExtraLight 
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 10,
      }

});

export {Locationsheet};
