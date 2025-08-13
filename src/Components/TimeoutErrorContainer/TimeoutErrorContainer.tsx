/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View ,Text} from 'react-native'
import { TouchableOpacity } from 'react-native'
export default function TimeoutErrorContainer({error,fetchData}:{
    error:string,
    fetchData:()=>void
}) {
  return (
       <View
          style={{
            paddingVertical: 16,
            alignItems: 'center',
          }}>
          <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
          <TouchableOpacity style={{backgroundColor:"#60a5fa",borderRadius:12,padding:10}} onPress={fetchData} >
            <Text style={{fontSize:12,color:"white"}}>
              Try Again
            </Text>
            </TouchableOpacity>
        </View>
  )
}
