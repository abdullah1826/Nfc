import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Linking,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {signOut} from '../../../redux/Slices/UserSlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNetworkStatus} from '../../../exporter';
import {deleteCurrentUser} from '../../../shared/utilities/services/authServices';
import {
  showErrorToast,
  showSuccessToast,
} from '../../../shared/utilities/Helper';
import {AppLoader} from '../../../components/AppLoader';
import Share from 'react-native-share';
import ScreenHeader from '../../../components/screenHeader/ScreenHeader';
import SettingScreenCard from '../../../components/settingScreenCard/SettingScreenCard';
import {appIcons} from '../../../shared/theme/assets';
import {HP} from '../../../shared/theme/PixelResponsive';
import env from '../../../shared/utilities/env';
import CustomAlert from '../../../components/customAlert';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import style from './style';

const Setting = ({navigation}) => {
  const dispatch = useDispatch();
  const isConnected = useNetworkStatus();
  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [logoutAlertVisible, setLogoutAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    title: '',
    message: '',
  });

  const openPlayStoreForRating = () => {
    const appPackageName = 'your-app-package-name';
    const playStoreUrl = `market://details?id=${appPackageName}`;
    Linking.openURL(playStoreUrl).catch(err =>
      console.error('An error occurred', err),
    );
  };

  const settingScreenData = [
    {
      key: 1,
      label: 'Rate this app',
      icon: appIcons.Rate,
      onClick: () => openPlayStoreForRating(),
    },
    {
      key: 2,
      label: 'Contact Us',
      icon: appIcons.ContactUs,
      onClick: () => handleContact(),
    },
    {
      key: 3,
      label: 'Privacy Policy',
      icon: appIcons.PrivacyPolicy,
      onClick: () => navigation.navigate('PrivacyPolicy'),
    },
    {
      key: 4,
      label: 'Share this app',
      icon: appIcons.Share,
      onClick: () => handleShareApp(),
    },
    {
      key: 5,
      label: 'Help & Support',
      icon: appIcons.Support,
      onClick: () => navigation.navigate('HelpAndSupport'),
    },
    {
      key: 6,
      label: 'About',
      icon: appIcons.About,
      onClick: () => navigation.navigate('About'),
    },
    {
      key: 7,
      label: 'Delete Account',
      icon: appIcons.DeleteAccount,
      onClick: () => setAlertVisible(true),
    },
    {
      key: 8,
      label: 'Logout',
      icon: appIcons.Logout,
      onClick: () => setLogoutAlertVisible(true),
    },
  ];

  const handleDeleteAccountConfirm = () => {
    if (!isConnected) {
      Alert.alert(
        'No Internet Connection',
        'Please check your internet connection and try again.',
      );
      return;
    }
    setIsLoading(true);
    deleteCurrentUser()
      .then(() => {
        showSuccessToast('Alert', 'Account deleted successfully');
        setIsLoading(false);
        dispatch(signOut());
        GoogleSignin.signOut();
        navigation.replace('AuthStack', {Screen: 'Login'});
      })
      .catch(error => {
        showErrorToast(
          'Failed',
          error?.response?.data?.message || 'An error occurred',
        );
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };

  const handleLogoutConfirm = () => {
    dispatch(signOut());
    GoogleSignin.signOut();
    navigation.replace('AuthStack', {Screen: 'Login'});
  };

  const handleContact = () => {
    const email = 'mailto:info@avicennaenterprise.com';
    Linking.openURL(email).catch(err => console.error('Error:', err));
  };

  const handleShareApp = () => {
    const options = {
      title: 'Share App',
      message: 'Share Nfc Toolkit App!',
    };
    Share.open(options).catch(err => {
      err && console.log(err);
    });
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.secondcontainer}>
        <ScreenHeader
          heading={'Settings'}
          onClick={() => navigation.goBack()}
        />
        <AppLoader loading={isLoading} />
        <View style={{marginTop: HP(3)}}>
          <FlatList
            data={settingScreenData}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{marginBottom: HP(10)}}
            keyExtractor={item => item.key.toString()}
            renderItem={({item, index}) => (
              <SettingScreenCard
                icon={item.icon}
                label={item.label}
                marginBottom={
                  settingScreenData.length - 1 == index ? HP(6) : HP(0)
                }
                onClick={item.onClick}
              />
            )}
          />
        </View>
        <Text style={style.versionTxt}>Build Version 1.1.930.2024</Text>
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
      <CustomAlert
        visible={alertVisible}
        title="Confirm Deletion"
        message="Are you sure you want to delete your account? This action cannot be undone."
        onConfirm={() => {
          setAlertVisible(false);
          handleDeleteAccountConfirm();
        }}
        onCancel={() => setAlertVisible(false)}
        onClose={() => setAlertVisible(false)}
      />
      <CustomAlert
        visible={logoutAlertVisible}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        onConfirm={() => {
          setLogoutAlertVisible(false);
          handleLogoutConfirm();
        }}
        onCancel={() => setLogoutAlertVisible(false)}
        onClose={() => setLogoutAlertVisible(false)}
      />
    </SafeAreaView>
  );
};

export default Setting;
