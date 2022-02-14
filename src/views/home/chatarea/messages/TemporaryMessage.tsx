import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TemporaryMessage: FC<any> = ({ data }) => {
  return (
    <View style={styles.messageBoxSelf}>
      <Text style={styles.username} />
      {data.type === 'text' && <Text style={styles.text}>{data.content}</Text>}
      {data.type === 'image' && (
        <Text style={styles.text}>Dosya gönderiliyor...</Text>
      )}
      {data.type === 'audio' && (
        <Text style={styles.text}>Dosya gönderiliyor...</Text>
      )}
      {data.type === 'video' && (
        <Text style={styles.text}>Dosya gönderiliyor...</Text>
      )}
      {data.type === 'pdf' && (
        <Text style={styles.text}>Dosya gönderiliyor...</Text>
      )}

      <View style={styles.bottomRow}>
        <Text style={styles.check}>&#9203;</Text>
        <Text style={styles.date} />
      </View>
    </View>
  );
};

export default TemporaryMessage;

const styles = StyleSheet.create({
  messageBoxOther: {
    alignSelf: 'flex-start',
    width: '75%',
    backgroundColor: '#7059b2',
    margin: 5,
    borderRadius: 8,
    padding: 4,
    marginBottom: 10,
  },
  messageBoxSelf: {
    alignSelf: 'flex-end',
    width: '75%',
    backgroundColor: '#599cb2',
    margin: 5,
    borderRadius: 8,
    padding: 4,
    marginBottom: 10,
  },
  username: {
    fontSize: 12,
    color: '#cdd3e7',
    textAlign: 'left',
  },
  text: {
    fontSize: 18,
    paddingVertical: 4,
    color: '#fff',
    textAlign: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 12,
    color: '#cdd3e7',
  },
  check: {
    color: '#cdd3e7',
  },
});
