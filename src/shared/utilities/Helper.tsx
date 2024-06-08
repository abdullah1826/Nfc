import NetInfo from '@react-native-community/netinfo';
import {useEffect,useState} from 'react';
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

