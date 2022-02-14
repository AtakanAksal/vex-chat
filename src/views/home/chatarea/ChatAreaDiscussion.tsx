import React, { FC, useRef, useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import useSWRInfinite from 'swr/infinite';
import { useSocketValue } from '../../../contexts/SocketContext';
import { useUserValue } from '../../../contexts/UserContext';
import { fetcher } from '../../../helpers/connectionsRest';

import SingleMessageBlock from './messages/SingleMessageBlock';
import TemporaryMessage from './messages/TemporaryMessage';

const ChatAreaDiscussion: FC<any> = ({
  conversationID,
  channelMessages,
  loadMore,
  conditions,
  setMessageModal,
}) => {
  const { user } = useUserValue();
  const [newMessageBox, setNewMessageBox] = useState([]);
  const scrollViewRef: any = useRef();
  const { messageBox, toastAlert, markAsSeen } = useSocketValue();
  // TODO 2.li görünme hatası messagebox'ta conversation id ye göre sıralanmaması

  useEffect(() => {
    const newBox = messageBox.filter(
      (el: any) => Number(el.channel_id) === Number(conversationID),
    );

    const ids = newBox.map((o: any) => o.id);
    const filtered = newBox.filter(
      ({ id }: any, index: any) => !ids.includes(id, index + 1),
    );

    setNewMessageBox(filtered);
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [conversationID, messageBox]);

  const handleViewableItemsChange = useCallback(
    ({ viewableItems }: any) => {
      const past: any = [];
      viewableItems.forEach((el: any) => {
        const filterOwn = el.item?.channel_message_seen_users?.filter(
          (k: any) => k.user_id === user.id,
        );
        if (filterOwn?.length > 0) {
          // user already seen this
        } else {
          past.push(el.item.id);
        }
      });

      if (past.length > 0) {
        markAsSeen({
          payload: {
            user: user.id,
            room: Number(conversationID),
            content: past,
            userjwt: user.token,
          },
        });
      }
    },
    [conversationID, markAsSeen, user.id, user.token],
  );

  const onContentOffsetChanged = useCallback(
    (distanceFromTop: number) => {
      // eslint-disable-next-line no-unused-expressions
      // distanceFromTop === 0 && console.log('Top Reach');
      if (distanceFromTop === 0) {
        if (!conditions.isReachingEnd) {
          loadMore((prev: number) => prev + 1);
        }
      }
    },
    [conditions.isReachingEnd, loadMore],
  );

  return (
    <>
      {/* <DebugValues conditions={conditions} /> */}
      <FlatList
        ref={scrollViewRef}
        style={{ flex: 1 }}
        // data={[...conversation?.channel_messages, ...newMessageBox]}
        data={[...channelMessages, ...newMessageBox]}
        renderItem={({ item }) => (
          <SingleMessageBlock data={item} setMessageModal={setMessageModal} />
        )}
        keyExtractor={item => item.id}
        onViewableItemsChanged={handleViewableItemsChange}
        ListHeaderComponent={<FlatlistHeader conditions={conditions} />}
        onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) =>
          onContentOffsetChanged(event.nativeEvent.contentOffset.y)
        }
      />
      {toastAlert && (
        <View style={{ backgroundColor: '#56bcb5', padding: 6 }}>
          <Text style={{ textAlign: 'center', color: '#fff', fontSize: 16 }}>
            {toastAlert}
          </Text>
        </View>
      )}
    </>
  );
};

const FlatlistHeader: FC<any> = ({ conditions, setMessageModal }) => {
  return (
    <>
      {conditions.isReachingEnd && (
        <Text
          style={{
            textAlign: 'center',
            backgroundColor: '#d3d3d3',
            padding: 6,
            color: '#333',
          }}
        >
          Konuşma başlangıcı.
        </Text>
      )}
      {conditions.isEmpty && (
        <Text
          style={{
            textAlign: 'center',
            backgroundColor: '#d3d3d3',
            padding: 5,
          }}
        >
          Henüz bir mesaj gönderilmedi.
        </Text>
      )}
      {conditions.isLoadingInitialData && (
        <ActivityIndicator size="large" color="#56bcb5" />
      )}
      {conditions.isRefreshing && (
        <ActivityIndicator size="large" color="#56bcb5" />
      )}
    </>
  );
};

const ChatAreaDiscussionGate: FC<any> = ({ conversation, setMessageModal }) => {
  const { user } = useUserValue();

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.data.length) return null;
      if (previousPageData && !previousPageData.next_page_url) return null;

      if (pageIndex === 0)
        return [
          `http://192.168.1.74:8000/v1/expochat/channelmessages?channel=${conversation.id}&page=1`,
          user.token,
        ];

      return [
        `http://192.168.1.74:8000/v1/expochat/channelmessages?channel=${
          conversation.id
        }&page=${pageIndex + 1}`,
        user.token,
      ];
    },
    fetcher,
  );

  // console.log('data', data);

  const messages = () => {
    if (!data) return [];

    const arr: any[] = [];
    [...data]
      .reverse()
      .map(el => [...el.data].reverse().map((k: any) => arr.push(k)));
    return arr;
  };
  const channelMessages: any[] = messages();
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.data?.length === 0;
  const isReachingEnd =
    isEmpty || (data && !data[data.length - 1]?.next_page_url);
  const isRefreshing = isValidating && data && data.length === size;

  return (
    <ChatAreaDiscussion
      conversationID={conversation.id}
      channelMessages={channelMessages}
      loadMore={setSize}
      conditions={{
        isLoadingInitialData,
        isLoadingMore,
        isEmpty,
        isReachingEnd,
        isRefreshing,
        size,
      }}
      setMessageModal={setMessageModal}
    />
  );
};

const DebugValues: FC<any> = ({ conditions }) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 5,
        justifyContent: 'center',
        zIndex: 50,
      }}
    >
      <Text>
        isLoadingMore -
        <Text style={{ color: conditions.isLoadingMore ? 'red' : 'blue' }}>
          {JSON.stringify(conditions.isLoadingMore)}
        </Text>
      </Text>
      <Text>
        isLoadingInitialData -
        <Text
          style={{
            color: conditions.isLoadingInitialData ? 'red' : 'blue',
          }}
        >
          {JSON.stringify(conditions.isLoadingInitialData)}
        </Text>
      </Text>
      <Text>
        isReachingEnd -
        <Text style={{ color: conditions.isReachingEnd ? 'red' : 'blue' }}>
          {JSON.stringify(conditions.isReachingEnd)}
        </Text>
      </Text>
      <Text>
        isRefreshing -
        <Text style={{ color: conditions.isRefreshing ? 'red' : 'blue' }}>
          {JSON.stringify(conditions.isRefreshing)}
        </Text>
      </Text>
      <Text>
        isEmpty -
        <Text style={{ color: conditions.isRefreshing ? 'red' : 'blue' }}>
          {JSON.stringify(conditions.isRefreshing)}
        </Text>
      </Text>
      <Text>Size {conditions.size}</Text>
    </View>
  );
};

export default ChatAreaDiscussionGate;

// TODO: flatlist scroll bottom
