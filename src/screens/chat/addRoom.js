
import React, { useState } from 'react';
import { Alert } from 'react-native';

import {TouchableOpacity,StyleSheet,View} from "react-native"
import { Button, IconButton, TextInput, Title  } from 'react-native-paper';
import firestore from "@react-native-firebase/firestore";




const AddRoomScreen = ({ navigation }) => {
    const [roomName, setRoomName] = useState('');
    // ... Firestore query will come here later
    function handleButtonPress() {
      if (roomName.length > 0) {
        firestore()
          .collection('THREADS')
          .add({
            name: roomName,
            latestMessage: {
              text: `You have joined the room ${roomName}.`,
              createdAt: new Date().getTime()
            }
          })
          .then(docRef => {
            docRef.collection('MESSAGES').add({
              text: `You have joined the room ${roomName}.`,
              createdAt: new Date().getTime(),
              system: true
            });
            navigation.navigate('chatScreen');
          });
      }
    }
  
  
    return (
      <View style={styles.rootContainer}>
        <View style={styles.closeButtonContainer}>
          <IconButton
            icon='close-circle'
            size={36}
            color='#6646ee'
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.innerContainer}>
          <Title style={styles.title}>Create a new chat room</Title>
           
          <TextInput
          placeholder="enter room id"
          style={{width:"90%",height:50, marginBottom:5}}
      label="room id"
    mode='outlined'
      value={roomName}
      onChangeText={text => setRoomName(text)}
    />
        
 
        <Button icon="plus" mode="contained" onPress={() => handleButtonPress()}
          disabled={roomName.length === 0}>
    create chat room
  </Button>
              
          
        </View>
      </View>
    );
  }
  
export default AddRoomScreen;
const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
    },
    closeButtonContainer: {
      position: 'absolute',
      top: 30,
      right: 0,
      zIndex: 1,
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
     },
    innerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
    },
    buttonLabel: {
      fontSize: 22,
    },
  });