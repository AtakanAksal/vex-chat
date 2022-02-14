import React, { FC, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';

import { useUserValue } from '../../../../contexts/UserContext';
import AudioMessage from './AudioMessage';
import VideoMessage from './VideoMessage';
import ImageMessage from './ImageMessage';
import FileMessage from './FileMessage';

import checkIcon from '../../../../../assets/general-icons/check.png';
import doubleCheckIcon from '../../../../../assets/general-icons/double-check.png';
import threeDotIcon from '../../../../../assets/general-icons/three-dot-hor-white.png';
import MessageModal from './MessageModal';

dayjs.extend(calendar);

const SingleMessageBlock: FC<any> = ({ data, setMessageModal }) => {
  const { user } = useUserValue();
  const parsedDate: Date = new Date(data.created_at);
  const isMine: boolean = Number(data.user_id) === Number(user.id);

  console.log(data);

  const iSeen: boolean = data.seen_users
    ? Array.isArray(JSON.parse(data.seen_users)) &&
      JSON.parse(data.seen_users).includes(user.id) &&
      'a'
    : null;

  const filterOwn = data?.channel_message_seen_users?.filter(
    (k: any) => k.user_id === user.id,
  );
  const iSeenNew: boolean = filterOwn?.length > 0;

  return (
    <>
      <View style={isMine ? styles.messageBoxSelf : styles.messageBoxOther}>
        {isMine ? (
          <TouchableOpacity
            style={styles.threeDot}
            onPress={() => setMessageModal(data)}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={threeDotIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <Text style={styles.username}>{data.user.username}</Text>
        )}
        {/* <Text style={styles.username}>{data.user.username}</Text> */}

        {/* <View> */}
        {data.type === 'text' && (
          <Text style={isMine ? styles.text : styles.textOther}>
            {data.content}
          </Text>
        )}

        {data.type === 'image' && <ImageMessage content={data.content} />}
        {data.type === 'audio' && <AudioMessage content={data.content} />}
        {data.type === 'video' && <VideoMessage content={data.content} />}
        {data.type === 'pdf' && <FileMessage content={data.content} />}
        <View style={styles.bottomRow}>
          <Text style={styles.date}>
            {dayjs(parsedDate).calendar(null, {
              sameDay: 'HH:mm', // The same day ( Today at 2:30 AM )
              lastDay: '[Dün] HH:mm', // The day before ( Yesterday at 2:30 AM )
              lastWeek: 'DD.MM.YYYY HH:mm', // Last week ( Last Monday at 2:30 AM )
              sameElse: 'DD.MM.YYYY HH:mm', // Everything else ( 7/10/2011 )
            })}
          </Text>
          {/* {isMine ? <Text style={styles.check}>✔ {iSeen && '✔'}</Text> : null} */}
          {isMine ? (
            <View style={{ marginLeft: 5, height: 15, width: 15 }}>
              {iSeenNew ? (
                <Image
                  style={{ width: 15, height: 15 }}
                  source={doubleCheckIcon}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  style={{ width: 15, height: 15 }}
                  source={checkIcon}
                  resizeMode="contain"
                />
              )}
            </View>
          ) : null}
        </View>
      </View>
      {/* </View> */}
    </>
  );
};

export default SingleMessageBlock;

const styles = StyleSheet.create({
  messageBoxOther: {
    alignSelf: 'flex-start',
    maxWidth: '75%',
    minWidth: '25%',
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 8,
    padding: 4,
    marginBottom: 10,
  },
  messageBoxSelf: {
    alignSelf: 'flex-end',
    maxWidth: '75%',
    minWidth: '25%',
    backgroundColor: '#3094db',
    margin: 5,
    borderRadius: 8,
    padding: 4,
    marginBottom: 10,
  },
  username: {
    fontSize: 12,
    color: '#cdd3e7',
    textAlign: 'left',
  },
  text: {
    fontSize: 16,
    padding: 4,
    color: '#fff',
    // textAlign: 'right',
  },
  textOther: {
    fontSize: 16,
    padding: 4,
    color: '#2b2b2b',
    // textAlign: 'center',
  },
  bottomRow: {
    marginLeft: 5,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  date: {
    fontSize: 12,
    color: '#cdd3e7',
  },
  check: {
    color: '#cdd3e7',
    fontSize: 10,
    marginLeft: 3,
    marginBottom: 1,
  },

  threeDot: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: -2,
    right: -6,
    zIndex: 10,
    alignItems: 'center',
  },
});
