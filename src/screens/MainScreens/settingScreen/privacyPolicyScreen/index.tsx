import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { style } from './style'
import ScreenHeader from '../../../../components/screenHeader/ScreenHeader'
import { appIcons } from '../../../../shared/theme/assets'
import PrivacyPolicyScreenCard from '../../../../components/privacyPolicyScreenCard/PrivacyPolicyScreenCard'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colors } from '../../../../shared/theme/colors'

const PrivacyPolicyScreen = ({ navigation }: any) => {

    const [isOpen, setISopen] = useState(false);
    console.log(isOpen)

    return (
        <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: colors.bg1 }}>
            <View style={style.container}>

                <ScreenHeader
                    heading={'Settings'}
                    onClick={() => navigation.goBack()}
                />

                <View style={style.iconBox}>
                    <Image source={appIcons.PrivacyPolicyIcon} style={style.privacyIcon} />
                    <Text style={style.privacyPolicyTxt}>Privacy Policy</Text>
                </View>

                <View style={style.cardsBox}>
                    <PrivacyPolicyScreenCard
                        icon={appIcons.Fire}
                        title={'No Surprises!'}
                        desc={'Lorem ipsum dolor sit amet consectetur. Id mauris accumsan et diam nec pharetra sed tempus magna. Cursus porttitor porta lacus consectetur quis pharetra libero. Tellus vestibulum tempor dolor ligula dapibus at diam praesent. Et dictum placerat non mattis.'}
                    />

                    <PrivacyPolicyScreenCard
                        icon={appIcons.Lock}
                        title={'Keeping Your Information Safe!'}
                        desc={'Lorem ipsum dolor sit amet consectetur. Id mauris accumsan et diam nec pharetra sed tempus magna. Cursus porttitor porta lacus consectetur quis pharetra libero. Tellus vestibulum tempor dolor ligula dapibus at diam praesent. Et dictum placerat non mattis.'}
                    />

                    <PrivacyPolicyScreenCard
                        icon={appIcons.Protect}
                        title={'You’re Always in Control!'}
                        desc={'Lorem ipsum dolor sit amet consectetur. Id mauris accumsan et diam nec pharetra sed tempus magna. Cursus porttitor porta lacus consectetur quis pharetra libero. Tellus vestibulum tempor dolor ligula dapibus at diam praesent. Et dictum placerat non mattis.'}
                    />
                </View>

                <TouchableOpacity style={style.aboutPrivacy}
                    onPress={() => setISopen(open => !open)}
                >
                    <Text style={style.aboutTxt}>About This Privacy Policy</Text>
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
        </KeyboardAwareScrollView >
    )
}

export default PrivacyPolicyScreen