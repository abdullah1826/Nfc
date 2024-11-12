import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {style} from './style';
import ScreenHeader from '../../../../components/screenHeader/ScreenHeader';
import {appIcons} from '../../../../shared/theme/assets';
import PrivacyPolicyScreenCard from '../../../../components/privacyPolicyScreenCard/PrivacyPolicyScreenCard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../../../../shared/theme/colors';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import env from '../../../../shared/utilities/env';

const PrivacyPolicyScreen = ({navigation}: any) => {
  const [isOpen, setISopen] = useState(false);
  console.log(isOpen);

  return (
    <SafeAreaView style={style.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={style.secondcontainer}>
          <ScreenHeader
            heading={'Settings'}
            onClick={() => navigation.goBack()}
          />
          <View style={style.iconBox}>
            <Image
              source={appIcons.PrivacyPolicyIcon}
              style={style.privacyIcon}
            />
            <Text style={style.privacyPolicyTxt}>Privacy Policy</Text>
          </View>
          <View style={style.cardsBox}>
            <PrivacyPolicyScreenCard
              icon={appIcons.Fire}
              title={'No Surprises!'}
              desc={
                'We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store--you can read more about how Shopify uses your Personal Information here:  https://www.shopify.com/legal/privacy.'
              }
            />
            <PrivacyPolicyScreenCard
              icon={appIcons.Lock}
              title={'Keeping Your Information Safe!'}
              desc={
                'we use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:'
              }
            />

            <PrivacyPolicyScreenCard
              icon={appIcons.Protect}
              title={'You’re Always in Control!'}
              desc={`When you visit the Site and app, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site and app, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.”`}
            />
          </View>

          <TouchableOpacity
            style={style.aboutPrivacy}
            onPress={() => setISopen(open => !open)}>
            <Text style={style.aboutTxt}>About This Privacy Policy</Text>
            <Image
              source={isOpen ? appIcons.Up : appIcons.Down}
              style={style.aboutIcon}
            />
          </TouchableOpacity>

          {isOpen && (
            <View style={style.aboutPrivacyBox}>
              <Text style={style.aboutPrivacyDesc}>
                This Privacy Policy describes how your personal information is
                collected, used, and shared when you visit or make a purchase
                from our platform (the “Site”) the app, and the services related
                to them (collectively, together with the site, app, and the
                related services, our “Services”).
              </Text>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
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

export default PrivacyPolicyScreen;
