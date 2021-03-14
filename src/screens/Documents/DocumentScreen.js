import React, {useEffect} from 'react';
import {StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {Container, H1, Text} from 'native-base';
// redux
import {getDocuments} from '../../action/document';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

// to render empty container
import EmptyContainer from '../../componenets/EmptyContainer';
import Document from '../../componenets/Document';


const Documentscreen = ({getDocuments, docState, userDetails}) => {
  // getting post on component mount
  
  useEffect(() => {
      console.log("HOME COMP", docState.documents)
    getDocuments();
  }, []);

  // if post is fetching from DB then rendering empty component
  if (docState.loading) {
    return <EmptyContainer />;
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <FlatList
        data={docState.documents}
        keyExtractor={(item) => item.id}
        renderItem={({item, index, separators}) => (
        
           <Document item={item} userDetails={userDetails} key={item.id} />
        )}
        ListEmptyComponent={() => (
          <Container style={styles.emptyContainer}>
            <H1>No document found</H1>
          </Container>
        )}
      /> */}

<ScrollView style={styles.scroll}>
         <View>
         {docState.documents.map((item)=>(
         <Tutorial item={item}  userDetails={userDetails}  key={item.id} />
        ))
        }
        </View>
</ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  docState: state.document,
  userDetails: state.auth.user,
});

const mapDispatchToProps = {
  getDocuments,
};

Documentscreen.propTypes = {
  getDocuments: propTypes.func.isRequired,
  docState: propTypes.object.isRequired,
  userDetails: propTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Documentscreen);

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
});
