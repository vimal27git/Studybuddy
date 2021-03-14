import React, {useState, useEffect} from 'react';
import {Alert, Image, Linking, TouchableOpacity,View} from 'react-native';
import { Divider } from 'react-native-elements';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Item,
} from 'native-base';

import database from '@react-native-firebase/database';




const Document = ({item, userDetails, navigation }) => {

    const [id, setId] = useState('')
    const [upvote, setUpvote] = useState(0)
    const [downvote, setDownvote] = useState(0)

    
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
        .ref(`/documents/${item.id}/vote/${userDetails.uid}`)
        .set({
          upvote: 1
        })
        .then(() => console.log('UPVOTED'))
    }

    const downVoteTutorial = () => {
      database()
        .ref(`/documents/${item.id}/vote/${userDetails.uid}`)
        .set({
          downvote: 1
        })
        .then(() => console.log('DOWNVOTED'))
    }

    return (
    
      <Card 
        style={{
          backgroundColor: '#eee',
          borderColor: '#0f4c75',
          borderRadius:8,
         margin:1,
          height:200,
          width:"98%"
        }}>
        
              <CardItem 
          style={{
            backgroundColor: 'transparent',
          }}> 
              <Text
              onPress={() => {
                Linking.openURL(item.file)}}
                style={{
                  color: '#111',
                  
                }}>
                {item.type} of {item.topic}  from {item.subject}
              </Text>
         </CardItem>
         <CardItem>             
                 <Item><Text></Text>
              <Text >
              {item.name}
              {`\n`}
                by {item.faculty} of {item.university} university
              {`\n`}
                     for {item.semester} of {item.branch}</Text>
              </Item>
              
              </CardItem>
         <Divider style={{ backgroundColor: 'blue' }} />
        
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

export default Document