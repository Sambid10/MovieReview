/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MovieApiResponse } from '../../types/MovieTypes';
import axiosInstance from '../../axios/axios';
import MovieFlatList from '../MovieFlatList/MovieFlatList';
export default function MovieCarousel({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MovieApiResponse>();
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
        <MovieFlatList moviedata={moviedata!}/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  loading: {
    height: 160,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
