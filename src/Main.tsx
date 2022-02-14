/* eslint-disable no-nested-ternary */
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, Modal } from 'react-native';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import { io, Socket } from 'socket.io-client';

import Login from './views/login/Login';
import { useUserValue } from './contexts/UserContext';
import Settings from './views/settings/Settings';
import Conversations from './views/home/conversations/Conversations';
import Calls from './views/home/calls/Calls';
import Contacts from './views/home/contacts/Contacts';
import Chatarea from './views/home/chatarea/Chatarea';

import { SocketProvider } from './contexts/SocketContext';

import {
  hideHeaderBar,
  headerBarBasic,
  headerBarSearch,
  headerBarMain,
} from './Headers';
import LoadingPage from './views/LoadingPage';
import NewGroupModal from './views/home/newgroup/NewGroupModal';

const Main: FC = () => {
  const [isVerified, setIsVerified] = useState(false);
  const { verifyToken, user, logoutUser } = useUserValue();
  const [socketResponse, setSocketResponse] = useState<Socket | null>(null);
  const [seacrhOption, setSeacrhOption] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [newGroupModalVisible, setNewGroupModalVisible] = useState(false);

  const Stack = createStackNavigator();
  const nav = useNavigation();

  useEffect(() => {
    setLoading(true);
    async function control() {
      const verifyResponse = await verifyToken();

      if (verifyResponse === true) {
        setIsVerified(true);
      } else {
        setIsVerified(false);
        setLoading(false);
      }
    }
    control();
  }, [user]);

  useEffect(() => {
    if (isVerified) {
      const socketx = io(`http://192.168.1.44:8001?id=${user.id}`);
      socketx.on('connect', () => {
        console.log(socketx.id); // x8WIv7-mJelg7on_ALbx
        setSocketResponse(socketx);
        setLoading(false);
      });
    }
    return () => {
      console.log('isVerified return');
    };
  }, [isVerified]);

  useEffect(() => {
    return () => {
      console.log('socketResponse return 22');
      if (socketResponse) {
        socketResponse.disconnect();
      }
    };
  }, [socketResponse]);

  const handleSearch = (value: string) => {
    // console.log(value);
    setSearchValue(value);
  };

  return (
    <MenuProvider
      skipInstanceCheck
      customStyles={{ backdrop: { backgroundColor: '#FFFFFF', opacity: 0.5 } }}
    >
      {!loading ? (
        isVerified === true ? (
          socketResponse ? (
            <>
              <SocketProvider socket={socketResponse}>
                <Stack.Navigator initialRouteName="Home">
                  <Stack.Screen
                    name="Home"
                    component={HomeTabs}
                    // options={{headerLeftContainerStyle}}
                    initialParams={{ searchValue }}
                    options={
                      seacrhOption
                        ? headerBarSearch(
                            searchValue,
                            handleSearch,
                            setSeacrhOption,
                          )
                        : headerBarMain(
                            nav,
                            setSeacrhOption,
                            logoutUser,
                            socketResponse,
                            setNewGroupModalVisible,
                          )
                    }
                  />
                  <Stack.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                      ...headerBarBasic(nav),
                      ...TransitionPresets.SlideFromRightIOS,
                    }}
                  />
                  <Stack.Screen
                    name="Chatarea"
                    component={Chatarea}
                    options={{
                      ...hideHeaderBar,
                      ...TransitionPresets.SlideFromRightIOS,
                    }}
                  />
                </Stack.Navigator>
              </SocketProvider>
            </>
          ) : (
            <Text>Hata. Giriş yapıldı fakat ağa bağlanılamadı.</Text>
          )
        ) : (
          <>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  ...hideHeaderBar,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
            </Stack.Navigator>
          </>
        )
      ) : (
        <LoadingPage socketResponse={socketResponse} />
      )}
      <Modal
        animationType="slide"
        visible={newGroupModalVisible}
        onRequestClose={() => {
          setNewGroupModalVisible(false);
        }}
      >
        <NewGroupModal
          closePress={() => {
            setNewGroupModalVisible(false);
          }}
          oldSelected={null}
          setOldSelected={null}
        />
      </Modal>
    </MenuProvider>
  );
};

const HomeTabs = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 10 },
      }}
    >
      <Tab.Screen name="ConversatIons" component={Conversations} />
      <Tab.Screen name="Calls" component={Calls} />
      <Tab.Screen name="Contacts" component={Contacts} />
    </Tab.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({
  menuImage: {
    height: 35,
    width: 35,
  },
});

// TODO loading of isverified
