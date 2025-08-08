/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import axiosInstance from '../../axios/axios';
import { Movie } from '../../types/MovieTypes';
import FastImage from 'react-native-fast-image';
import { getAuth } from '@react-native-firebase/auth';

export default function WishListScreen() {
  const [datas, setDatas] = useState<Movie[]>([]);
  const auth = getAuth();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axiosInstance.get(
          `/account/22105215/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`,
        );
        setDatas(res.data.results);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };
    fetchdata();
  }, [auth.currentUser?.uid]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 21, color: 'white', fontWeight: 'bold' }}>
        Your Favourites
      </Text>
      <FlatList
        data={datas}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <FastImage
            style={styles.image}
            resizeMode="cover"
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No Favourites..</Text>
        }
        contentContainerStyle={
          datas.length === 0 && { flex: 1, justifyContent: 'center' }
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: '#002335',
    display: 'flex',
    gap: 24,
  },
  image: {
    width: 140,
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  emptyText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
