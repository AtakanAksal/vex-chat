import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';

const Settings = () => {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    };
  }, []);

  return (
    <View style={styles.container}>
      <WebView source={{ uri: 'http://192.168.1.58:3000' }} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
