import { View, Text, Image, Alert } from 'react-native'
import React,{useState} from 'react'
import style from './style'
import CustomButton from '../../../components/customButton/CustomButton'
import CustomTextInput from '../../../components/customTextInput/CustomTextInput'
import { Formik } from 'formik'
import { loginFormFields, loginSchema } from '../../../shared/utilities/validation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useDispatch } from 'react-redux'
import { setAuthenticated, setUserData } from '../../../redux/Slices/UserSlice'
import {useNetworkStatus ,colors,applogos, MyStatusBar} from '../../../exporter'
import { AppLoader } from '../../../components/AppLoader'


const Login = ({ navigation }: any) => {

    // redux stuff
    const dispatch = useDispatch();

     const [isLoading, setIsLoading] = useState(false)

    // inteernet checking
    const isConnected = useNetworkStatus()

// handle functions
    const handleSubmit = async (values: any, { resetForm }: any) => {
        setIsLoading(true)
        if (!isConnected) {
            Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
            setIsLoading(false)
            return;
    
          }
        try {
            const userCredentials = await auth().signInWithEmailAndPassword(values?.email, values?.password);
            const user = userCredentials.user;
            dispatch(setAuthenticated(true))
            await getUserData(user.uid);
            navigation.replace('HomeStack', { Screen: 'Home' });
        
            resetForm()
            setIsLoading(false)
        } catch (error: any) {
            if (error.code === 'auth/invalid-credential') {
                Alert.alert('Invalid-credential!');
                setIsLoading(false)
            }
            setIsLoading(false)
        }
    };

    const getUserData = async (userId: string) => {
        try {
            const userDataSnapshot = await database().ref(`/users/${userId}`).once('value');
            const userData = userDataSnapshot.val();
            if (userData) {
                dispatch(setUserData({ ...userData, userId }));
            }

        } catch (error) {
            console.log(error);
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

                        <CustomButton
                            title={'Login'}
                            onClick={handleSubmit}
                        />

                        <Text style={style.alredyAccountTxt}>Already have an account? <Text style={style.signInTxt}
                            onPress={() => navigation.navigate('Signup')}
                        >Sign Up</Text></Text>
                    </View>
                )}
            </Formik>
        </KeyboardAwareScrollView>
    )
}

export default Login