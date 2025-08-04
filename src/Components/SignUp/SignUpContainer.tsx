/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LoginTextInput from '../Login/LoginTextInput';
import { BlurView } from '@react-native-community/blur';
import ReusableButton from '../Button/ReusableButton';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { AuthStackParamList } from '../../naviagation/types';
type NavigatetoSignInScreen = NativeStackNavigationProp<
  AuthStackParamList,
  'Login'
>;

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
export default function SignUpContainer() {
  const { width: screenWidth } = Dimensions.get('window');
  const navigation = useNavigation<NavigatetoSignInScreen>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
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

        console.error(error);
      });
  };
  return (
    <View style={[styles.wrapper, { left: screenWidth * 0.05 }]}>
      <BlurView
        blurType="light"
        blurAmount={12}
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          zIndex: 0,
        }}
      >
        <View style={styles.foreground}>
          <View style={styles.header}>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>Create an account to continue</Text>
          </View>

          <View style={styles.inputGroup}>
            <LoginTextInput
              securetextentry={false}
              onTextChange={setEmail}
              icon={require('../../assets/user.png')}
              placeholder={'Email'}
            />
            <LoginTextInput
              securetextentry={true}
              onTextChange={setPassword}
              placeholder={'Password'}
              icon={require('../../assets/pass.png')}
            />
          </View>

          <ReusableButton title="Sign Up" onPress={handleLogin} />
          <View style={styles.footer}>
            <Text style={styles.text}>Already have an account? Go to</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linktext}> Login </Text>
            </TouchableOpacity>
            <Text style={styles.text}>page.</Text>
          </View>
        </View>
      </BlurView>
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
