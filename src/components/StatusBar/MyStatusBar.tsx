import React from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native';
import {colors} from '../../exporter';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const MyStatusBar = ({
  backgroundColor = colors.white,
  translucent,
  ...props
}: any) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <SafeAreaView>
      <StatusBar
        {...props}
        translucent={true}
        barStyle={'dark-content'}
        backgroundColor={backgroundColor}
      />
    </SafeAreaView>
  </View>
);

export {MyStatusBar};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
