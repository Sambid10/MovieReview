/* eslint-disable react-native/no-inline-styles */
import { getAuth } from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { BlurView } from '@react-native-community/blur';

type Review = {
  movieId: number;
  moviename: string;
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
        <ActivityIndicator color={'white'} />
      ) : (
        <View style={{ display: 'flex', gap: 0, marginTop: 12 }}>
          {review.length > 0 ? (
            review.map((rev, index) => (
              <View
                key={index}
                style={{
                  height: 70,
                  borderRadius: 12,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: '#000',
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: 12,
                }}
              >
                <BlurView
                  blurType="light"
                  blurAmount={15}
                  style={StyleSheet.absoluteFill}
                />
                <View
                  style={{
                    flex: 1,
                    padding: 12,
                    justifyContent: 'center',
                  }}
                >
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text
                      style={{ color: 'white', fontSize: 10, marginBottom: 4 }}
                    >
                      Review by{' '}
                    </Text>
                    <Text
                      style={{
                        color: '#FFCA45',
                        fontSize: 10,
                        marginBottom: 4,
                      }}
                    >
                      {emailusername}
                    </Text>
                  </View>
                  <Text style={styles.reviewText}>{rev.review}</Text>
                </View>
              </View>
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
    color: 'gray',
    fontSize: 14,
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
