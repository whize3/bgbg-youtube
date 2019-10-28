import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const CardView = ({data}) => (
    <View style={styles.CardContainer}>
        <Image source={{uri: data.snippet.thumbnails.high.url}} style={{width:"100%", height: 200, borderRadius: 4}}/>
        <Text style={styles.CardTitle}>{data.snippet.title}</Text>
        <Text style={styles.CardContent}>{data.snippet.publishedAt}</Text>
    </View>
)

const styles = StyleSheet.create({
    CardContainer: {
        elevation: 5,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        margin: 20,
        elevation: 5
    },
    CardTitle: {
        width: '100%',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 3
    },
    CardContent: {
        width: '100%',
        fontSize: 12,
        padding: 3
    },
});

export default CardView;