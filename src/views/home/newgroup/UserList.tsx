import React, { FC, useState, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  FlatList,
  View,
  TextInput,
  Text,
} from 'react-native';
import { useUserValue } from '../../../contexts/UserContext';
import { useDataUserList } from '../../../helpers/connectionsRest';
import { useDebounce } from '../../../helpers/hooks';
import UserListItem from '../chatarea/infoModal/UserListItem';

const WINDOW = Dimensions.get('window');

const UserList: FC<any> = ({
  selectedUsers,
  setSelectedUsers,
  groupMembers,
}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchResult, setSearchResult] = useState<any>(null);

  const { user } = useUserValue();
  const { data, isLoading, isError } = useDataUserList(user.token);
  const debouncedSearchTerm = useDebounce(searchText, 300);

  const correctData = data?.filter((el: any) => !groupMembers.includes(el.id));

  useEffect(() => {
    if (data) {
      if (debouncedSearchTerm) {
        setSearchResult(
          correctData.filter((el: any) =>
            el.username
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase()),
          ),
        );
      } else {
        setSearchResult(null);
      }
    }
  }, [data, debouncedSearchTerm]);

  if (isLoading || isError) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <>
      <View style={{ ...styles.modalParts, flex: 1 }}>
        <TextInput
          style={{ flex: 1, marginHorizontal: 10 }}
          onChangeText={text => setSearchText(text)}
        />
      </View>

      <View style={{ ...styles.modalParts, flex: 6 }}>
        <FlatList
          style={{ height: '100%' }}
          data={searchResult || correctData}
          renderItem={({ item }) => (
            <UserListItem
              item={item}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </>
  );
};

export default UserList;

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
});
