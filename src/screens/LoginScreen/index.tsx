/* eslint-disable react-native/no-inline-styles */
import { Image, StyleSheet, View } from 'react-native';
import LoginContainer from '../../Components/Login/LoginContainer';
import { ImageBackground } from 'react-native';
export default function LoginScreen() {
  return (
    <View style={style.maincontainer}>
      <ImageBackground
        style={style.image}
        source={require('../../assets/background.png')}
        resizeMode="cover"
      >
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
      </ImageBackground>
      <LoginContainer />
    </View>
  );
}
const style = StyleSheet.create({
  maincontainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#002335',
  },
   image: {
    flex: 1,
  },
});
