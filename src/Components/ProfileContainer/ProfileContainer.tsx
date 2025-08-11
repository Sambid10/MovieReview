/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import UserProfilePic from '../UserProfilePic/UserProfilePic';
import { getAuth } from '@react-native-firebase/auth';
import { useState } from 'react';
import { signOut } from '@react-native-firebase/auth';
import ReusableButton from '../Button/ReusableButton';
export default function ProfileContainer() {
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    setLoading(true);
    try {
      signOut(getAuth()).then(() => console.log('User signed out!'));
    } catch (err) {
      setLoading(false);
      console.log(err);
    } finally {
      () => setLoading(false);
    }
  };
  const auth = getAuth();
  const username = auth.currentUser?.email?.split('@')[0];
  return (
    <View style={styles.container}>
      <Image
        style={{ height: 150, width: '100%', borderRadius: 12, opacity: 0.9 }}
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
        <View style={{ position: 'absolute', top: '-50%', left: 8 }}>
          <UserProfilePic />
        </View>

        <View style={{ display: 'flex', gap: 4, marginLeft: 120 }}>
          <Text style={{ color: 'white', fontSize: 16 }}>
            {auth.currentUser?.email}
          </Text>
          <Text
            style={{
              color: '#E5E7EB',
              fontSize: 13,
              textTransform: 'capitalize',
            }}
          >
            # {username}
          </Text>
          <View style={{ marginTop: 4 }}>
            <ReusableButton
              title={'Logout'}
              height={32}
              fontSize={14}
              onPress={handleLogout}
              loading={loading}
            />
          </View>
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
