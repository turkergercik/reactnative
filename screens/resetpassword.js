import { View, Alert,Linking,Text,StyleSheet,Button,Dimensions,Image,Keyboard, TextInput as Ti, SafeAreaView, ScrollView, KeyboardAvoidingView, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
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
import { TextInput } from 'react-native-paper';
import Animated, { FadeIn, FadeInDown, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { storage } from '../Authcontext';
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
export default function Resetpassword({route,navigation}) {
  const{mpeop,setmpeop,auth,setauth,peop,setpeop,messages,setmessages,userid,server,t,authContext}=useAuthorization()
  //const { userToken,userId,server,mpeop,peop } = useSelector((state) => state.counter);
  //const dispatch=useDispatch()
  let prt=server 
  
  //let prt="http://192.168.1.104:3001"
   const login=async(e)=>{
    console.log(email)
    Keyboard.dismiss()
    await axios.post(`${prt}/resetpassword`,{
        email:email,
    }).then(async(response) => {
      console.log(response.data,45)
      if(response.data.data==="ok"){
        //await AsyncStorage.setItem("email",email)
        storage.set("email",email)
        navigation.navigate("Pincode")
       // Alert.alert("Emailinize gelen kodu kullanarak ")
        
      }
      else if(response.data.data==="nouser"){
        navigation.navigate("Pincode")
      }else {      
  
    }
        
      }).catch((q)=>{
        console.log(q)
      })
  
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
  
    const validate = (text) => {
        
        setemail(text)
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            setemailc(false)
         
          return false;
        }
        else {
            setemailc(true)
          //setemail()
        }
      }
    
   const [email, setemail] = useState(null)
   const [emailc, setemailc] = useState(null)
   const [password, setpassword] = useState(null)
   const [passwordc, setpasswordc] = useState(null)
   const [token, settoken] = useState(null)
  return (
            <SafeAreaView  style={[style.body]}> 
    
      <KeyboardAvoidingView  style={style.bodysmall}>
   
        <TextInput  mode="outlined" textColor='white' activeOutlineColor='white' label={"Kayıtlı Emailiniz"} contentStyle={{fontSize:18,height:50}} outlineStyle={{borderRadius:15,borderWidth:2,borderColor:emailc===true ? "green":emailc===false ?"red":null}} cursorColor={"white"}  autoCapitalize='none' onBlur={()=>
        {
            //setemailc(null)
    }}  textContentType='emailAddress' style={{
        width:"100%",
        backgroundColor:"#292929",
        marginBottom:4,

    
    }} value={email} onFocus={()=>{
      
      validate(email)}} onChangeText={(e)=>{validate(e)}}/>
        

  {emailc ?<Animated.View entering={FadeInDown} exiting={FadeOut} style={{marginTop:5,marginBottom:10,backgroundColor:"black",height:50,width:"100%",borderRadius:15,justifyContent:"center",alignItems:"center"}}><TouchableOpacity onPress={()=>login()} disabled={emailc ? false:true} style={{height:"100%",width:"100%",borderRadius:15,justifyContent:"center",alignItems:"center"}}>
       <Text style={{color:"white",fontSize:18,fontWeight:"300"}} >Şifreni resetle</Text>
      </TouchableOpacity>
      </Animated.View> :
      <TouchableOpacity style={{marginTop:5,marginBottom:10,backgroundColor:"#111111",height:50,width:"100%",borderRadius:15,justifyContent:"center",alignItems:"center"}} onPress={()=>navigation.navigate("Login")
}>
<Text style={{color:"white",fontSize:18,fontWeight:"300"}}>
Vazgeç
</Text>
</TouchableOpacity> }      

      



    </KeyboardAvoidingView>
   

    </SafeAreaView>
  )



}


const style= StyleSheet.create({
    body:{
    flex:1,
justifyContent:"center",
    alignItems: 'center',
  
    },bodysmall:{
       
        width:"80%",
       
       alignItems:"center",
       justifyContent:"flex-end",
        backgroundColor:"#292929",
        paddingHorizontal:10,
        borderRadius:20,
        paddingTop:4

    },
    
    })