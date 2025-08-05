import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {RootStackParamList } from './types';
import { BottomTabs } from './BottomTabsNavigation';
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown:false}}
      initialRouteName="Root"
    >
      <Stack.Screen name="Root" component={BottomTabs} />
    </Stack.Navigator>
  );
}