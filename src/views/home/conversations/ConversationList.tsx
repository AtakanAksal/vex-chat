import React, { FC, useState } from 'react';
import { FlatList } from 'react-native';
import ConversationItem from './ConversationItem';

const ConversationList: FC<{ data: any }> = ({ data }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <ConversationItem
          item={item}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      )}
      keyExtractor={item => item.id}
      extraData={selectedId}
    />
  );
};

export default ConversationList;
