/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
type authScreen = 'Login' | 'Signup';

interface Props {
  title: string;
  subtitle: string;
  setEmail: (val: string) => void;
  setPassword: (val: string) => void;
  loading: boolean;
  handleAuth: () => void;
  navigateauthScreen: authScreen;
}
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../naviagation/types';
import ReusableButton from '../Button/ReusableButton';
import { TouchableOpacity } from 'react-native';
import AuthTextInput from '../AuthTextInput/AuthTextInput';
import { useNavigation } from '@react-navigation/native';
type NavigatetoAuthScreenProp = NativeStackNavigationProp<RootStackParamList>;
export default function AuthContainer({
  subtitle,
  title,
  setEmail,
  setPassword,
  loading,
  handleAuth,
  navigateauthScreen,
}: Props) {
  const navigation = useNavigation<NavigatetoAuthScreenProp>();
  const btntitle=navigateauthScreen === "Login" ? "Sign Up" : "Login"
  const footertext=navigateauthScreen === "Login" ? "Already have an account?" :"Don't have an account? Please"
  const secondaryfootertext=navigateauthScreen === "Login" ? "here" : "first"
  return (
      <View style={styles.foreground}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={styles.inputGroup}>
          <AuthTextInput
            securetextentry={false}
            onTextChange={setEmail}
            icon={require('../../assets/user.png')}
            placeholder={'Email'}
          />
          <AuthTextInput
            securetextentry={true}
            onTextChange={setPassword}
            placeholder={'Password'}
            icon={require('../../assets/pass.png')}
          />
        </View>
        {navigateauthScreen === 'Signup' && (
          <Text style={[styles.linktext, { textAlign: 'right' }]}>
            Forgot Password?
          </Text>
        )}

        <ReusableButton height={42} loading={loading} title={btntitle} onPress={handleAuth} />
        <View style={styles.footer}>
          <Text style={styles.text}>{footertext}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(navigateauthScreen)}
          >
            <Text style={styles.linktext}> {navigateauthScreen} </Text>
          </TouchableOpacity>
          <Text style={styles.text}>{secondaryfootertext}</Text>
        </View>
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
    backgroundColor: 'rgba(44, 43, 43, 0.8)',
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
