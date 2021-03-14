import React, {useState, useEffect} from 'react';
import {Alert, Image, Linking, TouchableOpacity,View} from 'react-native';
import { Divider } from 'react-native-elements';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Item,
} from 'native-base';
import Snackbar from "react-native-snackbar";

import database from "@react-native-firebase/database";




const Book = ({item, userDetails, navigation }) => {

    const [id, setId] = useState('')

    useEffect(() => {
        console.log(item);
        setId(item.id)
        

    }, [item])


   
    return (
    
      <Card 
        style={{
          backgroundColor: '#eee',
          borderColor: '#0f4c75',
          borderRadius:8,
         margin:1,
          height:210,
          width:"48%"
        }}>
        {/* <CardItem
          style={{
            backgroundColor: 'transparent',
          }}> */}
          {/* <Left>
            
            <Body>
                
              <Text
                style={{
                  color: '#111',
                }}>
                {item.bookname} by {item.bookauthor} {item.Edition}
              </Text>
  
              <Text note>{item.publisher}</Text>
            </Body>
          </Left>
          <Right>
              
                  <Text>{item.bookprice}</Text>
              
          </Right> */}
        {/* </CardItem> */}
        <TouchableOpacity onPress={ () => navigation.navigate('BookView',{id:id})}> 
        <CardItem cardBody  style={{borderTopLeftRadius:8,borderTopRightRadius:8}}>
          <Image
          resizeMode='contain'
              source={{uri: item.picture}}
            style={{height: 130, width: null, flex: 1}}
          />
        </CardItem>
        </TouchableOpacity> 
      
  
        <CardItem
        cardBody
          style={{
          
            backgroundColor: 'transparent',
          }}>
            <Item style={{justifyContent:"center",marginVertical:10}}>
              <Left>
            <Text style={{color: '#111',fontSize:13,marginLeft:3 ,fontWeight:"bold"}}>{item.bookname}</Text>
            </Left>
           
            <Right>
            <Text style={{marginRight:3}} >
                  {item.bookprice}
                </Text>
                </Right>
                </Item>
                
              
            
        </CardItem>
        
      </Card>
   
    );
  
}

export default Book