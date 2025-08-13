/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import ReviewContainer from '../ReviewContainer/ReviewContainer';
import axiosInstance from '../../axios/axios';
import { ApiReview } from '../../types/ReviewTypes';

export default function AllReviewContainer({ movieId }: { movieId: number }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiReview[]>([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(
          `/movie/${movieId}/reviews?language=en-US&page=1`,
        );
        console.log(res.data, 'Review');
        setData(res.data.results);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Author's Review</Text>
      {loading ? (
        <View style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator color={'white'} />
        </View>
      ) : (
        <View style={{ display: 'flex', gap: 0, marginTop: 12 }}>
          {data.length > 0 ? (
            data.map((review, index) => (
              <ReviewContainer
                key={index}
                index={index}
                emailusername={review.author}
                review={review.content}
              />
            ))
          ) : (
            <Text style={styles.placeholder}>No reviews available.</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
    marginBottom:14,
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
