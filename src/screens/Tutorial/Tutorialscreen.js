import React, {useEffect} from 'react';
import {StyleSheet, FlatList, SafeAreaView,ScrollView} from 'react-native';
import {Container, H1, Text, View} from 'native-base';
// redux
import {getTutorials} from '../../action/tutorial';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

// to render empty containers
import EmptyContainer from '../../componenets/EmptyContainer';
import Tutorial from '../../componenets/Tutorial';

const TutorialScreen = ({getTutorials, tutorialState, userDetails,navigation}) => {
  // getting post on component mount
  
  useEffect(() => {
      console.log("TutorialScreen COMP", tutorialState.tutorials)
    getTutorials();
  }, []);

  // if post is fetching from DB then rendering empty component
  if (tutorialState.loading) {
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
         {tutorialState.tutorials.map((item)=>(
         <Tutorial item={item}  navigation={navigation} userDetails={userDetails}  key={item.id} />
        ))
        }
        </View>
</ScrollView>

    </SafeAreaView>
  );
};
const mapDispatchToProps = {
  getTutorials,
};

const mapStateToProps = (state) => ({
  tutorialState: state.tutorial,

  userDetails: state.auth.user,
});



TutorialScreen.propTypes = {
  getTutorials: propTypes.func.isRequired,
  tutorialState: propTypes.object.isRequired,

  userDetails: propTypes.object,
};

export default connect(mapStateToProps,mapDispatchToProps)(TutorialScreen);

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
