/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Movie } from '../../types/MovieTypes';
import { Image } from 'react-native';
import { BlurView } from '@react-native-community/blur';
export default function MovieDetailsContainer({ data }: { data: Movie }) {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`,
          }}
        />
        <View style={{ position: 'absolute', left: 32, top: 80 }}>
          <Image
            style={styles.img1}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
            }}
          />
        </View>
        <View style={{ position: 'absolute', left: 160, top: 170 }}>
          <Text style={{ color: 'white' }}>{data.title}</Text>
        </View>
      </View>
      <BlurView
        blurAmount={12}
        blurType="light"
        style={{ height: 0, width: '100%', position: 'relative', zIndex: 0 }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 12
  },
  img: {
    marginTop: 12,
    height: 150,
    width: '90%',
    objectFit: 'cover',
    borderRadius: 12,
    opacity: 0.9,
    borderWidth:StyleSheet.hairlineWidth,
    borderColor:"#121212"
  },
  img1: {
    height: 200,
    width: 120,
    objectFit: 'cover',
    borderRadius: 12,
    opacity: 0.9,
  },
});
