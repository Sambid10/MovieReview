/* eslint-disable react-native/no-inline-styles */
import { getAuth } from '@react-native-firebase/auth'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function UserProfilePic() {
    const auth=getAuth()
    const firstLetter=auth.currentUser?.email?.slice(0,1)
  return (
    <View style={styles.profile}> 
        <Text style={{textTransform:"capitalize",fontSize:32}}>{firstLetter}</Text>
    </View>
  )
}
const styles=StyleSheet.create({
    profile:{
        height:100,
        width:100,
        display:"flex",
        borderRadius:99,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"rgba(255,255,255)"
    }
})
