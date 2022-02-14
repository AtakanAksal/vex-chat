import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { useUserValue } from '../../../contexts/UserContext';
import { useDataChannels } from '../../../helpers/connectionsRest';
import ConversationList from './ConversationList';

const Conversations = () => {
  const { user } = useUserValue();
  const { data, isLoading, isError } = useDataChannels(user.token);

  if (isLoading) return <Text>Loading</Text>;
  if (isError) return <Text>Hata</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <ConversationList data={data} />
    </SafeAreaView>
  );
};

export default Conversations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
