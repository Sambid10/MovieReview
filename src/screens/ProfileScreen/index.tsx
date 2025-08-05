import React, { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { getAuth, signOut } from '@react-native-firebase/auth';
import ReusableButton from '../../Components/Button/ReusableButton';
export default function ProfileScreen() {
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    setLoading(true);
    try {
      signOut(getAuth()).then(() => console.log('User signed out!'));
    } catch (err) {
      setLoading(false)
      console.log(err);
    } finally {
      () => setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <ReusableButton title={'Logout'} onPress={handleLogout} loading={loading}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding:12,
    flex: 1,
    backgroundColor: '#002335',
  },
});
