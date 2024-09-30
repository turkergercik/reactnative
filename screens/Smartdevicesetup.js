import { View, Text,StatusBar } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import { useAuthorization } from '../Authcontext'
import { FAB } from 'react-native-paper'
const Smartdevicesetup = ({navigation}) => {
  const {state} =useAuthorization()
  console.log(state.userId)
  return (
    <View style={{flex:1,backgroundColor:"black",paddingTop:StatusBar.currentHeight}}>
      <View style={{height:75,justifyContent:"space-between",flexDirection:"row",alignItems:"center",marginHorizontal:5}}>
      <FAB customSize={60} icon={"arrow-left"} color='white' style={{borderRadius:30,backgroundColor:"#6538c6"}} onPress={()=>{
         navigation.goBack()
      }} >

      </FAB>
      <Text style={{color:"white",textAlign:"center",fontSize:20}}>Smartdevice Setup</Text>
      </View>
      <WebView
      source={{uri:`http://192.168.4.1/?userid=${state.userId}`}}
      >

      </WebView>
    </View>
  )
}

export default Smartdevicesetup