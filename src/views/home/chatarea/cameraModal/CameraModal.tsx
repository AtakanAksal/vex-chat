import React, { FC, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';

import backIcon from '../../../../../assets/general-icons/back-btn.png';
import CameraContainer from './CameraContainer';
import exitIcon from '../../../../../assets/general-icons/exit2.png';
import muteIcon from '../../../../../assets/general-icons/mute.png';
import flipIcon from '../../../../../assets/general-icons/flip.png';

const CameraModal: FC<any> = ({ closePress, conversationUser }) => {
  const [type, setType] = useState<any>(Camera.Constants.Type.front);

  return (
    <View style={styles.container}>
      <View style={[styles.viewContainer, styles.headerRow]}>
        <BackButton closePress={closePress} />
        <Text style={styles.text}>{conversationUser}</Text>
      </View>
      <View
        style={{
          padding: 10,
          flexGrow: 1,
          width: '100%',
        }}
      >
        <CameraContainer type={type} />
      </View>
      <View style={[styles.viewContainer, styles.buttonRow]}>
        <TouchableOpacity>
          <Image
            style={styles.headerBtnImages}
            source={muteIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <CameraFlipButton type={type} setType={setType} />
        <TouchableOpacity onPress={closePress}>
          <Image
            style={styles.headerBtnImages}
            source={exitIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BackButton: FC<any> = ({ closePress }) => {
  return (
    <TouchableOpacity onPress={() => closePress(false)}>
      <Image
        style={styles.headerBtnImages}
        source={backIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

// const CallCloseButton = () => {
//   return (
//     <TouchableOpacity>
//       <Image
//         style={styles.headerBtnImages}
//         source={backIcon}
//         resizeMode="contain"
//       />
//     </TouchableOpacity>
//   );
// };

const CameraFlipButton: FC<any> = ({ type, setType }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        setType(
          type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back,
        );
      }}
    >
      <Image
        style={styles.headerBtnImages}
        source={flipIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
  headerBtnImages: {
    width: 40,
    height: 40,
  },
  img: {
    maxWidth: '100%',
    backgroundColor: 'blue',
  },
  viewContainer: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text2: {
    fontSize: 16,
    color: 'white',
  },
});

export default CameraModal;
