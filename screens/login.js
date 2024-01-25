import { View, NativeModules,Linking,Text,StyleSheet,Button,Dimensions,Image,Keyboard, TextInput as Ti, SafeAreaView, ScrollView, KeyboardAvoidingView, StatusBar, TouchableOpacity, Alert } from 'react-native'
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
import Animated, { SlideInDown, SlideInUp, SlideOutDown,FadeInDown,FadeOut } from 'react-native-reanimated';
import { storage } from '../Authcontext';
const {pause}=NativeModules
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
export default function Login({route,navigation}) {


  const RNCall = async() => {
    console.log("oolol")
    const options = {
      ios: {
        appName: 'My app name',
      },
      android: {
        appName:"wewe",
        alertTitle: 'Permissions required',
        alertDescription: 'This application needs to access your phone accounts',
        cancelButton: 'Cancel',
        okButton: 'ok',
        imageName: 'phone_account_icon',
        additionalPermissions: [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
        // Required to get audio in background when using Android 11
        foregroundService: {
          channelId: 'com.company.my',
          channelName: 'Foreground service for my app',
          notificationTitle: 'My app is running on background',
          notificationIcon: 'Path to the resource icon of the notification',
        }, 
      }
    };
    
    const result = await RNCallKeep.setup(options).then(accepted => {
      console.log("accepted--->", accepted)
      RNCallKeep.setAvailable(true)
    });
    const callUUID = '1234567890'; // a unique identifier for the call
    const handle = 'John Doe'; // the caller's name or phone number
    const localizedCallerName = 'John Doe'; // the localized caller name to display in the notification
    const handleType = 'number'; // the type of handle (e.g. 'generic', 'number', 'email', etc.)
    const hasVideo = false; // whether the call has video
  
    
    //RNCallKeep.isCallActive(callUUID);
  
  
  }
  const{mpeop,setmpeop,auth,setauth,peop,setpeop,messages,setmessages,userid,server,t,authContext,menuopens,setss}=useAuthorization()
  //const { userToken,userId,server,mpeop,peop } = useSelector((state) => state.counter);
  //const dispatch=useDispatch()
  let prt=server 
  
  //let prt="http://192.168.1.104:3001"
   const login=async(e)=>{
    console.log(prt)
    Keyboard.dismiss()
    menuopens.current=true
    const a = await pause.overapprequest()
    console.log(a)
    if(a===true){
      
      menuopens.current=false
    setss(true)
    await axios.post(`${prt}/login`,{
        email:email,
        password:password,
        notid:token1 ? token1:""
    }).then(async(response) => {
      
      console.log(response.data)
      if(response.data.data==="wp"){
        setss(false)
        setpasswordc(false)
        
      }
      else if(response.data.data==="we"){
        setss(false)
        setemailc(false)
      }else {
      
      /* await AsyncStorage.setItem("userToken",response.data.token)
      await AsyncStorage.setItem("email",email)
      await AsyncStorage.setItem("name",response.data.name)
      await AsyncStorage.setItem("id",response.data.id)
      await AsyncStorage.setItem("aut",JSON.stringify({"isA":true})).then(()=>{
      //dispatch(signIn({userToken:response.data.token,userId:response.data.id}))
      authContext.signIn({userToken:response.data.token,userId:response.data.id,userName:response.data.name})
       //navigation.navigate("Chat")

      }) */

     storage.set("userToken",response.data.token)
     storage.set("email",email)
     storage.set("name",response.data.name)
     storage.set("id",response.data.id)
     storage.set("aut",JSON.stringify({"isA":true}))
     if(response.data.profilepicture){
       storage.set("mypp",JSON.stringify(response.data.profilepicture))
     }
     authContext.signIn({userToken:response.data.token,userId:response.data.id,userName:response.data.name})
     
      
      
      
  
    }
        
      }).catch((q)=>{
        console.log(q)
      })
    }
  
/*   setemail(null)
  setemailc(null)
  setpasswordc(null)
  setpassword(null) */

   }
   async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log('Notification caused application to open', initialNotification.notification);
      console.log('Press action used to open the app', initialNotification.pressAction);
    }
  }
  useEffect(() => {
    //bootstrap()
    async function req(){
      try {
        let granted =null
        const as= await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        )
        console.log(as)
        if(as===true){
          granted=true
        }else{
       
          menuopens.current=true
          let r = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          )
          //menuopens.current=false
          if(r==="granted" || r==="never_ask_again"){
            granted=true
          }
          console.log(r)
        }
        if(granted){
          token1 = await messaging().getToken();
  
           settoken(token1)
          console.log(token1)
        }
       
      } catch (error) {
        
      }
     
      
    }
    req()
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
      const validateP = (text) => {
        
        setpassword(text)
        if (text?.length>=5) {
            setpasswordc(true)
         
          
        }
        else {
            setpasswordc(false)
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
        <TextInput label={"Email"}  mode="outlined" textColor='white' contentStyle={{fontSize:18,height:50}}  activeOutlineColor='white'  outlineStyle={{borderRadius:15,borderWidth:2,borderColor:emailc===true ? "green":emailc===false ?"red":null}} cursorColor={"white"} selectionColor={"gold"} autoCapitalize='none' onBlur={()=>
        {
            //setemailc(null)
    }}  textContentType='emailAddress' style={{
        width:"100%",
     
        marginBottom:10,
        backgroundColor:"#292929",

    
    }} value={email} onFocus={()=>{
      
      validate(email)}} onChangeText={(e)=>{validate(e)}}/>
        <TextInput mode="outlined"  label={"Password"} activeOutlineColor='white' contentStyle={{fontSize:18,height:50}} outlineStyle={{borderRadius:15,borderWidth:2,borderColor:passwordc===true ? "green":passwordc===false ?"red":null,}} textContentType='password' keyboardType="numeric" cursorColor='white'  style={{
        width:"100%",
   
    
        backgroundColor:"#292929",
        borderRadius:15,
        marginBottom:10,

    
    }} value={password} onFocus={()=>validateP(password)} onChangeText={(e)=>{validateP(e)}} secureTextEntry/>

    {emailc && passwordc ? 
<Animated.View entering={FadeInDown} exiting={FadeOut}  style={{backgroundColor:"black",width:"100%",borderRadius:15,height:50,justifyContent:"center",
alignItems:"center"}} >
<TouchableOpacity onPress={()=>login()} disabled={emailc&&passwordc ? false:true} style={{flex:1,width:"100%",borderRadius:15,justifyContent:"center",alignItems:"center"}}>
 <Text style={{color:darktext,textAlign:"center"}} >Giriş Yap</Text>
</TouchableOpacity></Animated.View>:
<View  style={{flexDirection:"row",height:50,justifyContent:"center",alignItems:"center",width:"100%"}}>


<TouchableOpacity style={{ paddingHorizontal:5,marginRight:10,borderRadius:15,color: darktext,backgroundColor:"#111111",height:"100%",flex:1,justifyContent:"center",alignItems:"center"}} onPress={() => navigation.navigate("Register")}>
          <Text style={{fontSize:17,fontWeight:"300",color:"white"}}>
            Üye Değilim
          </Text>

        </TouchableOpacity><TouchableOpacity style={{paddingHorizontal:7,borderRadius:15,color: darktext,flex:1,height:"100%",backgroundColor:"#111111",justifyContent:"center",alignItems:"center" }} onPress={() => navigation.navigate("Resetpassword")}>
          <Text style={{fontSize:17,fontWeight:"300",color:"white",textAlign:"center"}}>
          Şifremi unuttum
          </Text>
        </TouchableOpacity>
        </View>
        }    

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
    backgroundColor:"black"
  
    },bodysmall:{
       
        width:"80%",
        alignItems:"center",
        backgroundColor:"#292929",
        paddingHorizontal:10,
        borderRadius:20,
        paddingVertical:10
    },
    
    })