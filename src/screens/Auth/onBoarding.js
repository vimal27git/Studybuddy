/* eslint-disable prettier/prettier */
import React from 'react'
import { StyleSheet, View ,Image,Text, TouchableOpacity} from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';

import AntDesign from 'react-native-vector-icons/Feather';

const onBoarding = ({navigation}, props) => {
  const done= ({...props})=> (
    
      <TouchableOpacity
         {...props}
      >
      <View style={{flexDirection:'row' ,marginRight: 8}}>
          <Text
            style={{fontSize: 18, fontWeight: 'bold'}}
         >LET'S START</Text> 
         <AntDesign name="arrow-right" size={22} />
        </View>
    </TouchableOpacity>
  
    
    
  )
    return (
        <Onboarding
        onDone={()=> navigation.navigate('SignIn')}
        onSkip={()=> navigation.replace('SignIn')}
        DoneButtonComponent={done}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={require('../../Images/vector-creator.png')} style={styles.image}/>,
            title: <Text style={{fontSize: 32, marginBottom:20}}>Buy or sell used books</Text>,
            subtitle: 'Now it is easier to buy or sell your used book directly from your fingertips',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../../Images/media-player.png')} style={styles.image}/>,
            title: <Text style={{fontSize: 32, marginBottom:20}}>Video tutorials</Text>,
            subtitle: 'You can find all the video tutorials of respactive subject in the categoriesed manner in this app',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../../Images/Girl.png')} style={styles.image}/>,
            title: <Text style={{fontSize: 32, marginBottom:20}}>Easy to use and halpfull</Text>,
            subtitle: 'With all materials available in one platform you can save your time and score better in your exams',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../../assets/logo.png')} style={styles.logo}/>,
            title: <Text style={{fontSize: 32, marginBottom:20}}>study with your buddy</Text>,
            subtitle: 'Enough of intro.. lest\'s get started',
          },
          
        ]}
      />
    )
}

export default onBoarding

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image:{
      height: 300,
      width: 350,
     
    },
    logo:{
      marginTop:-50,
      height:350,
      width:300
    }
})

