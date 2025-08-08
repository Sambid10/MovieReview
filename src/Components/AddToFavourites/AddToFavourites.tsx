/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  isFavourite: boolean;
  onToggleFavorite: (status: boolean) => void;
};

export default function AddToFavourites({ isFavourite, onToggleFavorite }: Props) {
  const AddToFavourite = () => {
    onToggleFavorite(!isFavourite);
  };

  return (
    <View style={{ display: 'flex', gap: 6 }}>
      <Text style={{ color: '#D4DADD' }}>Add to favourites</Text>
      <TouchableOpacity onPress={AddToFavourite} style={{ height: 40, width: 40 }}>
        <Image
          source={require('../../assets/Like.png')}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'contain',
            tintColor: isFavourite ? '#FFCA45' : '#fff6dfff',
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
