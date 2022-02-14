import React, { FC, useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';

const CameraContainer: FC<any> = ({ type }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [primaryScreen, setPrimaryScreen] = useState<string>('camera');
  const video = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red', fontSize: 50 }}>SAYFA 1</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={
          primaryScreen === 'camera'
            ? styles.bigContainer
            : styles.smallContainer
        }
        onPress={() =>
          primaryScreen === 'camera' ? null : setPrimaryScreen('camera')
        }
      >
        <Camera style={styles.camera} type={type}>
          <View style={styles.buttonContainer} />
        </Camera>
      </Pressable>
      <Pressable
        style={
          primaryScreen === 'video'
            ? styles.bigContainer
            : styles.smallContainer
        }
        onPress={() =>
          primaryScreen === 'video' ? null : setPrimaryScreen('video')
        }
      >
        <Video
          ref={video}
          style={styles.videoBox}
          source={{
            uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          }}
          useNativeControls={false}
          resizeMode="cover"
          isLooping
          shouldPlay
        />
      </Pressable>
    </View>
  );
};

export default CameraContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  videoBox: {
    width: '100%',
    height: '100%',
  },
  bigContainer: {
    flex: 1,
    zIndex: 10,
  },
  smallContainer: {
    position: 'absolute',
    width: '25%',
    height: '25%',
    bottom: 5,
    right: 5,
    backgroundColor: '#000',
    zIndex: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
});
