import { View, Text, Image, Alert } from 'react-native'
import React from 'react'
import style from './style'
import { applogos } from '../../../shared/theme/assets'
import CustomButton from '../../../components/customButton/CustomButton'
import CustomTextInput from '../../../components/customTextInput/CustomTextInput'
import { Formik } from 'formik'
import { loginFormFields, loginSchema } from '../../../shared/utilities/validation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colors } from '../../../shared/theme/colors'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useDispatch } from 'react-redux'
import { setUserData } from '../../../redux/Slices/UserSlice'

const Login = ({ navigation }: any) => {

    const dispatch = useDispatch();

    const handleSubmit = async (values: any, { resetForm }: any) => {
        try {
            console.log('Login Values =>>>>>>>>>', values);
            const userCredentials = await auth().signInWithEmailAndPassword(values.email, values.password);
            const user = userCredentials.user;

            await getUserData(user.uid);

            // console.log('Auth User Data Login =>>>>>>>>>>.', user.uid);
            navigation.replace('HomeStack', { Screen: 'Home' });
            resetForm();
        } catch (error: any) {
            if (error.code === 'auth/invalid-credential') {
                Alert.alert('Invalid-credential!');
            }
            console.log('Login error =>>>>>>>>>>>>>>>>.', error);
        }
    };

    const getUserData = async (userId: string) => {
        // console.log('userId =>>>>>>>.', userId)
        try {
            const userDataSnapshot = await database().ref(`/users/${userId}`).once('value');
            const userData = userDataSnapshot.val();
            console.log('userData=>>>>>>>>>>', userData);

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
                        <Image source={applogos.logo} style={style.logo} />
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