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


    const Tutorial = ({item, userDetails,navigation}) => {
    const [upvote, setUpvote] = useState(0)
    const [downvote, setDownvote] = useState(0)
    const [id, setId] = useState('')
    const [comment,setComment] = useState('')
    


      
        
   


    useEffect(() => {
      console.log(item)
      setId(item.id)

      if (item.vote) {
        let upVote = 0
        let downVote = 0

        Object.values(item.vote).map((val) => {
          if (val.upvote) {
            upVote += 1
          }

          if (val.downvote) {
            downVote += 1
          }
        })

        setUpvote(upVote)
        setDownvote(downVote)
      }


    }, [item])

    const upVoteTutorial = () => {
      database()
        .ref(`/tutorials/${item.id}/vote/${userDetails.uid}`)
        .set({
          upvote: 1
        })
        .then(() => console.log('UPVOTED'))
    }

    const downVoteTutorial = () => {
      database()
        .ref(`/tutorials/${item.id}/vote/${userDetails.uid}`)
        .set({
          downvote: 1
        })
        .then(() => console.log('DOWNVOTED'))
    }

    
    const thumb=`http://img.youtube.com/vi/${item.videoid}/0.jpg`
    return (
      
      <Card
        style={{
          backgroundColor: '#fff',
          borderColor: '#222',
        }}>
          
          <TouchableOpacity  onPress={ () => navigation.navigate('TutorialView',{id:id})}> 
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
          <Left>
            <Button transparent onPress={upVoteTutorial}
            style={{
              color: '#111',marginLeft:-10}}
            >
              <Icon
                name="like2"
                type="AntDesign"
                style={{fontSize: 20, color: '#111'}}
              />
              <Text
                style={{
                  color: '#111',marginLeft:-10
                }}>
                {upvote}
              </Text>
            </Button>
            <Button transparent onPress={downVoteTutorial} style={{
                  color: '#111',marginLeft:-10
                }}>
              <Icon
                name="dislike2"
                type="AntDesign"
                style={{fontSize: 20, color: '#111'}}
              />
              <Text
                style={{
                  color: '#111',marginLeft:-10
                }}>
                 {downvote}
              </Text>
            </Button>
          </Left>
          <Right>
          <Text
                style={{
                  color: '#111',
                }}>suggested {item.by}</Text>
  
          </Right>

         
        </CardItem>
      
      </Card>
    );
  
}

export default Tutorial
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