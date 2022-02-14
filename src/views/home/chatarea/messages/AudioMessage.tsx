/* eslint-disable react/require-default-props */
import React, { useState, useEffect, FC, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native';
import { Audio } from 'expo-av';
import { millisToMinsAndSecs } from '../../../../helpers/functions';

const AudioMessage: FC<{ content: any }> = ({ content }) => {
  const [track, setTrack] = useState<any>(null);
  const [duration, setDuration] = useState<string>('0:00');
  const [currentTime, setCurrentTime] = useState<string>('0:00');
  const [condition, setCondition] = useState<string>('initializing');

  useEffect(() => {
    if (track) {
      track.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }
    return track
      ? () => {
          console.log('Unloading Sound');
          // track?.stopAsync();
          track.unloadAsync();
        }
      : undefined;
  }, [track]);

  const beginDownloading = useCallback(async () => {
    setCondition('initializing');
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: content,
      },
      { shouldPlay: false },
    );
    const status: any = await sound.getStatusAsync();
    setDuration(millisToMinsAndSecs(status.durationMillis || '0'));
    setTrack(sound);
  }, []);

  const onPlaybackStatusUpdate = useCallback(playbackStatus => {
    setCurrentTime(millisToMinsAndSecs(playbackStatus.positionMillis || '0'));

    if (!playbackStatus.isLoaded) {
      // unloaded state
      setCondition('loading');
      if (playbackStatus.error) {
        console.log(`Encountered a fatal error: ${playbackStatus.error}`);
      }
    } else {
      // loaded state
      if (playbackStatus.isPlaying) {
        // playing state
        setCondition('playing');
      } else {
        setCondition('paused');
        // paused state
      }
      if (playbackStatus.isBuffering) {
        // buffering state
        setCondition('buffering');
      }
      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        setCondition('finished');
        // finished playing and will stop.
      }
    }
  }, []);

  const playSound = async () => {
    track?.playAsync();
  };
  const pauseSound = async () => {
    track?.pauseAsync();
  };

  const replaySound = async () => {
    track?.replayAsync();
  };

  return (
    <View style={{ height: 75, width: 170 }}>
      <View style={styles.audioBox}>
        <Text style={styles.text}>Ses Kaydı</Text>
      </View>
      <View style={styles.audioBox}>
        <View
          style={{ borderWidth: 1, flexDirection: 'row', alignItems: 'center' }}
        >
          {
            {
              initializing: (
                <AudioControlButton
                  imgSrc="https://img.icons8.com/ios-glyphs/30/000000/down2.png"
                  handlePress={beginDownloading}
                />
              ),
              loading: (
                <AudioControlButton imgSrc="https://img.icons8.com/ios-glyphs/30/000000/loading-bar--v2.gif" />
              ),
              playing: (
                <AudioControlButton
                  imgSrc="https://img.icons8.com/ios-glyphs/30/000000/pause--v1.png"
                  handlePress={pauseSound}
                />
              ),
              paused: (
                <AudioControlButton
                  imgSrc="https://img.icons8.com/ios-glyphs/30/000000/play--v1.png"
                  handlePress={playSound}
                />
              ),
              buffering: (
                <AudioControlButton imgSrc="https://img.icons8.com/ios-glyphs/30/000000/dots-loading--v4.gif" />
              ),
              finished: (
                <AudioControlButton
                  imgSrc="https://img.icons8.com/ios-glyphs/30/000000/replay.png"
                  handlePress={replaySound}
                />
              ),
            }[condition]
          }
          <Text style={styles.text}>
            {currentTime} / {duration}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AudioMessage;

const AudioControlButton: FC<{ imgSrc: string; handlePress?: any }> = ({
  imgSrc,
  handlePress = () => {
    console.log('empty click');
  },
}) => {
  return (
    <TouchableOpacity style={styles.headerButtons} onPress={handlePress}>
      <Image
        style={styles.headerBtnImages}
        source={{ uri: imgSrc }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  audioBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playbackBox: {
    marginVertical: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginHorizontal: 15,
    padding: 5,
    color: '#c1c1c1',
    fontWeight: 'bold',
  },
  headerButtons: {
    marginHorizontal: 8,
  },
  headerBtnImages: {
    width: 30,
    height: 30,
  },
});

// TODO: audio controls; audio stop on scroll, audio scroll on backbutton
