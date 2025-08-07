/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { View } from 'react-native';
import { NavigationProp, RootStackParamList } from '../../naviagation/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import MovieReviewTextInput from '../../Components/MovieReviewTextInpiut/MovieReviewTextInput';
import FastImage from 'react-native-fast-image';
import AddToFavourites from '../../Components/AddToFavourites/AddToFavourites';
import { Dimensions } from 'react-native';
import { useState } from 'react';
import { Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth';
type MovieReviewProp = RouteProp<RootStackParamList, 'MovieReview'>;
export default function MovieReviewScreen() {
  const auth = getAuth();
  const route = useRoute<MovieReviewProp>();
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<string>('');
  const addReview = async () => {
    if (!review.trim()) {
      setLoading(false);
      return null;
    }
    try {
      setLoading(true);
      await firestore()
        .collection('movie_reviews')
        .add({
          movieId: route.params.moviedetails.id,
          movieName: route.params.moviedetails.title,
          userId: auth.currentUser?.uid,
          review: review,
        })
        .then(() => {
          setLoading(false);
          navigation.navigate('MovieDetails', {
            movieId: route.params.moviedetails.id,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };
  const { width: screenWidth } = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row', padding: 6 }}>
        <View style={{ width: '48%', display: 'flex', gap: 12 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              height: 50,
              width: 50,
              backgroundColor: '#39596A',
              opacity: 0.8,
              borderRadius: 99,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              style={{ height: 20, width: 20, resizeMode: 'contain' }}
              source={require('../../assets/back.png')}
            />
          </TouchableOpacity>
          <Text style={{ flexWrap: 'wrap', color: 'white', fontSize: 24 }}>
            {route.params.moviedetails.title}
          </Text>
          <AddToFavourites movieId={route.params.moviedetails.id} />
        </View>
        <View style={{ width: '48%' }}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <FastImage
              style={styles.img1}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${route.params.moviedetails.poster_path}`,
              }}
            />
          </View>
        </View>
      </View>
      <View style={[styles.wrapper, { left: screenWidth * 0.05 }]}>
        <MovieReviewTextInput loading={loading} setReview={setReview} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <TouchableOpacity
            onPress={addReview}
            disabled={loading}
            style={styles.button}
          >
            {loading ? (
              <ActivityIndicator color={'white'} />
            ) : (
              <Text style={{ color: 'white' }}>Publish</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
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
  wrapper: {
    width: '95%',
    position: 'absolute',
    bottom: 40,
    overflow: 'hidden',
    zIndex: 50,
    height: 'auto',
  },
  img1: {
    height: 220,
    width: 150,
    resizeMode: 'cover',
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    opacity: 0.9,
  },
  button: {
    height: 40,
    width: 100,
    borderRadius: 12,
    backgroundColor: '#FFCA45',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#FFFFFF52',
    marginTop: 18,
  },
});
