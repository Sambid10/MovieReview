/* eslint-disable react-native/no-inline-styles */
import { getAuth } from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import ReviewContainer from '../ReviewContainer/ReviewContainer';

export type Review = {
  movieId: number;
  movieName: string;
  review: string;
  userId: string;
};

export default function UserReviewContainer({ movieId }: { movieId: number }) {
  const auth = getAuth();
  const [review, setReview] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const emailusername = auth.currentUser?.email?.split('@')[0];
  useEffect(() => {
    const getUserReview = async () => {
      if (!auth.currentUser) return;
      try {
        setLoading(true);
        const querySnapshot = await firestore()
          .collection('movie_reviews')
          .where('userId', '==', auth.currentUser.uid)
          .where('movieId', '==', movieId)
          .get();

        if (!querySnapshot.empty) {
          const docs = querySnapshot.docs.map(doc => doc.data() as Review);
          setReview(docs);
          setLoading(false);
        } else {
          setReview([]);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to fetch review:', err);
        setReview([]);
      }
    };

    getUserReview();
  }, [auth.currentUser, movieId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Review</Text>
      {loading ? (
        <View style={{height:32,display:"flex",justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator color={'white'} />
        </View>
      ) : (
        <View style={{ display: 'flex', gap: 0, marginTop: 12 }}>
          {review.length > 0 ? (
            review.map((rev, index) => (
              <ReviewContainer
                emailusername={emailusername!}
                index={index}
                review={rev.review}
                key={index}
              />
            ))
          ) : (
            <Text style={styles.placeholder}>
              You haven't written a review yet.
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
  },
  title: {
    color: 'white',
    fontSize: 25,
    marginLeft: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  reviewText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 4,
  },
  placeholder: {
    color: '#9ca3af',
    fontSize: 12,
    marginLeft: 12,
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
});
