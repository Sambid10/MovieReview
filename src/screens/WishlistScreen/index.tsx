/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axiosInstance from '../../axios/axios';
import { Movie } from '../../types/MovieTypes';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../naviagation/types';
import TimeoutErrorContainer from '../../Components/TimeoutErrorContainer/TimeoutErrorContainer';

export default function WishListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [datas, setDatas] = useState<Movie[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.get(
        `/account/22105215/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`,
      );
      setDatas(res.data.results);
    } catch (err) {
      setError('Request timed out. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 21,
          color: 'white',
          fontWeight: 'bold',
          marginBottom: 16,
        }}
      >
        Your Favourites
      </Text>

      {loading && <ActivityIndicator color={'white'} />}

      {!loading && error && (
        <TimeoutErrorContainer error={error} fetchData={fetchData} />
      )}

      {!loading && !error && (
        <FlatList
          data={datas}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ display: 'flex', justifyContent: 'flex-start' }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MovieDetails', { movieId: item.id })
              }
              style={{
                width: '45%',
                margin: 8,
              }}
            >
              <FastImage
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: 12,
                  borderColor: '#4B5563',
                  borderWidth: StyleSheet.hairlineWidth,
                }}
                resizeMode="cover"
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
              />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No Favourites..</Text>
          }
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: '#002335',
  },
  emptyText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
