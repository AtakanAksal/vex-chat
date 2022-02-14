import React, { FC } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSocketValue } from '../../../../contexts/SocketContext';
import AudioMessage from './AudioMessage';
import FileMessage from './FileMessage';
import ImageMessage from './ImageMessage';
import VideoMessage from './VideoMessage';

import onlineIcon from '../../../../../assets/general-icons/online.png';
import fowardIcon from '../../../../../assets/general-icons/foward.png';
import deleteIcon from '../../../../../assets/general-icons/delete.png';

const MessageModal: FC<any> = ({ closePress, data }) => {
  console.log(data);

  const { onlineUsers } = useSocketValue();

  return (
    <Pressable style={styles.outerContainer} onPress={closePress}>
      <TouchableWithoutFeedback>
        <View style={styles.innerContainer}>
          <View style={styles.messageContainer}>
            <View style={styles.massagebox}>
              {data.type === 'text' && (
                <Text style={styles.massagetext}>{data.content}</Text>
              )}

              {data.type === 'image' && (
                <ImageMessage content={data.content} fromModal />
              )}
              {data.type === 'audio' && <AudioMessage content={data.content} />}
              {data.type === 'video' && (
                <VideoMessage content={data.content} fromModal />
              )}
              {data.type === 'pdf' && <FileMessage content={data.content} />}
            </View>
          </View>
          <View style={styles.usersContainer}>
            <Text
              style={{
                color: '#c1c1c1',
                textAlign: 'center',
                width: '100%',
                fontStyle: 'italic',
                fontSize: 12,
                marginTop: 10,
              }}
            >
              Kimler gördü ?
            </Text>
            <ScrollView>
              {data?.channel_message_seen_users?.map((el: any) => (
                <View key={el.id} style={styles.listItem}>
                  <View style={styles.listItemLeft}>
                    {onlineUsers.find(
                      (element: any) => element.userId === el.user_id,
                    ) ? (
                      <Image
                        style={{ width: 15, height: 15, marginRight: 5 }}
                        source={onlineIcon}
                        resizeMode="contain"
                      />
                    ) : (
                      <View style={{ width: 15, height: 15, marginRight: 5 }} />
                    )}
                    <Image
                      style={{ width: 50, height: '80%', borderRadius: 10 }}
                      source={{ uri: el?.user?.userdetail?.picture }}
                      resizeMode="contain"
                    />
                    <Text style={{ marginLeft: 10 }}>
                      {el?.user?.userdetail?.name}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                margin: 5,
              }}
            >
              <Image
                style={{ width: 30, height: 30, marginRight: 10 }}
                source={fowardIcon}
                resizeMode="contain"
              />
              <Text>Mesaji İlet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                margin: 5,
              }}
            >
              <Image
                style={{ width: 30, height: 30, marginRight: 10 }}
                source={deleteIcon}
                resizeMode="contain"
              />
              <Text>Mesaji Sil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Pressable>
  );
};

// const renderItem: FC<any> = ({ item }) => (
//   <View>
//     <Image />
//   </View>
// );

export default MessageModal;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000090',
  },

  innerContainer: {
    backgroundColor: '#FFF',
    width: '80%',
    height: '80%',
    padding: 10,
  },

  messageContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2eadc',
    padding: 5,
    borderRadius: 10,
  },

  massagebox: {
    backgroundColor: '#3094db',
    borderRadius: 8,
    padding: 5,
  },
  massagetext: {
    fontSize: 16,
    padding: 4,
    color: '#fff',
    // textAlign: 'right',
  },

  usersContainer: {
    flex: 3,
    padding: 5,
  },

  buttonsContainer: {
    flex: 2,
    borderTopWidth: 1,
    justifyContent: 'space-around',
  },

  listItem: {
    borderBottomWidth: 0.5,
    borderColor: '#292929',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemLeft: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
