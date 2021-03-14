// Import React in our code
import React, { useState } from "react";

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

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
} from 'native-base';

import Snackbar from 'react-native-snackbar'
import ProgressBar from 'react-native-progress/Bar'
import {options} from '../../utils/options'
import { Picker } from "@react-native-picker/picker";
import database from '@react-native-firebase/database'
// Firebase Storage to upload file
import storage from "@react-native-firebase/storage";
// To pick the file from local file system
import DocumentPicker from "react-native-document-picker";

//redux
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import shortid from 'shortid'

const AddDocument = ({navigation, route,userState}) => {
  // State Defination
  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState({});
  const [process, setProcess] = useState("");

  const [image, setImage] = useState(null)
    

    const [fileUploading, setFileUploading] = useState(false)

  const [type, settype] = useState('')
  const [subject, setsubject] = useState('')
  const [topic, settopic] = useState('')
  const [semester, setsemester] = useState('')
  const [branch, setbranch] = useState('')
  const [Document, setDocument] = useState(null)
  const [faculty, setfaculty] = useState('')
  const [university, setuniversity] = useState('')
  const [uploadStatus, setUploadStatus] = useState(null)


  const chooseFile = async () => {
    // Opening Document Picker to select one file
    try {
      const fileDetails = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
      });
      console.log(
        "fileDetails : " + JSON.stringify(fileDetails)
      );
      // Setting the state for selected File
      setFilePath(fileDetails)
      uploadFile(fileDetails)
      
    
     
    } catch (error) {
      setFilePath({});

      // If user canceled the document selection
      alert(
        DocumentPicker.isCancel(error)
          ? "Canceled"
          : "Unknown Error: " + JSON.stringify(error)
      );
    }
  };

  const uploadFile = async (fileDetails) => {
    try {
      // Check if file selected
      if (Object.keys(filePath) == 0 )
        return alert("Please Select any File");
      setLoading(true);

      // Create Reference
      console.log(filePath.uri.replace("file://", ""));
      console.log(filePath.name);
      
      const reference = storage().ref(
        `/myfiles/${filePath.name}`
      );

      // Put File
      const task = reference.putFile(
        filePath.uri.replace("file://", "")
      );
      // You can do different operation with task
      // task.pause();
      // task.resume();
      // task.cancel();

      task.on("state_changed", (taskSnapshot) => {
        
        const percentage = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 1000

            setUploadStatus(percentage)
        console.log(
          `${taskSnapshot.bytesTransferred} transferred 
           out of ${taskSnapshot.totalBytes}`
        );
      });
      task.then( async() => {
        const url = await reference.getDownloadURL()

            setDocument(url)
      });
      setFilePath({});
    } catch (error) {
      console.log("Error->", error);
      alert(`Error-> ${error}`);
    }
    setLoading(false);
  };

  const AddDocs = async () => {
    try {
        if (!type || !subject  || !semester  || !branch   || !faculty|| !university) {
            return Snackbar.show({
                text: "Please add all field",
                textColor: "white",
                backgroundColor: "red"
            })
        }

        const did = shortid.generate()

        await database().ref(`/documents/${did}`).set({
            
            type,
            subject,
            topic,
            semester,
            branch,
            faculty,
            university,
            file: Document,
           
            by: userState.name,
            // date: Date().getDate(),
            userid: userState.uid,
            location: userState.city,
            contact: userState.mobnumwithcode,
            id: did
        })
        console.log("Document Added SUCCESS")
        navigation.navigate('Home')

    } catch (error) {
        console.log(error)
        Snackbar.show({
            text: "Document upload failed",
            textColor: "white",
            backgroundColor: "red"
        })
    }
}


  return (
    <> 

    <Container style={styles.container}>
          <Content padder>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <Text style={styles.titleText}>
              upload your file 
            </Text>
     <Form>
      {loading ? (
         <ProgressBar progress={uploadStatus} style={styles.progress} />
      ) : (
        <Button
        regular
        bordered
        block
        iconLeft
        info
        style={styles.formItem}
        onPress={chooseFile}>
        <Icon
          name="md-documents-outline"
          type="Ionicons"
          style={styles.icon}
        />
        <Text
          style={{ color: '#3498db', alignSelf:"center"
          }}>
          Choose file
        </Text>
      </Button>
    )}
       
            
            <View style={styles.container}>
              
              {/* <Text>{process}</Text> */}
              <Item  style={styles.formItem}>
                <Picker
                
        selectedValue={type}
        style={styles.formpicker}
        onValueChange={(itemValue, itemIndex) => settype(itemValue)}
    
        returnKeyType={'next'}
      >
        <Picker.Item label="important questions" value="important questions" />
        <Picker.Item label="Notes" value="Notes" />
        <Picker.Item label="Assignments" value="Assignments" />
      </Picker>
      </Item>
      <Item  style={styles.formItem}>
                  <Input
                    placeholder="subject"
                    value={subject}
                    style={{color: '#111'}}
                    onChangeText={(text) => setsubject(text)}
                  />
                </Item>
                <Item  style={styles.formItem}>
                  <Input
                    placeholder="topic"
                    value={topic}
                    style={{color: '#111'}}
                    onChangeText={(text) => settopic(text)}
                  />
                </Item>
              <Item  style={styles.formItem}>
                <Picker
                   selectedValue={semester}
                   style={styles.formpicker}
                   onValueChange={(itemValue, itemIndex) => setsemester(itemValue)}
                   returnKeyType={'next'} >
                       <Picker.Item label="1st semester" value="1st semester" />
                       <Picker.Item label="2nd semester" value="2nd semester" />
                       <Picker.Item label="3rd semester" value="3rd semester" />
                       <Picker.Item label="4th semester" value="4th semester" />
                       <Picker.Item label="5th semester" value="5th semester" />
                       <Picker.Item label="6th semester" value="6th semester" />
                       <Picker.Item label="7th semester" value="7th semester" />
                       <Picker.Item label="8th semester" value="8th semester" />
                 </Picker>
              </Item>
              <Item  style={styles.formItem}>
                <Picker
                   selectedValue={branch}
                   style={styles.formpicker}
                   onValueChange={(itemValue, itemIndex) => setbranch(itemValue)}
                   returnKeyType={'next'}>
                      <Picker.Item label="Aeronautical engineering" value="Aeronautical engineering" />
                      <Picker.Item label="Automobile engineering" value="Automobile engineering" />
                      <Picker.Item label="Chemical engineering" value="Chemical engineering" />
                      <Picker.Item label="Civil engineering" value="Civil engineering" />
                      <Picker.Item label="Computer engineering" value="Computer engineering" />
                      <Picker.Item label="Electrical engineering." value="Electrical engineering" />
                      <Picker.Item label="Electronic and Communiction engineering " value="Electronic and Communiction engineering" />
                      <Picker.Item label="Mechincial engineering" value="Mechincial engineering" />
                      <Picker.Item label="Information and technology engineering" value="Information and technology engineering" />
                 </Picker>
              </Item>
              <Item  style={styles.formItem}>
                  <Input
                    placeholder="refer by which faculty "
                    value={faculty}
                    style={{color: '#111'}}
                    
                    onChangeText={(text) => setfaculty(text)}
                  />
                </Item>
                <Item  style={styles.formItem}>
                  <Input
                    placeholder="university"
                    value={university}
                    style={{color: '#111'}}
                    onChangeText={(text) => setuniversity(text)}
                  />
                </Item>
              <TouchableOpacity
                style={styles.btsign}
                onPress={AddDocs}
              >
              
              </TouchableOpacity>
            </View>
            
        

            </Form>
            </ScrollView>
          </Content>
        </Container>
    </>
   
  );
}

const mapStateToProps = (state) => ({
  userState: state.auth.user,
})

AddDocument.propTypes = {
  userState: propTypes.object.isRequired
}

export default connect(mapStateToProps)(AddDocument);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    justifyContent: 'flex-start',
  },
  dropdown:{
    marginBottom: 10,
    width:'90%',
    marginLeft:20,
    color:"#332",
    borderBottomWidth:1,
    borderColor:"#222"


  },

  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  btsign:{
    borderRadius:20 ,
   
    borderColor:"#3498db",
    backgroundColor:"#3498db",
    width:'80%',
    height:'15%',
    marginLeft:30,
    marginBottom:30,
    alignContent:"center",
    alignItems:"center"
  },
  txt:{
    paddingTop:5,
    color:"#FFF",
    fontSize: 20 ,
  },
  formItem: {
    marginBottom: 10,
    width:'90%',
    marginLeft:20,
    color:"#333",
  },
  formpicker: {
    marginBottom: 10,
    width:'100%',
    marginLeft:-5,
    color:"#333",
  },
  icon: {fontSize: 20, color: '#fdcb9e'},
  image: {width: null, height: 150, marginVertical: 15},
  progress: {width: null, marginBottom: 20},
});
