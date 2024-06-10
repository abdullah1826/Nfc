import React from 'react';
import Modal from 'react-native-modal';
import {
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Text,
} from 'react-native';
import {
    DotIndicator,
  } from 'react-native-indicators';
import {WP, HP, colors, family, size} from '../../exporter';

export const AppLoader = ({loading, tagline = '', showTagLine = false}:any) => {
  return (
    <Modal
      avoidKeyboard={true}
      isVisible={loading}
      hasBackdrop={false}
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={styles.container}>
      <View style={showTagLine ? styles.alertWithTagline : styles.alert}>
        <DotIndicator
          size={10}
          color={colors.green}
          // animating={loading}
          count={3}

        />
        {showTagLine ? <Text style={styles.tagline}>{tagline}</Text> : null}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 0,
    backgroundColor: 'rgba(0,0,0, 0.2)',
  },
  alert: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    borderRadius: WP('1'),
    height: HP('10'),
    width: WP('20'),
    ...Platform.select({
      ios: {
        shadowColor: colors.Black,
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  alertWithTagline: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    borderRadius: WP('1'),
    height: HP('20'),
    width: WP('80'),
    ...Platform.select({
      ios: {
        shadowColor: colors.Black,
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  tagline: {
    fontFamily: family.InterMedium,
    fontSize: size.xsmall,
    marginTop: HP('3'),
    textAlign: 'left',
    alignSelf: 'center',
  },
});
