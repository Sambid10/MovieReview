/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Movie } from '../../types/MovieTypes';
export default function MovieCarousel({
  title,
  data,
}: {
  title: string;
  data: Movie[];
}) {
  return (
    <View style={{ marginTop: 4, display: 'flex', gap: 8 }}>
      <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
        {title}
      </Text>
      <FlatList
        data={data}
        horizontal
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.imagecontainer}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={styles.img}
            />
            <Text numberOfLines={1} style={{ color: 'white', maxWidth: 120 }}>
              {item.title}
            </Text>
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
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    borderRadius: 12,
  },
  imagecontainer: {
    display: 'flex',
    gap: 12,
    marginRight: 16,
    marginBottom: 12,
  },
});
