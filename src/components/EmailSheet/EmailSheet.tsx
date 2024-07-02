import React, { useRef, forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity, Dimensions } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { HP, UrlTextInput, WP, appRadius, colors, family, size } from '../../exporter';
import { Formik } from 'formik'
import {EmailField, EmailShema,} from '../../shared/utilities/validation';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { checkNfcSupport, showErrorToast, showSuccessToast } from '../../shared/utilities/Helper';
import NfcManager, { NfcTech, Ndef, } from 'react-native-nfc-manager';
import { createTags } from '../../shared/utilities/services/mainServices';
import { setTagsAllRecord } from '../../redux/Slices/MainSlice';
import { addTag } from '../../redux/Slices/MainSlice';
import { useDispatch } from 'react-redux';
import { AppLoader } from '../AppLoader';
const EmailSheet = forwardRef(({textdata,isUpdated,setIsUpdated}, ref) => {
    const refRBSheet = useRef();
    const screenHeight = Dimensions.get('window').height;
    const [formValues, setFormValues] = useState(EmailField)

    // local states
    const [isLoading, setIsLoading] = useState(false)

const dispatch = useDispatch()

    useEffect(() => {
        if (isUpdated) {
            // Set new form values here when updated
            setFormValues({
                Email: 'newemail@example.com',
                EmailBody: 'Updated body content',
                EmailSubject: 'Updated subject heloo'
            });
        }
    }, [isUpdated]);





    useImperativeHandle(ref, () => ({
        open: () => {
            refRBSheet.current.open();
        },
        close: () => {
            refRBSheet.current.close();
        },
    }));
const handleSubmit = async(values: any, { resetForm }: any)=>{
    const nfcSupported = await checkNfcSupport();
    if (!nfcSupported) return
    await NfcManager.start();
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const { Email,EmailBody,EmailSubject,} = values;
    const combinedText = `Email: ${Email}\nEmail Body: ${EmailBody}\nEmail Subject: ${EmailSubject}`;   
    try {
        const record = Ndef.textRecord(combinedText);
      const bytes = Ndef.encodeMessage([record]);
        if (bytes) {
          await NfcManager.ndefHandler
            .writeNdefMessage(bytes);
            HandleApidata(EmailBody)
          resetForm()

        }
      } catch (error) {
        showErrorToast("Tag Write Failed", "Unable to encode message.");
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
    setIsUpdated(false)
}
    return (       
        <Formik
        initialValues={formValues}
        validationSchema={EmailShema}
enableReinitialize={true}
onSubmit={handleSubmit}>
        {({ values, errors, touched, setFieldTouched, handleChange, handleSubmit,setFieldValue }) => (
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
           <Image 
       source={textdata?.icon || ""}
        style={styles.img}
            /> 
             <Text style={styles.txt}>{textdata?.iconName || ""}</Text>

<UrlTextInput
 placeholder={`Recpient ${textdata?.iconName || "" }`}
 placeholderTextColor="gray"
value={values.Email}
onChangeText={handleChange("Email")}
touched={errors.Email}
errorMessage={errors.Email}
/>

<UrlTextInput
 placeholder="Email Subject"
 placeholderTextColor="gray"
value={values.EmailBody}
onChangeText={handleChange("EmailBody")}
touched={errors.EmailBody}
errorMessage={errors.EmailBody}
/>
<UrlTextInput
 placeholder="Email body"
 placeholderTextColor="gray"
value={values.EmailSubject}
onChangeText={handleChange("EmailSubject")}
touched={errors.EmailSubject}
errorMessage={errors.EmailSubject}
inputprops={styles.viewcontainer}
inputstyle={styles.inputtext}
numberofLines={4}
multiline={true}
/>

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
              <Text style={styles.btnTxt}>{isUpdated?"update":"Save"}</Text>
          </LinearGradient>
      </TouchableOpacity>

  </View>

            </View>
            </View>
            </KeyboardAwareScrollView>
        </RBSheet>
          )}
          </Formik>
          
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
    viewcontainer: {
        borderBottomWidth: 1,
         marginVertical: 1,
          width:WP("80"), 
          height:HP("18"),
           backgroundColor:"white",
            borderRadius:20, 
            borderWidth:1,
             borderColor:"#D4D4D4",
             marginTop:WP("7")
      },
      inputtext:{
        color: '#A0A0A0',
        fontFamily: family.InterLight,
        fontSize: 14,
        // textAlign:"center"
      },
});

export {EmailSheet};
