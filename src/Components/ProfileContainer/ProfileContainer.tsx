/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import UserProfilePic from '../UserProfilePic/UserProfilePic';
import { getAuth } from '@react-native-firebase/auth';

export default function ProfileContainer() {
  const auth = getAuth();
  const username = auth.currentUser?.email?.split('@')[0];
  return (
    <View style={styles.container}>
      <Image
        style={{ height: 150, width: '100%', borderRadius: 12 }}
        source={require('../../assets/profileback.jpg')}
      />
      <View
        style={{
          display: 'flex',
          position: 'relative',
          flexDirection: 'row',
          gap: 12,
        }}
      >
        <View style={{ position: 'absolute',top:"-150%",left:8 }}>
          <UserProfilePic />
        </View>

        <View style={{ display: 'flex', gap: 4,marginLeft:120 }}>
          <Text style={{ color: 'white', fontSize: 14 }}>
            {auth.currentUser?.email}
          </Text>
          <Text style={{ color: 'white', fontSize: 14 }}>@{username}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 18,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
});
