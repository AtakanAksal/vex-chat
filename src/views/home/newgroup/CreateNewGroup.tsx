import React, { FC, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

import placeholder from '../../../../assets/general-icons/placeholder.png';
import MainBtnAbsolute from '../../components/MainBtnAbsolute';
import { createGroup } from '../../../helpers/connectionsRest';
import { useUserValue } from '../../../contexts/UserContext';
import BackBtnAbsolute from '../../components/BackBtnAbsolute';

const WINDOW = Dimensions.get('window');

const CreateNewGroup: FC<{
  setPageNumber: any;
  setCreatedGroup: any;
  closePress: any;
}> = ({ setPageNumber, setCreatedGroup, closePress }) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [groupName, setGroupName] = useState<string>('');
  const [creating, setCreating] = useState<boolean>(false);

  const { user } = useUserValue();

  const getImage = async (type: any) => {
    const result: DocumentPicker.DocumentResult =
      await DocumentPicker.getDocumentAsync({ type });
    if (result.type !== 'cancel') {
      setSelectedImage(result.uri);
      console.log(result);
    }
  };

  const createGroupFunc = () => {
    setCreating(true);
    createGroup(user.token, selectedImage, groupName, '1', 'private')
      .then((res: any) => {
        console.log(res);
        setCreatedGroup(res.data);
        // setCreating(false);
        setPageNumber(2);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <BackBtnAbsolute handlePress={closePress} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: '#fff',
          }}
        >
          <TouchableOpacity
            style={{
              width: WINDOW.width,
              padding: 20,
              height: WINDOW.width / 1.3,
            }}
            onPress={() => getImage(['image/*'])}
          >
            <Image
              style={{
                width: '100%',
                height: '100%',
              }}
              source={selectedImage ? { uri: selectedImage } : placeholder}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 11,
                fontStyle: 'italic',
                textAlign: 'center',
                textAlignVertical: 'center',
              }}
            >
              Grup fotoğrafı seçiniz
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: '90%',
              padding: 10,
              marginTop: 40,
              elevation: 5,
              backgroundColor: '#FFFFFF',
            }}
          >
            <TextInput
              value={groupName}
              onChangeText={value => setGroupName(value)}
              placeholder="Grup adını giriniz"
            />
          </View>
          {creating ? (
            <View
              style={{ marginTop: 20, marginBottom: 10, alignItems: 'center' }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}
              >
                Grup oluşturuluyor...
              </Text>
              <ActivityIndicator color="#00AA9F" size="large" />
            </View>
          ) : null}

          <MainBtnAbsolute
            handlePress={() => createGroupFunc()}
            buttonDisabled={
              !(
                selectedImage.length > 0 &&
                groupName.length > 0 &&
                creating === false
              )
            }
            txt="Kaydet ve İlerle"
          />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default CreateNewGroup;

const styles = StyleSheet.create({});
