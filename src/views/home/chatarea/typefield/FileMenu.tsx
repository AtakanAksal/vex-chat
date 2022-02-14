import React, { FC } from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import addIcon from '../../../../../assets/general-icons/add.png';
import { useSocketValue } from '../../../../contexts/SocketContext';
import { useUserValue } from '../../../../contexts/UserContext';
import { pathName } from '../../../../helpers/functions';

const FileMenu: FC<{ conversation: any }> = ({ conversation }) => {
  const { sendChatFile } = useSocketValue();
  const { user } = useUserValue();

  const sendDocument = async (type: any, uploadedType: string) => {
    const result: DocumentPicker.DocumentResult =
      await DocumentPicker.getDocumentAsync({ type });
    if (result.type !== 'cancel') {
      const b64value = await FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileExt: string = pathName(result.uri);
      sendChatFile({
        payload: {
          name: user.id,
          room: Number(conversation.id),
          content: b64value,
          type: uploadedType,
          filename: `${user.id}_audio_${Date.now()}`,
          userjwt: user.token,
          fileextension: fileExt,
          ismobile: true,
        },
      });
    }
  };

  return (
    <Menu>
      <MenuTrigger customStyles={menuTriggerStyle}>
        <Image style={styles.addIcon} source={addIcon} resizeMode="contain" />
      </MenuTrigger>

      <MenuOptions customStyles={menuOptionsStyle}>
        <MenuOption onSelect={() => sendDocument(['application/pdf'], 'pdf')}>
          <Text>Dosya Ekle</Text>
        </MenuOption>
        <MenuOption onSelect={() => sendDocument(['image/*'], 'image')}>
          <Text>Fotoğraf Ekle</Text>
        </MenuOption>
        <MenuOption onSelect={() => sendDocument(['video/*'], 'video')}>
          <Text>Video Ekle</Text>
        </MenuOption>
        <MenuOption onSelect={() => console.log('Kişi Ekle')}>
          <Text>Kişi Ekle</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

export default FileMenu;

const styles = StyleSheet.create({
  addIcon: {
    height: 25,
    width: 25,
    marginHorizontal: 5,
  },
});

const menuTriggerStyle: any = {
  triggerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};

const menuOptionsStyle: any = {
  optionsContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#c1c1c1',
    width: '40%',
  },
  optionWrapper: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
};
