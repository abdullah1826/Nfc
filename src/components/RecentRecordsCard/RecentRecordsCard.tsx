import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HP, WP} from '../../shared/theme/PixelResponsive';
import {appRadius, family, size} from '../../shared/theme/sizes';
import {colors} from '../../shared/theme/colors';

interface props {
  Icon: any;
  title: string;
  Desc: string;
}

const RecentRecordsCard: React.FC<props> = ({Icon, title, Desc}) => {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        alignItems: 'center',
      }}>
      <View style={styles.container}>
        <Image source={Icon} style={styles.cardIcon} />
        <View style={styles.innerContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.cardDesc}>
            {Desc}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RecentRecordsCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: appRadius.boxRadius,
    backgroundColor: colors.bg1,
    elevation: 2,
    shadowColor: colors.b1,
    height: HP(13),
    alignItems: 'center',
    marginTop: HP(1),
    width: WP('89'),
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardIcon: {
    height: HP(8),
    width: WP(16),
    marginLeft: WP(8),
  },
  cardTitle: {
    color: colors.b1,
    fontFamily: family.InterBold,
    fontSize: size.xsmall,
  },
  cardDesc: {
    color: colors.b1,
    fontSize: size.tiny,
    marginTop: HP(0.1),
    width: WP(50),
  },
  innerContainer: {
    marginLeft: WP(4),
  },
});
