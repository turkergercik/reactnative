import { SafeAreaView, StyleSheet, Text, View,StatusBar,FlatList,TextInput } from 'react-native'
import React from 'react'
import Arrow from "../images/arrow.svg"
import SS from "../images/ss.svg"

const Chat = () => {
  return (
    <SafeAreaView style={styles.body}>

    <View style={
        {flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginHorizontal:10}
    }>
<Text style={{fontSize:40,marginTop:20,fontWeight:"500",backgroundColor:"blue"}}>Sohbetler</Text>
<Arrow width={50} height={50} style={{color:"blue",backgroundColor:"blue",marginTop:20 }} />
    </View>
      <TextInput cursorColor={"black"}  style={{height:50,color:"red",backgroundColor: "black",marginHorizontal:10,marginTop:10,borderRadius:15,paddingHorizontal:10,}}>
        
      </TextInput>
      <FlatList />
    </SafeAreaView>
  )
}

export default Chat

const styles = StyleSheet.create({
    body:{
flex:1,
top:StatusBar.currentHeight,
backgroundColor:"red",



    }

})