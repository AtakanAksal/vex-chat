import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import EmojiPicker from './typefield/EmojiPicker';
import TextArea from './typefield/TextArea';
import FileMenu from './typefield/FileMenu';
import SendMessageButton from './typefield/SendMessageButton';
import RecordAudioButton from './typefield/RecordAudioButton';

const ChatAreaTypefield: FC<{ conversation: any }> = ({ conversation }) => {
  const [messageText, setMessageText] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <EmojiPicker />
        <TextArea
          messageText={messageText}
          setMessageText={setMessageText}
          conversation={conversation}
        />
        <FileMenu conversation={conversation} />
      </View>
      <View style={styles.mainButtonContainer}>
        {messageText.length > 0 ? (
          <SendMessageButton
            setMessageText={setMessageText}
            messageText={messageText}
            conversation={conversation}
          />
        ) : (
          <RecordAudioButton conversation={conversation} />
        )}
      </View>
    </View>
  );
};

export default ChatAreaTypefield;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#d3d3d350',
    padding: 5,
    flex: 6,
  },
  mainButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

// TODO usememo + usecallback optimizasyon
