import React, { useState } from 'react';
import {
  StyleSheet,

  View,
  Dimensions,
} from 'react-native';
import { getAuth } from '@react-native-firebase/auth';
import { signInWithEmailAndPassword } from '@react-native-firebase/auth';
import AuthContainer from '../AuthContainer/AuthContainer';
export default function LoginContainer() {
  const { width: screenWidth } = Dimensions.get('window');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading]=useState(false)
  const handleLogin = () => {
      setLoading(true)
    signInWithEmailAndPassword(getAuth(), email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(err => {
        if (err.code === 'auth/invalid-email') {
          console.error('Invalid');
        }
        if (err.code === 'auth/invalid-credential') {
          console.log('invalid credentials');
        }
         setLoading(false)
        console.error(err);
      }).finally(()=>setLoading(false));
  };
  return (
    <View style={[styles.wrapper, { left: screenWidth * 0.05 }]}>
      <AuthContainer navigateauthScreen='Signup' handleAuth={handleLogin} loading={loading} setEmail={setEmail} setPassword={setPassword} title={"Login"} subtitle={"Please sign in to continue"}/>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '90%',
    position: 'absolute',
    bottom: 40,
    borderRadius: 34,
    overflow: 'hidden',
    zIndex: 50,
    height: 'auto',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#FFFFFF52',
  },
});
