/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import axiosInstance from '../../axios/axios';
import MovieFlatList from '../MovieFlatList/MovieFlatList';
import { setMoviesforCategory } from '../../redux/MovieSlice/movieSlice';
import { RootState } from '../../redux/store';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
export default function MovieCarousel({
  title,
  url,
  category,
}: {
  title: string;
  url: string;
  category: string;
}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const moviesData = useAppSelector(
    (state: RootState) => state.movies[category],
  );

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(url);
      dispatch(setMoviesforCategory({ category: category, data: res.data }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [category, dispatch, url]);
  useEffect(() => {
    if (!moviesData) {
      fetchMovies();
    }
  }, [fetchMovies, moviesData]);
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
        moviesData && <MovieFlatList moviedata={moviesData.results} />
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
