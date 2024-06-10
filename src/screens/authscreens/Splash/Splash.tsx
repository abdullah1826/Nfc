import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import style from './style'
import { useSelector } from 'react-redux'
import { applogos } from '../../../exporter'

const Splash = ({ navigation }: any) => {
const {isAuthenticated} = useSelector((state:any)=>state?.user) 
    useEffect(() => {
        handleAppEntry();
      }, []);
    
      const handleAppEntry = async () => {
        setTimeout(() => {
          if (isAuthenticated) {
            navigation.replace('HomeStack', {
              screen: 'Home',
            });
          } else {
            navigation.replace('Login');
          }
        }, 2000);
      };
    

    return (
        <View style={style.rootConatiner}>
            <Image source={applogos.logo} style={style.logo} />
        </View>

    )
}

export default Splash

const styles = StyleSheet.create({

})