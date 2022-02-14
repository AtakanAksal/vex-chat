/* eslint-disable no-nested-ternary */
import React, { FC, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Portal } from 'react-native-portalize';

import backIconWhite from '../../../../assets/general-icons/back-btn.png';
import voicechatIcon from '../../../../assets/general-icons/voicechat.png';
import cameraIcon from '../../../../assets/general-icons/camera.png';
import dotIcon from '../../../../assets/general-icons/three-dot-ver-white.png';
import CameraModal from './cameraModal/CameraModal';
import CameraContainer from './cameraModal/CameraContainer';
import VoiceModal from './voiceModal/VoiceModal';
import { getNamePicture, getOnlineStatus } from '../../../helpers/functions';
import { useUserValue } from '../../../contexts/UserContext';
import { useSocketValue } from '../../../contexts/SocketContext';
import GroupVoiceModal from './voiceModal/GroupVoiceModal';
import GroupCameraModal from './cameraModal/GroupCameraModal';

const WINDOW = Dimensions.get('window');

const ChatAreaHeader: FC<IChatAreaHeaderProps> = ({
  conversation,
  setModalVisible,
}) => {
  const [cameraModal, setCameraModal] = useState<boolean>(false);
  const [audioModal, setAudioModal] = useState<boolean>(false);
  const nav = useNavigation();
  const { user } = useUserValue();

  const { onlineUsers, listenerStatus } = useSocketValue();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={() => nav.goBack()}>
          <Image
            style={styles.headerBtnImages}
            source={backIconWhite}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Image
          style={styles.chatImage}
          source={{ uri: getNamePicture(conversation, user).picture }}
          resizeMode="cover"
        />
        <View>
          <Text style={styles.chatName} numberOfLines={1} ellipsizeMode="tail">
            {getNamePicture(conversation, user).name}
          </Text>

          {listenerStatus ? (
            <Text style={styles.chatStatus}>{listenerStatus}</Text>
          ) : conversation.channel_participants.length === 2 ? (
            <Text style={styles.chatStatus}>
              {getOnlineStatus(conversation, user, onlineUsers)}
            </Text>
          ) : null}
        </View>
      </View>
      <View style={styles.leftContainer}>
        <TouchableOpacity
          style={styles.headerButtons}
          onPress={() => setCameraModal(true)}
        >
          <Image
            style={styles.headerBtnImages}
            source={cameraIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerButtons}
          onPress={() => setAudioModal(true)}
        >
          <Image
            style={styles.headerBtnImages}
            source={voicechatIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Menu>
          <MenuTrigger
            customStyles={{
              triggerWrapper: {
                flexDirection: 'row',
                alignItems: 'center',
              },
            }}
          >
            <Image
              style={styles.headerBtnImages}
              source={dotIcon}
              resizeMode="contain"
            />
          </MenuTrigger>

          <MenuOptions
            customStyles={{
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
            }}
          >
            <MenuOption onSelect={() => setModalVisible(true)}>
              <Text>Grup Bilgisi</Text>
            </MenuOption>
            <MenuOption onSelect={() => console.log('mesajları seç')}>
              <Text>Mesajları Seç</Text>
            </MenuOption>
            <MenuOption onSelect={() => console.log('sohbeti sil')}>
              <Text>Sohbeti Sil</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>

        <Portal>
          <Modal
            animationType="fade"
            visible={cameraModal}
            onRequestClose={() => {
              setCameraModal(false);
            }}
          >
            {conversation.channel_participants.length === 2 ? (
              <CameraModal
                closePress={setCameraModal}
                conversationUser={getNamePicture(conversation, user).name}
              />
            ) : (
              <GroupCameraModal
                closePress={setCameraModal}
                conversation={conversation}
                user={user}
              />
            )}
          </Modal>
        </Portal>
        <Portal>
          <Modal
            animationType="fade"
            visible={audioModal}
            onRequestClose={() => {
              setAudioModal(false);
            }}
          >
            {conversation.channel_participants.length === 2 ? (
              <VoiceModal
                closePress={setAudioModal}
                conversationUser={getNamePicture(conversation, user).name}
              />
            ) : (
              <GroupVoiceModal
                closePress={setAudioModal}
                conversation={conversation}
                user={user}
              />
            )}
          </Modal>
        </Portal>
      </View>
    </View>
  );
};

export default ChatAreaHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerBtnImages: {
    width: 30,
    height: 30,
  },
  backBtn: {
    padding: 5,
    marginRight: 10,
  },
  headerButtons: {
    marginHorizontal: 8,
  },
  chatImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 50,
  },
  chatName: {
    color: '#FFFFFF',
    fontSize: 16,
    width: WINDOW.width / 2.7,
  },
  chatStatus: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});

interface IChatAreaHeaderProps {
  conversation: any;
  setModalVisible: any;
}
