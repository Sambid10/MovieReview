/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
export default function ReviewContainer({
  emailusername,
  moviename,
  index,
  review,
}: {
  review: string;
  index: number;
  moviename?:string
  emailusername: string;
}) {
  return (
    <View
      key={index}
      style={{
        borderRadius: 14,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#4B5563',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 12,
        minHeight:"auto",
        backgroundColor: 'rgba(2, 128, 144, 0.3)',
      }}
    >
      <View style={{ flex: 1, padding: 12, justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={{ color: 'white', fontSize: 10, marginBottom: 4 }}>
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
        {moviename && 
           <Text
            style={{
              color: '#E5E7EB',
              fontSize: 12,
              marginBottom: 4,
            }}
          >
            - {moviename}
          </Text>
          }
        <Text 
        numberOfLines={4}
        style={styles.reviewText}>{review}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewText: {
    color: 'white',
    fontSize: 16,
    position:"relative",
    zIndex:40,
    marginBottom: 4,
  },
});
