import { View, Text, Image, Alert,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import style from './style'
import CustomButton from '../../../components/customButton/CustomButton'
import CustomTextInput from '../../../components/customTextInput/CustomTextInput'
import { Formik } from 'formik'
import { loginFormFields, loginSchema } from '../../../shared/utilities/validation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux'
import { setAuthenticated, setUserData } from '../../../redux/Slices/UserSlice'
import {useNetworkStatus ,colors,applogos, MyStatusBar, WP, size, appIcons} from '../../../exporter'
import { AppLoader } from '../../../components/AppLoader'
import { loginUser } from '../../../shared/utilities/services/authServices'
import { getPlatform, showErrorToast, showSuccessToast } from '../../../shared/utilities/Helper'


const Login = ({ navigation }: any) => {

    // redux stuff
    const dispatch = useDispatch();
    const isuserPlatform = getPlatform()

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
             password:values?.password,
             platform:isuserPlatform,
             fcm_token:"",
             login_with:"email"
         }
        loginUser(params).then((res:any)=>{
            dispatch(setUserData(res?.data?.data))
            showSuccessToast('Login Success', 'User Login successfully');
            setIsLoading(false)
            dispatch(setAuthenticated(true))
            navigation.replace('HomeStack', { Screen: 'Home' });
        
            resetForm()
        }).catch((error)=>{

            showErrorToast('Registration Failed', error?.response?.data?.message || 'An error occurred');
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
            style={{ flex: 1, backgroundColor: colors.bg1 }}>
            <Formik
                initialValues={loginFormFields}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, setFieldTouched, handleChange, handleSubmit }) => (
                    <View style={style.container}>
                    <MyStatusBar/>
                    <AppLoader loading={isLoading}/>
                        <Image source={applogos.AppLogo} style={style.logo} />
                        <Text style={style.headingTxt}>Login</Text>
                        <Text style={style.descTxt}>Lorem ipsum dolor sit amet consectetur. Erat hendrerit arcu rhoncus sed.</Text>

                        <View style={style.inputsBox}>
                            <CustomTextInput
                                placeholder={'Email'}
                                value={values?.email}
                                onChangeText={handleChange('email')}
                                onBlur={() => setFieldTouched('email')}
                                error={errors.email}
                            />
                            {touched.email && errors.email && (<Text style={style.errorMsg}>{errors.email}</Text>)}
                            <CustomTextInput
                                placeholder={'Password'}
                                value={values?.password}
                                onChangeText={handleChange('password')}
                                onBlur={() => setFieldTouched('password')}
                                error={errors.password}
                            />
                            {touched.password && errors.password && (<Text style={style.errorMsg}>{errors.password}</Text>)}
                        </View>
<TouchableOpacity style={style.viewforget}
onPress={()=>navigation.navigate("resetPassword")}
>
    <Text style={style.txtforget}>Forgot Password?</Text>
</TouchableOpacity>
                        <CustomButton
                            title={'Login'}
                            onClick={handleSubmit}
                        />

               <View style={style.lastsignuptex}>
                     <Text style={style.alredyAccountTxt}>Don’t have an account?</Text>
                        <Text style={style.signInTxt}
                            onPress={() => navigation.navigate('Signup')}
                        >Sign Up</Text>
</View>
                       
<View style={style.viewlast}>
<View style={style.viewsecondline}>
  <View style={style.viewfirstline} />
  <View>
    <Text style={style.tetxmiddle}>Continue via Social Networks</Text>
  </View>
  <View style={style.viewfirstline} />
</View>

<View style={style.viewsocialicon}>
<TouchableOpacity>
<Image 
source={applogos.Googlelogo}
style={style.socialicon}
/>
</TouchableOpacity>
<TouchableOpacity>
<Image 
source={applogos.Facebooklogo}
style={style.socialicon}
/>
</TouchableOpacity>
</View>
</View>

                    </View>
                )}
            </Formik>
        </KeyboardAwareScrollView>
    )
}

export default Login