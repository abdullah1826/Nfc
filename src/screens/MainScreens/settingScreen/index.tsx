import {View, Text, FlatList, Linking, SafeAreaView, Alert} from 'react-native';
import React, {useState} from 'react';
import style from './style';
import ScreenHeader from '../../../components/screenHeader/ScreenHeader';
import SettingScreenCard from '../../../components/settingScreenCard/SettingScreenCard';
import {appIcons} from '../../../shared/theme/assets';
import {HP} from '../../../shared/theme/PixelResponsive';
import {useDispatch} from 'react-redux';
import {signOut} from '../../../redux/Slices/UserSlice';
import {useNetworkStatus} from '../../../exporter';
import {deleteCurrentUser} from '../../../shared/utilities/services/authServices';
import {
  showErrorToast,
  showSuccessToast,
} from '../../../shared/utilities/Helper';
import {AppLoader} from '../../../components/AppLoader';
import Share from 'react-native-share';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Setting = ({navigation}: any) => {
  // redux staff
  const dispatch = useDispatch();
  // local states
  const [isLoading, setIsLoading] = useState(false);
  // inteernet checking
  const isConnected = useNetworkStatus();

  const openPlayStoreForRating = () => {
    // Replace 'your-app-package-name' with the actual package name of your app
    const appPackageName = 'your-app-package-name';
    // Replace 'market://' with 'http://' if you want to open in the browser instead of the Play Store app
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
      onClick: () => {},
    },
    {
      key: 2,
      label: 'Contact Us',
      icon: appIcons.ContactUs,
      onClick: () => {
        handleContect();
      },
    },
    {
      key: 3,
      label: 'Privacy Policy',
      icon: appIcons.PrivacyPolicy,
      onClick: () => {
        navigation.navigate('PrivacyPolicy');
      },
    },
    {
      key: 4,
      label: 'Share this app',
      icon: appIcons.Share,
      onClick: () => {
        handleshareapp();
      },
    },
    {
      key: 5,
      label: 'Help & Support',
      icon: appIcons.Support,
      onClick: () => {
        navigation.navigate('HelpAndSupport');
      },
    },
    {
      key: 6,
      label: 'About',
      icon: appIcons.About,
      onClick: () => {
        navigation.navigate('About');
      },
    },
    {
      key: 7,
      label: 'Delete Account',
      icon: appIcons.DeleteAccount,
      onClick: () => {
        handledeleteAccount();
      },
    },
    {
      key: 8,
      label: 'Logout',
      icon: appIcons.Logout,
      onClick: () => {
        dispatch(signOut());
        GoogleSignin.signOut();
        navigation.replace('AuthStack', {Screen: 'Login'});
      },
    },
  ];

  const handledeleteAccount = () => {
    if (!isConnected) {
      Alert.alert(
        'No Internet Connection',
        'Please check your internet connection and try again.',
      );
      return;
    }
    try {
      setIsLoading(true);
      deleteCurrentUser()
        .then(res => {
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
          c;
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error: any) {
      console.log('error', error);
      setIsLoading(false);
    }
  };

  const handleContect = () => {
    const email = 'mailto:info@avicennaenterprise.com';
    Linking.openURL(email).catch((err: any) => console.error('Error:', err));
  };

  const handleshareapp = () => {
    const options = {
      title: 'Share App',
      message: 'Share Nfc Toolkit App!',
      // url: 'https://www.example.com', // replace with your app's URL
    };

    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
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
          <Text style={style.versionTxt}>Build Version 1.1.930.2024</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Setting;
