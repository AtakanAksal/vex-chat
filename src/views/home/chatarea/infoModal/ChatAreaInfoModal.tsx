import React, { FC, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
// import * as FileSystem from 'expo-file-system';

import {
  changeGroupContent,
  useDataChannels,
  changeGroupImage,
  deleteGroup,
  kickPersonFromGroup,
  leaveGroup,
} from '../../../../helpers/connectionsRest';

import editIcon from '../../../../../assets/general-icons/edit.png';
import editStrokeIcon from '../../../../../assets/general-icons/edit-stroke.png';
import exitIcon from '../../../../../assets/general-icons/exit.png';
import deleteIcon from '../../../../../assets/general-icons/delete.png';
import addPersonIcon from '../../../../../assets/general-icons/person-add.png';
import deletePersonIcon from '../../../../../assets/general-icons/person-delete.png';
import adminIcon from '../../../../../assets/general-icons/admin.png';
import okIcon from '../../../../../assets/general-icons/check-icon.png';
import BackBtnAbsolute from '../../../components/BackBtnAbsolute';
import onlineIcon from '../../../../../assets/general-icons/online.png';

import { getNamePicture, getOnlineStatus } from '../../../../helpers/functions';
import { useSocketValue } from '../../../../contexts/SocketContext';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const ChatAreaInfoModal: FC<{
  closePress: any;
  data: any;
  user: any;
  chatareaMutate: any;
  setPageNumber: any;
}> = ({ closePress, data, user, chatareaMutate, setPageNumber }) => {
  const [groupName, setGroupName] = useState('');
  const [changeName, setChangeName] = useState(false);
  const { mutate } = useDataChannels(user.token);

  const nav = useNavigation();
  const { onlineUsers } = useSocketValue();
  // console.log(data);

  useEffect(() => {
    setGroupName(data?.name);
  }, [data]);

  const changeGroupNameFunc = (newName: any) => {
    const postData = new FormData();
    postData.append('name', newName);

    changeGroupContent(postData, user.token, data.id)
      .then(() => {
        mutate();
        chatareaMutate();
      })
      .catch(err => console.log(err));
  };

  const changeGroupImageFunc = async (type: any) => {
    const result: DocumentPicker.DocumentResult =
      await DocumentPicker.getDocumentAsync({ type });
    if (result.type !== 'cancel') {
      changeGroupImage(result, user.token, data.id)
        .then(() => {
          mutate();
          chatareaMutate();
        })
        .catch(err => console.log(err));
    }
  };

  const deleteGroupFunc = async () => {
    const isAdmin = await data.channel_participants.find(
      (el: any) => el.user.id === user.id && el.is_admin === true,
    );

    if (isAdmin) {
      deleteGroup(user.token, data.id)
        .then(() => {
          mutate();
          nav.goBack();
        })
        .catch(err => console.log(err));
    } else {
      alert('Yönetici değilsiniz...');
    }
  };

  const kickPersonGroupFunc = async (userID: any) => {
    const isAdmin = await data.channel_participants.find(
      (el: any) => el.user.id === user.id && el.is_admin === true,
    );

    if (isAdmin) {
      const postData = new FormData();
      postData.append('channel_id', data.id);
      postData.append('user_id', userID);

      kickPersonFromGroup(postData, user.token)
        .then(() => {
          chatareaMutate();
        })
        .catch(err => console.log(err));
    } else {
      alert('Yönetici değilsiniz...');
    }
  };

  const leaveGroupFunc = () => {
    const postData = new FormData();
    postData.append('channel_id', data.id);
    postData.append('user_id', user.id);

    leaveGroup(postData, user.token)
      .then(() => {
        mutate();
        nav.goBack();
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.modalContainer}>
      <View style={{ ...styles.modalParts, flex: 3 }}>
        <Image
          style={{ width: '100%', height: '100%' }}
          source={{ uri: getNamePicture(data, user).picture }}
          resizeMode="cover"
        />

        <BackBtnAbsolute handlePress={closePress} />
        {data.channel_participants.length !== 2 ? (
          <TouchableOpacity
            style={{ position: 'absolute', bottom: 5, right: 5 }}
            onPress={() => changeGroupImageFunc(['image/*'])}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={editStrokeIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {changeName ? (
        <View
          style={{
            ...styles.modalParts,
            flex: 1,
            borderWidth: 2,
            borderColor: '#00AA9F',
          }}
        >
          <TextInput
            style={{ ...styles.chatNameText, flex: 1 }}
            value={groupName}
            autoFocus
            onChangeText={value => setGroupName(value)}
          />
          <TouchableOpacity
            style={{
              borderWidth: 0.5,
              borderColor: '#00AA9F',
            }}
            onPress={() => {
              changeGroupNameFunc(groupName);
              setChangeName(false);
            }}
          >
            <Image
              style={{
                width: 40,
                height: 40,
              }}
              source={okIcon}
              resizeMode="center"
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ ...styles.modalParts, flex: 1 }}>
          <Text style={styles.chatNameText}>
            {getNamePicture(data, user).name}
          </Text>
          {data.channel_participants.length !== 2 ? (
            <TouchableOpacity onPress={() => setChangeName(true)}>
              <Image
                style={{ width: 50, height: 50 }}
                source={editIcon}
                resizeMode="center"
              />
            </TouchableOpacity>
          ) : null}
        </View>
      )}

      <View style={{ ...styles.modalParts, flex: 5 }}>
        <ScrollView
          style={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.scrollViewInner}>
            <Text
              style={styles.scrollMainText}
            >{`${data?.channel_participants.length} Katılımcı`}</Text>
            <TouchableOpacity onPress={() => setPageNumber(2)}>
              <Image
                style={{ width: 30, height: '100%', borderRadius: 10 }}
                source={addPersonIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          {data?.channel_participants.map((el: any) => (
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

              {el.is_admin ? (
                <Image
                  style={{ width: 30, height: '100%', borderRadius: 10 }}
                  source={adminIcon}
                  resizeMode="contain"
                />
              ) : (
                <TouchableOpacity
                  onPress={() => kickPersonGroupFunc(el.user_id)}
                >
                  <Image
                    style={{ width: 30, height: '100%', borderRadius: 10 }}
                    source={deletePersonIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={{ ...styles.modalParts, flex: 1 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => deleteGroupFunc()}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={deleteIcon}
            resizeMode="center"
          />
          <Text>Grubu Sil</Text>
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.modalParts, flex: 1 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => leaveGroupFunc()}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={exitIcon}
            resizeMode="center"
          />
          <Text>Gruptan Ayrıl</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatAreaInfoModal;

const styles = StyleSheet.create({
  modalParts: {
    flexDirection: 'row',
    marginVertical: 10,
    width: WINDOW_WIDTH - 20,
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
    backgroundColor: '#FFFFFF',
  },

  modalContainer: {
    width: '100%',
    height: WINDOW_HEIGHT,
    backgroundColor: '#ededed',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },

  chatNameText: {
    marginLeft: 10,
    color: '#292929',
    fontWeight: 'bold',
    fontSize: 16,
  },

  scrollViewContainer: {
    height: '98%',
    margin: 5,
  },
  scrollViewInner: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#292929',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },
  scrollMainText: {
    color: '#00AA9F',
    fontWeight: 'bold',
    marginLeft: 60,
    fontSize: 16,
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
