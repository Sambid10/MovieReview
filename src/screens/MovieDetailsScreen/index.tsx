import React, { useEffect } from 'react';
import { StyleSheet,  View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../naviagation/types';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import axios from 'axios';
import MovieDetailsContainer from '../../Components/MovieDetailContainer';
import { options } from '../../Components/MovieCarasoul/Moviecarasoul';
import { Movie } from '../../types/MovieTypes';
type MovieDetailsProp = RouteProp<RootStackParamList, 'MovieDetails'>;
export default function MovieDetailScreen() {
  const route = useRoute<MovieDetailsProp>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Movie>();
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${route.params.movieId}?language=en-US`,
          options,
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
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={'white'} />
        </View>
      ) : (
        <View>
          {data &&  <MovieDetailsContainer data={data} />}        
        </View>
      )}
    </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
