import { View, Alert,Linking,Text,StyleSheet,Button,Dimensions,Image,Keyboard, TextInput, SafeAreaView, ScrollView, KeyboardAvoidingView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid} from 'react-native';
import { useAuthorization } from '../Authcontext';
import { useDispatch, useSelector } from "react-redux";
import { signIn, setmpeop, setpeop,signOut  } from "../redux/counter";
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidColor, AndroidImportance,AndroidStyle, AndroidVisibility,EventType } from '@notifee/react-native';
import RNCallKeep from 'react-native-callkeep';

let darktext="#F0EFE9"
let bgfordarkmode="dark:bg-[#1a1a1a]"
let whitefordark="dark:text-[#F0EFE9]"
let svgcolor="text-[#097EFE]"
let bg="#097EFE"
let specialwhitebg="bg-[#F0EFE9]"
let specialwhitetext="text-[#F0EFE9]"
let bordercolor="border-[#097EFE]"
let textcolorblue="text-[#097EFE]"
let svgsearch="text-[#60ACFF]"
let bginput="bg-[#F0EFE9]"
let divisionlinedark="dark:divide-[#F0EFE9]"
let darkborderinput="dark:border-[#F0EFE9]"
let focusvgsearch="focus:border-[#097EFE]"
let divisioncolor="divide-[#90C5FF]"
let divisioncolorforfirstline="border-[#90C5FF]"
let maincolor="bg-white"
let x=""

let token1
export default function Pincode({route,navigation}) {
  const{mpeop,setmpeop,auth,setauth,peop,setpeop,messages,setmessages,userid,server,t,authContext}=useAuthorization()
  //const { userToken,userId,server,mpeop,peop } = useSelector((state) => state.counter);
  //const dispatch=useDispatch()
  let prt=server 

  //let prt="http://192.168.1.104:3001"
   const reset=async(e)=>{
    if(code.current.length===6){
      console.log(prt)
      Keyboard.dismiss()
      let email= await AsyncStorage.getItem("email")
      await axios.post(`${prt}/changepassword`,{
          email:email,
          password:code.current,
      }).then(async(response) => {
        console.log(response.data)
        if(response.data.data==="success"){
          navigation.navigate("Newpassword")
         // Alert.alert("Emailinize gelen kodu kullanarak ")
          
        }
        else if(response.data.data==="wrongcode"){
          Alert.alert("Hatalı Kod")
         
        }else {      
    
      }
          
        }).catch((q)=>{
          console.log(q)
        })

    }else{
      Alert.alert("Eksik kod")
    }
 
  
/*   setemail(null)
  setemailc(null)
  setpasswordc(null)
  setpassword(null) */

   }

  useEffect(() => {
    console.log(x)
    setTimeout(() => {
        if(x){
            navigation.navigate("Home")

        }
    }, 2000);
  }, [x])
  const one = useRef(null)
   const two = useRef(null)
   const three = useRef(null)
   const four = useRef(null)
   const five = useRef(null)
   const six = useRef(null)
   const arr = [one,two,three,four,five,six]
   const code=useRef("")
   const [emailc, setemailc] = useState(true)
    const validate = (text,id) => {
        console.log()
      if(text){
       arr[id].current.setNativeProps({style:{borderColor:"green"}})
       if(code.current.length===0){
        code.current=code.current+text
      }else{
        code.current=code.current.slice(0, id)+text+code.current.slice(id)

      }
        
       arr[id+1]?.current.focus()
      }else{
        arr[id].current.setNativeProps({style:{borderColor:"red"}})
        if(code.current.length===1){
          code.current=code.current.slice(id, id)
        }else{
          code.current=code.current.slice(0, id)+code.current.slice(id+1)

        }
        arr[id-1]?.current.focus()
      }
      console.log(code.current)
      }
    
   
  /*  const [emailc, setemailc] = useState(null)
   const [password, setpassword] = useState(null)
   const [passwordc, setpasswordc] = useState(null)
   const [token, settoken] = useState(null) */
  return (
            <SafeAreaView  style={[style.body]}> 
    
      <KeyboardAvoidingView  style={style.bodysmall}>
   
        <Text  style={{alignSelf:"flex-start",marginLeft:5,marginBottom:5,color:darktext}}>Şifre</Text>
        <View style={{flex:1,flexDirection:"row"}}>
        <TextInput maxLength={1} textAlign="center" keyboardType="number-pad" cursorColor={"blue"} selectionColor={"gold"} autoCapitalize='none' onBlur={()=>
        {
            //setemailc(null)
    }}   style={{
      color:"red",
      paddingHorizontal:15,
       fontSize:30,
        backgroundColor:"white",
        borderWidth:3,
        borderColor:"black",
        borderRadius:15,
        paddingVertical:2,
        marginRight:1
    
    }} ref={one} onFocus={()=>{
      
 }} onChangeText={(e)=>{
validate(e,0)

 }}/>
 <TextInput maxLength={1} textAlign="center" keyboardType="number-pad" cursorColor={"blue"} selectionColor={"gold"} autoCapitalize='none' onBlur={()=>
        {
            //setemailc(null)
    }}   style={{
      color:"red",
      paddingHorizontal:15,
       fontSize:30,
        backgroundColor:"white",
        borderWidth:3,
        borderColor:"black",
        borderRadius:15,
        paddingVertical:2,
        marginRight:1
    }} ref={two} onFocus={()=>{
      
 }} onChangeText={(e)=>{
validate(e,1)

 }}/>
 <TextInput maxLength={1} textAlign="center" keyboardType="number-pad" cursorColor={"blue"} selectionColor={"gold"} autoCapitalize='none' onBlur={()=>
        {
            //setemailc(null)
    }}   style={{
      color:"red",
      paddingHorizontal:15,
       fontSize:30,
        backgroundColor:"white",
        borderWidth:3,
        borderColor:"black",
        borderRadius:15,
        paddingVertical:2,
        marginRight:1
    }} ref={three} onFocus={()=>{
      
 }} onChangeText={(e)=>{
validate(e,2)

 }}/>
 <TextInput maxLength={1} textAlign="center" keyboardType="number-pad" cursorColor={"blue"} selectionColor={"gold"} autoCapitalize='none' onBlur={()=>
        {
            //setemailc(null)
    }}   style={{
      color:"red",
      paddingHorizontal:15,
       fontSize:30,
        backgroundColor:"white",
        borderWidth:3,
        borderColor:"black",
        borderRadius:15,
        paddingVertical:2,
        marginRight:1
    }} ref={four} onFocus={()=>{
      
 }} onChangeText={(e)=>{
validate(e,3)

 }}/>
 <TextInput maxLength={1} textAlign="center" keyboardType="number-pad" cursorColor={"blue"} selectionColor={"gold"} autoCapitalize='none' onBlur={()=>
        {
            //setemailc(null)
    }}   style={{
      color:"red",
      paddingHorizontal:15,
       fontSize:30,
        backgroundColor:"white",
        borderWidth:3,
        borderColor:"black",
        borderRadius:15,
        paddingVertical:2,
    marginRight:1
    }} ref={five} onFocus={()=>{
      
 }} onChangeText={(e)=>{
validate(e,4)

 }}/>
 <TextInput maxLength={1} textAlign="center" keyboardType="number-pad" cursorColor={"blue"} selectionColor={"gold"} autoCapitalize='none' onBlur={()=>
        {
            //setemailc(null)
    }}   style={{
      color:"red",
      paddingHorizontal:15,
       fontSize:30,
        backgroundColor:"white",
        borderWidth:3,
        borderColor:"black",
        borderRadius:15,
        paddingVertical:2,
    
    }} ref={six} onFocus={()=>{
      
 }} onChangeText={(e)=>{
validate(e,5)

 }}/>
        
        </View>
        

      <TouchableOpacity onPress={()=>reset()} disabled={emailc ? false:true} style={{height:40,backgroundColor:"blue",borderRadius:15,paddingHorizontal:15,justifyContent:"center",marginBottom:10,marginTop:10,paddingBottom:1,alignSelf:"stretch", }}>
       <Text style={{color:darktext,textAlign:"center"}} >Onayla</Text>
      </TouchableOpacity>
{/* <Button title='sdds'onPress={()=>{navigation.navigate("Home")}} >

</Button> */}


    </KeyboardAvoidingView>
   

    </SafeAreaView>
  )



}


const style= StyleSheet.create({
    body:{
    position:"absolute",
    top:Dimensions.get("window").height/4,
  bottom:0,
  top:0,
    width:"100%",
justifyContent:"center",
    alignItems: 'center',
  
    },bodysmall:{
       
       
       height:"16%",
       alignItems:"center",
       justifyContent:"flex-end",
        backgroundColor:bg,
        paddingHorizontal:10,
        borderRadius:20,
        paddingTop:4
    },
    
    })