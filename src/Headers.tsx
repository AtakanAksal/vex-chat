import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import menuIcon from '../assets/general-icons/menu.png';
import searchIcon from '../assets/general-icons/search.png';
import gearIcon from '../assets/general-icons/gear.png';
import backIcon from '../assets/general-icons/back-btn.png';
import deleteIcon from '../assets/general-icons/delete.png';
import logoutIcon from '../assets/general-icons/logout.png';
import groupIcon from '../assets/general-icons/group.png';

export const hideHeaderBar = { headerShown: false };

export const headerBarBasic = (nav: any) => ({
  headerStyle: {
    backgroundColor: '#FFFFFF',
  },
  headerLeft: () => (
    <TouchableOpacity onPress={() => nav.goBack()}>
      <Image style={styles.menuImage} source={backIcon} resizeMode="contain" />
    </TouchableOpacity>
  ),
});

export const headerBarSearch = (
  searchValue: string,
  handleSearch: any,
  setSeacrhOption: any,
) => ({
  title: '',
  headerStyle: {
    backgroundColor: '#FFFFFF',
  },
  headerLeftContainerStyle: {
    maxWidth: '75%',
  },

  headerLeft: () => (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => setSeacrhOption(false)}>
        <Image
          style={styles.menuImage}
          source={backIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TextInput
        style={{
          fontSize: 16,
        }}
        autoFocus
        value={searchValue}
        placeholder="Ara..."
        onChangeText={value => handleSearch(value)}
      />
    </View>
  ),
  headerRight: () =>
    searchValue.length > 0 ? (
      <TouchableOpacity onPress={() => handleSearch('')}>
        <Image
          style={{ ...styles.menuImage, marginRight: 20 }}
          source={deleteIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    ) : null,
});

export const headerBarMain = (
  nav: any,
  setSeacrhOption: any,
  logoutUser: any,
  socketResponse: any,
  setNewGroupModalVisible: any,
) => ({
  title: 'VEXCHAT',
  headerStyle: {
    backgroundColor: '#050f18',
  },
  headerTitleStyle: {
    color: '#ffffff',
  },
  headerTintColor: '#777777',
  headerRight: () => (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => setSeacrhOption(true)}>
        {/* <Image
          style={styles.menuImage}
          source={searchIcon}
          resizeMode="contain"
        /> */}
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
            style={styles.menuImage}
            source={menuIcon}
            resizeMode="contain"
          />
        </MenuTrigger>

        <MenuOptions
          customStyles={{
            optionsContainer: {
              backgroundColor: '#FFFFFF',
              borderWidth: 0.5,
              borderColor: '#c1c1c1',
              width: '45%',
            },

            optionWrapper: {
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
            },
          }}
        >
          <MenuOption onSelect={() => nav.navigate('Settings')}>
            <Image
              style={styles.menuImage}
              resizeMode="contain"
              source={gearIcon}
            />
            <Text>Settings</Text>
          </MenuOption>
          <MenuOption onSelect={() => setNewGroupModalVisible(true)}>
            <Image
              style={styles.menuImage}
              resizeMode="contain"
              source={groupIcon}
            />
            <Text>Yeni Grup Oluştur</Text>
          </MenuOption>
          <MenuOption
            onSelect={() => {
              logoutUser();
              socketResponse.disconnect();
            }}
          >
            <Image
              style={styles.menuImage}
              resizeMode="contain"
              source={logoutIcon}
            />
            <Text>Çıkış Yap</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  ),
});

const styles = StyleSheet.create({
  menuImage: {
    height: 30,
    width: 30,
    marginRight: 5,
  },
});
