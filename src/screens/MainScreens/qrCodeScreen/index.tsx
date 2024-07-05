import { Alert,Platform, StyleSheet, Text, TouchableOpacity, View,PermissionsAndroid, Image } from 'react-native'
import React,{useEffect, useState} from 'react'
import style from './style'
import ScreenHeader from '../../../components/screenHeader/ScreenHeader'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { HP, WP, colors } from '../../../exporter';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';
import { showErrorToast, showSuccessToast } from '../../../shared/utilities/Helper';
import { addTag, updateTagAction } from '../../../redux/Slices/MainSlice';
import { useDispatch } from 'react-redux';
import { AppLoader } from '../../../components/AppLoader';
import { createTags, upadteTags } from '../../../shared/utilities/services/mainServices';
const QRCodeScreen = ({ navigation, route }: any) => {
// local staffs
const [cameraReady, setCameraReady] = useState(false);
const [QrData , setQrData] = useState("")
const [isLoading, setIsLoading] = useState(false)
const textdata = route?.params?.selected
const isUpdated = route?.params?.textupdate

  useEffect(() => {
    camerapermission()
    initializeScanner();
  }, []);
  const initializeScanner = () => {
    setCameraReady(true);
  };

  const dispatch=useDispatch()

const camerapermission =()=>{
  const requestCameraPermission = async () => {
    if (Platform.OS === 'ios') {
      const result = await check(PERMISSIONS.IOS.CAMERA);
      if (result !== RESULTS.GRANTED) {
        await request(PERMISSIONS.IOS.CAMERA);
      }
    } else if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (result !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Camera Permission Denied');
      }
    }
  };
}

   const onSuccess = async(e:any) => {
    try {
      const qrCodeData = JSON.stringify(e.data);
      setQrData(qrCodeData);
      await writeToNfcTag(qrCodeData);
    } catch (error) {
      
    }

      };
      
      const writeToNfcTag = async (data) => {
        try {
          await NfcManager.start(); // Start NFC manager
          showSuccessToast("Alert Ready for scan","Please Scan the tag")
          await NfcManager.requestTechnology(NfcTech.Ndef); // Request NDEF technology
          // Prepare NDEF records (example: text record with QR code data)
          const record = Ndef.uriRecord(data);
          const bytes = Ndef.encodeMessage([record]);
          if (bytes) {
            await NfcManager.ndefHandler.writeNdefMessage(bytes); // Write NDEF message to NFC tag
            {isUpdated ===true ?
              handleupdate(data):
              HandleApidata(data)
              }
          }
        } catch (error) {
          showErrorToast("Tag Write Failed", "Please Close the Tag and scan properly");
        } finally {
          NfcManager.cancelTechnologyRequest(); // Cancel NFC technology request
        }
      };


      const HandleApidata =(value:any)=>{
          try {
              setIsLoading(true)
              const params = {
              type:textdata.iconName,
              linkName:textdata.iconName,
               value:value,
                 }
              createTags(params).then((res:any)=>{
              dispatch(addTag(res?.data?.data))
              showSuccessToast("Tag Successfully Writte","Scan to access")
              setIsLoading(false)
              setQrData("")
              navigation.goBack()
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
        const handleupdate=(value:any)=>{
          try {
              setIsLoading(true)
              const params = {
             type:textdata?.linkName,
             linkName:textdata?.linkName,
               value:value,
            }
           upadteTags(textdata?.id, params).then((res:any)=>{
              dispatch(updateTagAction(res?.data?.data))
             showSuccessToast("Tag Successfully updated","Scan to access")
             setQrData("")
             navigation.goBack()
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


    return (
        <View style={style.container}>
            <ScreenHeader
                heading={'Scan QR'}
                onClick={() => navigation.goBack()}
            />
            <AppLoader loading={isLoading}/>
            {QrData === "" ||QrData === null ||QrData === undefined ?
        <QRCodeScanner
      onRead={onSuccess}
      reactivate={false}
      // reactivateTimeout={2000}
      cameraStyle={style.camerastyle}
      containerStyle={style.scanQRBox}
      topViewStyle={{backgroundColor:"white"}}
      showMarker={true}
      markerStyle={{width:WP("70"), height:HP("40"), borderWidth:1, borderColor:colors.green}}
      topContent={
        <Text style={{ flex: 1, textAlign: 'center', marginTop: 20 }}>
          {cameraReady ? 'Scanning QR Code...' : 'Camera loading...'}
        </Text>
      }
    />
:null}
        </View>
    )
}

export default QRCodeScreen

const styles = StyleSheet.create({})

function showAlert(data: any) {
  throw new Error('Function not implemented.');
}
