import React, { FC } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

import checkIcon from '../../../../../assets/general-icons/check-icon.png';

const UserListItem: FC<{
  item: any;
  selectedUsers: any;
  setSelectedUsers: any;
}> = ({ item, selectedUsers, setSelectedUsers }) => {
  //   console.log(selectedUsers);

  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={() =>
        selectedUsers.includes(item.id)
          ? setSelectedUsers((prev: any) =>
              prev.filter((itm: any) => itm !== item.id),
            )
          : setSelectedUsers((prev: any) => [...prev, item.id])
      }
    >
      <View
        style={{ flexDirection: 'row', alignItems: 'center', height: '100%' }}
      >
        <Image
          style={{ width: 50, height: '80%', borderRadius: 10 }}
          source={{ uri: item?.userdetail?.picture }}
          resizeMode="contain"
        />
        <Text style={{ marginLeft: 10 }}>{item?.userdetail?.name}</Text>
      </View>
      {selectedUsers.includes(item.id) ? (
        <Image
          style={{ width: 50, height: '80%', borderRadius: 10 }}
          source={checkIcon}
          resizeMode="contain"
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default UserListItem;

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    elevation: 2,
    margin: 5,
    alignItems: 'center',
  },
});
