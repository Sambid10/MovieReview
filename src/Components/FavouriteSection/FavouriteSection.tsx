/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useCallback } from 'react';
import axiosInstance from '../../axios/axios';
import { ActivityIndicator, View, Text } from 'react-native';
import MovieFlatList from '../MovieFlatList/MovieFlatList';
import TimeoutErrorContainer from '../TimeoutErrorContainer/TimeoutErrorContainer';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { RootState } from '../../redux/store';
import { setMoviesforCategory } from '../../redux/MovieSlice/movieSlice';

import axios from 'axios';
export default function FavouriteSection() {
  const [loading, setLoading] = useState(false);
  const favmovies = useAppSelector((data: RootState) => data.movies.fav);
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.get(
        `/account/22105215/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`,
      );
      dispatch(setMoviesforCategory({ category: 'fav', data: res.data }));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log('Message:', err.message);
        console.log('Code:', err.code);
        console.log('Response:', err.response?.data);
        console.log('Request:', err.request);
      }
      console.error(err);
      setError('Failed to load favorites. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [dispatch]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <View>
      <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
        Your favourites
      </Text>

      {loading && (
        <View
          style={{
            height: 32,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator color={'white'} />
        </View>
      )}

      {!loading && error && (
        <TimeoutErrorContainer
          error="Request timed out. Please try again."
          fetchData={fetchData}
        />
      )}

      {!loading && !error && favmovies && (
        <MovieFlatList moviedata={favmovies.results} />
      )}
    </View>
  );
}
