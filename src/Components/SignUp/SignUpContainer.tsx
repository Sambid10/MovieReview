import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import AuthContainer from '../AuthContainer/AuthContainer';
export default function SignUpContainer() {
  const [loading, setLoading] = useState(false);
  const { width: screenWidth } = Dimensions.get('window');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    setLoading(true);
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        setLoading(false);
        console.error(error);
      })
      .finally(() => setLoading(false));
  };
  return (
    <View style={[styles.wrapper, { left: screenWidth * 0.05 }]}>
      <AuthContainer
        title={'Sign Up'}
        subtitle={'Create an account to continue'}
        navigateauthScreen="Login"
        handleAuth={handleSignup}
        loading={loading}
        setEmail={setEmail}
        setPassword={setPassword}
      />
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
    opacity: 1,
  },
  foreground: {
    backgroundColor: 'rgba(130, 81, 81, 0.4)',
    position: 'relative',
    zIndex: 10,
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 24,
    gap: 16,
    borderRadius: 34,
  },
  header: {
    marginTop: 12,
    gap: 16,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 32,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  inputGroup: {
    gap: 12,
  },
  text: {
    color: 'white',
    fontSize: 13,
  },
  linktext: {
    color: '#FFCA45',
    letterSpacing: 1,
    fontSize: 13,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
