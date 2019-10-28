import { WebView } from 'react-native-webview';
import React, { useState, useEffect } from 'react';
import HomeScreen from './HomeScreen'
import CardView from './CardView';
import Header from './Header';
import { AppLoading } from "expo";

import {
  FlatList,
  Image,
  Platform,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native';

export default function CardViewScreen() {

  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false); 
  const [modalVisible, setModalVisible] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const getYoutubeList = async () => {
    try {
      const baseUrl="https://www.googleapis.com/youtube/v3/playlistItems"
      const part = "snippet";
      const key = "AIzaSyBBHNjZNifo9CSPColQHtd7Q09kCDj6ut4";
      const playlistId = "PLCzi3FapEEFD-sv6mo1f406K8E0d4TuTG";
      const maxResults = 50;
      
      const url = `${baseUrl}?part=${part}&key=${key}&playlistId=${playlistId}&maxResults=${maxResults}`
      let response = await fetch(url);
      let responseJson = await response.json();
      setData(responseJson.items);
      setLoaded(true);
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getYoutubeList();
  }, []);
  
  return loaded ? (
    <View style={styles.container}>
      <Header style={styles.header}/>
          <ScrollView style={styles.cardContainer}>
          {data.map((data, index) => (
            <TouchableOpacity key={index } onPress={()=>{setModalVisible(true), setVideoId(data.snippet.resourceId.videoId)}}>
            <CardView
              data={data}
              key={index}
            />
            </TouchableOpacity>
          ))}
          </ScrollView>
    <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
        { <WebView source={{ uri: `https://www.youtube.com/embed/${videoId}` }} /*style={{ marginTop: 20 }}*/ /> }
      </Modal>
      
    </View>
  ) : (
    <AppLoading />
  )
}

CardViewScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%'
  },
  MainContainer :{
    justifyContent: 'center',
    flex:1,
    margin: 5,
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
 
},
 
imageView: {
    height: '70%',
    width: '100%',
    // flex:1 , 
    // width: '50%',
    borderRadius : 7
},
 
textView: {
    flex:1 ,
    // width:'50%', 
    // textAlignVertical:'center',
    // padding:10,
    color: '#000'
  }
 
});
