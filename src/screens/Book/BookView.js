import React, { useState,useRef ,useEffect} from 'react';
import { Divider } from 'react-native-elements';
import EmptyContainer from "../../componenets/EmptyContainer"

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
} from 'native-base';



import database from '@react-native-firebase/database'


//redux
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import shortid from 'shortid'
import { set } from 'react-native-reanimated';


const AddBook = ({navigation, route,userState,bookState}) => {
    const {id} = route.params
   
    const [bookname, setBookName] = useState('')
    const [bookauthor, setBookAuthor] = useState('')
    const [publisher, setPublisher] = useState('')
    const [edition, setEdition] = useState('')
    const [pages, setPages] = useState('')
    const [isbn10, setISBN10] = useState('')
    const [rs,setRs] = useState('₹')
    const [bookprice,setBookprice] = useState ('')
    const [semester ,setSemester] = useState ('')
    const [branch , setBranch] = useState ('')
    const [by,setBy] =useState('')
    const [location, setlocation] = useState('')
    const [contact, setcontact] = useState('')

    const [image, setImage] = useState(null)
    
    useEffect(() => {
        console.log(id)
        database()
        .ref(`/books/${id}`)
        .on('value',snapshot =>{
            console.log(snapshot.val());
            setBookName(snapshot.val().bookname)
            setImage(snapshot.val().picture)
            setEdition(snapshot.val().Edition)
            setPublisher(snapshot.val().publisher)
            setBookprice(snapshot.val().bookprice)
            setBookAuthor(snapshot.val().bookauthor)
            setPages(snapshot.val().pages)
            setSemester(snapshot.val().semester)
            setISBN10(snapshot.val().isbn10)
            setBranch(snapshot.val().branch)
            setBy(snapshot.val().by)
            setlocation(snapshot.val().location)
            setcontact(snapshot.val().contact)

        })
        
    }, [id])
    
    if (id.loading) {
      return <EmptyContainer />;
    }

    return (
        <Container style={styles.container}>
          <Content padder>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              {image && (
                <Image
                  source={{uri: image}}
                  style={styles.image}
                  resizeMode="center"
                />
              )}
              <Form>
            
                    {/* <Text style={styles.label}>
                    Bookname:
                    </Text> */}
                    <View style={{flex:1,flexDirection:"row",marginTop:10}}>
                    <Text style={{fontWeight:"bold", fontSize:18}} >{bookname} </Text>
                    <Text style={{ fontSize:13,marginTop:8}}>({edition})</Text>
                    </View>
                    <Item  style={{borderBottomColor:"#FFF",marginTop:5}}>
                    <Left>
                    <Text>by {bookauthor}</Text>
                    </Left>
                    <Right>
                        <Text style={{fontWeight:"bold", fontSize:18}} >{bookprice}</Text>
                    </Right>
                    </Item>
                    <Item  style={{borderBottomColor:"#FFF"}}>
                    <Left>
                    <Text>
                      published by  {publisher}
                    </Text>
                    </Left>
                    </Item>
                    <Divider style={{ backgroundColor: 'grey' ,marginVertical:10, }} />
                    <Text style={styles.label}>About book</Text>

                    <Text style={{marginVertical:5}} >
                     paperback: {pages}
                    </Text>
                    <Text style={{marginVertical:5}}>
                     ISBN: {isbn10}
                    </Text>
                    <Text style={{marginVertical:5}}>
                    semester refer: {semester}
                    </Text>
                    <Text style={{marginVertical:5}}>
                     branch refer: {branch}
                    </Text>
                    <Divider style={{ backgroundColor: 'grey' ,marginVertical:15, }} />
                    <Text style={styles.label}>Seller</Text>
                    <Text>Name: {by}</Text>
                    <Text>location: {location}</Text>
                    <Item  style={{borderBottomColor:"#FFF",marginTop:5}}>
                   
                    <View style={{flex:1 , flexDirection:"row", flexWrap:"wrap"}}>
            <TouchableOpacity
              
             style={styles.btcall}
              onPress={() => {
                Linking.openURL(`tel:${contact}`);
              }}>
                  <View style={{flex:1, flexDirection:"row" ,justifyContent:"center" ,marginTop:7}}>
                  <Text style={{justifyContent:"center", color:"#FFF" ,marginRight:15}}>CAll NOW</Text>
              
              <Icon
                name="phone"
                type="Feather"
                style={{fontSize: 20, color: '#FFF', justifyContent:"center"}}
              />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              
              style={styles.btwhats}
               onPress={() => {
                Linking.openURL(`whatsapp://send?text=${ image}&phone=${contact}`);
               }}>
                   <View style={{flex:1, flexDirection:"row" ,justifyContent:"center",marginTop:7}}>
                   <Text style={{justifyContent:"center", color:"#FFF" ,marginRight:15}}>CHAT NOW</Text>
               
               <Icon
                 name="whatsapp"
                 type="FontAwesome"
                 style={{fontSize: 20, color: '#FFF', justifyContent:"center"}}
               />
               </View>
             </TouchableOpacity>
           
            </View>
            </Item>
              </Form>
            </ScrollView>
          </Content>
        </Container>
      );
    
}

const mapStateToProps = (state) => ({
    userState: state.auth.user,
    bookState:state.auth.book,
})


export default connect(mapStateToProps)(AddBook)



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
  