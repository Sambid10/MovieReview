/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { View } from 'react-native';
export default function ReusableButton({
  title,
  onPress,
  loading,
}: {
  title: string;
  onPress: () => void;
  loading: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={styles.button}
    >
      <View>
        {!loading ? (
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 19,
              fontWeight: 'bold',
              letterSpacing: 1,
            }}
          >
            {title}
          </Text>
        ) : (
          <ActivityIndicator color={'white'} />
        )}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFCA45',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#FFFFFF52',
  },
});
