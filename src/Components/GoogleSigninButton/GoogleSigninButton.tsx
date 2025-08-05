/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function GoogleSigninButton() {
  return (
    <TouchableOpacity style={styles.button}>
        <Text style={{color:"black"}}>Sigin in with Google</Text>
    </TouchableOpacity>
  )
}

const styles=StyleSheet.create({
    button:{
        height:32,
        width:"100%",
        backgroundColor:"white"
    }
})