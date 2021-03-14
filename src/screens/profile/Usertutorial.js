import React, {useEffect} from 'react';
import {StyleSheet, FlatList, SafeAreaView,ScrollView} from 'react-native';
import {Container, H1, Text, View} from 'native-base';
// redux
import {getUserTutorials} from '../../action/usertutorial';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

// to render empty containers
import EmptyContainer from '../../componenets/EmptyContainer';
import UserTutorial from '../../componenets/UserTutorial';

const Usertutorial = ({getUserTutorials, usertutorialState, userDetails,navigation}) => {
  // getting post on component mount
  
  useEffect(() => {
      console.log("usertutorial COMP", usertutorialState.usertutorial)
    getUserTutorials();
  }, []);

  // if post is fetching from DB then rendering empty component
  if (usertutorialState.loading) {
    return <EmptyContainer />;
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <FlatList
        data={tutorialState.tutorials}
        keyExtractor={(item) => item.id}
        renderItem={({item, index, separators}) => (
        
           <Tutorial item={item} userDetails={userDetails} key={item.id} />
        )}
        ListEmptyComponent={() => (
          <Container style={styles.emptyContainer}>
            <H1>No post found</H1>
          </Container>
        )}
      /> */}
       <ScrollView style={styles.scroll}>
         <View>
         {usertutorialState.usertutorials.map((item)=>(
         <UserTutorial item={item}  userDetails={userDetails}  key={item.id} />
        ))
        }
        </View>
</ScrollView>

    </SafeAreaView>
  );
};
const mapDispatchToProps = {
  getUserTutorials,
};

const mapStateToProps = (state) => ({
  usertutorialState: state.usertutorial,

  userDetails: state.auth.user,
});


Usertutorial.propTypes = {
  getUserTutorials: propTypes.func.isRequired,
  usertutorialState: propTypes.object.isRequired,

  userDetails: propTypes.object,
};

export default connect(mapStateToProps,mapDispatchToProps)(Usertutorial);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    justifyContent: 'flex-start',
    padding: 4,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#1b262c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  youtube: {
    alignSelf: 'stretch',
    height: 300,
  },

});
