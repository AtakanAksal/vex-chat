import React, { FC } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

import placeholder from '../../../../../assets/general-icons/placeholder.jpg';
import backIcon from '../../../../../assets/general-icons/back-btn.png';
import exitIcon from '../../../../../assets/general-icons/exit2.png';
import muteIcon from '../../../../../assets/general-icons/mute.png';

const VoiceModal: FC<any> = ({ closePress, conversationUser }) => {
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
          width: '80%',
          justifyContent: 'center',
        }}
      >
        <Image style={styles.img} source={placeholder} resizeMode="cover" />
      </View>
      <View style={[styles.viewContainer, styles.buttonRow]}>
        <TouchableOpacity>
          <Image
            style={styles.headerBtnImages}
            source={muteIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
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

// const MuteButton: FC<any> = () => {
//   return (
//     <TouchableOpacity style={styles.button}>
//       <Text style={styles.text2}> MUTE </Text>
//     </TouchableOpacity>
//   );
// };

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

export default VoiceModal;
