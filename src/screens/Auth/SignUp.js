import React, {useRef, useState} from 'react'
import {StyleSheet, ScrollView, TouchableOpacity, View,Image,Keyboard} from 'react-native'

import {
    Container,
    Form,
    Item,
    Input,
    Text,
    Button,
    H3,
    Content,
    Icon,
    
} from 'native-base'
import Welcome from '../../assets/SeekPng.com_user-png_729756.png'
//redux
import propTypes from 'prop-types'
import {signUp} from '../../action/auth'
import {connect} from 'react-redux'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const SignUp = ({signUp}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [countrycode,setCountryCode] = useState ('+91')
    const [mobilenumber,setMobileNumber] = useState('')
    const [UserName, setUserName] = useState('')
     const [city, setCity] = useState('')
    const [qualification, setQualification] = useState('')
    const [securedpassword ,setSecuredpassword]  = useState(true)

  const mobnumwithcode = countrycode+mobilenumber

 const refemail = useRef(null);
 const refpassword = useRef(null);
 const refmobilenumber = useRef(null);
 const refusername = useRef(null);
 const refqualification = useRef(null);
 const refcity = useRef(null);

 
  

    const doSignUp = async () => {
        signUp({name, UserName, mobnumwithcode ,qualification, city, email, password })
    }



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
                    onSubmitEditing={() => refqualification.current._root.focus()}
                    returnKeyType={'next'}
                  />
                </Item>
                <Item rounded style={styles.formItem}>
                  <Input
                    ref={refqualification}
                    placeholder="Your Qualification"
                    value={qualification}
                    style={{color: '#111'}}
                    onChangeText={(text) => setQualification(text)}
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
                    onSubmitEditing={ doSignUp}
                   
                  />
                </Item>
         
              
                <TouchableOpacity  style={styles.btsign}  onPress={doSignUp}>
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

const mapDispatchToProps = {
    signUp: (data) => signUp(data)
}

SignUp.propTypes = {
    signUp: propTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(SignUp)



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFF',
      flex: 1,
      justifyContent: 'flex-start',
    },

    progress: {width: null, marginBottom: 20},
    formItem: {
      marginBottom: 20,
      width:'90%',
      marginLeft:20,
      color:"#3498db",

      
    },
    heading: {
      textAlign: 'center',
      color: '#3498db',
      paddingBottom:15,
      fontWeight:"bold",
      marginHorizontal: 5,
      marginTop: 20,
    },
    btsign:{
      borderRadius:20 ,
     
      borderColor:"#3498db",
      backgroundColor:"#3498db",
      width:'99%',
      height:'15%',
  
      marginBottom:10,
      alignContent:"center",
      alignItems:"center"
    },
    txt:{
      paddingTop:5,
      color:"#FFF",
      fontSize: 20 ,
    },
    viw:{
      display:"flex",
      flexDirection:"row"
    },
    dropdown: {
      height: 50,
      width: '100%',
      borderColor: '#aaaaaa',
      borderWidth: 1.5,
      borderRadius: 6,
      marginBottom: 15,
    },

  });