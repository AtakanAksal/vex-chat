import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import smileIcon from '../../../../../assets/general-icons/smile.png';

const EmojiPicker = () => {
  return (
    <TouchableOpacity>
      <Image style={styles.smileIcon} source={smileIcon} resizeMode="contain" />
    </TouchableOpacity>
  );
};

export default EmojiPicker;

const styles = StyleSheet.create({
  smileIcon: {
    height: 25,
    width: 25,
    flex: 1,
  },
});
