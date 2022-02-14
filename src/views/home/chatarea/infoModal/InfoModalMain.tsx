import React, { useState, FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddUsersToGroup from '../../newgroup/AddUsersToGroup';
import ChatAreaInfoModal from './ChatAreaInfoModal';

const InfoModalMain: FC<{
  closePress: any;
  data: any;
  user: any;
  chatareaMutate: any;
}> = ({ closePress, data, user, chatareaMutate }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  return (
    <View style={{ flex: 1 }}>
      {
        {
          1: (
            <ChatAreaInfoModal
              chatareaMutate={chatareaMutate}
              data={data}
              user={user}
              closePress={closePress}
              setPageNumber={setPageNumber}
            />
          ),
          2: (
            <AddUsersToGroup
              groupData={data}
              setPageNumber={setPageNumber}
              closePress={closePress}
              oldSelected={null}
              setOldSelected={null}
            />
          ),
        }[pageNumber]
      }
    </View>
  );
};

export default InfoModalMain;

const styles = StyleSheet.create({});
