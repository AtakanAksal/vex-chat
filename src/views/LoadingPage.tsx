import React, { FC } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useUserValue } from '../contexts/UserContext';

const LoadingPage: FC<any> = ({ socketResponse }) => {
  const { logoutUser } = useUserValue();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color="#00AA9F" size="large" />
      <Text
        style={{
          marginTop: 20,
          color: '#00AA9F',
          fontWeight: 'bold',
          fontSize: 24,
        }}
      >
        Yükleniyor...
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          logoutUser();
          socketResponse?.disconnect();
        }}
      >
        <Text>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoadingPage;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});
