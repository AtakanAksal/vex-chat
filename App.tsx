/* eslint-disable react/style-prop-object */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { Host } from 'react-native-portalize';

import Main from './src/Main';
import { UserProvider } from './src/contexts/UserContext';
import 'react-native-gesture-handler';

const App = () => {
  return (
    <Host>
      <NavigationContainer>
        <UserProvider>
          <View style={styles.container}>
            <Main />
          </View>
          <StatusBar style="light" backgroundColor="#050f18" />
        </UserProvider>
      </NavigationContainer>
    </Host>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center',
  },
});
