import React, { FC, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import * as Contacts from 'expo-contacts';
import addPersonIcon from '../../../../assets/general-icons/person-add.png';

const PhoneContacts = () => {
  const [contactData, setContactData] = useState<any[]>([]);

  // const getPhoneList = async () => {
  //   const { status } = await Contacts.requestPermissionsAsync();
  //   if (status === 'granted') {
  //     const { data } = await Contacts.getContactsAsync({
  //       fields: undefined,
  //     });
  //     if (data.length > 0) {
  //       const contact = data;
  //       console.log(contact);
  //       setContactData(contact);
  //     }
  //   }
  // };

  useEffect(() => {
    async function getPhoneList() {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: undefined,
        });
        if (data.length > 0) {
          const contact = data;
          console.log(contact);
          setContactData(contact);
        }
      }
    }
    getPhoneList();
  }, []);
  return (
    <View>
      {/* <TouchableOpacity style={styles.button} onPress={getPhoneListEski}>
        <Text style={styles.btnText}>Kişi Listemi Getir</Text>
      </TouchableOpacity> */}
      <View>
        {contactData.length > 0 && (
          <FlatList
            data={contactData}
            renderItem={({ item }) => <ContactItem item={item} />}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </View>
  );
};

const ContactItem: FC<{ item: any }> = ({ item }) => {
  const imgSource = item.imageAvailable
    ? { uri: item.image.uri }
    : addPersonIcon;
  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.pressable}>
        <Image style={styles.tinyLogo} source={imgSource} />
        <View style={styles.secondRow}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subTitle}>
            {item?.phoneNumbers?.length > 0 && item.phoneNumbers[0].number}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#38548b',
    padding: 8,
    margin: 10,
  },
  btnText: {
    color: '#fff',
  },
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
    backgroundColor: '#e0e6e2',
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

export default PhoneContacts;
/*
    pageSize?: number;
    pageOffset?: number;
    fields?: FieldType[];
    sort?: ContactSort;
    name?: string;
    id?: string | string[];
    groupId?: string;
    containerId?: string;
    rawContacts?: boolean; */

/*

2l2d

G|---14-------14-------|----12-------12-------|----9--------------|----10--------10-----|
D|------14-------14----|-------12-------12----|------9------------|-------10--------10--|
A|12-------12----------|-10-------10----------|-7------7---5---7--|--8---------8--------|
E|---------------------|----------------------|-------------------|---------------------|

G|--14-----------------|----12-------12-------|----9--------------|----10----------------|
D|-----14--------------|-------12-------12----|------9------------|-------10-------------|
A|12------12-12h14-12--|-10-------10----------|-7------7---5---7--|--8-------8--8--10----|
E|---------------------|----------------------|-------------------|----------------------|

G|---14----------------|---12-------12----------|-----------------|---12---12------------|
D|-----14--------------|------12------12-12/14--|-14-14-14-14-12--|-14--14--14--12-------|
A|12--------12/14-12---|-10------10-------------|-----------------|----------------15----|
E|---------------------|------------------------|-----------------|----------------------|

--------
dpps

G|-----------------------------------|------------------------|------------------------|
D|-----7--7--7-----8--8--8--5--5--5--|-----7--7--7--3--3--3---|--7--7--7--5--5--5----5-|
A|--0-----------0--------------------|--0---------------------|------------------------|
E|-----------------------------------|------------------------|------------------------|

G|----------------------|-------------------|------------------------|
D|--7--7--7--5--5--5----|-3--3--3--2--2--2--|-0--0--0----------------|
A|----------------------|-------------------|---------3-3-3---1-3-5--|
E|----------------------|-------------------|------------------------|

--------

    */

/*

    <FlatList
      data={data}
      renderItem={({ item }) => (
        <ContactItem
          item={item}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          multiSelect={multiSelect}
          setMultiSelect={setMultiSelect}
        />
      )}
      keyExtractor={item => item.id}
      extraData={selectedUsers}
    />
    
    */
