import React, {useState, useRef} from 'react'
import {StyleSheet, ScrollView, Image,Pressable, Button,TouchableOpacity, View, Alert ,Modal} from 'react-native'

import {
    Container,
    Form,
    Item,
    Input,
    Text,
    
    H3,
    Icon
} from 'native-base'

import Welcome from '../../assets/book.png'


import {connect} from 'react-redux'
import {signIn} from '../../action/auth'
import { reset } from "../../action/auth";


import propTypes from 'prop-types'
import { color } from 'react-native-reanimated'

const SignIn = ({navigation, signIn,reset}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [securedpassword ,setSecuredpassword]  = useState(true)
    const [modalVisible, setModalVisible] = useState(false);

  const passwordref = useRef(null)


    const doSignIn = () => {
        signIn({email, password})
    }

   const resetpass = () => {
      reset({email})
    }

    return (
    
      

        <Container style={styles.container}>
        
      
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <H3 style={styles.heading}>Welcome to the Study-buddy</H3>
            <Image
              source={Welcome}
              style={{width: null, height: 150, marginTop: 30}}
              resizeMode="contain"
            />
            <Form>
              <Item rounded style={styles.formItem}>
                  <Input
                      placeholder="enter your registerd email"
                      value={email}
                      style={{color: '#111'}}
                      onChangeText={(text) => setEmail(text)}/>
              </Item>
              <Item rounded style={styles.formItem}>
                 <Input
                      ref={passwordref}
                      placeholder="enter your registerd password"
                      value={password}
                      secureTextEntry={securedpassword}
                      style={{color: '#111'}}
                      onSubmitEditing={doSignIn}
                      onChangeText={(text) => setPassword(text)}/>
                    <TouchableOpacity
                      style={{padding:4}}
                      onPress={() => {setSecuredpassword(!securedpassword)}} >
                        <Icon name="eye" type='FontAwesome5' size={10}/>
                    </TouchableOpacity>
              </Item>
              
              <View style={{flex:1, flexDirection:"row" ,alignSelf:"flex-end"}} >
                    <TouchableOpacity  onPress={() => setModalVisible(true)}>
                        <Text style={{color:"#000",marginRight:20}}> Forget password?
                        </Text>
                    </TouchableOpacity>
              </View>
               <Modal
       
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(!modalVisible) }}>
           <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{fontWeight:"bold"}}>
           reset password
            </Text>
            <View style={styles.subContainer}>
                <Input
                    style={styles.textInput}
                    placeholder='Your Email'
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <Button
                    style={styles.textInput}
                   
                    title="Reset"
                    onPress={resetpass} />
            
            
        
         
        </View>
      </View>
                </Modal>
                    <TouchableOpacity  style={styles.btsign}  onPress={doSignIn}>
                          <Text style={styles.txt}>
                           SignIn
                          </Text>
                    </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                style={{marginTop: 10}}>
                    <Text style={{color: '#000', textAlign: 'center'}}>
                        Do not have an account?, SignUp here
                      </Text>
              </TouchableOpacity>
            </Form>
          </ScrollView>
        </Container>
      
      );
}

const mapDispatchToProps = {
    signIn: (data) => signIn(data),
    reset:(data) => reset(data)
}

SignIn.propTypes = {
    signIn: propTypes.func.isRequired,
    reset:propTypes.func
}


export default connect(null, mapDispatchToProps)(SignIn)

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFF',
      flex: 1,
      justifyContent: 'flex-start',
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
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      width:"95%",
      justifyContent:"center",
      alignContent:"center",
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
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
 
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 150,
      color:"#ddf",
      textAlign: "center"
    },
  
      centeredView: {
    justifyContent: "center",
    alignItems: "center",
   marginTop:"50%",
    alignSelf:"center",
    alignContent:"center",
  
    
    width:"99%"
  },
    txt:{
      paddingTop:5,
      color:"#FFF",
      fontSize: 20 ,
    },
    formContainer: {
      height: 400,
      padding: 20
  },
  subContainer: {
      marginBottom: 20,
      height:80,
      width:"90%"
      
  },
  activity: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
  },
  textInput: {
      fontSize: 19,
      margin: 10,
      height:30,
      width: "93%",
      borderColor:"#111",
      borderWidth:1

  },

    heading: {
      textAlign: 'center',
      color: '#3498db',
      marginHorizontal: 5,
      marginTop: 30,
    },
    formItem: {
      marginBottom: 20,
      width:'90%',
      marginLeft:20,
      color:"#3498db",
      
    },
  });
  