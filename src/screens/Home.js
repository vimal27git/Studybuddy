import React, {useState,useEffect} from 'react';
import {StyleSheet, FlatList, SafeAreaView,ScrollView,View,Alert} from 'react-native';
import {Container, Form, H1, Text,Input,Item,Icon,} from 'native-base';
// redux
import {getBooks} from '../action/book';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import { Searchbar } from 'react-native-paper';

// to render empty container
import EmptyContainer from '../componenets/EmptyContainer';
import Book from '../componenets/Book';
import { TouchableOpacity } from 'react-native-gesture-handler';




const Home = ({getBooks, bookState, userDetails,navigation}) => {
  // getting post on component mount

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  
  useEffect(() => {
      console.log("HOMECOMP", bookState.books)
    getBooks();
  }, []);

  // if post is fetching from DB then rendering empty component
  if (bookState.loading) {
    return <EmptyContainer />;
  }
  return (
    
      <SafeAreaView style={styles.container}>
         <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
   <ScrollView>
      <View style={styles.gridContainer}>
      {/* <FlatList
        data={postState.posts}
        keyExtractor={(item) => item.id}
        renderItem={({item, index, separators}) => (
        
        )}
        ListEmptyComponent={() => (
          <Container style={styles.emptyContainer}>
            <H1>No post found</H1>
          </Container>
        )}
      /> */}
      {bookState.books.map((item)=>(
          <Book item={item} navigation={navigation} userDetails={userDetails} key={item.by} />
        ))
        }
          </View>
       </ScrollView>
   
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  bookState: state.book,
  userDetails: state.auth.user,
});

const mapDispatchToProps = {
  getBooks,
};

Home.propTypes = {
  getBooks: propTypes.func.isRequired,
  bookState: propTypes.object.isRequired,
  userDetails: propTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    justifyContent: 'flex-start',
    padding: 5,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#1b262c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
    gridContainer: {
      flex: 1,
      margin: 3,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-start",
      justifyContent: "space-around",
    },
  });

