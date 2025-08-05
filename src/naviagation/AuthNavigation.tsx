import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignUpScreen";
import { AuthStackParamList } from "./types";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator<AuthStackParamList>();
export default function AuthNaviagtion() {
  return (
    <Stack.Navigator
         screenOptions={{ headerShown: false }}
         initialRouteName="Login"
       >
         <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="Signup" component={SignupScreen} />
       </Stack.Navigator>
  )
}