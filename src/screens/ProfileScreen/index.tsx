/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import ProfileContainer from '../../Components/ProfileContainer/ProfileContainer';
import FavouriteSection from '../../Components/FavouriteSection/FavouriteSection';
import UserReviewSection from '../../Components/UserReviewSection/UserReviewSection';
export default function ProfileScreen() {

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ gap: 24 ,paddingBottom:12}}>
      <ProfileContainer />
      <FavouriteSection />
      <UserReviewSection />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    backgroundColor: '#002335',
    display: 'flex',
    gap: 24,
  },
});
