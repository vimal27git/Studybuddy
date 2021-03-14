import React, { useState } from 'react';
import {StyleSheet, ScrollView, Image} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Text,
  Button,
  Textarea,
  Icon,
} from 'native-base';

import Snackbar from 'react-native-snackbar'
import ProgressBar from 'react-native-progress/Bar'

import database from '@react-native-firebase/database'

import storage from '@react-native-firebase/storage'
import ImagePicker from 'react-native-image-picker'
import {options} from '../utils/options'

//redux
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import shortid from 'shortid'
import { useEffect } from 'react';

const EditProfile = ({route, navigation, userState}) => {
    const {id} = route.params
    const [updateDetail, setUpdateDetail] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [countrycode,setCountryCode] = useState ('+91')
    const [mobilenumber,setMobileNumber] = useState('')
    const [UserName, setUserName] = useState('')
     const [city, setCity] = useState('')
    const [studys, setStudys] = useState('')
    const [securedpassword ,setSecuredpassword]  = useState(true)

    const mobnumwithcode = countrycode+mobilenumber

    const refemail = useRef(null);
    const refpassword = useRef(null);
    const refmobilenumber = useRef(null);
    const refusername = useRef(null);
    const refstudys = useRef(null);
    const refcity = useRef(null);
   

    const updateDetails = async () => {
        try {
            if (!name || !UserName || !mobnumwithcode  || !studys || !city || !email || !password) {
                return Snackbar.show({
                    text: "Please add all field",
                    textColor: "white",
                    backgroundColor: "red"
                })
            }

            // const uid = shortid.generate()

            await database().ref(`/users/${id}`).update({
                name,
                UserName,
                city,
                email,
                mobnumwithcode,
                password,
                studys,
                date: Date.now(),
                // id: uid
            })
            console.log("Post Added SUCCESS")
            navigation.navigate('profile')

        } catch (error) {
            console.log(error)
            Snackbar.show({
                text: "Post upload failed",
                textColor: "white",
                backgroundColor: "red"
            })
        }
    }

    useEffect( ()=>{
       console.log(id)
      database()
  .ref(`/users/${id}`)
  .on('value', snapshot => {  
    console.log(snapshot.val()); 
    setUpdateDetail(snapshot.val())
    setName(snapshot.val().name)
    setEmail(snapshot.val().email)
    setCity(snapshot.val().city)
    setPassword(snapshot.val().password)
    setStudys(snapshot.val().studys)
    setUserName(snapshot.val().UserName)
    setMobileNumber(snapshot.val().mobilenumber)

    
  });

    },[id])
    return (
        
            <Container style={styles.container}>
          <Content padder>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>

            <Image
              source={Welcome}
              style={{width: null, height: 100, marginTop:15}}
              resizeMode="contain"
            /> 

            <H3 style={styles.heading}>Welcome to new user, </H3>
           
              <Form>
                <Item rounded style={styles.formItem}>
                  <Input
                    placeholder="name"
                    value={name}
                    style={{color: '#111'}}
                    key={1}
                   
                    autoFocus={true}                  
                    onSubmitEditing={() => refemail.current._root.focus()}
          returnKeyType={'next'}
                    onChangeText={(text) => setName(text)}
                   
                  />
                </Item>
                <Item rounded style={styles.formItem}>
                  <Input
                   
                  
                   ref={refemail}
                    placeholder="email"
                    value={email}
                    keyboardType="email-address"
                    style={{color: '#111'}}
                   
                    onSubmitEditing={() => refpassword.current._root.focus()}
          returnKeyType={'next'}
                    onChangeText={(text) => setEmail(text)}
                  />
                </Item>
                <Item rounded style={styles.formItem}>
                  <Input
                   ref={refpassword}
                    placeholder="password"  
                    value={password}
                    secureTextEntry={securedpassword}
                    style={{color: '#111'}}
                    onSubmitEditing={() => refmobilenumber.current._root.focus()}
                    returnKeyType={'next'}
                    onChangeText={(text) => setPassword(text)}
                    
                  />
                  <TouchableOpacity
                  style={{padding:4}}
                  onPress={() => {setSecuredpassword(!securedpassword);
                  }}
                  >
                  <Icon name="eye" type='FontAwesome5' size={20}/>
                </TouchableOpacity>
                </Item>
                <View style={styles.viw}>
                <Item rounded style={styles.formItem}>
                 
                  <Input
                    
                    value={countrycode}
                    style={{color: '#111',marginEnd:-230}}
                    maxLength={3}
                    keyboardType="name-phone-pad"
                    onChangeText={(text) => setCountryCode(text)}
                  /><Input
                  placeholder="mobile number"
                  ref={refmobilenumber}
                  value={mobilenumber}
                  style={{color: '#111', padding:0}}
                  maxLength={10}
                  keyboardType="numeric"
                  onChangeText={(text) => setMobileNumber(text)}
                  onSubmitEditing={() => refusername.current._root.focus()}
          returnKeyType={'next'}
                  
                />
                  
                </Item>
                </View>

                <Item rounded style={styles.formItem}>
                  <Input
                    ref={refusername}
                    placeholder="user name"
                    value={UserName}
                    style={{color: '#111'}}
                    onChangeText={(text) => setUserName(text)}
                    onSubmitEditing={() => refstudys.current._root.focus()}
                    returnKeyType={'next'}
                  />
                </Item>
                <Item rounded style={styles.formItem}>
                  <Input
                    ref={refstudys}
                    placeholder="Your Studys"
                    value={studys}
                    style={{color: '#111'}}
                    onChangeText={(text) => setStudys(text)}
                    onSubmitEditing={() => refcity.current._root.focus()}
                    returnKeyType={'next'}
                  />
                </Item>
                <Item rounded style={styles.formItem}>
                  <Input
                  ref={refcity}
                    placeholder="city"
                    value={city}
                    style={{color: '#111'}}
                    onChangeText={(text) => setCity(text)}
                    
                   
                  />
                </Item>
         
              
                <TouchableOpacity  style={styles.btsign}  onPress={()=> Alert.alert()}>
                <Text style={styles.txt}>
                  SignIn
                  
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

AddPost.propTypes = {
    userState: propTypes.object.isRequired
}

export default connect(mapStateToProps)(AddPost)



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
    },
    formItem: {
      marginBottom: 20,
    },
    icon: {fontSize: 20, color: '#fdcb9e'},
    image: {width: null, height: 150, marginVertical: 15},
    progress: {width: null, marginBottom: 20},
  });