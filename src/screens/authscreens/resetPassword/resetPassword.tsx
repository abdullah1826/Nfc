import { View, Text, Image, Alert,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import style from './style'
import CustomButton from '../../../components/customButton/CustomButton'
import CustomTextInput from '../../../components/customTextInput/CustomTextInput'
import { Formik } from 'formik'
import { ResetFormField, ResetPasswordSchema,} from '../../../shared/utilities/validation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux'
import {setuserotpEmail } from '../../../redux/Slices/UserSlice'
import {useNetworkStatus ,colors,applogos, MyStatusBar} from '../../../exporter'
import { AppLoader } from '../../../components/AppLoader'
import { ResetNewPassword, } from '../../../shared/utilities/services/authServices'
import {showErrorToast, showSuccessToast } from '../../../shared/utilities/Helper'


const resetPassword = ({ navigation }: any) => {

    // redux stuff
    const dispatch = useDispatch();

// local states
     const [isLoading, setIsLoading] = useState(false)

    // inteernet checking
    const isConnected = useNetworkStatus()

// handle functions
    const handleSubmit = async (values: any, { resetForm }: any) => {
        if (!isConnected) {
            Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
            return;
          }
        try {
            setIsLoading(true)
            const params = {
             email:values?.email,
         }
         ResetNewPassword(params).then((res:any)=>{
            showSuccessToast('Otp Success', 'OTP sent to mail,Please check your inbox');
            setIsLoading(false)
            dispatch(setuserotpEmail(values?.email))
            navigation.navigate("otppassword",{otp:res?.data?.data?.otp})
            resetForm()
        }).catch((error)=>{

            showErrorToast('Otp  Failed', error?.response?.data?.message || 'An error occurred');
            setIsLoading(false)
        }).finally(()=>{
        setIsLoading(false)
        })
        } catch (error: any) {
            console.log("error",error)
            setIsLoading(false)
        }
    };




    return (
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, backgroundColor: colors.bg1,  }}>
            <Formik
                initialValues={ResetFormField}
                validationSchema={ResetPasswordSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, setFieldTouched, handleChange, handleSubmit }) => (
                    <View style={style.container}>
                    <MyStatusBar/>
                    <AppLoader loading={isLoading}/>
                        <Image source={applogos.AppLogo} style={style.logo} />
                        <Text style={style.headingTxt}>Reset Password</Text>
                        <Text style={style.descTxt}>Please Enter Email and check email </Text>

                        <View style={style.inputsBox}>
                            <CustomTextInput
                                placeholder={'Email'}
                                value={values?.email}
                                onChangeText={handleChange('email')}
                                onBlur={() => setFieldTouched('email')}
                                error={errors.email}
                            />
                            {touched.email && errors.email && (<Text style={style.errorMsg}>{errors.email}</Text>)}

                        </View>

                        <CustomButton
                            title={'Reset'}
                            onClick={handleSubmit}
                        />

                        <Text style={style.alredyAccountTxt}>Go Back to Login <Text style={style.signInTxt}
                            onPress={() => navigation.navigate('Login')}
                        >Login</Text></Text>
                    </View>
                )}
            </Formik>
        </KeyboardAwareScrollView>
    )
}

export default resetPassword