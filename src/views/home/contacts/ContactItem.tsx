/* eslint-disable no-lonely-if */
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useUserValue } from '../../../contexts/UserContext';
import {
  addPersonToGroup,
  createGroup,
  useDataChannels,
} from '../../../helpers/connectionsRest';
import adminIcon from '../../../../assets/general-icons/admin.png';

const ContactItem: FC<IContactItem> = ({
  item,
  selectedUsers,
  setSelectedUsers,
  multiSelect,
  setMultiSelect,
  conversations,
}) => {
  const isUserSelected = !!selectedUsers?.includes(item.id);

  const backgroundColor = isUserSelected ? '#016e66' : '#e0e6e2';
  const color = isUserSelected ? 'white' : 'black';
  const checkbox = isUserSelected ? <>&#9745;</> : <>&#9744;</>;

  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(null);

  const { user } = useUserValue();
  // const dataChannels = useDataChannels(user.token);
  const nav = useNavigation();

  // const isConvoStart = useIsConvoStart(user, item.id);

  useEffect(() => {
    conversations.data.forEach(
      (el: any) =>
        el.channel_participants.length === 2 &&
        el.channel_participants.forEach(
          (element: any) =>
            element.user_id === item.id && setSelectedConversation(el.id),
        ),
    );
  }, [item, conversations]);

  const handlePress = () => {
    // isConversationStart(conversations, item.id);
    if (multiSelect) {
      setSelectedUsers((prevState: number[]) =>
        modifyArray(prevState, item.id),
      );
    } else {
      // eslint-disable-next-line no-alert
      // alert('kullanıcıyla sohbet başlar');
      // console.log(item);
      if (selectedConversation !== null) {
        nav.navigate(
          'Chatarea' as never,
          {
            itemId: selectedConversation,
            otherParam: 'anything you want here',
          } as never,
        );
      } else {
        startConversation();
      }
    }
  };

  const handleLongPress = () => {
    if (multiSelect) {
      setMultiSelect(false);
      setSelectedUsers([]);
    } else {
      setMultiSelect(true);
      setSelectedUsers((prevState: number[]) =>
        modifyArray(prevState, item.id),
      );
    }
  };

  const startConversation = () => {
    // const imageUri = Image.resolveAssetSource(adminIcon).uri;
    // console.log(imageUri);

    // ?    create group file gönderme sorunu
    // !    create group file gönderme sorunu
    // TODO create group file gönderme sorunu

    // console.log(Image.resolveAssetSource(adminIcon).uri);

    createGroup(
      user.token,
      'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540macrohard%252Fvexchat-mobile/DocumentPicker/10cc62fc-4b25-4aaf-a21e-0186ca58d36e.jpeg',
      // 'https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/EvV1Ll4x2W8I4bBWU1WT2ODhVHZRGgRuzQR4XVfM.png',
      'Sohbet',
      '1',
      'private',
    )
      .then((res: any) => {
        console.log(res);
        const postData = new FormData();
        postData.append('users', JSON.stringify([item.id]));
        postData.append('channel_id', res.data.id);
        addPersonToGroup(postData, user.token)
          .then((result: any) => {
            // console.log(result);
            conversations.mutate();
            nav.navigate(
              'Chatarea' as never,
              {
                itemId: res.data.id,
                otherParam: 'anything you want here',
              } as never,
            );
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={handlePress}
        onLongPress={handleLongPress}
        // delayLongPress={300}
        style={{ ...styles.pressable, backgroundColor }}
      >
        {multiSelect ? (
          <View style={styles.secondRow}>
            <Text style={{ ...styles.checkbox, color }}>{checkbox}</Text>
          </View>
        ) : null}

        <Image
          style={styles.tinyLogo}
          source={{
            uri: item?.userdetail?.picture,
          }}
        />
        <View style={styles.secondRow}>
          <Text style={{ ...styles.title, color }}>{item.username}</Text>
          <Text style={{ ...styles.subTitle, color }}>{item.email}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default ContactItem;

const modifyArray = (arr: number[], item: number) => {
  const resultArr = arr.filter(el => el !== item);
  if (resultArr.length === arr.length) resultArr.push(item);
  return resultArr;
};

interface IContactItem {
  item: any;
  selectedUsers: number[];
  setSelectedUsers: any;
  multiSelect: boolean;
  setMultiSelect: any;
  conversations: any;
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#e0e6e2',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  pressable: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    height: '100%',
    width: '100%',
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
  },
  subTitle: {
    fontSize: 12,
  },
  checkbox: {
    fontSize: 24,
  },
  tinyLogo: {
    backgroundColor: '#fff',
    width: 64,
    height: 64,
  },
  secondRow: {
    paddingHorizontal: 16,
  },
});
