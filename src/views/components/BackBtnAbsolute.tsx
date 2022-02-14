import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import backIcon from '../../../assets/general-icons/back-btn.png';

const BackBtnAbsolute: FC<{ handlePress: any }> = ({ handlePress }) => {
  return (
    <TouchableOpacity
      style={{ position: 'absolute', top: 10, left: 0, zIndex: 1 }}
      onPress={handlePress}
    >
      <Image
        style={{ width: 40, height: 40 }}
        source={backIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default BackBtnAbsolute;

const styles = StyleSheet.create({});
