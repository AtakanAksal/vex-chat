import React, { FC, useState } from 'react';
import { StyleSheet, Image, Modal, Pressable } from 'react-native';
// import { Portal } from 'react-native-portalize';
import FullScreenImageModal from '../../../components/FullScreenImageModal';

const ImageMessage: FC<any> = ({ content, fromModal }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <Image
          style={fromModal ? styles.imageBoxOnModal : styles.imageBox}
          resizeMode="cover"
          source={{ uri: content }}
        />
      </Pressable>
      {/* <Portal> */}
      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <FullScreenImageModal
          closePress={() => {
            setModalVisible(false);
          }}
          img={content}
        />
      </Modal>
      {/* </Portal> */}
    </>
  );
};

export default ImageMessage;

const styles = StyleSheet.create({
  imageBoxOnModal: {
    alignSelf: 'center',
    width: 150,
    height: 120,
  },
  imageBox: {
    alignSelf: 'center',
    width: 200,
    height: 180,
  },
});
