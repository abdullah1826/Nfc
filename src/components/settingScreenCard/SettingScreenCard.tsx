import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {HP, WP} from '../../shared/theme/PixelResponsive';
import {colors} from '../../shared/theme/colors';
import {appRadius, family, size} from '../../shared/theme/sizes';
import {appIcons} from '../../shared/theme/assets';

interface Props {
  icon: any;
  label: string;
  marginBottom: number;
  onClick: () => void;
}

const SettingScreenCard: React.FC<Props> = ({
  icon,
  label,
  marginBottom,
  onClick,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, {marginBottom: marginBottom}]}
      onPress={() => onClick()}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.txt}>{label}</Text>
    </TouchableOpacity>
  );
};

export default SettingScreenCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: WP(100),
    height: HP(7),
    alignSelf: 'center',
    marginTop: HP(1),
    borderRadius: 10,
    alignItems: 'center',
    borderBottomColor: '#00000030',
    borderBottomWidth: 0.5,
  },
  icon: {
    width: WP(7),
    height: WP(7),
    marginLeft: WP(8),
  },
  txt: {
    color: colors.b1,
    fontSize: size.normal,
    fontFamily: family.InterSemiBold,
    marginLeft: WP(4),
  },
});
