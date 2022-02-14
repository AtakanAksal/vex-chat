import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const VideoMessage: FC<any> = ({ content, fromModal }) => {
  const video = React.useRef(null);

  return (
    <Video
      ref={video}
      style={fromModal ? styles.videoBoxOnModal : styles.videoBox}
      source={{
        uri: content,
      }}
      useNativeControls
      resizeMode="contain"
      isLooping
    />
  );
};

export default VideoMessage;

const styles = StyleSheet.create({
  videoBoxOnModal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 150,
    height: 120,
  },
  videoBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 200,
    height: 180,
  },
});
