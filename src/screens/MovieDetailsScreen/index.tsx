import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../naviagation/types';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import MovieDetailsContainer from '../../Components/MovieDetailContainer';
import { Movie } from '../../types/MovieTypes';
type MovieDetailsProp = RouteProp<RootStackParamList, 'MovieDetails'>;
import AllReviewContainer from '../../Components/AllReviewContainer/AllReviewContainer';
import UserReviewContainer from '../../Components/UserReviewContainer/UserReviewContainer';
import axiosInstance from '../../axios/axios';
export default function MovieDetailScreen() {
  const route = useRoute<MovieDetailsProp>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Movie>();
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(
          `/movie/${route.params.movieId}?language=en-US`,
        );
        setData(res.data);
      } catch (err) {
        setLoading(false);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetail();
  }, [route.params.movieId]);
  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={'white'} />
        </View>
      ) : (
        <View>
          {data && (
            <>
              <MovieDetailsContainer data={data} />
            </>
          )}
        </View>
      )}
      <UserReviewContainer movieId={route.params.movieId} />
      <AllReviewContainer movieId={route.params.movieId} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#002335',
    padding: 12,
  },
  loading: {
    display: 'flex',
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
