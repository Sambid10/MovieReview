/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
type IconName = 'TabHome' | 'TabProfile' | 'TabWishlist' | 'TabSearch';

const icons: Record<IconName, any> = {
  TabHome: require('../assets/Home.png'),
  TabProfile: require('../assets/Profile.png'),
  TabSearch: require('../assets/search.png'),
  TabWishlist: require('../assets/Bookmark.png'),
};

import { Image } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import WishListScreen from '../screens/WishlistScreen';
const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 70,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
          activeOpacity={1}
            key={route.key}
            onPress={onPress}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
              borderTopColor: 'gray',
              borderWidth: 0,
              backgroundColor: '#001C29',
            }}
          >
            <Image
              source={icons[route.name as IconName]}
              style={{
                width: 22,
                height: 22,
                tintColor: isFocused ? '#FFCA45' : 'white',
                marginBottom: 8,
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontWeight: 'normal',
                fontSize: 10,
                color: isFocused ? '#FFCA45' : 'white',
              }}
            >
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="TabHome"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="TabSearch"
        component={SearchScreen}
        options={{ tabBarLabel: 'Search' }}
      />
      <Tab.Screen
        name="TabWishlist"
        component={WishListScreen}
        options={{ tabBarLabel: 'Wishlist' }}
      />
      <Tab.Screen
        name="TabProfile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}
