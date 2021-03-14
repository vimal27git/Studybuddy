import React, {useState, useEffect} from 'react';
import {Image, Linking,StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Textarea,
} from 'native-base';
import database from '@react-native-firebase/database';
import { Divider } from 'react-native-paper';

import { Thumbnail } from 'react-native-thumbnail-video';
import { round } from 'react-native-reanimated';
import { Alert } from 'react-native';
import Snackbar from "react-native-snackbar";

    const UserTutorial = ({item, userDetails,navigation}) => {

    const [id, setId] = useState('')
    const [comment,setComment] = useState('')
    


      
        
   


    useEffect(() => {
      console.log(item)
      setId(item.id)

     
    }, [item])

  
    const deletepost = () => {
      database()
      .ref(`/users/uIddUjLoWaTY1Qm8GnO6LCX0aoV2/tutorials/${item.id}`)
      .remove();
     
  
      Snackbar.show({
        text:'tutorial has been deleted',
        textColor:'white',
        backgroundColor:'red'
      })
    }

   
    return (
      
      <Card
        style={{
          backgroundColor: '#fff',
          borderColor: '#222',
        }}>
          
          <TouchableOpacity  onPress={ () => Alert.alert('TutorialView',{id:id})}> 
          <CardItem>
          <View style={{flex:1, flexDirection:"row",flexWrap:"wrap"}}>

          <Image style={{width:"40%",height:100}}source={{uri:`http://img.youtube.com/vi/${item.videoid}/0.jpg`}}/>
       
              <Text
                style={{
                  color: '#111',
                  fontSize:15,
                }}> <Text style={{fontWeight:"bold"}}>{item.Subject}</Text>{`\n`}<Text style={{fontWeight:"600"}}> {item.topic} {`\n`}{item.subtopic}
                </Text>
                  </Text> 
              <Text style={{
                 
                  color: '#111',
                  fontSize:15
                }}>
              {item.description}
              </Text>
            
              </View>
              </CardItem>
  
       
        </TouchableOpacity>
        <Divider style={{ backgroundColor: 'grey',marginVertical:1, }} />
        <CardItem
          style={{
            backgroundColor: 'fff',
          }}>
         
         <Text onPress= {() => deletepost() } style={{color:"red"}}>Delete</Text>
        </CardItem>
      
      </Card>
    );
  
}

export default UserTutorial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  youtube: {
    alignSelf: "center",
    height: 100,
    width:100,

  },
});