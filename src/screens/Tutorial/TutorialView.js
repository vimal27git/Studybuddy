import React, { useState,useRef ,useEffect} from 'react';
import { Divider } from 'react-native-elements';


import {StyleSheet, ScrollView, Image,TouchableOpacity,Linking} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Text,
  Button,
  H3, 
  Textarea,
  Icon,
  View,
  Right,
  Left,
  Spinner,
} from 'native-base';



import database from '@react-native-firebase/database'

import YouTube from 'react-native-youtube';

//redux
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import shortid from 'shortid'
import { set } from 'react-native-reanimated';


const AddTutorial = ({navigation,item, route,}) => {
    const {id} = route.params
    const [Id,setId] =useState('')
    const [topic, setTopic] = useState('')

    const [description, setDescription] = useState('')
    const [Subject, setSubject] = useState('')
    const [subTopic,setSubTopic]= useState('')
    const [videoid, setVideoid] = useState('')
    const [by,setby] = useState('')
    const [upvote, setUpvote] = useState(0)
    const [downvote, setDownvote] = useState(0)
    const [isReady, setIsReady] = useState(false);
    const [status, setStatus] = useState('');
    const [quality, setQuality] = useState('');
    const [error, setError] = useState('');

 
    
    useEffect(() => {
        console.log(id)
        database()
        .ref(`/tutorials/${id}`)
        .on('value',snapshot =>{
            console.log(snapshot.val());
            setSubject(snapshot.val().Subject)
            setTopic(snapshot.val().topic)
            setSubTopic(snapshot.val().subTopic)
            setDescription(snapshot.val().description)
            setVideoid(snapshot.val().videoid)
            setby(snapshot.val().by)
        })
        
    }, [id])


    // if (YouTube) {
    //   return <Spinner/>;
    // }

    return (
        <Container style={styles.container}>
      
      
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
             <Form>
          
      <View style={styles.container}>
      <YouTube
  
        apiKey="AIzaSyBkn9WHzJDDaEl6CupXBDJibPORnQWwbzI"
        videoId={videoid} // The YouTube video ID
        play={true} // control playback of video with true/false
        fullscreen={true} // video should play in fullscreen or inline
        loop={false} // control whether the video should loop when ended
        onReady={(e) => setIsReady(e.state)}
        onChangeState={(e) => setStatus(e.state)}
        onChangeQuality={(e) => setQuality(e.quality)}
        onError={(e) => setError(e.error)}
        style={styles.youtube}
      />
      <Text style={{backgroundColor:"red",color:"#fff"}}>{`Status: ${status}`}</Text>
    </View>   
              
              <Text>subject:{Subject}</Text>
          
              <Text>topic:{topic}</Text>
              <Text>subtopic:{subTopic}</Text>
              <Text>description:{description}</Text>
              
            </Form>
            </ScrollView>
      
        </Container>
      );
    
}

const mapStateToProps = (state) => ({
    userState: state.auth.user,
    tutorialState:state.tutorial,
})


export default connect(mapStateToProps)(AddTutorial)



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFF',
      flex: 1,
      justifyContent: 'flex-start',
    },
    
    btcall:{
      borderRadius:5 ,
     marginRight:10,
      borderColor:"#3498db",
      backgroundColor:"#3498db",
      width:'45%',
      height:35,
      justifyContent:"center",
      alignContent:"center",
      alignItems:"center"
    },
    btwhats:{
        borderRadius:5 ,
marginLeft:10,
        borderColor:"#3498db",
        backgroundColor:"#2ecc71",
        width:'45%',
        height:35,
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center"
      },
      youtube: {
        alignSelf: 'stretch',
        height: 270,

      },
    txt:{
      paddingTop:5,
      color:"#FFF",
      fontSize: 20 ,
    },
    label:{
        color:"#7f8c8d",
        fontWeight:"bold"
    },
  
    icon: {fontSize: 20, color: '#fdcb9e'},
    image: {width: null, height: 220, marginTop: 15},
    progress: {width: null, marginBottom: 20},
  });
  