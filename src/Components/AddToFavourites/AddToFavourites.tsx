/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { addToFavourite } from '../../axios/addtoFavourites';

export default function AddToFavourites({ movieId }: { movieId: number }) {
  const [favourite, setfavourite] = useState(false);

  const handleAddToFavourite = () => {
    setfavourite(prev => !prev);
    addToFavourite(true,movieId)
  };
  return (
    <View style={{ display: 'flex', gap: 6 }}>
      <Text style={{ color: '#D4DADD' }}>Add to favourites</Text>
      <TouchableOpacity
        onPress={handleAddToFavourite}
        style={{ height: 40, width: 40 }}
      >
        <Image
          source={require('../../assets/Like.png')}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'contain',
            tintColor: favourite ? '#FFCA45' : '#fff6dfff',
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
