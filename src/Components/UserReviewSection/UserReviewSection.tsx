/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth';
import ReviewContainer from '../ReviewContainer/ReviewContainer';
import { Review } from '../UserReviewContainer/UserReviewContainer';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../naviagation/types';
export default function UserReviewSection() {
  const [datas, setDatas] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const emailusername = auth.currentUser?.email?.split('@')[0];
  const navigation=useNavigation<NavigationProp>()
  const fetchReview = useCallback(async () => {
    try {
      setLoading(true);
      const querySnapshot = await firestore()
        .collection('movie_reviews')
        .where('userId', '==', auth.currentUser?.uid)
        .limit(5)
        .get();

      if (!querySnapshot.empty) {
        const docs = querySnapshot.docs.map(doc => doc.data() as Review);
        setDatas(docs);
      } else {
        setDatas([]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [auth.currentUser?.uid]);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  return (
    <View>
      <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold',marginBottom:12 }}>
        Recent Reviews
      </Text>

      {loading ? (
        <View  style={{height:32,display:"flex",justifyContent:"center",alignItems:"center"}}>
          <ActivityIndicator color={"white"}/>
          </View>
      ) : (
        datas.map((data, i) => (
          <TouchableOpacity
          onPress={()=>navigation.navigate("MovieDetails",{movieId:data.movieId})}
          key={i} >
            <ReviewContainer
              moviename={data.movieName}
              emailusername={emailusername!}
              index={data.movieId}
              review={data.review}
            />
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}
