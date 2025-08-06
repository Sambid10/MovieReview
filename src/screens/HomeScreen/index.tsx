/* eslint-disable react-native/no-inline-styles */
import { getAuth } from '@react-native-firebase/auth';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Moviecarasoul from '../../Components/MovieCarasoul/Moviecarasoul';

const popularmovieurl =
  'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const upcomingmoveurl =
  'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
const topratedmovieurl =
  'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';


export default function HomeScreen() {
  const auth = getAuth();
  const emailusername = auth.currentUser?.email?.split('@')[0];
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
          <Moviecarasoul url={popularmovieurl} title="Popular movies" />
          <Moviecarasoul url={upcomingmoveurl} title="Upcoming Movies" />
          <Moviecarasoul url={topratedmovieurl} title="Top-Rated Movies" />
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
});
