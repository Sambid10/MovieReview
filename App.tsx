import {
  getAuth,
  onAuthStateChanged,
  FirebaseAuthTypes,
} from '@react-native-firebase/auth';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/naviagation/types';
import { BottomTabs } from './src/naviagation/BottomTabsNavigation';
import SignupScreen from './src/screens/SignUpScreen';
import MovieDetailScreen from './src/screens/MovieDetailsScreen';
import MovieReviewScreen from './src/screens/MovieReviewScreen';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
const Stack = createNativeStackNavigator<RootStackParamList>();
function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), user => {
      console.log('Auth state changed:', user);
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, [initializing]);

  if (initializing) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!user ? (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Root" component={BottomTabs} />
                <Stack.Screen
                  name="MovieDetails"
                  component={MovieDetailScreen}
                />
                <Stack.Screen
                  name="MovieReview"
                  component={MovieReviewScreen}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002335',
  },
});

export default App;
