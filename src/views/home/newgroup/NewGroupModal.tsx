import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AddUsersToGroup from './AddUsersToGroup';
import CreateNewGroup from './CreateNewGroup';

const NewGroupModal: FC<INewGroupProps> = ({
  closePress,
  oldSelected,
  setOldSelected,
}) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [createdGroup, setCreatedGroup] = useState<any>(null);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {
        {
          1: (
            <CreateNewGroup
              setPageNumber={setPageNumber}
              setCreatedGroup={setCreatedGroup}
              closePress={closePress}
            />
          ),
          2: (
            <AddUsersToGroup
              groupData={createdGroup}
              setPageNumber={setPageNumber}
              closePress={closePress}
              oldSelected={oldSelected}
              setOldSelected={setOldSelected}
            />
          ),
        }[pageNumber]
      }
    </View>
  );
};

interface INewGroupProps {
  closePress: any;
  oldSelected: any;
  setOldSelected: any;
}
export default NewGroupModal;

const styles = StyleSheet.create({});
