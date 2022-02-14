import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import sendIcon from '../../../../../assets/general-icons/send.png';
import { useSocketValue } from '../../../../contexts/SocketContext';
import { useUserValue } from '../../../../contexts/UserContext';

const SendMessageButton: FC<ISendMessageProps> = ({
  conversation,
  messageText,
  setMessageText,
}) => {
  const { user } = useUserValue();
  const { sendChatMessage } = useSocketValue();

  const handleSend = () => {
    sendChatMessage({
      payload: {
        name: user.id,
        room: Number(conversation.id),
        content: messageText,
        userjwt: user.token,
      },
    });
    // console.log(messageText);
    setMessageText('');
  };

  return (
    <TouchableOpacity onPress={handleSend}>
      <Image
        style={styles.mainButtonIcon}
        source={sendIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default SendMessageButton;

const styles = StyleSheet.create({
  mainButtonIcon: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
});

interface ISendMessageProps {
  conversation: any;
  messageText: any;
  setMessageText: any;
}
