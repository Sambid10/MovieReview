/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  TextInput,
  View,
} from 'react-native';
import axiosInstance from '../../axios/axios';
import { Movie } from '../../types/MovieTypes';
import { useDebounce } from '../../hooks/useDebounce';
import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../naviagation/types';
export default function SearchInput() {
  const [val, setVal] = useState('');
  const debouncedVal = useDebounce(val, 1000);
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Movie[]>([]);
  useEffect(() => {
    const searchMovie = async () => {
      if (!debouncedVal.trim()) {
        setResults([]);
        return;
      }
      try {
        setLoading(true);
        setResults([]);
        const res = await axiosInstance.get(
          `/search/movie?query=${debouncedVal}&include_adult=false&language=en-US&page=1`,
        );
        setResults(res.data.results);
      } catch (err) {
        console.error(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    searchMovie();
  }, [debouncedVal]);
  return (
    <View>
      <View style={{ position: 'relative', borderRadius: 12, height: 50 }}>
        <TextInput
          value={val}
          onChangeText={setVal}
          placeholder="Search movie..."
          placeholderTextColor="white"
          style={{
            color: 'white',
            borderRadius: 12,
            paddingLeft: 12,
            paddingRight: 40,
            height: '100%',
            backgroundColor: 'rgba(255,255,255,0.3)',
          }}
        />
        {val.length > 0 && (
          <TouchableOpacity
            onPress={() => setVal('')}
            style={{
              position: 'absolute',
              right: 12,
              top: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              width: 30,
            }}
          >
            <Image
              source={require('../../assets/x.png')}
              style={{
                width: 20,
                height: 20,
                tintColor: 'white',
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      {loading ? (
        <View style={{ marginTop: 12 }}>
          <ActivityIndicator color={'white'} />
        </View>
      ) : (
        results.length > 0 && (
          <>
            <FlatList
              style={{
                marginTop: 12,
                marginBottom: 18,
                marginLeft: -12,
                marginRight: -12,
                height: '100%',
              }}
              data={results}
              ListEmptyComponent={
                <Text style={{ color: 'white', fontSize: 25 }}>
                  No Search found..
                </Text>
              }
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('MovieDetails', { movieId: item.id })
                  }
                  style={styles.imagecontainer}
                >
                  <FastImage
                    style={styles.img}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                    }}
                  />
                  <View style={{ flex: 1, display: 'flex', gap: 12 }}>
                    <Text
                      style={{
                        color: 'white',
                        lineHeight: 25,
                        fontSize: 18,
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      numberOfLines={3}
                      style={{
                        color: '#9ca3af',
                        fontSize: 12,
                        marginTop: -5,
                      }}
                    >
                      {item.overview}
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 12,
                      }}
                    >
                      <Component
                        data={item.release_date}
                        src={require('../../assets/date.png')}
                      />
                      <Component
                        data={
                          item.vote_average !== undefined
                            ? item.vote_average.toFixed(1)
                            : 'N/A'
                        }
                        src={require('../../assets/rating.png')}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </>
        )
      )}
    </View>
  );
}

const Component = ({ data, src }: { data: string | number; src: number }) => {
  if (data)
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 4,
          paddingLeft: 6,
          paddingRight: 6,
          borderRadius: 12,
          backgroundColor: '#028090',
        }}
      >
        <Image
          style={{
            height: 14,
            width: 14,
            marginRight: 5,
            resizeMode: 'contain',
          }}
          source={src}
        />
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 12 }}>
          {data}
        </Text>
      </View>
    );
};

const styles = StyleSheet.create({
  img: {
    height: 200,
    width: 140,
    resizeMode: 'cover',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    borderRadius: 12,
  },
  imagecontainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    width: '100%',
    paddingLeft: 12,
    paddingRight: 12,
  },
});
