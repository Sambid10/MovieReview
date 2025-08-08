/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BlurView } from '@react-native-community/blur';

export default function ReviewContainer({
  emailusername,
  index,
  review,
}: {
  review: string;
  index: number;
  emailusername: string;
}) {
  return (
    <View
      key={index}
      style={{
        borderRadius: 14,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#000',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 12,
        minHeight:"auto"
      }}
    >
      <BlurView blurType="light" blurAmount={80} style={StyleSheet.absoluteFill} />
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
