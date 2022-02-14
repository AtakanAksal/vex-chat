import React, { useState, FC } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { useSocketValue } from '../../../../contexts/SocketContext';
import { useUserValue } from '../../../../contexts/UserContext';

const RecordAudioButton: FC<{ conversation: any }> = ({ conversation }) => {
  const [isRecording, setIsRecording] = useState<any>(null);
  const { sendChatFile } = useSocketValue();
  const { user } = useUserValue();

  const handleStart = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      );
      setIsRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const handleStop = async () => {
    await isRecording.stopAndUnloadAsync();
    const uri = isRecording.getURI();

    const b64value = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    setIsRecording(null);
    console.log('Recording stopped and stored at', uri);

    sendChatFile({
      payload: {
        name: user.id,
        room: Number(conversation.id),
        content: b64value,
        type: 'audio',
        filename: `${user.id}_audio_${Date.now()}`,
        userjwt: user.token,
        fileextension: '.m4a', // TODO File extension path'den alma, dosya gönderlerdeki gibi
        ismobile: true,
      },
    });

    /*     const fileReader = new FileReader();
    fileReader.readAsDataURL(uri);
    fileReader.onload = () => {
      console.log(fileReader.result);
    }; */
  };

  return (
    <>
      {isRecording ? (
        <TouchableOpacity onPress={handleStop}>
          <Image
            style={styles.mainButtonIcon}
            source={{
              uri: 'https://img.icons8.com/ios-glyphs/30/fa314a/no-microphone.png',
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleStart}>
          <Image
            style={styles.mainButtonIcon}
            source={{
              uri: 'https://img.icons8.com/ios-glyphs/30/000000/microphone.png',
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export default RecordAudioButton;

const styles = StyleSheet.create({
  mainButtonIcon: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
});

// TODO: kayıt yapılırken navigasyonda sayfadan ayrılmasına izin verilmemesi veya kaydın durdurulması gerekli.
