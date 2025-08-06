import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<BottomTabParamList>;
  MovieDetails: { movieId: number };
  Login: undefined;
  Signup: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  Search: undefined;
  Wishlist: undefined;
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
