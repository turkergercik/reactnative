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
import Animated,{FadeInDown} from 'react-native-reanimated';
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
export default function Newpassword({route,navigation}) {
  const{mpeop,setmpeop,auth,setauth,peop,setpeop,messages,setmessages,userid,server,t,authContext}=useAuthorization()
  //const { userToken,userId,server,mpeop,peop } = useSelector((state) => state.counter);
  //const dispatch=useDispatch()
  let prt=server 
  
  //let prt="http://192.168.1.104:3001"
   const savenewpassword=async(e)=>{
    if(password===password2){
        console.log(prt)
        Keyboard.dismiss()
        //let email= await AsyncStorage.getItem("email")
        let email= storage.getString("email")
        await axios.post(`${prt}/savenewpassword`,{
            email:email,
            password:password
        }).then(async(response) => {
          console.log(response.data)
          if(response.data.data==="success"){
            Alert.alert("Şifre Değiştirildi")
            navigation.navigate("Login")
           // Alert.alert("passwordinize gelen kodu kullanarak ")
            
          }
          else if(response.data.data==="nouser"){
            navigation.navigate("Pincode")
          }else {      
      
        }
            
          }).catch((q)=>{
            console.log(q)
          })
    }else{
        Alert.alert("Şifreler aynı değil")
    }
   
  
/*   setpassword(null)
  setpasswordc(null)
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
  
    const validate = (text,id) => {
        if(id===1){
            setpassword(text)
            //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if(text!==null){
                if (text.length<=4) {
                    setpasswordc(false)
                 
                  return false;
                }
                else {
                    setpasswordc(true)
                  //setpassword()
                }
            }else{
                setpasswordc(false)
            }
           

        }else{
            setpassword2(text)
            if(text!==null){
                if (text.length<=4) {
                    setpasswordc1(false)
                 
                  return false;
                }
                else {
                    setpasswordc1(true)
                  //setpassword()
                }
            }else{
                setpasswordc1(false)
            }
        
      }
    }
   const [password, setpassword] = useState(null)
   const [password2, setpassword2] = useState(null)
   const [passwordc, setpasswordc] = useState(null)
   const [passwordc1, setpasswordc1] = useState(null)

  return (
            <SafeAreaView  style={[style.body]}> 
    
      <KeyboardAvoidingView  style={style.bodysmall}>
   
        <TextInput mode="outlined" textColor='white' activeOutlineColor='white' label={"Yeni Şifre"} contentStyle={{fontSize:18,height:50,paddingLeft:0}} outlineStyle={{borderRadius:15,borderWidth:2,borderColor:passwordc===true ? "green":passwordc===false ?"red":null}} cursorColor={"white"} autoCapitalize='none' onBlur={()=>
        {
            //setpasswordc(null)
    }}  textContentType="newPassword" style={{
        width:"100%",
        paddingLeft:15,
        backgroundColor:"#292929",
        marginBottom:5,

    
    }} value={password} onFocus={()=>{
      
      validate(password,1)}} onChangeText={(e)=>{validate(e,1)}}/>


       <TextInput mode="outlined" textColor='white' activeOutlineColor='white' label={"Yeni Şifre Tekrar"} contentStyle={{fontSize:18,height:50,paddingLeft:0}} outlineStyle={{borderRadius:15,borderWidth:2,borderColor:passwordc1===true ? "green":passwordc1===false ?"red":null}} cursorColor={"white"}  autoCapitalize='none' onBlur={()=>
        {
            //setpasswordc(null)
    }}  textContentType="newPassword" style={{
        width:"100%",
        paddingLeft:15,
        backgroundColor:"#292929",
        marginBottom:5,

    
    }} value={password2} onFocus={()=>{
      
      validate(password2,2)}} onChangeText={(e)=>{validate(e,2)}}/>
        

        
{passwordc&&passwordc1 ? <Animated.View entering={FadeInDown}  style={{color:darktext,height:50,backgroundColor:"#111111",width:"100%",borderRadius:15,marginVertical:5,justifyContent:"center",alignItems:"center"}}><TouchableOpacity onPress={()=>savenewpassword()} disabled={passwordc&&passwordc1 ? false:true} style={{height:50,borderRadius:15,justifyContent:"center",width:"100%",alignItems:"center"}}>
       <Text style={{color:"white",fontSize:18,fontWeight:"300"}}  >Kaydet</Text>
      </TouchableOpacity></Animated.View> :null}
      
{/* <Button title='sdds'onPress={()=>{navigation.navigate("Home")}} >

</Button> */}


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
        backgroundColor:"#292929",
        paddingHorizontal:10,
        borderRadius:20,
        paddingVertical:5
    },
    
    })