/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import SearchInput from '../../Components/SearchInput/SearchInput';
import MovieFlatList from '../../Components/MovieFlatList/MovieFlatList';
import { useAppSelector } from '../../hooks/reduxHooks';
import { RootState } from '../../redux/store';
export default function SearchScreen() {
  const popularMovie = useAppSelector(
    (state: RootState) => state.movies.popular,
  );
  const upcomingMovie = useAppSelector(
    (state: RootState) => state.movies.upcoming,
  );
  return (
    <View style={styles.container}>
      <SearchInput />
      {/* <MovieCarousel
        title="Popular Movies"
        url="/movie/popular?language=en-US&page=1"
      /> */}
      <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
        Popular movie
      </Text>
      {popularMovie ? (
        <MovieFlatList marginTop={-2} moviedata={popularMovie.results} />
      ) : (
        <ActivityIndicator color={'white'} />
      )}

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
      <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
        Upcoming movie
      </Text>
      {upcomingMovie ? (
        <MovieFlatList marginTop={-2} moviedata={upcomingMovie?.results} />
      ) : (
        <ActivityIndicator color={'white'} />
      )}
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
