import { View, Alert,Linking,Text,StyleSheet,Button,Dimensions,Image,Keyboard, TextInput, SafeAreaView, ScrollView, KeyboardAvoidingView, StatusBar, TouchableOpacity } from 'react-native'
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
      console.log(response.data)
      if(response.data.data==="ok"){
        await AsyncStorage.setItem("email",email)
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
   
        <Text  style={{alignSelf:"flex-start",marginLeft:5,marginBottom:5,color:darktext}}>Kayıtlı Emailiniz</Text>
        <TextInput cursorColor={"blue"} selectionColor={"gold"} autoCapitalize='none' onBlur={()=>
        {
            //setemailc(null)
    }}  textContentType='emailAddress' style={{
        width:"100%",
        height:40,
        marginHorizontal:20,
        paddingHorizontal:10,
        backgroundColor:darktext,
        borderWidth:3,
        borderColor:emailc===true ? "green":emailc===false ?"red":null,
        borderRadius:15,
        marginBottom:4,

    
    }} value={email} onFocus={()=>{
      
      validate(email)}} onChangeText={(e)=>{validate(e)}}/>
        

        
<Text style={{color:darktext}} onPress={()=>navigation.navigate("Login")
}>Giriş yap</Text>
      <TouchableOpacity onPress={()=>login()} disabled={emailc ? false:true} style={{height:40,backgroundColor:"blue",borderRadius:15,paddingHorizontal:15,justifyContent:"center",marginBottom:10,marginTop:10,paddingBottom:1,alignSelf:"stretch", }}>
       <Text style={{color:darktext,textAlign:"center"}} >Şifreni resetle</Text>
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
       
        width:"80%",
       
       alignItems:"center",
       justifyContent:"flex-end",
        backgroundColor:bg,
        paddingHorizontal:10,
        borderRadius:20,
        paddingTop:4
    },
    
    })