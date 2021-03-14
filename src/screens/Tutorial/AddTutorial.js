import React, { useState,useRef } from 'react';
import {StyleSheet, ScrollView, Image,Modal,Pressable, TouchableOpacity, VirtualizedList} from 'react-native';
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
 
} from 'native-base';

import Snackbar from 'react-native-snackbar'
import ProgressBar from 'react-native-progress/Bar'

import database from '@react-native-firebase/database'

import storage from '@react-native-firebase/storage'
import ImagePicker from 'react-native-image-picker'
import {options} from '../../utils/options'

//redux
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import shortid from 'shortid'

const AddTutorial = ({navigation, userState}) => {

    const [topic, setTopic] = useState('')
    const [description, setDescription] = useState('')
    const [Subject, setSubject] = useState('')
    const [subTopic,setSubTopic]= useState('')
    const [videoid, setVideoid] = useState('')
    const [modalVisible, setModalVisible] = useState(false);



    const reftopic = useRef(null)
    const refsubtopic = useRef(null)
    const refdescription= useRef(null)
    const refvideoid = useRef(null)

   
    const addTutorial = async () => {
        try {
            if (!topic || !description || !videoid || !Subject ) {
                return Snackbar.show({
                    text: "Please add all field",
                    textColor: "white",
                    backgroundColor: ""
                })
            }

            const tid = shortid.generate()

            await database().ref(`/tutorials/${tid}`).set({
                Subject,
                topic,
                subTopic,
                videoid,
                description,
                by: userState.name,
                date: Date.now(),
                id: tid
            })

            await database().ref(`/users/${userState.uid}/usertutorials/${tid}`).set({
              Subject,
              topic,
              subTopic,
              videoid,
              description,
              by: userState.name,
              date: Date.now(),
              id: tid
          })
            console.log("TUTORIAL Added SUCCESS")
            navigation.navigate('Tutorial')

        } catch (error) {
            console.log(error)
            Snackbar.show({
                text: "Tutorial upload failed",
                textColor: "white",
                backgroundColor: "red"
            })
        }
    }

    return (
        <Container style={styles.container}>
          <Content padder>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <Text style={styles.titleText}>
              upload usefull video tutorials    
            </Text>
              <Form>
                <Item regular style={styles.formItem}>
                  <Input
                  
                    placeholder="Subject name"
                    value={Subject}
                    style={{color: '#111'}}
                    onChangeText={(text) => setSubject(text)}
                    onSubmitEditing={() => reftopic.current._root.focus()}
                    returnKeyType={'next'}
                  />
                </Item>
               
                <Item regular style={styles.formItem}>
                  <Input
                  ref={reftopic}
                    placeholder="Add Topic"
                    value={topic}
                    style={{color: '#111'}}
                    onChangeText={(text) => setTopic(text)}
                    onSubmitEditing={() => refsubtopic.current._root.focus()}
                    returnKeyType={'next'}
                  />
                </Item>
              
               
                <Item regular style={styles.formItem}>
                  <Input
                    ref={refsubtopic}
                    placeholder="Sub topic if it contain"
                    value={subTopic}
                    style={{color: '#111'}}
                    onChangeText={(text) => setSubTopic(text)}
                    onSubmitEditing={() => refvideoid.current._root.focus()}
                    returnKeyType={'next'}
                  />

                </Item>
                <View style={{flex:1,flexDirection:"row"}}>
                <Item regular style={{width:"85%" ,marginBottom:20,borderRadius:25}}>
                  <Input
                    ref={refvideoid}
                    placeholder="enter video id "
                    value={videoid}
                    style={{color: '#111'}}
                    onChangeText={(text) => setVideoid(text)}
                    onSubmitEditing={() => refdescription.current._root.focus()}
                    returnKeyType={'next'}
                  />
                  
                </Item>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Icon name="info-with-circle" type="Entypo" style={{margin:10}}/>
                  </TouchableOpacity>
                  </View>
                <Modal
       
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(!modalVisible) }}>
           <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{fontWeight:"bold"}}>
            who to find youtube video id
            </Text>
            <Text >
              <Text style={{fontSize:13 ,margin:10}}>
              1:go to specific youtube video {`\n`}
              2:click on ellipse button <Icon  name="md-ellipsis-vertical" type="Ionicons" style={{fontSize:13}} /> on top-right  {`\n`}
              3:now click on share and copylink {`\n`}
              4:paste in enter video id {`\n`}
              5:then remove "https://youtu.be/" 
              </Text>

            </Text>
            
        
         
        </View>
      </View>
                
                  </Modal>
                  <Item regular style={styles.formItem}>
                  <Input
                    ref={refdescription}
                    placeholder="add description of video "
                    value={description}
                    style={{color: '#111'}}
                    onChangeText={(text) => setDescription(text)}
                  />
                  
                </Item>
                  
    
                <Button regular block onPress={addTutorial}>
                  <Text>Add Tutorial</Text>
                </Button>
              </Form>
            </ScrollView>
          </Content>
        </Container>
      );
    
}

const mapStateToProps = (state) => ({
    userState: state.auth.user,
})

AddTutorial.propTypes = {
    userState: propTypes.object.isRequired
}

export default connect(mapStateToProps)(AddTutorial)



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex: 1,
      justifyContent: 'flex-start',
    },
    formItem: {
      borderRadius:25,
      marginBottom: 20,
    },
    icon: {fontSize: 20, color: '#fdcb9e'},
    image: {width: null, height: 150, marginVertical: 15},
    progress: {width: null, marginBottom: 20},
    modalView: {
      marginVertical:"50%",
      marginHorizontal:30,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "auto",
      alignSelf:"center"
    
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
  
  });
  