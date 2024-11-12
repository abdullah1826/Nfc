import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {HP, WP} from '../../shared/theme/PixelResponsive';
import {appRadius, family, size} from '../../shared/theme/sizes';
import {appIcons} from '../../shared/theme/assets';
import {colors} from '../../shared/theme/colors';

interface props {
  Icon: any;
  title: string;
  desc: string;
  onClick: () => void;
}

const ActionCard: React.FC<props> = ({Icon, title, desc, onClick}) => {
  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          onClick();
        }}>
        <Image source={Icon} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
        <View style={{width: '100%'}}>
          <Text style={styles.desc}>{desc}</Text>
        </View>
        <Image source={appIcons.Next} style={styles.nextIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default ActionCard;

const styles = StyleSheet.create({
  main: {width: '100%', flex: 1, alignItems: 'center'},
  container: {
    width: WP(27),
    height: HP(16),
    backgroundColor: colors.bg1,
    marginTop: HP(5),
    borderRadius: appRadius.boxRadius,
    padding: WP(3),
    // shadowColor: colors.b1,
    elevation: 2,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    width: Platform.OS === 'android' ? WP(14) : WP('16'),
    height: Platform.OS === 'android' ? HP(6) : HP('8'),
    position: 'absolute',
    top: -20,
    left: 30,
    resizeMode: 'contain',
  },
  title: {
    color: colors.b1,
    marginTop: HP(4),
    fontFamily: family.InterBold,
    fontSize: size.tiny,
    // backgroundColor: 'red'
  },
  desc: {
    color: colors.b1,
    fontSize: size.tiny - 2,
    // backgroundColor: 'red's
  },
  nextIcon: {
    height: HP(1.2),
    width: WP(1.4),
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
});
