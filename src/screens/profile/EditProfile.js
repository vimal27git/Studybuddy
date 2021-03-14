import React ,{useState ,useRef, useEffect}from 'react'

import { Divider } from 'react-native-elements';
import Snackbar from 'react-native-snackbar';


import {StyleSheet, ScrollView, Image,TouchableOpacity,Linking,TextInput} from 'react-native';
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




const EditProfile = ({navigation,userState}) => {
         
         const [id, setid] = useState('')
         const [name, setName] = useState('')
         const [email, setEmail] = useState('')
        
         const [countrycode,setCountryCode] = useState ('+91')
         const [mobnumwithcode,setMobileNumber] = useState('')
         const [UserName, setUserName] = useState('')
          const [city, setCity] = useState('')
         const [qualification, setQualification] = useState('')
         const [securedpassword ,setSecuredpassword]  = useState(true)
      


    const done = async() => {
      try {
        await database().ref(`/users/${id}`).update({
          name,
          email,
      
          countrycode,
          mobnumwithcode,
          UserName,
          city,
          qualification

        })
        Snackbar.show({
          text:'updated',
          textColor:'white',
          backgroundColor:'#3498db'
        })

        navigation.goBack('Profile')


      } 
       catch (error) {
        console.log(error)      


      }
    }

    useEffect(() => {
    console.log(userState.name)
    console.log(id)
    setid(userState.uid)
    setName(userState.name)
    setCity(userState.city)
    setCountryCode(userState.countrycode)
    setEmail(userState.email)
    setMobileNumber(userState.mobnumwithcode)
    setUserName(userState.UserName)
    setQualification(userState.qualification)
  
  }, [id]);  

  const refemail = useRef(null);

 const refmobilenumber = useRef(null);
 const refusername = useRef(null);
 const refqualification = useRef(null);
 const refcity = useRef(null);

    return (
      <Container style={styles.container}>
      <Content padder>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>

        <Image  style={{width: null, height: 140, marginVertical:5}}
              resizeMode="contain"
               source={require('../../assets/edit.png')}/>
            

        
       
          <Form>
            <Item rounded style={styles.formItem}>
              <Input
                placeholder="name"
                value={name}
                style={{color: '#111'}}
                key={1}                  
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
               
                onSubmitEditing={() => refmobilenumber.current._root.focus()}
      returnKeyType={'next'}
                onChangeText={(text) => setEmail(text)}
              />
            </Item>
            

            <View style={styles.viw}>
            <Item rounded style={styles.formItem}>
           <Input
                  placeholder="mobile number"
                  ref={refmobilenumber}
                  value={mobnumwithcode}
                  style={{color: '#111', padding:0}}
                  maxLength={13}
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
       
               
              />
            </Item>
     
          
            <TouchableOpacity  style={styles.btsign}  onPress={done}>
            <Text style={styles.txt}>
              update
              
            </Text>
          </TouchableOpacity>
         
          </Form>
        </ScrollView>
      </Content>
    </Container>
        // <Container style={styles.container}>
        //   <Content padder>
        //     <ScrollView contentContainerStyle={{flexGrow: 1}}>
              
        //            {/* <View style={{flex:1,flexDirection:"row" ,flexWrap:"wrap"}}>
        //           <TextInput
        //         value={name}
        //         onChangeText={(text) => setname(text)}
        //           />
        //           <TouchableOpacity
        //           style={styles.btcall}
        //         onPress={() => done()}
        //         ><View style={{flex:1,flexDirection:"row",flexWrap:"wrap"}}>
        //           <Text style={{justifyContent:"center"}} >Update</Text>
                  
        //             </View></TouchableOpacity> */}


           
        //     {/* </View> */}
             
        //     </ScrollView>
        //   </Content>
        // </Container>
      );
    
}

const mapStateToProps = (state) => ({
    userState: state.auth.user,
   
})


export default connect(mapStateToProps)(EditProfile)





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



