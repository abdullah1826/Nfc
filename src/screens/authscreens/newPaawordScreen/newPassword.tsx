import { View, Text, Image, Alert,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import style from './style'
import CustomButton from '../../../components/customButton/CustomButton'
import CustomTextInput from '../../../components/customTextInput/CustomTextInput'
import { Formik } from 'formik'
import { NewPasswordSchema,newPasswordformfield } from '../../../shared/utilities/validation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux'
import {useNetworkStatus ,colors,applogos, MyStatusBar} from '../../../exporter'
import { AppLoader } from '../../../components/AppLoader'
import { ConfirmNewPassword, } from '../../../shared/utilities/services/authServices'
import {showErrorToast, showSuccessToast } from '../../../shared/utilities/Helper'


const newPassword = ({ navigation, route }: any) => {
    const { otp } = route.params;
    // redux stuffee
    const dispatch = useDispatch();
    const {userotpEmail} = useSelector((state:any)=>state?.user) 

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
             email:userotpEmail,
             password:values?.password,
             otp:otp
         }
         ConfirmNewPassword(params).then((res:any)=>{
            showSuccessToast('Paaaword Changes', 'Please Login with new password');
            setIsLoading(false)
      navigation.navigate("Login")  
            resetForm()
        }).catch((error)=>{
            showErrorToast('Failed', error?.response?.data?.message || 'An error occurred');
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
                initialValues={newPasswordformfield}
                validationSchema={NewPasswordSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, setFieldTouched, handleChange, handleSubmit }) => (
                    <View style={style.container}>
                    <MyStatusBar/>
                    <AppLoader loading={isLoading}/>
                        <Image source={applogos.AppLogo} style={style.logo} />
                        <Text style={style.headingTxt}>Set Password</Text>
                        <Text style={style.descTxt}>Please Enter New password </Text>

                        <View style={style.inputsBox}>
                            <CustomTextInput
                                placeholder={'New Password'}
                                value={values?.password}
                                onChangeText={handleChange('password')}
                                onBlur={() => setFieldTouched('password')}
                                error={errors.password}
                            />
                            {touched.password && errors.password && (<Text style={style.errorMsg}>{errors.password}</Text>)}

                            <CustomTextInput
                                placeholder={'Confirm Password'}
                                value={values?.confirmPassword}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={() => setFieldTouched('confirmPassword')}
                                error={errors.password}
                            />
                            {touched.confirmPassword && errors.confirmPassword && (<Text style={style.errorMsg}>{errors.confirmPassword}</Text>)}

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

export default newPassword