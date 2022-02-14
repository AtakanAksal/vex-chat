import React, { FC } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const WINDOW = Dimensions.get('window');

// const BtnMain = ({ buttonDisabled, onPress, txt }) => {<
const MainBtnAbsolute: FC<{
  handlePress: any;
  buttonDisabled: boolean;
  txt: string;
}> = ({ buttonDisabled, handlePress, txt }) => {
  return (
    <View
      style={{
        margin: 10,
        position: 'absolute',
        top: WINDOW.height - WINDOW.height / 10,
        width: '95%',
        alignSelf: 'center',
      }}
    >
      <TouchableOpacity
        style={buttonDisabled ? styles.buttonDisable : styles.button}
        onPress={handlePress}
        disabled={buttonDisabled}
      >
        <Text
          style={buttonDisabled ? styles.buttonTextDisable : styles.buttonText}
        >
          {txt}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainBtnAbsolute;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00AA9F',
    backgroundColor: '#00AA9F',
    padding: 10,
  },
  buttonDisable: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00AA9F',
    padding: 10,
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
  },
  buttonTextDisable: {
    fontSize: 15,
    color: '#6C757D',
  },
});
