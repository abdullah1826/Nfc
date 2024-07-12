import { View, Text, Image, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import ScreenHeader from '../../../../components/screenHeader/ScreenHeader'
import { appIcons, applogos } from '../../../../shared/theme/assets'
import style from './style'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { HP, WP } from '../../../../shared/theme/PixelResponsive'
import MoreText from '../../../../components/moreText/MoreText'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colors } from '../../../../shared/theme/colors'

const About = ({ navigation }: any) => {

    const [isOpen, setISopen] = useState(false);
    const [isVisionOpen, setISVisionOpen] = useState(false)
const handlevision=()=>{
 setISVisionOpen(open => !open)
 setISopen(false)
}
 
const handleabout=()=>{
 setISopen(open => !open)
 setISVisionOpen(false)
}

    return (
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        >
            <SafeAreaView style={style.container}>
                <View style={style.secondcontaiiner}>
                <ScreenHeader
                    heading={'Settings'}
                    onClick={() => navigation.goBack()}
                />
                <View style={style.iconBox}>
                    <Image source={appIcons.AboutBlue} style={style.aboutIcon} />
                    <Text style={style.aboutTxt}>About</Text>
                </View>

                <TouchableOpacity style={style.reportBugBox}
                    onPress={()=>handleabout()}
                >
                    <Text style={style.reportBugTxt}>About NFC Reader</Text>
                    <Image source={isOpen ? appIcons.Up : appIcons.Down} style={style.upAndDown} />

                </TouchableOpacity>
                {
                    isOpen &&
                    < View style={style.aboutPrivacyBox}>
                        <Image source={applogos.AppLogo} style={style.logo} />
                        <Text style={style.aboutNfcTitle}>About NFC Reader</Text>
                        <Text style={style.aboutPrivacyDesc}>
                        Our NFC Reader App is designed to seamlessly read and write NFC tags, providing users with an efficient way to manage their NFC-enabled tasks. This powerful tool is capable of reading various types of NFC tags, storing and sharing data, and facilitating secure transactions. Whether you're using it for personal convenience or professional needs, our app ensures a smooth and intuitive user experience. With a user-friendly interface and robust functionality, our NFC Reader App stands out as a reliable solution for all your NFC requirements.
                        </Text>
                        <Text style={style.aboutNfcTitle}>More</Text>
                        <MoreText Desc={'Quickly scan NFC tags to retrieve stored information or trigger actions.'} />
                        <MoreText Desc={'Compatible with a wide range of NFC tag types, including NDEF formatted tags.'} />

                        <MoreText Desc={'Define specific actions triggered by different types of NFC tags.'} />

                        <MoreText Desc={'Intuitive design for easy tag detection and interaction.'} />
                        <MoreText Desc={'Ensures safe handling of NFC tag data with built-in encryption options.'} />
                        <MoreText Desc={'Maintain a history of scanned tags and actions performed'} />
                        <MoreText Desc={'Regular updates for improved performance and new features.'} />    
                    </View>
                }


                <TouchableOpacity style={style.reportBugBox}
                    onPress={()=>handlevision()}
                >
                    <Text style={style.reportBugTxt}>Our Vision & Mission</Text>
                    <Image source={isOpen ? appIcons.Up : appIcons.Down} style={style.upAndDown} />

                </TouchableOpacity>

                {
                    isVisionOpen &&
                    < View style={style.aboutPrivacyBox}>
                        <Text style={[style.aboutNfcTitle, { marginTop: HP(.5) }]}>Our Vision</Text>
                        <Text style={[style.aboutPrivacyDesc]}>
                        To empower users with seamless and secure NFC technology integration, revolutionizing how they interact with digital and physical environments.
                        </Text>
                        <Text style={[style.aboutNfcTitle]}>Our Mission</Text>
                        <Text style={[style.aboutPrivacyDesc, { marginTop: HP(1) }]}>
                        Our mission is to develop a user-friendly NFC toolkit reader app that simplifies the integration of NFC technology into everyday applications. By providing robust functionality and ensuring compatibility across platforms, we aim to enhance efficiency, security, and convenience for businesses and individuals alike. Through continuous innovation and user-centric design, we strive to set new standards in NFC technology, enabling limitless possibilities in connectivity and interaction.
                        </Text>
                    </View>
                }

</View>
      </SafeAreaView>
      </KeyboardAwareScrollView>    
    )
}

export default About