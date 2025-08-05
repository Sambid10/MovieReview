import React from 'react'
import { Text } from 'react-native'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'
export default function WishListScreen() {
  return (
    <View style={styles.container}>
        <Text>WishListScreen</Text>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#002335"
    }
})