import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import style from './style'
import ScreenHeader from '../../../../components/screenHeader/ScreenHeader'
import { appIcons } from '../../../../shared/theme/assets'

const HelpAndSupportScreen = ({ navigation }: any) => {

    const [isOpen, setISopen] = useState(false);
    console.log(isOpen);

    return (
        <View style={style.container}>
            <ScreenHeader
                heading={'Settings'}
                onClick={() => navigation.goBack()}
            />

            <View style={style.iconBox}>
                <Image source={appIcons.Chatbot} style={style.helpIcon} />
                <Text style={style.helpAndSupportTxt}>Help & Support</Text>
            </View>

            <TouchableOpacity style={style.reportBugBox}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={appIcons.Bug} style={style.bugIcon} />
                    <Text style={style.reportBugTxt}>Report A Bug!</Text>
                </View>
                <Image source={appIcons.Next} style={style.nextIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={style.reportBugBox}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={appIcons.Tips} style={style.bugIcon} />
                    <Text style={style.reportBugTxt}>Tips & Suggestions</Text>
                </View>

                <Image source={appIcons.Next} style={style.nextIcon} />

            </TouchableOpacity>

            <TouchableOpacity style={style.reportBugBox}
                onPress={() => setISopen(open => !open)}
            >
                <Text style={style.reportBugTxt}>About This Privacy Policy</Text>
                <Image source={isOpen ? appIcons.Up : appIcons.Down} style={style.aboutIcon} />

            </TouchableOpacity>

            {
                isOpen &&
                < View style={style.aboutPrivacyBox}>
                    <Text style={style.aboutPrivacyDesc}>
                        Lorem ipsum dolor sit amet consectetur. Id mauris accumsan et diam nec pharetra sed tempus magna. Cursus porttitor porta lacus consectetur quis pharetra libero. Tellus vestibulum tempor dolor ligula dapibus at diam praesent. Et dictum placerat non mattis.Lorem ipsum dolor sit amet consectetur. Id mauris accumsan et diam nec pharetra sed tempus magna. Cursus porttitor porta lacus consectetur quis pharetra libero. Tellus vestibulum tempor dolor ligula dapibus at diam praesent. Et dictum placerat non mattis.
                    </Text>
                </View>
            }


        </View>
    )
}

export default HelpAndSupportScreen