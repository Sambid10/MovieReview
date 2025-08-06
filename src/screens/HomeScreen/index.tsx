/* eslint-disable react-native/no-inline-styles */
import { getAuth } from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Moviecarasoul from '../../Components/MovieCarasoul/Moviecarasoul';
import { MovieApiResponse } from '../../types/MovieTypes';

const popularmovieurl =
  'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const upcomingmoveurl =
  'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
const topratedmovieurl =
  'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDQ4Njc2MjhiMjEzYTNjNTI5MGZlZWRlZTY5N2UwOSIsIm5iZiI6MTc1MTAxMDExOC42MTY5OTk5LCJzdWIiOiI2ODVlNGI0NmYzNzU2MGMwZjc4MDU4YTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AZiFqOvnOhM20RFrzXCYx3ZRVubpiz8jepimaFHD0xY',
  },
};
export type MovieData = [];
export default function HomeScreen() {
  const auth = getAuth();
  const [popularMoviesData, setPopularMoviesData] =
    useState<MovieApiResponse>();
  const [upcomingMoviesData, setUpcomingMoviesData] =
    useState<MovieApiResponse>();
  const [topratedMoviesData, setTopratedMoviesData] =
    useState<MovieApiResponse>();
  const [loading, setLoading] = useState(false);
  const emailusername = auth.currentUser?.email?.split('@')[0];
  useEffect(() => {
    setLoading(true);
    const fetchallMovies = async () => {
      try {
        setLoading(true);
        const [upcomingRes, popularRes, topratedRes] = await Promise.all([
          fetch(upcomingmoveurl, options),
          fetch(popularmovieurl, options),
          fetch(topratedmovieurl, options),
        ]);
        const [upcomingData, popularData, topratedData] = await Promise.all([
          upcomingRes.json(),
          popularRes.json(),
          topratedRes.json(),
        ]);

        setUpcomingMoviesData(upcomingData);
        setPopularMoviesData(popularData);
        setTopratedMoviesData(topratedData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchallMovies();
    // const fetchMovies = async () => {
    //   try {
    //     setLoading(true);
    //     const res = await fetch(popularmovieurl, options);
    //     const popularData = await res.json().then();
    //     setPopularMoviesData(popularData);
    //   } catch (err) {
    //     console.error(err);
    //   } finally {
    //     setLoading(false);
    //   }
    //   try {
    //     setLoading1(true);
    //     const res = await fetch(upcomingmoveurl, options);
    //     const upcomingData = await res.json();
    //     setUpcomingMoviesData(upcomingData);
    //   } catch (err) {
    //     console.error(err);
    //   } finally {
    //     setLoading1(false);
    //   }
    //   try {
    //     setLoading2(true);
    //     const res = await fetch(topratedmovieurl, options);
    //     const topRatedData = await res.json();
    //     setTopratedMoviesData(topRatedData);
    //   } catch (err) {
    //     console.error(err);
    //   } finally {
    //     setLoading2(false);
    //   }
    // };
    // fetchMovies();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <Image
          style={{
            objectFit: 'cover',
            height: 42,
            width: 140,
            marginTop: 6,
            position: 'relative',
            zIndex: 50,
          }}
          source={require('../../assets/logo.png')}
        />
        <View style={{ display: 'flex', gap: 4 }}>
          <View
            style={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 21,
                fontWeight: 'bold',
                letterSpacing: 1,
              }}
            >
              Welcome Back, {''}
            </Text>
            <Text
              style={{
                color: '#FFCA45',
                fontSize: 21,
                fontWeight: 'bold',
                letterSpacing: 1,
                textTransform: 'capitalize',
              }}
            >
              {emailusername} !
            </Text>
          </View>

          <Text style={{ fontSize: 12, color: '#E5E7EB' }}>
            Review or log film you've watched..
          </Text>
        </View>
        <View style={{ display: 'flex', gap: 20 }}>
          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator color={'white'} />
            </View>
          ) : (
            <Moviecarasoul
              title="Popular movies"
              data={popularMoviesData?.results!}
            />
          )}

          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator style={{ height: 160 }} color={'white'} />
            </View>
          ) : (
            <Moviecarasoul
              title="Upcoming Movies"
              data={upcomingMoviesData?.results!}
            />
          )}

          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator color={'white'} />
            </View>
          ) : (
            <Moviecarasoul
              title="Top-Rated Movies"
              data={topratedMoviesData?.results!}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    paddingBottom: 24,
    backgroundColor: '#002335',
  },
  loading: {
    height: 160,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
