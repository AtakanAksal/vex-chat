/* eslint-disable no-else-return */
/* eslint-disable react/destructuring-assignment */
import React, { FC, SetStateAction } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import calendar from 'dayjs/plugin/calendar';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { useUserValue } from '../../../contexts/UserContext';
import { getNamePicture } from '../../../helpers/functions';
import { useSocketValue } from '../../../contexts/SocketContext';

dayjs.extend(calendar);

const ConversationItem: FC<{
  item: any;
  selectedId: number | null;
  setSelectedId: any;
}> = ({ item, selectedId, setSelectedId }) => {
  // eslint-disable-next-line prettier/prettier
  const backgroundColor =
    item.id === selectedId ? '#016e66' : '#f8f9fa'; /* e0e6e2 */
  const color = item.id === selectedId ? 'white' : 'black';
  const parsedDate = new Date(item.updated_at);
  const convoMsg =
    item.channel_messages.length > 0
      ? item.channel_messages[0]
      : { type: 'empty' };

  const nav = useNavigation();
  const { user } = useUserValue();
  const { onlineUsers } = useSocketValue();

  const isOnline = () => {
    if (item.channel_participants.length === 2) {
      const person = item.channel_participants.filter(
        (el: any) => el.user_id !== user.id,
      );
      if (onlineUsers.find((el: any) => el.userId === person[0].user_id)) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() =>
          nav.navigate(
            'Chatarea' as never,
            {
              itemId: item.id,
              otherParam: 'anything you want here',
            } as never,
          )
        }
        style={{ ...styles.pressable, backgroundColor }}
      >
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {isOnline() ? <View style={styles.onlineView} /> : null}

          <Image
            style={styles.tinyLogo}
            source={{ uri: getNamePicture(item, user).picture }}
          />
          <View style={styles.secondRow}>
            <Text
              style={{ ...styles.title, color }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {getNamePicture(item, user).name}
            </Text>
            <Text style={{ ...styles.subTitle, color }}>
              {convoMsg.type === 'empty' && 'Henüz mesaj yok...'}
              {convoMsg.type === 'text' &&
                `${convoMsg.content.substr(0, 20)}...`}
              {convoMsg.type === 'image' && '> Resim.'}
              {convoMsg.type === 'audio' && '> Ses.'}
              {convoMsg.type === 'file' && '> Dosya.'}
              {convoMsg.type === 'video' && '> Video.'}
            </Text>
          </View>
        </View>
        <View style={styles.thirdRow}>
          <Text style={{ ...styles.date, color }}>
            {dayjs(parsedDate).calendar(null, {
              sameDay: 'HH:mm', // The same day ( Today at 2:30 AM )
              lastDay: '[Dün] HH:mm', // The day before ( Yesterday at 2:30 AM )
              lastWeek: 'DD.MM.YYYY HH:mm', // Last week ( Last Monday at 2:30 AM )
              sameElse: 'DD.MM.YYYY HH:mm', // Everything else ( 7/10/2011 )
            })}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ConversationItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#e0e6e2',
    marginVertical: 2,
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#d1d1d1',
  },
  pressable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 16,
    height: '100%',
    width: '100%',
    borderRadius: 12,
  },
  title: {
    width: 180,
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 12,
  },
  date: {
    fontSize: 12,
  },
  tinyLogo: {
    backgroundColor: '#fff',
    width: 55,
    height: 55,
    borderRadius: 5,
  },
  onlineView: {
    backgroundColor: '#1db50b',
    width: 12,
    height: 12,
    position: 'absolute',
    top: -4,
    left: -4,
    borderRadius: 12,
    zIndex: 10,
  },
  secondRow: {
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    width: '50%',
  },
  thirdRow: {},
});
