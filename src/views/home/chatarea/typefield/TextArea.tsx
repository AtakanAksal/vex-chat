import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useSocketValue } from '../../../../contexts/SocketContext';
import { useUserValue } from '../../../../contexts/UserContext';
import { useDebounce } from '../../../../helpers/hooks';

const TextArea: FC<{
  messageText: any;
  setMessageText: any;
  conversation: any;
}> = ({ messageText, setMessageText, conversation }) => {
  const { typeText } = useSocketValue();
  const { user } = useUserValue();

  const [searchText, setSearchText] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchText, 500);

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm !== '') {
      typeText({
        room: Number(conversation.id),
        username: user.username,
        user_id: user.id,
      });
    }
  }, [debouncedSearchTerm]);

  const handleKeyPress = () => {
    setSearchText(Date.now().toString());
  };

  return (
    <TextInput
      style={styles.textInput}
      multiline
      value={messageText}
      onChangeText={value => setMessageText(value)}
      onKeyPress={handleKeyPress}
    />
  );
};

export default TextArea;

const styles = StyleSheet.create({
  textInput: {
    flex: 10,
    padding: 5,
  },
});
