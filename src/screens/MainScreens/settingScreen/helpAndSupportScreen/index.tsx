import React, {useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import ScreenHeader from '../../../../components/screenHeader/ScreenHeader';
import {appIcons} from '../../../../shared/theme/assets';
import env from '../../../../shared/utilities/env';
import style from './style';

const HelpAndSupportScreen = ({navigation}: any) => {
  const [isOpen, setISopen] = useState(false);

  return (
    <SafeAreaView style={style.container}>
      <View style={style.secondcontaner}>
        <ScreenHeader
          heading={'Settings'}
          onClick={() => navigation.goBack()}
        />
        <View style={style.iconBox}>
          <Image source={appIcons.Chatbot} style={style.helpIcon} />
          <Text style={style.helpAndSupportTxt}>Help & Support</Text>
        </View>
        <TouchableOpacity style={style.reportBugBox}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={appIcons.Bug} style={style.bugIcon} />
            <Text style={style.reportBugTxt}>Report A Bug!</Text>
          </View>
          <Image source={appIcons.Next} style={style.nextIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={style.reportBugBox}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={appIcons.Tips} style={style.bugIcon} />
            <Text style={style.reportBugTxt}>Tips & Suggestions</Text>
          </View>
          <Image source={appIcons.Next} style={style.nextIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={style.reportBugBox}
          onPress={() => setISopen(open => !open)}>
          <Text style={style.reportBugTxt}>About This Privacy Policy</Text>
          <Image
            source={isOpen ? appIcons.Up : appIcons.Down}
            style={style.aboutIcon}
          />
        </TouchableOpacity>
        {isOpen && (
          <View style={style.aboutPrivacyBox}>
            <Text style={style.aboutPrivacyDesc}>
              When you visit the Site and app, we automatically collect certain
              information about your device, including information about your
              web browser, IP address, time zone, and some of the cookies that
              are installed on your device. Additionally, as you browse the Site
              and app, we collect information about the individual web pages or
              products that you view, what websites or search terms referred you
              to the Site, and information about how you interact with the Site.
              We refer to this automatically-collected information as “Device
              Information.”
            </Text>
          </View>
        )}
      </View>
      <BannerAd
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        unitId={
          Platform.OS === 'android'
            ? env.banner_unit_id_android
            : env.banner_unit_id_ios
        }
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </SafeAreaView>
  );
};

export default HelpAndSupportScreen;
