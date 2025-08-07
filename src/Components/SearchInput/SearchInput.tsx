/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, TextInput, View } from 'react-native';
import axiosInstance from '../../axios/axios';
import { Movie } from '../../types/MovieTypes';
import { useDebounce } from '../../hooks/useDebounce';
import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
export default function SearchInput() {
  const [val, setVal] = useState('');
  const debouncedVal = useDebounce(val, 2000);
  const [loading,setLoading]=useState(false)
  const [results, setResults] = useState<Movie[]>([]);

  useEffect(() => {
    const searchMovie = async () => {
      if (!debouncedVal.trim()) {
        setResults([]);
        return;
      }
      try {
        setLoading(true)
        const res = await axiosInstance.get(
          `/search/movie?query=${debouncedVal}&include_adult=false&language=en-US&page=1`,
        );
        setResults(res.data.results);
      } catch (err) {
        console.error(err);
        setLoading(false)
      }finally{
        setLoading(false)
      }
    };
    searchMovie();
  }, [debouncedVal]);

  return (
    <View>
      <TextInput
        onChangeText={text => setVal(text)}
        placeholder="Search movie..."
        placeholderTextColor={'black'}
        style={{
          color: 'black',
          borderRadius: 12,
          backgroundColor: 'white',
          height: 50,
          padding: 12,
        }}
      />
      {loading ? 
      <View style={{marginTop:24}}>
        <ActivityIndicator color={"white"}/>
        </View>
      :  <FlatList
        style={{ marginTop: 24 }}
        data={results}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.imagecontainer}>
            <FastImage
              style={styles.img}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
            />
            <Text numberOfLines={1} style={{ color: 'white' }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />}
     
    </View>
  );
}
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
  },
});
