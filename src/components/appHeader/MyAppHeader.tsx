import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {appIcons, applogos} from '../../shared/theme/assets';
import {HP, WP} from '../../shared/theme/PixelResponsive';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  onClick: () => void;
}

const MyAppHeader: React.FC<Props> = ({onClick}) => {
  const inset = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.Container,
        {
          marginTop: inset.top,
        },
      ]}>
      <Image source={applogos.AppLogo} style={styles.icon} />
      <TouchableOpacity onPress={() => onClick()}>
        <Image source={appIcons.Setting} style={styles.settingicon} />
      </TouchableOpacity>
    </View>
  );
};

export {MyAppHeader};

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: HP(8),
    paddingHorizontal: 22,
  },
  icon: {
    height: HP(5),
    width: WP(25),
    resizeMode: 'contain',
  },
  settingicon: {
    width: WP('12'),
    height: HP('4'),
    resizeMode: 'contain',
  },
});
