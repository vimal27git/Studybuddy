import React from 'react'
import {StyleSheet} from 'react-native'
import {
    Header,
    Body,
    Right,
    Button,
    Icon,
    Title,
    Text
} from 'native-base'

import { connect} from 'react-redux'
import propTypes from 'prop-types'
function rendername() {
    return (
      console.log(user)
    );
  }


const CustomHeader = ({ authState, navigation}) => {
    return(
        <Header
        androidStatusBarColor="#3498db"
        style={{ backgroundColor: "#3498db"}}>
        <Body>
            <Title>Study-buddy</Title>
        </Body>
        <Right>
            {authState.isAuthenticated && (
                <>
               
               <Button transparent onPress={rendername}
            style={{
              color: '#111',marginLeft:-10}}
            >
              <Icon
                name="like2"
                type="AntDesign"
                style={{fontSize: 20, color: '#111'}}
              />
              <Text
                style={{
                  color: '#111',marginLeft:-10
                }}>
                
              </Text>
            </Button>
                
                </>
            )}
        </Right>
        </Header>
    )
}

const mapStateToProps = (state) => ({
    authState: state.auth
})



CustomHeader.prototypes = {
    authState: propTypes.object.isRequired
}

export default connect(mapStateToProps )(CustomHeader)