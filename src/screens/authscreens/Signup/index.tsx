import { View, Text, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import style from './style'
import { applogos } from '../../../shared/theme/assets'
import CustomTextInput from '../../../components/customTextInput/CustomTextInput'
import CustomButton from '../../../components/customButton/CustomButton'
import { Formik } from 'formik'
import { signupFormFields, signupSchema } from '../../../shared/utilities/validation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colors } from '../../../shared/theme/colors'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { MyStatusBar, useNetworkStatus } from '../../../exporter'
import { AppLoader } from '../../../components/AppLoader'

const Signup = ({ navigation }: any) => {
// internet checking
const Innternet = useNetworkStatus()

    // local states
const [isLoading, setIsLoading] = useState(false)


// functions
    const handleSubmit = async (values: any, { resetForm }: any) => {
        setIsLoading(true)
        if (!Innternet) {
            Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
            setIsLoading(false)
            return;
           
          }
        try {

            const userCredentials = await auth().createUserWithEmailAndPassword(values.email, values.password);
            const user = userCredentials?.user;
            await database().ref(`/users/${user?.uid}`).set({
                username: values?.username || "",
                email: values?.email || "",
                password: values?.password || "" ,
                fcmToken: '',
            });
            setIsLoading(false)
            navigation.navigate('Login');
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                // console.log('Email already exists');
                Alert.alert('Email already exists');
                setIsLoading(false)
            } else {
                
                setIsLoading(false)
            }
        }
    };

    return (
        <KeyboardAwareScrollView style={{ backgroundColor: colors.bg1 }}>
            <Formik
                initialValues={signupFormFields}
                validationSchema={signupSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, setFieldTouched, handleChange, handleSubmit }) => (
                    <View style={style.container}>
                        <MyStatusBar/>
                        <AppLoader loading={isLoading}/>
                        <Image source={applogos.AppLogo} style={style.logo} />
                        <Text style={style.headingTxt}>Create Account</Text>
                        <Text style={style.descTxt}>Lorem ipsum dolor sit amet consectetur. Erat hendrerit arcu rhoncus sed.</Text>

                        <View style={style.inputsBox}>
                            <CustomTextInput
                                placeholder={'Name'}
                                value={values?.username}
                                onChangeText={handleChange('username')}
                                onBlur={() => setFieldTouched('username')}
                            />
                            {touched.username && errors.username && (<Text style={style.errorMsg}>{errors.username}</Text>)}
                            <CustomTextInput
                                placeholder={'Email'}
                                value={values?.email}
                                onChangeText={handleChange('email')}
                                onBlur={() => setFieldTouched('email')}
                            />
                            {touched.email && errors.email && (<Text style={style.errorMsg}>{errors.email}</Text>)}
                            <CustomTextInput
                                placeholder={'Password'}
                                value={values?.password}
                                onChangeText={handleChange('password')}
                                onBlur={() => setFieldTouched('password')}
                            />
                            {touched.password && errors.password && (<Text style={style.errorMsg}>{errors.password}</Text>)}
                        </View>

                        <CustomButton
                            title={'Create Account'}
                            onClick={() => { handleSubmit() }}
                        />

                        <Text style={style.alredyAccountTxt}>Already have an account? <Text style={style.signInTxt}
                            onPress={() => { navigation.navigate('Login') }}
                        >Sign In</Text></Text>
                    </View>
                )}
            </Formik>
        </KeyboardAwareScrollView>
    )
}

export default Signup