import * as WebBrowser from 'expo-web-browser';
import { WebView } from 'react-native-webview';
import React, { useState, useEffect } from 'react';
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
  Alert,
  TouchableHighlight
} from 'react-native';

export default function HomeScreen() {

  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false); 
  const [modalVisible, setModalVisible] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const getYoutubeList = async () => {
    try {
      const baseUrl="https://www.googleapis.com/youtube/v3/playlistItems"
      const part = "snippet";
      const key = "AIzaSyBBHNjZNifo9CSPColQHtd7Q09kCDj6ut4";
      const playlistId = "PLCzi3FapEEFBdR4uPk8zxyMFllsUpAMiz";
      const maxResults = 50;
      
      const url = `${baseUrl}?part=${part}&key=${key}&playlistId=${playlistId}&maxResults=${maxResults}`
      let response = await fetch(url);
      let responseJson = await response.json();
      // console.log(responseJson.items);
      setData(responseJson);
      setLoaded(true);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getYoutubeList();
  }, []);
  
  return loaded ? (
    <View style={styles.MainContainer}>
    <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
        <WebView source={{ uri: `https://www.youtube.com/embed/${videoId}` }} style={{ marginTop: 20 }} />
        <View style={{ marginTop: 22 }}>
            <View>
              <Text>{videoId}</Text>

              <TouchableHighlight
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
         </View>
      </Modal>
      <FlatList 
        data={data.items} 
        renderItem={({item}) => 
        <TouchableOpacity style={{flex:1, flexDirection: 'row', margin: 5}} onPress={()=>{setModalVisible(true), setVideoId(item.snippet.resourceId.videoId)}}>
          {/* <View style={{flex:1, flexDirection: 'row'}}> */}
            <Image source= {{uri: item.snippet.thumbnails.medium.url}} style={styles.imageView}></Image>
            <Text style={styles.textView}>{item.snippet.title}</Text>
          {/* </View> */}
          </TouchableOpacity>
        }
        keyExtractor={(item, index)=> index.toString()}
        
        />
    </View>
  ) : (
    <AppLoading />
  )
}

HomeScreen.navigationOptions = {
  headerMode: 'none'
};


const styles = StyleSheet.create({
  MainContainer :{
    justifyContent: 'center',
    flex:1,
    margin: 5,
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
 
},
 
imageView: {
    width: '50%',
    height: 100 ,
    borderRadius : 7
},
 
textView: {
    width:'50%', 
    // textAlignVertical:'center',
    // padding:10,
    color: '#000'
  }
 
});
