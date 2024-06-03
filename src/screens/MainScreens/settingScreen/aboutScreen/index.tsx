import { View, Text, Image } from 'react-native'
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
    return (
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: colors.bg1 }}>
            <View style={style.container}>
                <ScreenHeader
                    heading={'Settings'}
                    onClick={() => navigation.goBack()}
                />

                <View style={style.iconBox}>
                    <Image source={appIcons.AboutBlue} style={style.aboutIcon} />
                    <Text style={style.aboutTxt}>About</Text>
                </View>

                <TouchableOpacity style={style.reportBugBox}
                    onPress={() => setISopen(open => !open)}
                >
                    <Text style={style.reportBugTxt}>About NFC Reader</Text>
                    <Image source={isOpen ? appIcons.Up : appIcons.Down} style={style.upAndDown} />

                </TouchableOpacity>

                {
                    isOpen &&
                    < View style={style.aboutPrivacyBox}>

                        <Image source={applogos.logo} style={style.logo} />

                        <Text style={style.aboutNfcTitle}>About NFC Reader</Text>

                        <Text style={style.aboutPrivacyDesc}>
                            Lorem ipsum dolor sit amet consectetur. Id mauris accumsan et diam nec pharetra sed tempus magna. Cursus porttitor porta lacus consectetur quis pharetra libero. Tellus vestibulum tempor dolor ligula dapibus at diam praesent. Et dictum placerat non mattis.Lorem ipsum dolor sit amet consectetur. Id mauris accumsan et diam nec pharetra sed tempus magna. Cursus porttitor porta lacus consectetur quis pharetra libero. Tellus vestibulum tempor dolor ligula dapibus at diam praesent. Et dictum placerat non mattis.
                        </Text>

                        <Text style={style.aboutNfcTitle}>More</Text>

                        <MoreText Desc={'Lorem ipsum dolor sit amet consectetur.'} />

                        <MoreText Desc={'Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur. sit amet consectetur.'} />

                        <MoreText Desc={'Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur. sit amet consectetur.'} />

                        <MoreText Desc={'Lorem ipsum dolor sit'} />

                    </View>
                }


                <TouchableOpacity style={style.reportBugBox}
                    onPress={() => setISVisionOpen(open => !open)}
                >
                    <Text style={style.reportBugTxt}>Our Vision & Mission</Text>
                    <Image source={isOpen ? appIcons.Up : appIcons.Down} style={style.upAndDown} />

                </TouchableOpacity>

                {
                    isVisionOpen &&
                    < View style={style.aboutPrivacyBox}>

                        <Text style={[style.aboutNfcTitle, { marginTop: HP(.5) }]}>Our Vision</Text>

                        <Text style={[style.aboutPrivacyDesc]}>
                            Lorem ipsum dolor sit amet consectetur. Id mauris accumsan et diam nec pharetra sed tempus magna. Cursus porttitor porta lacus consectetur quis pharetra libero. Tellus vestibulum tempor dolor ligula dapibus at diam praesent.
                        </Text>


                        <Text style={[style.aboutNfcTitle]}>Our Mission</Text>

                        <Text style={[style.aboutPrivacyDesc, { marginTop: HP(1) }]}>
                            Lorem ipsum dolor sit amet consectetur. Id mauris accumsan et diam nec pharetra sed tempus magna. Cursus porttitor porta lacus consectetur quis pharetra libero. Tellus vestibulum tempor dolor ligula dapibus at diam praesent.
                        </Text>

                    </View>


                }


            </View>
        </KeyboardAwareScrollView>
    )
}

export default About