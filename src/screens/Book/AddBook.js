import React, { useState,useRef ,useEffect} from 'react';
import {StyleSheet, ScrollView, Image,TouchableOpacity,Modal,View} from 'react-native';
import { Checkbox } from 'react-native-elements';
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
} from 'native-base';

import Snackbar from 'react-native-snackbar'
import ProgressBar from 'react-native-progress/Bar'

import database from '@react-native-firebase/database'

import storage from '@react-native-firebase/storage'
import ImagePicker from 'react-native-image-picker'
import { Picker } from "@react-native-picker/picker";
import {options} from '../../utils/options'


//redux
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import shortid from 'shortid'
import { useSafeArea } from 'react-native-safe-area-context';

const AddBook = ({navigation, route,userState}) => {
   
    const [bookname, setBookName] = useState('')
    const [bookauthor, setBookAuthor] = useState('')
    const [publisher, setPublisher] = useState('')
    const [edition, setEdition] = useState('Select Edition')
    const [paperback, setPaperback] = useState('')
    const [isbn10, setISBN10] = useState('')
    const [rs,setRs] = useState('₹')
    const [bprice,setBprice] = useState ('')
    const [semester ,setSemester] = useState ('')
    const [branch , setBranch] = useState ('')
    const [condition,setCondition] =useState('')

    const [image, setImage] = useState(null)
    

    const [imageUploading, setImageUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState(null)
   
   
    const refpublisher = useRef(null);
    const refbookauthor = useRef(null);
    const refpaperback = useRef(null);
    const refisbn10 = useRef(null);
    const refbprice = useRef(null);
    const refedition = useRef(null);

    const bookprice = rs + bprice 

     const pages = paperback+"pages"

     const Edition = edition 


  


    const chooseImage = async () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response)

            if (response.did) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                console.log(response)
                uploadImage(response)
              }
             
               
        })
    }


    const uploadImage = async (response) => {
        setImageUploading(true)
        const reference = storage().ref(response.fileName)

        const task = reference.putFile(response.path)
        task.on('state_changed', (taskSnapshot) => {
            const percentage = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 1000

            setUploadStatus(percentage)
        })

        task.then(async () => {
            const url = await reference.getDownloadURL()

            setImage(url)
            setImageUploading(false)
        })
    }

    const addBook = async () => {
        try {
            if (!bookname || !publisher  || !edition || !bookauthor  || !paperback  || !image || !branch || !bookprice) {
                return Snackbar.show({
                    text: "Please add all field",
                    textColor: "white",
                    backgroundColor: "red"
                })
            }
            const bookid =shortid.generate()
            const bid = shortid.generate()
            await database().ref(`/users/${userState.uid}/books/${bid}`).set({
                
              bookname,
              publisher,
              Edition,
              bookauthor,
              pages,
              isbn10,
              bookprice,
              branch,
              semester,
              condition,
              picture: image,
              
              id: bid
          })

            await database().ref(`/books/${bid}`).set({
                
                bookname,
                publisher,
                Edition,
                bookauthor,
                pages,
                isbn10,
                bookprice,
                branch,
                semester,
                condition,
                picture: image,
                by: userState.name,
                date: Date.now(),
                userid: userState.uid,
                location: userState.city,
                contact: userState.mobnumwithcode,
                id: bid
            })

            console.log("Book Added SUCCESS")
            navigation.navigate('Home')

        } catch (error) {
            console.log(error)
            Snackbar.show({
                text: "Book upload failed",
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
              upload your old book to sell
            </Text>
              {image && 
              (
                <Image
                  source={{uri: image}}
                  style={styles.image}
                  resizeMode="center"
                />
              )}
              <Form>
                
                {imageUploading ? (
                  <ProgressBar progress={uploadStatus} style={styles.progress} />
                ) : (
                  <Button
                    regular
                    bordered
                    block
                    iconLeft
                    info
                    style={styles.formItem}
                    onPress={chooseImage}>
                    <Icon
                      name="md-image-outline"
                      type="Ionicons"
                      style={styles.icon}
                    />
                    <Text
                      style={{
                        color: '#3498db',
                      }}>
                      Choose Image
                    </Text>
                  </Button>
                )}
                <Item  style={styles.formItem}>
                  <Input
                    placeholder="Bookname"
                    value={bookname}
                    style={{color: '#111'}}
                    
                    onSubmitEditing={() => refpublisher.current._root.focus()}
          returnKeyType={'next'}
                    onChangeText={(text) => setBookName(text)}
                  />
                </Item>
                <Item  style={styles.formItem}>
                  <Input
                    placeholder="publisher"
                    value={publisher}
                    style={{color: '#111'}}
                    ref={refpublisher}
                    onSubmitEditing={() => refbookauthor.current._root.focus()}
          returnKeyType={'next'}
                    onChangeText={(text) => setPublisher(text)}
                  />
                </Item>
              
               
                <Item  style={styles.formItem}>
                  <Input
                    placeholder="bookauthor"
                    value={bookauthor}
                    style={{color: '#111'}}
                    ref={refbookauthor}
                    
                    onChangeText={(text) => setBookAuthor(text)}
                  />
                </Item>
                <Item  style={styles.formItem}>
                <Picker
               
        selectedValue={condition}
        style={styles.formpicker}
        onValueChange={(itemValue, itemIndex) => setCondition(itemValue)}
    
        returnKeyType={'next'}
      >
        <Picker.Item label="Fine" value="Fine" />
        <Picker.Item label="Near Fine" value="Near Fine" />
        <Picker.Item label="Very Good" value="Very good" />
        <Picker.Item label="Good" value="Good" />
        <Picker.Item label="Fair" value="Fair" />
        <Picker.Item label="Poor" value="Poor" />
    
      </Picker>
                 
                 </Item>
                <Item  style={styles.formItem}>
                  <Input
                    placeholder="no. of pages book content"
                    value={paperback}
                    style={{color: '#111'}}
                    keyboardType="name-phone-pad"
                    ref={refpaperback}
                    onSubmitEditing={() => refisbn10.current._root.focus()}
          returnKeyType={'next'}
                    onChangeText={(text) => setPaperback(text)}
                  />
                </Item>
                <Item  style={styles.formItem}>
                <Picker
                ref={refedition}
        selectedValue={edition}
        style={styles.formpicker}
        onValueChange={(itemValue, itemIndex) => setEdition(itemValue)}
    
        returnKeyType={'next'}
      >
        <Picker.Item label="1st edition" value="1st edition" />
        <Picker.Item label="2nd edition" value="2nd edition" />
        <Picker.Item label="3rd edition" value="3rd edition" />
        <Picker.Item label="4th edition" value="4th edition" />
        <Picker.Item label="5th edition" value="5th edition" />
        <Picker.Item label="6th edition" value="6th edition" />
        <Picker.Item label="7th edition" value="7th edition" />
        <Picker.Item label="8th edition" value="8th edition" />
      </Picker>
      </Item>
                <Item  style={styles.formItem}>
                  <Input
                    placeholder="ISBN"
                    value={isbn10}
                    style={{color: '#111'}}
                    maxLength={10}
                    keyboardType="number-pad"
                    ref={refisbn10}
                    onSubmitEditing={() => refbprice.current._root.focus()}
          returnKeyType={'next'}
                    onChangeText={(text) => setISBN10(text)}
                  />
                </Item>
                <Item style={styles.formItem}>

                <Input
                    
                    value={rs}
                    style={{color: '#111',marginEnd:-280}}
                    maxLength={1}
                    onChangeText={(text) => setRs(text)}
                  />
                  <Input
                    placeholder="Book price"
                    value={bprice}
                    style={{color: '#111'}}
                    ref={refbprice}
                    keyboardType="decimal-pad"
                  
                    onChangeText={(text) => setBprice(text)}
                  />
                </Item>
                <Item  style={styles.formItem}>
                <Picker
        selectedValue={semester}
        style={styles.formpicker}
        onValueChange={(itemValue, itemIndex) => setSemester(itemValue)}
    
        returnKeyType={'next'}
      >
        <Picker.Item label="1st semester" value="1st semester" />
        <Picker.Item label="2nd semester" value="2nd semester" />
        <Picker.Item label="3rd semester" value="3rd semester" />
        <Picker.Item label="4th semester" value="4th semester" />
        <Picker.Item label="5th semester" value="5th semester" />
        <Picker.Item label="6th semester" value="6th semester" />
        <Picker.Item label="7th semester" value="7th semester" />
        <Picker.Item label="8th semester" value="8th semester" />
      </Picker>
                </Item>
                <Item  style={styles.formItem}>
                <Picker
        selectedValue={branch}
        style={styles.formpicker}
        onValueChange={(itemValue, itemIndex) => setBranch(itemValue)}
    
        returnKeyType={'next'}
      >
        <Picker.Item label="Aeronautical engineering" value="Aeronautical engineering" />
        <Picker.Item label="Automobile engineering" value="Automobile engineering" />
        <Picker.Item label="Chemical engineering" value="Chemical engineering" />
        <Picker.Item label="Civil engineering" value="Civil engineering" />
        <Picker.Item label="Computer engineering" value="Computer engineering" />
        <Picker.Item label="Electrical engineering." value="Electrical engineering" />
        <Picker.Item label="Electronic and Communiction engineering " value="Electronic and Communiction engineering" />
        <Picker.Item label="Mechincial engineering" value="Mechincial engineering" />
        <Picker.Item label="Information and technology engineering" value="Information and technology engineering" />
      </Picker>

                </Item>

                <TouchableOpacity  style={styles.btsign}  onPress={addBook}>
                <Text style={styles.txt}>
                  upload
                </Text>
                </TouchableOpacity>
              </Form>
            </ScrollView>
          </Content>
        </Container>
      );
    
}

const mapStateToProps = (state) => ({
    userState: state.auth.user,
})

AddBook.propTypes = {
    userState: propTypes.object.isRequired
}

export default connect(mapStateToProps)(AddBook)



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFF',
      flex: 1,
      justifyContent: 'flex-start',
    },
    dropdown:{
      marginBottom: 10,
      width:'90%',
      marginLeft:20,
      color:"#332",
      borderBottomWidth:1,
      borderColor:"#222"


    },

    titleText: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      padding: 20,
    },
    btsign:{
      borderRadius:20 ,
     
      borderColor:"#3498db",
      backgroundColor:"#3498db",
      width:'80%',
      height:'15%',
      marginLeft:30,
      alignContent:"center",
      alignItems:"center"
    },
    txt:{
      paddingTop:5,
      color:"#FFF",
      fontSize: 20 ,
    },
    formItem: {
      marginBottom: 10,
      width:'90%',
      marginLeft:20,
      color:"#333",
    },
    formpicker: {
      marginBottom: 10,
      width:'100%',
      marginLeft:-5,
      color:"#333",
    },
    icon: {fontSize: 20, color: '#fdcb9e'},
    image: {width: null, height: 150, marginVertical: 15},
    progress: {width: null, marginBottom: 20},
  });
  