import { Alert,Platform, StyleSheet, Text, TouchableOpacity, View,PermissionsAndroid, Image } from 'react-native'
import React,{useEffect, useState} from 'react'
import style from './style'
import ScreenHeader from '../../../components/screenHeader/ScreenHeader'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { HP, WP, colors } from '../../../exporter';

const QRCodeScreen = ({ navigation }: any) => {
// local staffs
const [openCmera , setOpenCamera] = useState(true)
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


   const onSuccess = ({data, rawData, type, bounds, target}:any) => {
    // setQrData(JSON.stringify({ data, rawData, type, bounds, target }));
    setOpenCamera(false)
    console.log("QR Code Data:", { data, rawData, type, bounds, target });
      };

    return (
        <View style={style.container}>
            <ScreenHeader
                heading={'Scan QR'}
                onClick={() => navigation.goBack()}
            />
{openCmera &&

<QRCodeScanner
        onRead={onSuccess}
        // flashMode={RNCamera.Constants}
        cameraStyle={style.camerastyle}
        reactivate={false}
        // reactivateTimeout={3000}
        containerStyle={style.scanQRBox}
        topViewStyle={{backgroundColor:"white"}}
        showMarker={true}
        markerStyle={{width:WP("70"), height:HP("40"), borderWidth:1, borderColor:colors.green}}
        // buttonPositive='okey'
         topContent={
           <Text style={style.centerText}>
        {QrData}
        <Text> Scanning QR Code...</Text>
           </Text>
         }
      />
        }
        </View>
    )
}

export default QRCodeScreen

const styles = StyleSheet.create({})