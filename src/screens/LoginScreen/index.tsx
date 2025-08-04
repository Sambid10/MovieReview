/* eslint-disable react-native/no-inline-styles */
import { Image, StyleSheet, View } from 'react-native';
import LoginContainer from '../../Components/Login/LoginContainer';
export default function LoginScreen() {
  return (
    <View style={style.maincontainer}>
      <View style={{ position: 'absolute', top: 21, left: 16 }}>
        <Image
          style={{
            objectFit: 'cover',
            height: 43,
            width: 144,
            position: 'relative',
            zIndex: 50,
          }}
          source={require('../../assets/logo.png')}
        />
      </View>
      <Image
        style={{ objectFit: 'cover', height: '100%', width: '100%' }}
        source={require('../../assets/background.png')}
      />
      <LoginContainer />
    </View>
  );
}
const style = StyleSheet.create({
  maincontainer: {
    flex: 1,
    position: 'relative',
  },
});
