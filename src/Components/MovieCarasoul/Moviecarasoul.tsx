/* eslint-disable react/no-unstable-nested-components */

/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image'
import { MovieApiResponse } from '../../types/MovieTypes';
import axios from 'axios';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDQ4Njc2MjhiMjEzYTNjNTI5MGZlZWRlZTY5N2UwOSIsIm5iZiI6MTc1MTAxMDExOC42MTY5OTk5LCJzdWIiOiI2ODVlNGI0NmYzNzU2MGMwZjc4MDU4YTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AZiFqOvnOhM20RFrzXCYx3ZRVubpiz8jepimaFHD0xY',
  },
};
export default function MovieCarousel({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MovieApiResponse>();
  const moviedata = data?.results;
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await axios.get(url, options);
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [url]);
  return (
    <View style={{ marginTop: 4, display: 'flex', gap: 8 }}>
      <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
        {title}
      </Text>
      {loading ? (
        <View style={styles.loading}>
        <ActivityIndicator color={"white"}/>
        </View>
      ) : (
        <FlatList
          data={moviedata}
          horizontal
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.imagecontainer}>
              <FastImage
              style={styles.img}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
             
              />
              <Text numberOfLines={1} style={{ color: 'white', maxWidth: 120 }}>
                {item.title}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 160,
    width: 120,
    resizeMode: 'cover',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    borderRadius: 12,
  },
  imagecontainer: {
    display: 'flex',
    gap: 12,
    marginRight: 16,
    marginBottom: 12,
  },
   loading: {
    height: 160,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
