import React, { FC, useRef } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
// import {
//   GestureHandlerRootView,
//   PinchGestureHandler,
//   PanGestureHandler,
// } from 'react-native-gesture-handler';

import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

import backIcon from '../../../assets/general-icons/back-btn.png';

const WINDOW = Dimensions.get('window');

const FullScreenImageModal: FC<{ closePress: any; img: any }> = ({
  closePress,
  img,
}) => {
  // const scale = useRef(new Animated.Value(1)).current;
  // const translateX = useRef(new Animated.Value(0)).current;

  // const handlePinch = Animated.event([{ nativeEvent: { scale } }], {
  //   useNativeDriver: true,
  // });

  // const handlePan = Animated.event(
  //   [{ nativeEvent: { translationX: translateX } }],
  //   {
  //     useNativeDriver: true,
  //   },
  // );

  return (
    // <GestureHandlerRootView style={styles.mainContainer}>
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.backBtn} onPress={closePress}>
        <Image
          style={styles.headerBtnImages}
          source={backIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {/* <PanGestureHandler onGestureEvent={handlePan}> */}
      {/* <Animated.View style={styles.container}> */}
      <View style={styles.container}>
        {/* <PinchGestureHandler onGestureEvent={handlePinch}> */}
        {/* <Animated.Image */}

        <ReactNativeZoomableView
          maxZoom={1.5}
          minZoom={0.5}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders
          captureEvent
          style={{ padding: 10 }}
        >
          <Image
            // style={[styles.img, { transform: [{ scale }, { translateX }] }]}
            style={styles.img}
            source={{ uri: img }}
            resizeMode="center"
          />
        </ReactNativeZoomableView>
        {/* </PinchGestureHandler> */}
      </View>
      {/* </PanGestureHandler> */}
    </View>
    // </GestureHandlerRootView>
  );
};

export default FullScreenImageModal;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerBtnImages: {
    width: 40,
    height: 40,
  },
  backBtn: {
    padding: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },

  img: {
    height: WINDOW.height,
    width: WINDOW.width,
  },
});
