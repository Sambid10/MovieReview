/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Movie } from '../../types/MovieTypes';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../naviagation/types';

export default function MovieFlatList({
  moviedata,
}: {
  moviedata: Movie[]; // <-- Now it's an array of Movie
}) {
  const navigation = useNavigation<NavigationProp>();

  return (
    <FlatList
      data={moviedata}
      style={{ marginTop: 12 }}
      horizontal
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
          style={styles.imagecontainer}
        >
          <FastImage
            style={styles.img}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
          />
          <Text numberOfLines={1} style={{ color: 'white', maxWidth: 120 }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  img: {
    height: 160,
    width: 120,
    resizeMode: 'cover',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#4B5563',
    borderRadius: 12,
  },
  imagecontainer: {
    display: 'flex',
    gap: 12,
    marginRight: 16,
    marginBottom: 12,
  },
});
