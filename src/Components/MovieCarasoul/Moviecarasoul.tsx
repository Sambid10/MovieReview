/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { MovieApiResponse } from '../../types/MovieTypes';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../naviagation/types';
import axiosInstance from '../../axios/axios';
export default function MovieCarousel({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MovieApiResponse>();
  const navigation = useNavigation<NavigationProp>();
  const moviedata = data?.results;

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(url);
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);
  return (
    <View style={{ marginTop: 4, display: 'flex', gap: 8 }}>
      <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
        {title}
      </Text>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={'white'} />
        </View>
      ) : (
        <FlatList
          data={moviedata}
          horizontal
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MovieDetails",{movieId:item.id})
              }
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
      )}
    </View>
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
  loading: {
    height: 160,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
