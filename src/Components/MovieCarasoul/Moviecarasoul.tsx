/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const Movie_Data = [
  {
    id: 1,
    title: 'Gray Hound',
    src: require('../../assets/Test.png'),
  },
   {
    id: 2,
    title: 'Inside Out',
    src: require('../../assets/test1.png'),
  },
   {
    id: 3,
    title: 'Gray Hound',
    src: require('../../assets/Test.png'),
  },
   {
    id: 4,
    title: 'Gray Hound',
    src: require('../../assets/Test.png'),
  },
];

export default function MovieCarousel({ title }: { title: string }) {
  return (
    <View style={{ marginTop: 4 ,display:"flex",gap:8}}>
      <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
        {title}
      </Text>
      <FlatList
        data={Movie_Data}
        horizontal
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.imagecontainer}>
            <Image source={item.src} style={styles.img} />
            <Text style={{ color: 'white' }}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 160,
    width: 120,
    resizeMode: 'cover', 
  },
  imagecontainer:{
    display:"flex",
    gap:12,
    marginRight:16,
    marginBottom:12
  }
});
