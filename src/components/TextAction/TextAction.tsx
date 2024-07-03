import React, { useRef, forwardRef, useImperativeHandle, useState,useEffect } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity, Platform, Alert } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { HP, MyStatusBar, UrlTextInput, WP, appImages, appRadius, colors, family, size } from '../../exporter';
import { Formik } from 'formik'
import { TextUrlFields, Textschema } from '../../shared/utilities/validation';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NfcManager, { NfcTech, Ndef, } from 'react-native-nfc-manager';
import { checkNfcSupport, showErrorToast, showSuccessToast } from '../../shared/utilities/Helper';
import { useDispatch } from 'react-redux';
import { addTag, updateTagAction } from '../../redux/Slices/MainSlice';
import { createTags, upadteTags } from '../../shared/utilities/services/mainServices';
import { AppLoader } from '../AppLoader';
import { getIconOfSocialLink } from '../../shared/utilities/constants';
const TextAction = forwardRef(({textdata,isUpdated,setIsUpdated}, ref) => {
    const refRBSheet = useRef();

    //  local state
    const [isNfcReady, setIsNfcReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [formValues, setFormValues] = useState("")

const dispatch = useDispatch()

    useImperativeHandle(ref, () => ({
        open: () => {
            refRBSheet.current.open();
        },
        close: () => {
            refRBSheet.current.close();
        },
    }));

    // update methed values chanage function

    // useEffect(() => {
    //     if (isUpdated) {
    //         setFormValues({
    //             TextAction: 'Updated urllllllll', 
    //         });
    //     }
    // }, [isUpdated]);

const handleSubmit =async (values: any, { resetForm }: any)=>{
     const nfcSupported = await checkNfcSupport();
    if (!nfcSupported) return
     await NfcManager.start();
     await NfcManager.requestTechnology(NfcTech.Ndef);
    try {
       const bytes = Ndef.encodeMessage([Ndef.textRecord(values.TextAction)])
         if (bytes) {
           await NfcManager.ndefHandler
             .writeNdefMessage(bytes);
             {isUpdated ===true ?
                handleupdate(values.TextAction):
                HandleApidata(values.TextAction)
                         }
          resetForm()
         }
       } catch (error) {
        showErrorToast("Tag Write Failed", "Unable to encode message.");
       } finally {
        NfcManager.cancelTechnologyRequest();
      }

}

 const HandleApidata =(values:any)=>{
     try {
        setIsLoading(true)
        const params = {
       type:textdata?.iconName || "",
       linkName:textdata?.iconName ||"",
         value:values || "",
      }
     createTags(params).then((res:any)=>{
        dispatch(addTag(res?.data?.data))
showSuccessToast("Tag Successfully Written","Scan to access")
refRBSheet.current.close();
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


const handleupdate=(values)=>{
    try {
        setIsLoading(true)
        const params = {
       type:textdata?.linkName || "",
       linkName:textdata?.linkName ||"",
         value:values || "",
      }
     upadteTags(textdata?.id, params).then((res:any)=>{
        dispatch(updateTagAction(res?.data?.data))
       showSuccessToast("Tag Successfully updated","Scan to access")
      refRBSheet.current.close();
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
                <AppLoader loading={isLoading}/>
                {isUpdated  ?
                 <Image 
              source={getIconOfSocialLink(textdata?.linkName) || ""}
            style={styles.img}
                /> :
           <Image 
           source={ textdata?.icon || ""}
            style={styles.img}
            /> 
                }
                {isUpdated ?
               <Text style={styles.txt}>{textdata?.linkName || ""}</Text>:
             <Text style={styles.txt}>{textdata?.iconName || ""}</Text>
                }

<UrlTextInput
 placeholder={ isUpdated?`Add ${textdata?.linkName || "" }`:`Add ${textdata?.iconName || "" }`}
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
