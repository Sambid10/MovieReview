/* eslint-disable react-native/no-inline-styles */
import { getAuth } from '@react-native-firebase/auth';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
    const auth=getAuth()
    const emailusername=auth.currentUser?.email?.split("@")[0]
  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', gap: 24 }}>
        <Image
          style={{
            objectFit: 'cover',
            height: 42,
            width: 140,
            marginTop: 6,
            position: 'relative',
            zIndex: 50,
          }}
          source={require('../../assets/logo.png')}
        />
        <View style={{ display: 'flex', gap: 4 }}>
          <View style={{ display: 'flex', gap: 2, alignItems: 'center',flexDirection:"row" }}>
            <Text
              style={{
                color: 'white',
                fontSize: 21,
                fontWeight: 'bold',
                letterSpacing: 1,
              }}
            >
              Welcome Back, {""} 
            </Text>
              <Text
              style={{
                color: '#FFCA45',
                fontSize: 21,
                textTransform:"capitalize",
                fontWeight: 'bold',
                letterSpacing: 1,
              }}
            >
              {emailusername} !
            </Text>
          </View>

          <Text style={{ fontSize: 12, color: '#E5E7EB' }}>
            Review or log film you've watched..
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: '#002335',
  },
});