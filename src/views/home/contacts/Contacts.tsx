import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import { useUserValue } from '../../../contexts/UserContext';
import {
  useDataChannels,
  useDataUserList,
} from '../../../helpers/connectionsRest';
import ContactsList from './ContactList';
import PhoneContacts from './PhoneContacts';

const Contacts = () => {
  const [selectedWindow, setSelectedWindow] = useState<number>(1);
  const { user } = useUserValue();
  const { data, isLoading, isError } = useDataUserList(user.token);
  const conversations = useDataChannels(user.token);

  if (isLoading) return <Text>Loading</Text>;
  if (isError) return <Text>Hata</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSelectedWindow(1)}
        >
          <Text>Expo Kullanıcıları</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSelectedWindow(2)}
        >
          <Text>Kişi Listem</Text>
        </TouchableOpacity>
      </View>
      {
        {
          1: <ContactsList data={data} conversations={conversations} />,
          2: <PhoneContacts />,
        }[selectedWindow]
      }
    </SafeAreaView>
  );
};

export default Contacts;

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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});
