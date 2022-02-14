import React, { FC, useState, useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { useUserValue } from '../../../contexts/UserContext';

import {
  addPersonToGroup,
  useDataChannelContent,
  useDataChannels,
} from '../../../helpers/connectionsRest';
import { useKeyboardStatus } from '../../../helpers/hooks';
import BackBtnAbsolute from '../../components/BackBtnAbsolute';
import MainBtnAbsolute from '../../components/MainBtnAbsolute';
import UserList from './UserList';

const WINDOW = Dimensions.get('window');

const AddUsersToGroup: FC<IAddUsersToGroupProps> = ({
  groupData,
  setPageNumber,
  closePress,
  oldSelected,
  setOldSelected,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const { user } = useUserValue();
  const keyboardActive = useKeyboardStatus();
  console.log(groupData);

  const { mutate } = useDataChannelContent(groupData.id, user.token);
  const dataChannels = useDataChannels(user.token);

  useEffect(() => {
    if (oldSelected) {
      setSelectedUsers(oldSelected);
    }
  }, []);

  const saveUsersFunc = () => {
    const postData = new FormData();
    postData.append('users', JSON.stringify(selectedUsers));
    postData.append('channel_id', groupData.id);

    addPersonToGroup(postData, user.token)
      .then(res => {
        mutate();
        // console.log(res);
        dataChannels.mutate();
        if (setOldSelected) {
          setOldSelected([]);
        }

        closePress();
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <View style={styles.modalContainer}>
        {!keyboardActive && (
          <>
            <View style={{ ...styles.modalParts, flex: 3 }}>
              <Image
                style={{ height: '100%', width: '100%' }}
                source={{ uri: groupData.image }}
                resizeMode="cover"
              />

              <BackBtnAbsolute handlePress={() => setPageNumber(1)} />
            </View>
            <View
              style={{
                ...styles.modalParts,
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <Text style={styles.chatNameText}>{groupData.name}</Text>
            </View>
          </>
        )}

        <UserList
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          groupMembers={groupData.channel_participants?.map(
            (el: any) => el.user_id,
          )}
        />
        <View style={{ flex: 1.2 }} />
      </View>
      <MainBtnAbsolute
        handlePress={saveUsersFunc}
        buttonDisabled={false}
        txt="Kaydet ve Bitir"
      />
    </>
  );
};

interface IAddUsersToGroupProps {
  groupData: any;
  setPageNumber: any;
  closePress: any;
  oldSelected: any;
  setOldSelected: any;
}

const styles = StyleSheet.create({
  modalParts: {
    flexDirection: 'row',
    marginVertical: 10,
    width: WINDOW.width - 20,
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
    backgroundColor: '#FFFFFF',
  },
  modalContainer: {
    width: '100%',
    height: WINDOW.height,
    backgroundColor: '#ededed',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },

  chatNameText: {
    color: '#292929',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
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

export default AddUsersToGroup;
