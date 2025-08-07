import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

export default function MovieReviewTextInput({setReview,loading}:{
    setReview:(val:string)=>void
    loading:boolean
}) {

  return (
    <TextInput 
    onChangeText={(text)=>setReview(text)}
    textAlignVertical='top'
    editable={!loading}
    style={style.textinput} placeholder='Write down your review..'/>
  )
}

const style=StyleSheet.create({
    textinput:{
        minHeight:335,
        maxHeight:335,
        backgroundColor:"#39596A",
        borderRadius:20,
        opacity:0.8,
        padding:24,
        color:"white"
    }
})