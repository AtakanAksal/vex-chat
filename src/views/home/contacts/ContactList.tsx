import React, { FC, useState, useCallback } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useUserValue } from '../../../contexts/UserContext';
import ContactItem from './ContactItem';
import NewGroupModal from '../newgroup/NewGroupModal';

const ContactList: FC<any> = ({ data, conversations }) => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [multiSelect, setMultiSelect] = useState<boolean>(false);
  const [modalvisible, setModalvisible] = useState<boolean>(false);

  const { user } = useUserValue();
  const nav = useNavigation();

  const handlePress = useCallback(() => {
    if (selectedUsers.length > 0) {
      // startConversation(); z
      setModalvisible(true);
      setMultiSelect(false);
    } else {
      setMultiSelect(false);
    }
  }, [selectedUsers]);

  const modalClosePress = () => {
    setMultiSelect(false);
    setSelectedUsers([]);
    setModalvisible(false);
  };

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ContactItem
            item={item}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            multiSelect={multiSelect}
            setMultiSelect={setMultiSelect}
            conversations={conversations}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selectedUsers}
      />
      {multiSelect ? (
        <View style={{ height: 55, width: '100%' }}>
          <TouchableOpacity
            style={
              selectedUsers.length > 0 ? styles.button : styles.buttonClose
            }
            onPress={handlePress}
          >
            <Text style={styles.buttonText}>
              {selectedUsers.length > 0 ? 'Grup Oluştur' : 'Kapat'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <Modal
        animationType="fade"
        visible={modalvisible}
        onRequestClose={modalClosePress}
      >
        <NewGroupModal
          closePress={modalClosePress}
          oldSelected={selectedUsers}
          setOldSelected={setSelectedUsers}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    flex: 1,
    backgroundColor: '#00AA9F',
  },

  buttonClose: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    flex: 1,
    backgroundColor: '#666666',
  },

  buttonText: {
    fontSize: 15,
    color: '#fff',
  },
});

export default ContactList;
