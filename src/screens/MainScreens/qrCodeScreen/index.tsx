import { Alert,Platform, StyleSheet, Text, TouchableOpacity, View,PermissionsAndroid, Image } from 'react-native'
import React,{useEffect, useState} from 'react'
import style from './style'
import ScreenHeader from '../../../components/screenHeader/ScreenHeader'
import { appIcons } from '../../../shared/theme/assets'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';
import { HP, WP, colors, family, size } from '../../../exporter'
const QRCodeScreen = ({ navigation }: any) => {
// local staffs
const [openCmera , setOpenCamera] = useState(false)
const [QrData , setQrData] = useState("")
  useEffect(() => {
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

    requestCameraPermission();
  }, []);


   const onSuccess = e => {
      // Alert.alert("hello msg ++++++",JSON.stringify(e))
      setQrData(JSON.stringify(e))
      console.log("res",e)
      setOpenCamera(false)
      };

      const openQrcode =()=>{
setOpenCamera(true)
      }
    return (
        <View style={style.container}>
            <ScreenHeader
                heading={'Scan QR'}
                onClick={() => navigation.goBack()}
            />

         <QRCodeScanner
        onRead={onSuccess}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        cameraStyle={style.camerastyle}
        // containerStyle={style.scanQRBox}
         topContent={
           <Text style={style.centerText}>
        {/* {QrData} */}
           </Text>
         }
       
      />
    
        </View>
    )
}

export default QRCodeScreen

const styles = StyleSheet.create({})