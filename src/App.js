import React, {useEffect} from 'react'
import {Text} from 'react-native'
import 'react-native-gesture-handler'

import auth from '@react-native-firebase/auth'

import {NavigationContainer} from '@react-navigation/native'

import {useDispatch, connect} from 'react-redux'



import CustomHeader from './layout/CustomHeader'



import {SET_USER, IS_AUTHTHENTICATED} from './action/action.types'

import database from '@react-native-firebase/database'
import EmptyContainer from './componenets/EmptyContainer'
import {requestPermission} from './utils/AskPermission'
import {MainStackNavigator,BottomTabNavigator} from "./navigation/StackNavigator";
import Home from './screens/Home'
// import BottomTabNavigator from './navigation/TabNavigator'

// import { Tab } from 'native-base'
 


const App =({authState}) => {

  const dispatch = useDispatch();


  const onAuthStateChanged = (user) => { 
    if (user) {
      dispatch({
        type: IS_AUTHTHENTICATED,
        payload: true
      })

      console.log(user._user.uid)

      database()
        .ref(`/users/${user._user.uid}`)
        .on('value', (snapshot) => {
          console.log('USER DETAILS', snapshot.val())
          dispatch({
            type: SET_USER,
            payload: snapshot.val(),
          })
        })


    } else {
      dispatch({
        type: IS_AUTHTHENTICATED,
        payload: false
      })
    }
  }

  useEffect(() => {
    requestPermission()
    const susbcriber = auth().onAuthStateChanged(onAuthStateChanged)
    return susbcriber;
  }, [])
//   const dTab = () => (
//     <Tab.Navigator initialRouteName="Home">
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />
      
//     </Tab.Navigator>
// )

  if (authState.loading) {
      return <EmptyContainer/>
  }
 
    return(
        
        <>
         <NavigationContainer  >
          
            {authState.isAuthenticated ? (
              <>
              <BottomTabNavigator/>
              
           
              </>
            ) : (
              <>
              <MainStackNavigator/>
              </>
              )}
                
        </NavigationContainer>
        </>
    )
}
const mapStateToProps = (state) => ({
  authState: state.auth
})

export default connect(mapStateToProps)(App)