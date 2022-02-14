import React, { FC, useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Modal,
  Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

import { useUserValue } from '../../../contexts/UserContext';
import { useDataChannelContent } from '../../../helpers/connectionsRest';
import ChatAreaHeader from './ChatAreaHeader';
import ChatAreaDiscussion from './ChatAreaDiscussion';
import ChatAreaTypefield from './ChatAreaTypefield';

import { useSocketValue } from '../../../contexts/SocketContext';
import InfoModalMain from './infoModal/InfoModalMain';
import MessageModal from './messages/MessageModal';

const WINDOW_WIDTH = Dimensions.get('window').width;

const Chatarea = () => {
  const route: any = useRoute();

  if (typeof route.params === 'object' && 'itemId' in route.params)
    return <ChatDataGate itemId={route.params.itemId.toString()} />;

  return <Text style={styles.paragraph}>Error. Cant find a conversation.</Text>;
};

export default Chatarea;

const ChatDataGate: FC<{ itemId: string }> = ({ itemId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [messageModal, setMessageModal] = useState<any>(null);
  const { user } = useUserValue();
  const { joinRoom, leaveRoom, emptyMessageBox } = useSocketValue();
  const { data, isLoading, isError, mutate } = useDataChannelContent(
    itemId,
    user.token,
  );

  useEffect(() => {
    if (!isLoading && !isError && data) {
      joinRoom({ payload: { roomname: Number(itemId) } });
    }
    return () => {
      leaveRoom({ payload: { roomname: Number(itemId) } });
      emptyMessageBox();
    };
  }, [data, isError, isLoading, itemId]);

  if (isLoading) return <Text style={styles.paragraph}>Loading</Text>;
  if (isError) return <Text style={styles.paragraph}>Hata</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ChatAreaHeader conversation={data} setModalVisible={setModalVisible} />
      </View>
      <SafeAreaView style={styles.discussion}>
        <ChatAreaDiscussion
          conversation={data}
          setMessageModal={setMessageModal}
        />
      </SafeAreaView>
      <View style={styles.typefield}>
        <ChatAreaTypefield conversation={data} />
      </View>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <InfoModalMain
          closePress={() => {
            setModalVisible(false);
          }}
          data={data}
          user={user}
          chatareaMutate={mutate}
        />
      </Modal>

      <Modal
        transparent
        animationType="fade"
        visible={messageModal !== null}
        onRequestClose={() => {
          setMessageModal(null);
        }}
      >
        <MessageModal
          closePress={() => {
            setMessageModal(null);
          }}
          data={messageModal}
          // img={content}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    flexGrow: 0,
    backgroundColor: '#008080',
  },
  discussion: {
    flexGrow: 1,
    backgroundColor: '#f2eadc',
  },
  typefield: {
    flexGrow: 0,
    padding: 6,
    backgroundColor: '#f5f4f2',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalParts: {
    flexDirection: 'row',
    marginVertical: 10,
    width: WINDOW_WIDTH - 20,
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
    backgroundColor: '#FFFFFF',
  },

  // modal styles
});

// TODO: discussion area background image = import bgGrid from '../../../../assets/grid.jpg';
