import NetInfo from '@react-native-community/netinfo';
import {useEffect,useState} from 'react';
import { Alert } from 'react-native';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';
import { Platform } from 'react-native';
import Toast, { BaseToast,ErrorToast } from 'react-native-toast-message';
export const checkConnected = () => {
    return NetInfo.fetch().then(state => {
      return state.isConnected;
    });
  };



 export const useNetworkStatus = () => {
    const [isConnected, setIsConnected] = useState(true);
  
    useEffect(() => {
      const fetchInitialState = async () => {
        const initialStatus = await checkConnected();
        setIsConnected(initialStatus);
      };
  
      fetchInitialState();
  
      const unsubscribe = NetInfo.addEventListener(state => {
        setIsConnected(state?.isConnected);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
  
    return isConnected;
  };



  export const checkNfcSupport = async () => {
             const supported = await NfcManager.isSupported();
             if (!supported) {
                 showErrorToast('NFC Not Supported', 'Your device does not support NFC.')
                 return false;
           }
             const enabled = await NfcManager.isEnabled();
             if (!enabled) {
                 showErrorToast('NFC Disabled', 'Please enable NFC in settings.')
                 return false;
             }
             return true;
       }

       const showToast = (type:any, title:any, message:any) => {
        Toast.show({
          type: type,
          text1: title,
          text2: message,
          topOffset: 60,
          visibilityTime: 6000,
        });
      };
      
      export const showSuccessToast = (title:any, message:any) => {
        showToast('success', title, message);
      };
      
      export const showErrorToast = (title:any, message:any) => {
        showToast('error', title, message);
      };


export const getPlatform = () => {
  return Platform.OS; // Returns either 'ios' or 'android'
};

export const toastConfig = {
  success: (props:any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: 'bold'
      }}
      text2Style={{
        fontSize: 15,
        color: 'green'
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: 'red' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: 'bold'
      }}
      text2Style={{
        fontSize: 13,
        color: 'red'
      }}
    />
  ),
  // You can add more custom types here if needed
};