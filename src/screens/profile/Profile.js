import React ,{useState , useEffect}from 'react'

import { Divider } from 'react-native-elements';


import {StyleSheet, ScrollView, Image,TouchableOpacity,Linking, Alert} from 'react-native';
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
  Row,
} from 'native-base';



import database from '@react-native-firebase/database'


//redux
import {connect} from 'react-redux'
import propTypes from 'prop-types'
// import shortid from 'shortid'
// import { set } from 'react-native-reanimated';
import {signOut} from '../../action/auth'


const Profile = ({signOut,navigation,userState}) => {


    return (
        <Container style={styles.container}>
          <Content padder>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
            
                    
                   
                <Image  style={{width: null, height: 140, marginTop:15}}
              resizeMode="contain"
               source={require('../../assets/edit.png')}/>
            
                    
                   
                   
                <Text style={{alignSelf:"center",fontSize:20,textAlign:"center" ,}}>
                   hello!  {userState.name}
                </Text>
                <View style={{flex:1,flexWrap:"wrap" ,marginVertical:3}}>
                <View style={{flex:1,flexDirection:"row",flexWrap:"wrap",marginVertical:7 }}>
                <TouchableOpacity
                  style={styles.btcall}
                  onPress={() => navigation.navigate('EditProfile')}>
                   
                     <Icon name="user-edit" type="FontAwesome5" style={{color: "grey" , fontSize:99, alignSelf:"center"}} />
                          <Text style={{justifyContent:"center" ,color:"grey", fontSize:20 ,marginBottom:3}} > Edit Profile</Text>
            
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btcall}
                  onPress={() => navigation.navigate('Userbook')}>
                   
                     <Icon name="bookshelf" type="MaterialCommunityIcons" style={{color: "grey" , fontSize:100}} />
                          <Text style={{justifyContent:"center" ,color:"grey", fontSize:20 ,marginBottom:3}} > your Books</Text>

                </TouchableOpacity>
                </View>
                <View style={{flex:1,flexDirection:"row",flexWrap:"wrap" }}>
                <TouchableOpacity
                  style={styles.btcall}
                  onPress={() => navigation.navigate('Usertutorial')}>
                    
                     <Icon name="video-library" type="MaterialIcons" style={{color: "grey" , fontSize:100}} />
                          <Text style={{justifyContent:"center" ,color:"grey", fontSize:20 ,marginBottom:3}} > your Tutorials</Text>
                 
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btcall}
                  onPress={() => navigation.navigate('Userdocument')}>
                     
                     <Icon name="documents-outline" type="Ionicons" style={{color: "grey" , fontSize:100}} />
                          <Text style={{justifyContent:"center" ,color:"grey", fontSize:20 ,marginBottom:3}} > your documents</Text>
                 
                </TouchableOpacity>
                </View>
                </View>

                <TouchableOpacity
                  style={styles.btso}
                onPress={() => signOut()}
                ><View style={{flex:1,flexDirection:"row",flexWrap:"wrap"}}>
                  <Text style={{justifyContent:"center"}} >signOut</Text>
                    <Icon name="log-out-outline" style={{color: "red"}} />
                    </View></TouchableOpacity>
            </ScrollView>
          </Content>
        </Container>
      );
    
}
const mapDispatchToProps = {
  signOut
}

const mapStateToProps = (state) => ({
    userState: state.auth.user,
    signOut: propTypes.func.isRequired
})


export default connect(mapStateToProps,mapDispatchToProps)(Profile)



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFF',
      flex: 1,
      justifyContent: 'flex-start',
    },
    btcall:{
     marginVertical:5,
     marginHorizontal:3,
      borderWidth:1,
      borderColor:"#ddd",
      backgroundColor:"#fff",
      width:"48%",
      height:150,
      
      alignItems:"center"
    },
    btso:{
     
      borderWidth:1,
      borderColor:"#ddd",
      backgroundColor:"#fff",
      width:"100%",
      height:30,
      justifyContent:"center",
   
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
  



