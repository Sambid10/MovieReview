/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useCallback } from 'react';
import axiosInstance from '../../axios/axios';
import { Movie } from '../../types/MovieTypes';
import { ActivityIndicator, View, Text} from 'react-native';
import MovieFlatList from '../MovieFlatList/MovieFlatList';
import TimeoutErrorContainer from '../TimeoutErrorContainer/TimeoutErrorContainer';

export default function FavouriteSection() {
  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.get(
        `/account/22105215/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`
      );
      setDatas(res.data.results);
    } catch (err) {
      console.error(err);
      setError('Failed to load favorites. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

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
          }}>
          <ActivityIndicator color={'white'} />
        </View>
      )}

      {!loading && error && (
        <TimeoutErrorContainer error='Request timed out. Please try again.' fetchData={fetchData}/>
      )}

      {!loading && !error && <MovieFlatList moviedata={datas} />}
    </View>
  );
}
