import React, { FC } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useSocketValue } from '../../../contexts/SocketContext';

const Calls = () => {
  const { onlineUsers } = useSocketValue();
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Calls</Text>
      {onlineUsers.map((el: any) => (
        <SingleItem item={el} key={el.userId} />
      ))}
    </View>
  );
};

const SingleItem: FC<any> = ({ item }) => {
  return (
    <View style={styles.item}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: item?.userdetail?.picture,
        }}
      />
      <View style={styles.secondRow}>
        <Text>{item.userId}</Text>
        <Text>{item.socketId}</Text>
      </View>
    </View>
  );
};

export default Calls;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#e0e6e2',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  tinyLogo: {
    backgroundColor: '#fff',
    width: 64,
    height: 64,
  },
  secondRow: {
    paddingHorizontal: 16,
  },
});
