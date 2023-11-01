import { View, Linking,Text,StyleSheet,Button,Dimensions,Image,Keyboard, TextInput, SafeAreaView, ScrollView, KeyboardAvoidingView, StatusBar, TouchableOpacity } from 'react-native'
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
  const{mpeop,setmpeop,auth,setauth,peop,setpeop,messages,setmessages,userid,server,t,authContext}=useAuthorization()
  //const { userToken,userId,server,mpeop,peop } = useSelector((state) => state.counter);
  //const dispatch=useDispatch()
  let prt=server 
  
  //let prt="http://192.168.1.104:3001"
   const login=async(e)=>{
    console.log(prt)
    Keyboard.dismiss()
    await axios.post(`${prt}/login`,{
        email:email,
        password:password,
        notid:token1 ? token1:""
    }).then(async(response) => {
      console.log(response.data)
      if(response.data.data==="wp"){
        
        setpasswordc(false)
        
      }
      else if(response.data.data==="we"){
        setemailc(false)
      }else {
      
      await AsyncStorage.setItem("userToken",response.data.token)
      await AsyncStorage.setItem("email",email)
      await AsyncStorage.setItem("name",response.data.name)
      await AsyncStorage.setItem("id",response.data.id)
      await AsyncStorage.setItem("aut",JSON.stringify({"isA":true})).then(()=>{
      //dispatch(signIn({userToken:response.data.token,userId:response.data.id}))
      authContext.signIn({userToken:response.data.token,userId:response.data.id,userName:response.data.name})
       //navigation.navigate("Chat")

      })
  
     
     
      
      
      
  
    }
        
      }).catch((q)=>{
        console.log(q)
      })
  
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
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if(granted){
        token1 = await messaging().getToken();

         settoken(token1)
        console.log(token1)
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
   
        <Text  style={{alignSelf:"flex-start",marginLeft:5,marginBottom:5,color:darktext}}>Email</Text>
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
        <Text style={{alignSelf:"flex-start",marginLeft:5,marginBottom:5,color:darktext}}>Password</Text>
        <TextInput textContentType='password' keyboardType="numeric"  style={{
        width:"100%",
        height:40,
        marginHorizontal:20,
        paddingHorizontal:10,
        backgroundColor:darktext,
        borderWidth:3,
        borderColor:passwordc===true ? "green":passwordc===false ?"red":null,
        borderRadius:15,
        marginBottom:4,

    
    }} value={password} onFocus={()=>validateP(password)} onChangeText={(e)=>{validateP(e)}} secureTextEntry/>

        
<Text style={{color:darktext}} onPress={()=>navigation.navigate("Register")
}>Üye Değilim</Text>
<Text style={{color:darktext}} onPress={()=>navigation.navigate("Resetpassword")
}>Şifremi unuttum</Text>
<Text selectable={true} style={{color:darktext,margin:10}} 
>{token}</Text>
      <TouchableOpacity onPress={()=>login()} disabled={emailc&&passwordc ? false:true} style={{height:40,backgroundColor:"blue",borderRadius:15,paddingHorizontal:15,justifyContent:"center",marginBottom:10,marginTop:10,paddingBottom:1,alignSelf:"stretch", }}>
       <Text style={{color:darktext,textAlign:"center"}} >Giriş Yap</Text>
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