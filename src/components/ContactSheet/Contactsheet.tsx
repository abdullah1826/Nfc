import React, { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity, Dimensions } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { HP, UrlTextInput, WP, appRadius, colors, family, size } from '../../exporter';
import { Formik } from 'formik'
import {ContectShema, ContextFiled,} from '../../shared/utilities/validation';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NfcManager, { NfcTech, Ndef, } from 'react-native-nfc-manager';
import { checkNfcSupport, showErrorToast, showSuccessToast } from '../../shared/utilities/Helper';
import { setTagsAllRecord, updateTagAction } from '../../redux/Slices/MainSlice';
import { createTags, upadteTags } from '../../shared/utilities/services/mainServices';
import { addTag } from '../../redux/Slices/MainSlice';
import { useDispatch } from 'react-redux';
import { AppLoader } from '../AppLoader';
import { getIconOfSocialLink } from '../../shared/utilities/constants';
const Contactsheet = forwardRef(({textdata,isUpdated,setIsUpdated}, ref) => {
    const refRBSheet = useRef();
    const screenHeight = Dimensions.get('window').height;
    // local states
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    useImperativeHandle(ref, () => ({
        open: () => {
            refRBSheet.current.open();
        },
        close: () => {
            refRBSheet.current.close();
        },
    }));
const handleSubmit =async (values: any, { resetForm }: any)=>{
    showErrorToast("Alert", "Please Keep the Tag close with back");
    const nfcSupported = await checkNfcSupport();
    if (!nfcSupported) return
    await NfcManager.start();
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const { ContectName, Company, Address, phoneNumber, webSite } = values;
    const combinedText = `Contact Name: ${ContectName}\nCompany: ${Company}\nAddress: ${Address}\nPhone Number: ${phoneNumber}\nWebsite: ${webSite}`; 
    try {
        const record = Ndef.uriRecord(combinedText);
      const bytes = Ndef.encodeMessage([record]);
        if (bytes) {
          await NfcManager.ndefHandler
            .writeNdefMessage(bytes);
          {isUpdated ===true ?
            handleupdate(combinedText):
            HandleApidata(combinedText)
                     }
          resetForm()
        }
      } catch (error) {
        showErrorToast("Tag Scanned Failed", "Kindly Tag the scan properly");
      } finally {
        NfcManager.cancelTechnologyRequest();
      }
}


const HandleApidata =(value:any)=>{
    try {
        setIsLoading(true)
        const params = {
      type:textdata?.iconName,
      linkName:textdata?.iconName,
         value:value,
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

const handleupdate=(value)=>{
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
        <Formik
        initialValues={ContextFiled}
        validationSchema={ContectShema}
        onSubmit={handleSubmit}>
        {({ values, errors, touched, setFieldTouched, handleChange, handleSubmit }) => (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
          closeOnPressMask={true}
          animationType="slide"
          height={screenHeight-200}
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
                    {isUpdated  ?
                 <Image 
              source={getIconOfSocialLink(textdata?.linkName) || ""}
            style={styles.img}
                /> :
           <Image 
           source={ textdata?.icon || ""}
            style={styles.img}
            /> }
                {isUpdated ?
               <Text style={styles.txt}>{textdata?.linkName || ""}</Text>:
             <Text style={styles.txt}>{textdata?.iconName || ""}</Text>
                }
<UrlTextInput
placeholder={ isUpdated?`Add ${textdata?.linkName || "" }`:`Add ${textdata?.iconName || "" }`}
 placeholderTextColor="gray"
value={values.ContectName}
onChangeText={handleChange("ContectName")}
touched={errors.ContectName}
errorMessage={errors.ContectName}
/>

<UrlTextInput
 placeholder="Add Company"
 placeholderTextColor="gray"
value={values.Company}
onChangeText={handleChange("Company")}
touched={errors.Company}
errorMessage={errors.Company}
/>
<UrlTextInput
 placeholder="Address"
 placeholderTextColor="gray"
value={values.Address}
onChangeText={handleChange("Address")}
touched={errors.Address}
errorMessage={errors.Address}
/>
<UrlTextInput
 placeholder="Phone Number"
 placeholderTextColor="gray"
value={values.phoneNumber}
onChangeText={handleChange("phoneNumber")}
touched={errors.phoneNumber}
errorMessage={errors.phoneNumber}
/>


<UrlTextInput
 placeholder="Website"
 placeholderTextColor="gray"
value={values.webSite}
onChangeText={handleChange("webSite")}
touched={errors.webSite}
errorMessage={errors.webSite}
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
});

export { Contactsheet };
