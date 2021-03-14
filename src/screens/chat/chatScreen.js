


import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { List, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

import Loading from '../../componenets/Loading';

import { TouchableOpacity } from 'react-native-gesture-handler';

export default function chatScreen({ navigation }) {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('THREADS')
      
        // add this
    .orderBy('latestMessage.createdAt', 'desc')
    .onSnapshot(querySnapshot => {
      const threads = querySnapshot.docs.map(documentSnapshot => {
        return {
          _id: documentSnapshot.id,
          name: '',
          latestMessage: {
            text: ''
          },
            ...documentSnapshot.data(),
          };
        });

        setThreads(threads);

        if (loading) {
          setLoading(false);
        }
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  // ...rest 
  return(
    <View style={styles.container}>
    <FlatList
      data={threads}
      keyExtractor={(item) => item._id}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({ item }) => (
        <TouchableOpacity
        onPress={() => navigation.navigate("chatRoom", {thread:item})}
        >
        <List.Item
          title={item.name}       
          description={item.latestMessage.text}
          titleNumberOfLines={1}
          titleStyle={styles.listTitle}
          descriptionStyle={styles.listDescription}
          descriptionNumberOfLines={1}
        />
        </TouchableOpacity>
      )}
    />

  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
});