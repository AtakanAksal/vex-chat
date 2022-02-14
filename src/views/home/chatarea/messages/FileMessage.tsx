/* eslint-disable react/require-default-props */
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import * as Linking from 'expo-linking';

const FileMessage: FC<{ content: any }> = ({ content }) => {
  const openFile = (url: string) => {
    Linking.openURL(url);
    // console.log(url);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.fileButton}
        onPress={() => openFile(content)}
      >
        <Text style={styles.buttonText}>{`..${content.substr(
          content.length - 13,
        )}`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FileMessage;

const styles = StyleSheet.create({
  fileButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f4f2',
    width: 180,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#3b3a39',
  },
});
