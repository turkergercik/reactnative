import { View, Text } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
const White = ({navigation,setauth}) => {
  return (
    <View>
      <Text onPress={async()=>{
        
        await AsyncStorage.removeItem("token")
        setauth(false)
        navigation.navigate("Login")}}>White</Text>

    </View>
  )
}

export default White