import { View, Text,ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuthorization } from '../Authcontext'
const Other = () => {
const {setmessages,messages} = useAuthorization()
console.log(messages)
async function f(){
    let a =await AsyncStorage.getItem("m")
    setmessages(JSON.parse(a))
}
useEffect(() => {
    f()

}, [])


    
  return (
   <ScrollView style={{flex:1}}>
    {

        messages?.map((c,i)=>{
   return <View key={i} style={{backgroundColor:"black",height:120,width:"100%"}}>
        <Text>{c.text}</Text>
    </View>
        })
    }
   </ScrollView>
  )
}

export default Other