import React, { FC, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import Constants from 'expo-constants';

import placeholder from '../../../../../assets/general-icons/placeholder.jpg';
import backIcon from '../../../../../assets/general-icons/back-btn.png';
import exitIcon from '../../../../../assets/general-icons/exit2.png';
import muteIcon from '../../../../../assets/general-icons/mute.png';

const WINDOW = Dimensions.get('window');

const GroupVoiceModal: FC<any> = ({ closePress, conversation, user }) => {
  const [participantsData, setParticipantsData] = useState<any>([]);

  useEffect(() => {
    const me = conversation.channel_participants.filter(
      (el: any) => el.user_id === user.id,
    );
    setParticipantsData((prev: any) => [...prev, ...me]);
    const others = conversation.channel_participants.filter(
      (el: any) => el.user_id !== user.id,
    );
    setParticipantsData((prev: any) => [...prev, ...others]);
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.viewContainer, styles.headerRow]}>
        <BackButton closePress={closePress} />
        <Text style={styles.text}>{conversation.name}</Text>
      </View>
      <View
        style={{
          width: '100%',
          flexGrow: 1,
          height: '80%',
          justifyContent: 'center',
          //   justifyContent: 'center',
        }}
      >
        <FlatList
          style={{ flex: 1 }}
          data={participantsData}
          renderItem={({ item }) => <Participant item={item} />}
          keyExtractor={item => item.id}
          numColumns={2}
        />
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

const Participant: FC<any> = ({ item }) => {
  //   console.log(item);

  return (
    <View style={{ width: WINDOW.width / 2 - 10, height: 200, margin: 5 }}>
      <Image
        style={styles.img}
        source={{ uri: item.user.userdetail.picture }}
        resizeMode="cover"
      />
      <View
        style={{
          position: 'absolute',
          bottom: 5,
          right: 0,
          left: 0,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#FFFFFF' }}>{item?.user?.userdetail?.name}</Text>
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
    // margin: 5,
    width: '100%',
    height: '100%',
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

export default GroupVoiceModal;
