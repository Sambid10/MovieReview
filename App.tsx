/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { StyleSheet, View} from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import { useState, useEffect } from 'react';

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function handleAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.container}>
        <LoginScreen />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <LoginScreen />
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
