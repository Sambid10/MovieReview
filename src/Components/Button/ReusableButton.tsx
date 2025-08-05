/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function ReusableButton({title,onPress}:{title:string,onPress:()=>void}) {
  return (
    <TouchableOpacity
    onPress={onPress}
    style={styles.button}>
        <Text style={{color:"white",textAlign:"center",fontSize:19,fontWeight:"bold",letterSpacing:1}}>
            {title}
        </Text>
    </TouchableOpacity>
  )
}
const styles=StyleSheet.create({
    button:{
        height:44,
        borderRadius:12,
        backgroundColor:"#FFCA45",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:"#FFFFFF52"
    }
})