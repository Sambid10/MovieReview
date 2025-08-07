import React from 'react'
import {View } from 'react-native'
import { StyleSheet } from 'react-native'
import SearchInput from '../../Components/SearchInput/SearchInput'
export default function SearchScreen() {
  return (
    <View style={styles.container}>
        <SearchInput/>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#002335",
        padding:18
    }
})