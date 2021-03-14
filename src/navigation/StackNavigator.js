import React,{useEffect} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler'
import { IconButton } from 'react-native-paper';
import onBoarding from "../screens/Auth/onBoarding";
import SignIn from "../screens/Auth/SignIn";
import SignUp from "../screens/Auth/SignUp"

import AddTutorial from "../screens/Tutorial/AddTutorial";
import Tutorialscreen from "../screens/Tutorial/Tutorialscreen";
import TutorialView from "../screens/Tutorial/TutorialView";
import AddBook from "../screens/Book/AddBook";
import BookView from "../screens/Book/BookView";
import Profile from "../screens/profile/Profile";
import EditProfile from "../screens/profile/EditProfile";
import Userbook from "../screens/profile/Userbook";
import Usertutorial from "../screens/profile/Usertutorial";
import Userdocument from "../screens/profile/Userdocument";
import AddDocument from "../screens/Documents/AddDocument";
import DocumentScreen from "../screens/Documents/DocumentScreen";
import DocumentView from "../screens/Documents/DocumentView";
// import addRoom from "../screens/chat/addRoom";
// import chatScreen from "../screens/chat/chatScreen";
// import chatRoom from "../screens/chat/chatRoom";
import Home from "../screens/Home";
import CustomHeader from '../layout/CustomHeader'



import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
    screenOptions={{
        header: (props) => <CustomHeader {...props} />,
      }}>
      <Stack.Screen name="onBoarding" component={onBoarding} />
      <Stack.Screen name="SignIn" component={SignIn} />
  
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

const BottomTabNavigator = () => {
  return (
    <NavigationContainer 
    independent="true" >
    <Tab.Navigator screenOptions={{
      header: (props) => <CustomHeader {...props}   />,
    }}
    initialRouteName="Home"
    activeColor="#111"
    inactiveColor="#636e72"
    barStyle={{backgroundColor: "#694fad"}}>   

              <Tab.Screen options={{
                    tabBarColor:"#FeFeFe",
                    tabBarIcon:({color}) => (<MaterialCommunityIcons name="home-roof" color={color} size={26}/>)
              }} 
              name="Home" component={ContactStackHome}/>
              <Tab.Screen options={{
                    tabBarColor:"#FeFeFe",
                    tabBarIcon:({color}) => (<MaterialCommunityIcons name="play" color={color} size={26}/>),
              }} 
              name="Tutorial" component={ContactStacktoptabtutorial}/>
              <Tab.Screen options={{
                    tabBarColor:"#FeFeFe",
                    tabBarIcon:({color}) => (<MaterialCommunityIcons name="text-box-plus-outline" color={color} size={26}/>),
              }}
              name="Add" component={ContacttoptabAddBook}/>
              {/* <Tab.Screen options={{
                    tabBarColor:"#22CB5C",
                    tabBarIcon:({color}) => (<MaterialCommunityIcons name="wechat" color={color} size={26}/>),
              }} 
              name="chat" component={ContactStackchat}/> */}
              <Tab.Screen options={{
                    tabBarColor:"#FeFeFe",
                    tabBarIcon:({color}) => (<MaterialCommunityIcons name="account-circle-outline" color={color} size={26}/>),
              }}
              name="Profile" component={ContactStackProfile} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}

  const ContactStackHome = () => {
    return (
      <Stack.Navigator screenOptions={{
        header: (props) => <CustomHeader {...props} />,
      }}>     
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen  name="BookView" component={BookView} />
      </Stack.Navigator>
    );
  }
  const ContactStackTutorial = () => {
    return (
      <Stack.Navigator >   
              <Stack.Screen options={{headerShown:false}}  name="Tutorialscreen" component={Tutorialscreen} />
              <Stack.Screen options={{headerShown:false}}  name="TutorialView" component={TutorialView}/>
      </Stack.Navigator>
    );
  }
  // const ContactStackchat = () => {
  //   return (
  //     <Stack.Navigator >   
  //       <Stack.Screen options={({ navigation }) => ({
  //   headerRight: () => (
  //     <IconButton
  //       icon='message-plus'
  //       size={28}
  //       color='#1f65ff'
  //       onPress={() => navigation.navigate('addRoom')}
  //     />
  //   ),
  // })}  name="chatScreen" component={chatScreen}/>
  //             <Stack.Screen options={{headerShown:false}}  name="addRoom" component={addRoom} />
  //             <Stack.Screen options={({ route }) => ({
  //   title: route.params.thread.name
  // })}  name="chatRoom" component={chatRoom}/>
  //     </Stack.Navigator>
  //   );
  // }


  const ContactStacktoptabtutorial = () => {
    return (
     <TopTab.Navigator>
              <TopTab.Screen options={{headerShown:false}} name="Tutorial" component={ContactStackTutorial} />
              <TopTab.Screen options={{headerShown:false}} name="DocumentView" component={DocumentView}/>
      </TopTab.Navigator>
    );
  }

  const ContacttoptabAddBook= () => {
    return (
      <TopTab.Navigator  >
              <TopTab.Screen options={{headerShown:false}} name="Add Book" component={AddBook}/>
              <TopTab.Screen options={{headerShown:false}} name="Add Tutorial" component={AddTutorial}/>
              <TopTab.Screen options={{headerShown:false}} name="Add Document" component={AddDocument}/>
      </TopTab.Navigator>
    );
  }
  const ContactStackProfile = () => {
    return (
      <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomHeader {...props} />
      }}>
              <Stack.Screen   name="profile"      component={Profile}/>   
              <Stack.Screen   name="EditProfile"  component={EditProfile}/>   
              <Stack.Screen   name="Userbook"     component={Userbook}/>
              <Stack.Screen   name="Usertutorial" component={Usertutorial}/>
              <Stack.Screen   name="Userdocument" component={Userdocument}/>
      </Stack.Navigator>
    );
  }
export { MainStackNavigator,BottomTabNavigator };