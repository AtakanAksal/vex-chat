import React, { useState, FC } from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useUserValue } from '../../contexts/UserContext';

const Login: FC = () => {
  const [text, setText] = useState<string | ''>('');
  const [password, setPassword] = useState<string | ''>('');
  const { loginUser } = useUserValue();

  const handleLogin = () => {
    if (text && password) {
      loginUser(text, password);
    }
  };

  const fakeLogin = () => {
    setText('vexpo');
    setPassword('123456');
  };
  const fakeLogin2 = () => {
    setText('vexpoemre');
    setPassword('123456');
  };
  const fakeLogin3 = () => {
    setText('demouser');
    setPassword('123456');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>EXPO HESABI İLE GİRİŞ YAP</Text>
      <TextInput
        style={{ height: 40 }}
        placeholder="Username"
        onChangeText={txt => setText(txt)}
        defaultValue={text}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="Password"
        onChangeText={pwd => setPassword(pwd)}
        defaultValue={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity style={styles.button2} onPress={fakeLogin}>
          <Text>Fake Vexpo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={fakeLogin2}>
          <Text>Fake Vexpoemre</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={fakeLogin3}>
          <Text>Fake demouser</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 20,
    color: '#4c4c4c',
    textAlign: 'center',
    marginTop: '5%',
    marginBottom: '5%',
  },
  input: {
    fontSize: 15,
    height: 40,
    margin: 12,
    padding: 5,
    borderWidth: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  button2: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginHorizontal: 5,
    alignSelf: 'center',
  },
});
