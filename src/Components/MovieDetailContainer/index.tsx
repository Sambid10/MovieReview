/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Movie } from '../../types/MovieTypes';
import { BlurView } from '@react-native-community/blur';
import FastImage from 'react-native-fast-image';
import { MinHrConverter } from '../../helpers/MinHrConnverter';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../naviagation/types';

export default function MovieDetailsContainer({ data }: { data: Movie }) {
  const runtime = MinHrConverter(data.runtime);
  const navigation=useNavigation<NavigationProp>()
  return (
    <>
      <View style={styles.container}>
      <BlurView
        style={styles.blurOverlay}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="black"
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          paddingTop: 12,
        }}
      >
        <FastImage
          style={styles.img}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`,
          }}
        />
      </View>
      <View style={styles.posterContainer}>
        <FastImage
          style={styles.img1}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
          }}
        />
      </View>
      <View style={styles.titleContainer}>
        <View style={{ width: '45%' }} />
        <View style={{ width: '55%', display: 'flex', gap: 4 }}>
          <Text
            numberOfLines={2}
            style={{ color: 'white', fontSize: 21, fontWeight: 'bold' }}
          >
            {data.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Image
              style={{ height: 14, width: 14, objectFit: 'contain' }}
              source={require('../../assets/director.png')}
            />
            <Text
              numberOfLines={2}
              style={{ color: 'white', fontSize: 14, fontWeight: 'semibold' }}
            >
              Directed By
            </Text>
          </View>
          <Text
            numberOfLines={2}
            style={{ color: 'white', fontSize: 10, fontWeight: 'semibold' }}
          >
            {data.overview}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingLeft: 30,
          paddingRight: 30,
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Component
          data={data.release_date}
          src={require('../../assets/date.png')}
        />
        <Component data={runtime} src={require('../../assets/tome.png')} />
        <Component data={'Not watched'} src={require('../../assets/eye.png')} />
      </View>
    </View>
    <TouchableOpacity
    onPress={()=>navigation.navigate("MovieReview",{moviedetails:data})}
    style={styles.button}>
      <Text style={{color:"white",fontWeight:"bold",letterSpacing:0.5,fontSize:16}}>Add your review</Text>
    </TouchableOpacity>
    </>
  
  );
}

const Component = ({ data, src }: { data: string; src: number }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Image
        style={{ height: 14, width: 14, marginRight: 5, resizeMode: 'contain' }}
        source={src}
      />
      <Text style={{ textAlign: 'center', color: 'white', fontSize: 12 }}>
        {data}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    button: {
    height: 40,
    borderRadius:12,
    backgroundColor: '#FFCA45',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#FFFFFF52',
    marginTop:18,
  },
  container: {
    height: 320,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
  },
  img: {
    height: 150,
    width: '90%',
    resizeMode: 'cover',
    position: 'relative',
    borderRadius: 12,
    zIndex: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    opacity: 0.9,
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  posterContainer: {
    position: 'absolute',
    left: 32,
    top: 80,
    zIndex: 40,
  },
  titleContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 4,
    height: 130,
  },
  img1: {
    height: 200,
    width: 120,
    resizeMode: 'cover',
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    opacity: 0.9,
  },
  additionalcontainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
});
