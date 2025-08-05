/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';
export default function LoginTextInput({
  placeholder,
  onTextChange,
  securetextentry,
  icon,
}: {
  placeholder: string;
  onTextChange: (text: string) => void;
  securetextentry:boolean
  icon: number;
}) {
  return (
    <View style={styles.input}>
      <Image
        style={{
          height: 24,
          width: 26,
          position: 'absolute',
          top: '50%',
          left: 4,
          objectFit: 'contain',
          transform: [{ translateY: '-50%' }],
        }}
        source={icon}
      />
      <TextInput
        autoCapitalize='none'
        secureTextEntry={securetextentry}
        onChangeText={(text)=>onTextChange(text)}
        style={{ height: '100%', width: '100%', paddingLeft: 42 }}
        placeholder={placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: '#FFFFFF52',
    backgroundColor: 'rgba(255, 255, 255, 0.26)',
    borderRadius: 12,
    position: 'relative',
  },
});
