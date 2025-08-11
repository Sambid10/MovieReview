/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import SearchInput from '../../Components/SearchInput/SearchInput';
import MovieFlatList from '../../Components/MovieFlatList/MovieFlatList';
import { useAppSelector } from '../../hooks/reduxHooks';
import { RootState } from '../../redux/store';
export default function SearchScreen() {
  const popularMovie = useAppSelector(
    (state: RootState) => state.movies.popular
  );
    const upcomingMovie = useAppSelector(
    (state: RootState) => state.movies.upcoming
  );
  return (
    <View style={styles.container}>
      <SearchInput />
      {/* <MovieCarousel
        title="Popular Movies"
        url="/movie/popular?language=en-US&page=1"
      /> */}
      {popularMovie && <MovieFlatList moviedata={popularMovie.results} />}

      <View
        style={{
          height: 83,
          width: '100%',
          overflow: 'hidden',
          borderRadius: 12,
          padding: 12,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.3)',
        }}
      >
        <Image
          style={{ height: 60, width: 60, objectFit: 'contain' }}
          source={require('../../assets/reel.png')}
        />
        <Text style={{ fontSize: 20, color: 'white', fontWeight: 'semibold' }}>
          Browse All Movies
        </Text>
        <Image
          style={{ height: 30, width: 30, objectFit: 'contain' }}
          source={require('../../assets/right.png')}
        />
      </View>
      {/* <MovieCarousel
        category="upcoming"
        title="Upcoming Movies"
        url="/movie/upcoming?language=en-US&page=1"
      /> */}
      {upcomingMovie &&    <MovieFlatList moviedata={upcomingMovie?.results} />}
   
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002335',
    padding: 14,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
});
