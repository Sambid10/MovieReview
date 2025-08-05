/* eslint-disable react-native/no-inline-styles */
import { ImageBackground, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import SignUpContainer from '../../Components/SignUp/SignUpContainer';
export default function SignupScreen() {
  return (
    <View style={style.maincontainer}>
      <ImageBackground
        style={style.image}
        source={require('../../assets/background1.png')}
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
      <SignUpContainer />
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
