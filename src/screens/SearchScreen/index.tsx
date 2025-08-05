import React from 'react'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native'
export default function SearchScreen() {
  return (
    <View style={styles.container}>
        <Text>Search</Text>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#002335"
    }
})