import React, { useRef, forwardRef, useImperativeHandle, useState,useEffect } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity, Platform, Alert } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { HP, MyStatusBar, UrlTextInput, WP, appImages, appRadius, colors, family, size } from '../../exporter';
import { Formik } from 'formik'
import { TextUrlFields, Textschema } from '../../shared/utilities/validation';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NfcManager, { NfcTech, Ndef, } from 'react-native-nfc-manager';
const TextAction = forwardRef(({textdata,isUpdated,setIsUpdated}, ref) => {
    const refRBSheet = useRef();

    //  local state
    const [isNfcReady, setIsNfcReady] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => {
            refRBSheet.current.open();
        },
        close: () => {
            refRBSheet.current.close();
        },
    }));

    useEffect(() => {
        const initializeNfc = async () => {
          try {
            await NfcManager.start();
          } catch (ex) {
            console.warn('NFC initialization error', ex);
          }
        };
    
        initializeNfc();
    
        return () => {
          NfcManager.setEventListener(NfcTech.Ndef,null);
          NfcManager.unregisterTagEvent();
          NfcManager.close();
        };
      }, []);
      const handleNfcDiscover = async () => {
        console.log("heloooo+++++++")
        const message = [Ndef.textRecord('Hello NFC')];
        try {
            let bytes = Ndef.encodeMessage(message);
            let result = await NfcManager.writeNdefMessage(bytes);
            console.log('Write success', result);
          Alert.alert('NFC Tag Written', 'Message written to NFC tag successfully!');
        } catch (ex) {
          console.warn('Write failed', ex);
          Alert.alert('NFC Write Error', 'Failed to write message to NFC tag.');
        }
      };




const handleSubmit =async ()=>{
    const message = [Ndef.textRecord('Hello NFC')];
    const bytes = Ndef.encodeMessage(message);
      try {
        await NfcManager.cancelTechnologyRequest();

        // Request NFC technology
        await NfcManager.requestTechnology(NfcTech.Ndef);
        // const ndefHandler = await NfcManager.ndefHandler();

  
        // Write the message to the NFC tag
        // await NfcManager.transceive(bytes);
        // console.log('Write success');
        // Alert.alert('NFC Tag Written', 'Message written to NFC tag successfully!');

        // const tag = await NfcManager.getTag();
        // if (!tag) {
        //     Alert.alert('No tag found');
        //   }
        //   if (!tag?.ndefMessage) {
        //     Alert.alert('Tag does not support NDEF');
        //   }
        // if (tag) {
        //     await NfcManager.transceive(bytes);
        //     console.log('Write success');
        //     Alert.alert('NFC Tag Written', 'Message written to NFC tag successfully!');
        //   }
  
  
      } catch (ex) {
        console.warn('Request NFC permission failed', ex);
        Alert.alert('NFC Request Error', 'Failed to request NFC permission.');
      }
      finally {
        // Ensure that NFC technology is released after the operation
        NfcManager.setEventListener(NfcTech.Ndef, null);
        NfcManager.cancelTechnologyRequest();
      }
}

const cancelbtn =()=>{
    refRBSheet.current.close();

}
    return (
        <KeyboardAwareScrollView>
        <Formik
        initialValues={TextUrlFields}
        validationSchema={Textschema}
        onSubmit={handleSubmit}
    >
        {({ values, errors, touched, setFieldTouched, handleChange, handleSubmit }) => (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
          closeOnPressMask={true}
          animationType="slide"
          
          
            customStyles={{
                wrapper: {
                    flex:1,
                    // backgroundColor: 'white',
                },
                container: {
                    borderTopLeftRadius: 30, // Rounded top-left corner
                    borderTopRightRadius: 30, // Rounded top-right corner
                },
                draggableIcon: {
                    backgroundColor: '#000',
                    width: 50,
                    height: 5,
                    borderRadius: 2.5,
                    marginVertical: 10,
                },
            }}>
            <View style={styles.content}>
                <MyStatusBar backgroundColor={"white"}/>
                <View style={styles.viewsecond}>
           <Image 
       source={textdata?.icon || ""}
        style={styles.img}
            /> 
             <Text style={styles.txt}>{textdata?.title || ""}</Text>

<UrlTextInput
 placeholder={`Add ${textdata?.title || "" }`}
 placeholderTextColor="gray"
value={values.TextAction}
onChangeText={handleChange("TextAction")}
touched={errors.TextAction}
errorMessage={errors.TextAction}
/>

<View style={styles.buttonsBox}>
      <TouchableOpacity style={styles.cancelBtn}
          onPress={cancelbtn}
      >

          <Text style={[styles.btnTxt, { color: colors.g21 }]}>Cancel</Text>

      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer}
      onPress={handleSubmit}
      >
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
        </RBSheet>
          )}
          </Formik>
          </KeyboardAwareScrollView>
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
        width: WP(83),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: HP(2),
        justifyContent: 'space-between',
        marginBottom:WP('3')
    },
    cancelBtn: {
        borderRadius: appRadius.boxRadius,
        alignItems: 'center',
        height: HP(6),
        width: WP(40),
        borderWidth: 1,
        borderColor: colors.g21,
        justifyContent: 'center'
    },
    buttonContainer: {
    
        alignItems: 'center'
    },
    button: {
        borderRadius: appRadius.boxRadius,
        alignItems: 'center',
        height: HP(6),
        width: WP(40),
        justifyContent: 'center'
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
});

export { TextAction };
