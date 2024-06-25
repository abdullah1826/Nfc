import { View, Text, Image, Alert,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import style from './style'
import CustomButton from '../../../components/customButton/CustomButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux'
import {useNetworkStatus ,colors,applogos, MyStatusBar} from '../../../exporter'
import { AppLoader } from '../../../components/AppLoader'
import {showErrorToast, showSuccessToast } from '../../../shared/utilities/Helper'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
    
  } from 'react-native-confirmation-code-field';
  import CountDown from 'react-native-countdown-component';
  const CELL_COUNT = 4;
const otppassword = ({ navigation ,route}: any) => {

  const { otp } = route.params;

    // redux stuff
    const dispatch = useDispatch();


     const [isLoading, setIsLoading] = useState(false)
     const [value, setValue] = useState('');
     const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
     const [props, getCellOnLayoutHandler] = useClearByFocusCell({
       value,
       setValue,
     });
     const [resendCode, setResendCode] = useState(false);

    // inteernet checking
    const isConnected = useNetworkStatus()

// handle functions
    const handleSubmit = async () => {
        if (!isConnected) {
            Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
            return;
          }
        try {
          if (!value) {
            showErrorToast('Error', 'Please Enter  OTP')
            return;
          }
      

       if (otp ==value) {
        showSuccessToast('Otp Success', 'Please Enter new password')
        navigation.navigate("newPassword",{otp:value})
       } else {
        showErrorToast('Invalid OTP', 'Please Enter Valid OTP')
       }
    

        } catch (error: any) {
            console.log("error",error)
         
        }
    };




    return (
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, backgroundColor: colors.bg1,  }}>
                    <View style={style.container}>
                    <MyStatusBar/>
                    <AppLoader loading={isLoading}/>
                        <Image source={applogos.AppLogo} style={style.logo} />
                        <Text style={style.headingTxt}>Enter 4 Digit verification Code!</Text>
                        <Text style={style.descTxt}>Please enter the 4-Digit verification code that is sent on smother@n****!. </Text>

                        <View style={style.inputsBox}>
       <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={style.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[
              style.cell,
              {borderColor: isFocused ? colors.green1 :colors.dulllightgray},
              {backgroundColor: symbol ? colors.white : colors.lightgray},
            ]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />


                        </View>

                        {/* <View style={style.resendview}>
        <TouchableOpacity
        // disabled={resendCode}
        // onPress={() => {
        //   setResendCode(true);
        // }}
        // style={styles.restxt}
        >
          <Text style={style.restxt}>Resend code in {resendCode && 'in'}</Text>
          {resendCode && (
            <>
              <CountDown
                size={7}
                until={60}
                digitStyle={style.digitStyle}
                digitTxtStyle={style.timerText}
                timeToShow={['S']}
                onFinish={() => {
                  setResendCode(false);
                }}
                timeLabels={{m: null, s: null}}
              />
              <Text style={style.txtsecond}>sec</Text>
            </>
          )}
        </TouchableOpacity>
      </View> */}

                        <CustomButton
                            title={'Done'}
                            onClick={()=>handleSubmit()}
                        />

                        <Text style={style.alredyAccountTxt}>Go Back to Login <Text style={style.signInTxt}
                            onPress={() => navigation.navigate('Login')}
                        >Login</Text></Text>
                    </View>
     
        </KeyboardAwareScrollView>
    )
}

export default otppassword