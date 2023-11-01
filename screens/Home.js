import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Home = ({navigation}) => {
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center",gap:14}}>
      <Text >Home</Text>
      <TouchableOpacity style={{height:120,width:120,backgroundColor:"red"}} onPress={()=>{
  navigation.navigate("other")
      }}>
        <Text style={{color:"blue"}}>
            tıkla
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home