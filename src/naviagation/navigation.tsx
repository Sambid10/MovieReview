import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { BottomTabs } from './BottomTabsNavigation';
import ProfileScreen from '../screens/ProfileScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown:false}}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={BottomTabs} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}