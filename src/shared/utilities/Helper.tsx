import NetInfo from '@react-native-community/netinfo';
import {useEffect,useState} from 'react';
import { Alert } from 'react-native';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';
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
                 Alert.alert('NFC Not Supported', 'Your device does not support NFC.');
                 return false;
           }
             const enabled = await NfcManager.isEnabled();
             if (!enabled) {
                 Alert.alert('NFC Disabled', 'Please enable NFC in settings.');
                 return false;
             }
             return true;
       }
