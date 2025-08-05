import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


export type AuthStackParamList={
  Login: undefined,
  Signup:undefined,
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<BottomTabParamList>;
  Login: undefined,
  Signup:undefined,
};

export type BottomTabParamList = {
  Home: undefined
  Profile:undefined
  Search:undefined
  Wishlist:undefined
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type BottomtabScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;


declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}