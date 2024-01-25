import { useEffect,useContext,useReducer,useMemo,createContext, useRef,useState,useLayoutEffect } from "react"
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import SignIn from "./screens/Signin";
import { AuthContext } from "./Authcontext";
import { Auth } from "./Authcontext";
import {View,PermissionsAndroid,Alert,TouchableOpacity,StatusBar,Text,Linking,NativeModules, Dimensions, TouchableNativeFeedback,ActivityIndicator,AppState} from "react-native"
import { useAuthorization } from "./Authcontext";
import Home from "./screens/Home";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Other from "./screens/Other";
import Login from "./screens/login";
import Register from "./screens/register";
import Chat from "./screens/chat";
import Chatid from "./screens/chatid";
import Photo from "./components/photo";
import Videocall from "./screens/videocall";
import Audiocall from "./screens/audiocall";
import { FlatList, GestureDetector, GestureHandlerRootView,Gesture } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { signIn, setmpeop, setpeop,signOut  } from "./redux/counter";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {navigationRef} from "./navigators/rootnavigator"
import RNCallKeep from 'react-native-callkeep';
import { io } from 'socket.io-client';
import InCallManager from 'react-native-incall-manager';
import Resetpassword from "./screens/resetpassword";
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { current } from "@reduxjs/toolkit";
import Animated ,{Easing,Extrapolation,useAnimatedKeyboard,withSequence, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming,AnimatedLayout, FadeIn, Layout, SlideInDown, SlideInUp, SlideOutUp, SlideInRight, SlideInLeft, SlideOutDown, withRepeat, LayoutAnimationConfig, LinearTransition } from 'react-native-reanimated'
import Pincode from "./screens/pincode";
import Newpassword from "./screens/newpassword";
import Allpeople from "./screens/allpeop";
import Orientation, { ALL_ORIENTATIONS_BUT_UPSIDE_DOWN } from 'react-native-orientation-locker';
import ShortUniqueId from 'short-unique-id';
import RNExitApp from 'react-native-exit-app';
import { useNetInfo } from "@react-native-community/netinfo";
import axios from "axios";
import Take from "./screens/takephoto";
import { useKeyboard } from "@react-native-community/hooks";
import Decline from "./images/decline.svg"
import Accept from "./images/accept.svg"
import Camon from "./images/camon.svg"
import messaging from '@react-native-firebase/messaging';
import notifee,{AndroidColor,AndroidFlags,AndroidStyle,AndroidImportance,AndroidCategory,AndroidVisibility, AndroidLaunchActivityFlag} from '@notifee/react-native';
import { Portal,Dialog } from "react-native-paper";
import SplashScreen from 'react-native-splash-screen'
import { storage } from "./Authcontext";
import Draw from "./screens/draw";
import { Notifications } from "react-native-notifications";
import PushNotification, {Importance} from 'react-native-push-notification';
import Callscreen from "./screens/callvideoscreen";
const {pause}=NativeModules
let {width,height}=Dimensions.get("window")
let mode=null
const height1=Dimensions.get("screen").height
const n=height1-height-StatusBar.currentHeight
let x =0
let xs =true
export default function App({ navigation,call,socket1,call2}) {

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState("open");
  const [xy, setxy] = useState(null);
  //const Stack = createStackNavigator()
  const { type, isConnected } = useNetInfo();
  const Stack = createNativeStackNavigator();
  //const { isLoading,userToken,img } = useSelector((state) => state.counter);
  //const dispatch = useDispatch();
const {setsomemessages,somemessages,state,setsoc,menuopens,socketbackup,authContext,img,socket,server,remoteRTCMessage,seticall,icall,currentconv,setmessages,istoday,stat,setstat,offlinepause,myconv,messages,check,allm,setcalli,calli,setnavbar,cam,ss,setss,onlines,setonlines,setinchat,inchat,settyping,typing,currentother} = useAuthorization()
const d =new ShortUniqueId({length:10})
x+=1
const c =useRef(null)
const firstopen =useRef(true)
const opacity = useSharedValue(1)
const tx = useSharedValue(-width)
const color = useSharedValue("white")
const ballwidth =useRef(70)
const width1 =useRef(0.8)
const calln = useRef(null)
const inchatref = useRef([])
const inchatcheck = useRef(false)
const [abs, setabs] = useState(null)
const [visible,setIsVisible]=useState(false)
const [callername,setcallername]=useState(null)
const [calltype,setcalltype]=useState(null)

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



}
/* async function set1(){

  try {
    await BackgroundFetch.configure({
      minimumFetchInterval: 15,
      forceAlarmManager:true,
   startOnBoot:true,
   stopOnTerminate:false,
   enableHeadless:true,
   requiresCharging:false,
   requiresBatteryNotLow:false,
    }, async (taskId) => {  // <-- Event callback
      console.log("[BackgroundFetch] taskId: ", taskId);
      BackgroundFetch.finish(taskId);
    }, async (taskId) => {
      console.log("[BackgroundFetch] taskId: bok", taskId);

      // <-- Task timeout callback
      // This task has exceeded its allowed running-time.
      // You must stop what you're doing and immediately .finish(taskId)
      BackgroundFetch.finish(taskId);
    })

    await BackgroundFetch.scheduleTask({
      taskId: 'com.foo.customtask',
      delay: 5000,       // milliseconds
      forceAlarmManager: true,
      startOnBoot:true,
      stopOnTerminate:false,
      periodic: true,
      enableHeadless:true
    }).then((e)=>{
console.log(e,45)
    }).catch((e)=>{
      console.log(e,46)
 
    })
  } catch (error) {
    
  }


 
  BackgroundFetch.start()
} */
let xx= true

useEffect(()=>{
  SplashScreen.hide()


  Notifications.setNotificationChannel({
    channelId: 'my-channel',
    name: 'My Channel',
    importance: 5,
    description: 'My Description',
    enableLights: true,
    enableVibration: true,
    groupId: 'my-group', // optional
    groupName: 'My Group', // optional, will be presented in Android OS notification permission
    showBadge: true,
    vibrationPattern: [200, 1000, 500, 1000, 500],
})



setss(false)
   const subscription = AppState.addEventListener("change", async(nextAppState) => {
    const myid = storage.getString("id")
      /* const call1 = await AsyncStorage.getItem("caller")
    const callnotif = await AsyncStorage.getItem("callnotif")
     */
  /*   let c1=null
    const call1 =  storage.getString("caller")
    const callnotif = storage.getString("callnotif")
    const myid =  storage.getString("id")
    if(call1){
      c1=JSON.parse(call1)
      setcalli(true)
      setcallername(c1.callerName)
      setcalltype(c1.type)
      calln.current=c1.callerName
    }if(callnotif){
      Alert.alert("lol")
      setss(JSON.parse(callnotif))
      calln.current=true
    } */
   
      //setAppStateVisible("open")
     
       //c1==null
       if(nextAppState==="background" && menuopens.current!==true ){
        /* storage.delete("caller")
        storage.delete("callnotif") */
         //pause.pause()
         
         //await AsyncStorage.removeItem("call")
         if(currentconv.current){
           socket.current.emit("closedsession",currentother.current,currentconv.current)
         }else{
           socket.current?.close()
         }
         
          
         
         //socket.current=null 
         
       }else{
        console.log("yok")
        if(menuopens.current!==true){
          if(myid){
            socket.current?.open()
            socket.current?.emit("no",myid)
    
    
          }
        
        }

       
        
        menuopens.current=false
        
       }
   
      
      
  appState.current=nextAppState
    
      
      
         console.log('App has come to the b!');
        
       
    
     })

  

 return ()=>{
  subscription.remove();
 }
},[])
useEffect(() => {

 async function ass(){
  //await AsyncStorage.removeItem("1D27wrPxSR")
  //let userId = await AsyncStorage.getItem("id")
  
  let userId =  storage.getString("id")
  await axios.get(`${server}/suspended/${userId}`).then(async(e)=>{
   if(e.data.data!==null){
    let nes=null
    //await AsyncStorage.removeItem("suspended")
    //await AsyncStorage.removeItem("1D27wrPxSR")
    //let sss= await AsyncStorage.getItem("suspended")
    let sss= storage.getString("suspended")
    if(sss){
      let ss = JSON.parse(sss)
      if(ss.length!==0){
        nes=[...e.data.data.messages,...ss]
      }else{
        nes=e.data.data.messages
      }
      console.log(e.data.data.messages)
      
      console.log(nes,78)
      Alert.alert("bık")
    }else{
      Alert.alert("ık")
      nes=e.data.data.messages
    }
     //let suspended = await AsyncStorage.setItem("suspended",JSON.stringify(nes))
     let suspended = storage.set("suspended",JSON.stringify(nes))

   }
    //let sus = await AsyncStorage.getItem("suspended")
    let sus = storage.getString("suspended")
    if(sus){
      let sus1= JSON.parse(sus)
     if(sus1.length!==0){

    
     let saves=[...sus1]
     const arr = [...sus1];
     for (const e of arr) {
      try {
    console.log(e,24)
         let day = {date:new Date(Date.now()).toLocaleDateString("tr-TR",{day:"2-digit",month:"long",year:"numeric"}),type:"day",_id:d()}

        //let conversation = await AsyncStorage.getItem(e.conversationid)
        let conversation =  storage.getString(e.conversationid)
        if(conversation){
         let all= JSON.parse(conversation)
         const b= all.find((e)=>{
          if( e.type!==undefined){
            return e
          }
        })
      
      if(b?.date === day.date){
       
        all=[e,...all]

      }else{
       
        all=[day,e,...all]

      }
        
         console.log(all,20)
         //await AsyncStorage.setItem(e.conversationid,JSON.stringify(all))
         storage.set(e.conversationid,JSON.stringify(all))
         saves.splice(0,1)
    
         //await AsyncStorage.setItem("suspended",JSON.stringify(saves))
         storage.set("suspended",JSON.stringify(saves))
        }else{
          saves.splice(0,1)
          console.log(25)
         let news= [e,day]
         //await AsyncStorage.setItem(e.conversationid,JSON.stringify(news))
         storage.set(e.conversationid,JSON.stringify(news))
        }
      } catch (error) {
        console.log(error)
      }
      //let x= await AsyncStorage.getItem("suspended")
      //let x= storage.getString("suspended")
      
     }
    }
  }
})

 }
ass()
return ()=>{
 console.log("ok")
  //socket?.current?.close()
  //call=null
  setcalli(false)
  seticall(false)
}
}, [])
/* useEffect(()=>{
Alert.alert(icall?.toString())

},[icall]) */




/* useEffect(() => {
  
  //set1()
    InCallManager.start();
    //InCallManager.startRingtone("DEFAULT","","",10);
  
    InCallManager.setKeepScreenOn(true)
    InCallManager.setForceSpeakerphoneOn(true);
    //InCallManager.setSpeakerphoneOn(true)
    //InCallManager.setFlashOn(true)
    return () => {
      
      InCallManager.stop();
      
    };
  }, []); */




  useEffect(() => {
    if(state.userId){
      const pref = storage.getString("bnp")
      if(pref){
        
        
      }else{
        setIsVisible(true)
       

      }
    }
    
    console.log("12")
    StatusBar.setTranslucent(true)
    //StatusBar.setBackgroundColor("transparent")
SystemNavigationBar.setNavigationColor("black")
    //SystemNavigationBar.fullScreen(true)
   //SystemNavigationBar.lowProfile()
   //SystemNavigationBar.navigationShow()
   //SystemNavigationBar.setNavigationColor('transparent');

    //SystemNavigationBar.setNavigationColor("translucent")
     //SystemNavigationBar.setNavigationColor('hsla(0, 100%, 50%, 1)');
     //SystemNavigationBar.setNavigationColor("transparent")
 
   //SystemNavigationBar.setNavigationColor("transparent",undefined,"navigation")
    //SystemNavigationBar.navigationShow()
    
    
    //StatusBar.setTranslucent(true)
    //SystemNavigationBar.setFitsSystemWindows()

  


    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
  
      let userToken;
      let userId
      let userName
      try {
        /* userToken = await AsyncStorage.getItem('userToken');
        userId = await AsyncStorage.getItem('id');
        userName = await AsyncStorage.getItem('name'); */
        userToken = storage.getString('userToken');
        userId = storage.getString('id');
        userName = storage.getString('name');
        if(userToken && userId){
              
          //dispatch(signIn({userToken:userToken1,userId:userId1}))

          authContext.signIn({userToken:userToken,userId:userId,userName:userName})
       


       if(socket.current===null){
        
        //const pref = await AsyncStorage.getItem("bnp")
   
        
             
        
           
            //RNCall()
         
            if(socket1){
              socket1.off("endCall")
             socket.current=socket1
            }else{

              socket.current = io(server)
              socket.current.emit("no",userId)
              
            }
            socket.current.on("getm",async(e)=> {
              console.log("yenimesaj")
              let n =[{
                _id:e._id,
                sender:e.sender,
                text:e.text,
                createdAt:e.createdAt,
                receiver:e.receiver,
                media:e.media,
                conversationid:e.conversationid,
                isNotification:e.isNotification
              }]
              let y = e.conversationid
              let day ={date:new Date(Date.now()),type:"day",_id:d()}
             
            
              //let a = await AsyncStorage.getItem(e.conversationid)
              let a = storage.getString(e.conversationid)
              
              if(a){
                let all = JSON.parse(a)
                if(istoday.current.hasOwnProperty(y) === false){
                const b= all.find((e)=>{
                  if( e.type!==undefined){
                    return e
                  }
                })
                
              if(new Date(b.date).toDateString() === new Date(day.date).toDateString()){
               

              }else{
               
                n=[...n,day]

              }

              
              
              
              istoday.current={...istoday.current,[y]:true}
            }
            console.log(istoday.current,13)
            try {
              console.log(allm.current,144)
              if(allm.current.length!==0){
                if(allm.current[0].conversationid===currentconv.current){

                  allm.current=[...n,...allm.current]
                }


              }
            
              console.log("heyo")
              //await AsyncStorage.setItem(e.conversationid,JSON.stringify([...n,...all]))
              storage.set(e.conversationid,JSON.stringify([...n,...all]))
            } catch (error) {
              
            }
            }else{



            }
              /* if(typeof e.text === 'object' && e.text !== null){
           

                 n[0].text=e.text.text
                 n=[...n,e.text.others]
              } */
             /* if(e.isNotification){
         socket.current.emit("send",{
               sender:e.sender,
               text:e.text,
               createdAt: e.createdAt,
               receiver:e.sender,
               conversationid:e.conversationid
         })
         
         
             } */
           console.log(e.conversationid,currentconv.current,"yyy")
             if(e.conversationid===currentconv.current){
           
               setmessages((p)=>[...n,...p])
               setsomemessages((p)=>[...n,...p])
          
               console.log("evet")
             }
            
            
            })
            socket.current.on("get",(e)=>{
              
             setonlines(e)
             
            })
            
            socket.current.on("inchat",(a)=>{
              let x =inchatref.current.filter((i)=>i.conversationid===a.b)
              console.log(x,7878)
              if(x.length===0){
                inchatref.current=[...inchatref.current,{userId:a.u,conversationid:a.b}]
                setinchat((e)=>[...e,{userId:a.u,conversationid:a.b}])
                
              }
              /* if(currentconv.current===a.b && inchatcheck.current===false){
                socket.current.emit("inchat",currentother.current,currentconv.current)
                inchatcheck.current=true

              } */
              

              
            })
            socket.current.on("outchat",(a)=>{
              let x =inchatref.current.filter((i)=>i.conversationid!==a.b)
              console.log(x,454545)
              inchatref.current=x
              //let x= inchat.filter((i)=>i!==a)
             setinchat(x)
           })
            socket.current.on("typing",(a)=>{
              /* if(currentconv.current===a){
                
                setsomemessages((e)=>
                  [{typing:true,_id:"78987"},...e]
                )
              } */
              //allm.current=[{typing:true,_id:"78987"},...allm.current]
              settyping((e)=>[...e,a.b])

            
          })
          socket.current.on("nottyping",(a)=>{
              
            let x= typing.filter((i)=>i!==a.b)
            console.log(x,9999999)
              settyping(x)
             /* let y = somemessages.filter((i)=>i._id!=="78987")
              setsomemessages(y) */
          })
           
socket.current.on("offlinepause",(data,id)=>{
  if(remoteRTCMessage.current.callerId===id){
if(data==="video"){
if(offlinepause.current.video===true){
  offlinepause.current.video=false

}else{
  offlinepause.current.video=true

}
}else{
  if(offlinepause.current.audio===true){
    offlinepause.current.audio=false
  
  }else{
    offlinepause.current.audio=true
  
  }
}}

})

            
            socket.current.on('newCall', async(data) => {
              let type=null
              if(data.type){
                if(data.type==="Audio"){
                  type="sesli"
                }else{
                  type="görüntülü"
                }
              }
              
              console.log("yeni arama")
              call={
                rtcMessage:data.rtcMessage,
                otherid:data.callerId,
                type:"inapp"
              }
              remoteRTCMessage.current={
                rtcMessage:data.rtcMessage,
                callerId:data.callerId,
                callerName:data.callerName,
                type:type,
                callType:data.type
              }
              InCallManager.startRingtone("DEFAULT","","default","")
             
              if(navigationRef.getCurrentRoute().name!=="Video"){
                
                  seticall(true)

            

                 

          
              }
              /* if(AppState.currentState==="background"){
              const lock = await pause.islocked()
              if(lock){
                call.type="notification"
                await AsyncStorage.setItem("caller",JSON.stringify({otherid:remoteRTCMessage.current.callerId,call:"notification",info:remoteRTCMessage.current.rtcMessage}))
                setcallername(remoteRTCMessage.current.callerName)
                setcalli(true)
                setTimeout(() => {
                  
                  pause.play()
                }, 0);

              }else{
                await AsyncStorage.setItem("caller",JSON.stringify({otherid:remoteRTCMessage.current.callerId,call:"notification",info:remoteRTCMessage.current.rtcMessage,active:true}))
                const channelId = await notifee.createChannel({
                  id: 'privatemessage',
                  name: 'privatemessage',
                importance:AndroidImportance.HIGH,
                vibration:true,
                vibrationPattern: [100, 500],
                });
                await notifee.displayNotification({
                  id:"2",
                  title:"Gelen Arama",
                  body:`${remoteRTCMessage.current.callerName} arıyor`,
                    android: {
                      vibrationPattern: [1000, 500],
                    flags:[AndroidFlags.FLAG_NO_CLEAR],
                    ongoing:false,          
                      color:AndroidColor.RED,
                      onlyAlertOnce:false,
                      fullScreenAction: {
                        id: 'default',
                      },
                      actions: [
                        {
                          title: '<p style="color: #ff0000;"><b>Reddet</b></p>',
                          pressAction: { id: 'decline' },
                        },
                        {
                          title: '<p style="color: #0b8705;"><b>Kabul et</b></p>',
                          pressAction: { id: 'accept' },
                        },
                      ],
                     channelId:"privatemessage",
                  },
                })
              }

              } */
            
            }
              /* console.log("yeni arama")
              console.log(data.callerId,22222) */
          
              /* remoteRTCMessage.current = data.rtcMessage;
              otherUserId.current = data.callerId; */
          
            );
            socket.current.on('newconversationonline', async(e,a) => {
              //check.current=false
              let conversation=JSON.parse(e)
              let message=JSON.parse(a)
              console.log(conversation,"hey")
              let i
              //let all1= await AsyncStorage.getItem("mpeop")
              let all1= storage.getString("mpeop")
              let all=JSON.parse(all1)
              //console.log(all,74)
              let filtered= all.filter((a,index)=>{
                if(a.members?.includes(conversation.members[0])&&a.members?.includes(conversation.members[1])){
                  i=index
                  return a
                }
                
              })
            
            if(filtered.length===0){
              let c
              console.log("yok11")
              //chat hiç yok oluştur
              all=[...all,conversation]
              message.conversationid=conversation._id
              if(currentconv.current){
                //let a= await AsyncStorage.getItem(currentconv.current)
                let a= storage.getString(currentconv.current)
               let b= JSON.parse(a)
                c =[message,...b]
               currentconv.current=conversation._id
               
               setmessages(c)
               setsomemessages(c)
               check.current=false
              }else{
                let day = {date:new Date(Date.now()),type:"day",_id:d()}
                 c= [message,day]

              }
              authContext.setmpeop(all)
              allm.current=c
              /* await AsyncStorage.setItem("mpeop",JSON.stringify(all))
              await AsyncStorage.setItem(conversation._id,JSON.stringify(c)) */
              storage.set("mpeop",JSON.stringify(all))
              storage.set(conversation._id,JSON.stringify(c))
              socket.current.emit("newconv",e,a)
            }else{
              //chati güncelle
            console.log(conversation,3)
            //let a= await AsyncStorage.getItem(currentconv.current)
            let a= storage.getString(currentconv.current)
            let b= JSON.parse(a)
              if(new Date(conversation.createdAt)<new Date(filtered[0].createdAt)){
                Alert.alert("bok")
                
                all[i]._id=conversation._id
                all[i].sender=conversation.receiver
                all[i].receiver=conversation.sender
                message.conversationid=conversation._id

                if(b){
                  b.forEach((a) => {
                    if(a.conversationid!==undefined){
                      a.conversationid=conversation._id
                    }
                  });
                  
                }
             
                let c =[message,...b]
                 
                 
                 authContext.setmpeop(all)
                 currentconv.current=conversation._id
                 
                 console.log(c,4444)
                 /* await AsyncStorage.setItem(conversation._id,JSON.stringify(c))
                 await AsyncStorage.setItem("mpeop",JSON.stringify(all)) */
                 storage.set(conversation._id,JSON.stringify(c))
                 storage.set("mpeop",JSON.stringify(all))
                 allm.current=c
                 setmessages(c)
                 setsomemessages(c)
                 socket.current.emit("newconv",JSON.stringify(conversation),JSON.stringify(message))

              }else{
                Alert.alert("7ok")
                if(b){
                  b.forEach((a) => {
                    if(a.conversationid!==undefined && a.conversationid!==currentconv.current){
                      a.conversationid=currentconv.current
                    }
                  });
                  
                }
                message.conversationid=currentconv.current
                b.splice(1,0,message)
                console.log(b,5555)
                allm.current=b
                setmessages(b)
                setsomemessages(c)
                //await AsyncStorage.setItem(currentconv.current,JSON.stringify(b))
                storage.set(currentconv.current,JSON.stringify(b))
             /*    setmessages((p)=>{
            if(b.length===1){

              p.splice(1,0,message)
              return [...p]

            }else{
              return [message,...p]
            }
                   }) */
                
              }

              /* if(new Date(filtered.createdAt)>new Date(conversation.createdAt)){

              } */
            }
          
            if(conversation._id===currentconv.current){
           console.log(message)
         
              console.log("evet")
            }
  
              });

            socket.current.on('updateconv', async(id,who,value) => {
              console.log(id,who,value,2323)
            let i
            //let all1= await AsyncStorage.getItem("mpeop")
            let all1= storage.getString("mpeop")
            let all=JSON.parse(all1)
            let filtered= all.filter((a,index)=>{
              if(a._id===id){
                i=index
                return a
              }
              
            })
           
          
          if(filtered.length!==0){
/* if(who==="sender"){
  if(value===true){
    all[i].sender.delete=true
  }else{

    all[i].sender.delete=false
  }

}else{
  if(value===true){
    all[i].receiver.delete=true
  }else{

    all[i].receiver.delete=false
  }


} */










            if(value===true){
              if(who==="sender"){
                if(filtered[0].receiver.delete===true){
                  console.log(8)
                  all.splice(i,1)
                  socket.current.emit("deleteconversation",id)
                  //state.mpeop.slice(i,1)

                }else{
                  console.log(2)
                  all[i].sender.delete=true
                  //state.mpeop[i].sender.delete=true
                }
              }else{
               console.log(1)
                if(filtered[0].sender.delete===true){
                  all.splice(i,1)
                  socket.current.emit("deleteconversation",id)
                  //state.mpeop.slice(i,1)

                }else{
                  console.log(99)
                  all[i].receiver.delete=true
                  //state.mpeop[i].receiver.delete=true
                }


              }


            }else{
              if(who==="receiver"){

                all[i].receiver.delete=false
              }else{
                all[i].sender.delete=false
              }
              //state.mpeop[i][who].delete=false


            }
            console.log(all,41)
            authContext.setmpeop(all)
            //await AsyncStorage.setItem("mpeop",JSON.stringify(all))
            storage.set("mpeop",JSON.stringify(all))

          }

            });


            socket.current.on('deleteconv', async(id) => {
              let i
              //let all1= await AsyncStorage.getItem("mpeop")
              let all1= storage.getString("mpeop")
              let all=JSON.parse(all1)
              let filtered= all.filter((a,index)=>{
                if(a._id===id){
                  i=index
                  return a
                }
                
              })
              console.log(filtered,1212)
            if(filtered.length!==0){
              all.splice(i,1)
              //console.log(all.length,88889)
              authContext.setmpeop(all)
              //await AsyncStorage.setItem("mpeop",JSON.stringify(all))
              storage.set("mpeop",JSON.stringify(all))
  
            }
  
              });
            socket.current.on('endCall', async(data) => {
              InCallManager.stopRingtone()
               seticall(false)
               setcalli(false)
               setss(false)
               /* if(calln.current!=null){
                //await AsyncStorage.removeItem("caller")
                storage.delete("caller")
                  
                  pause.pause()
           
                calln.current=null

               } else if(call){
                console.log(call)
              
                if(call.type){
                  if(call.type==="notification"){
                    

                    console.log("7878")
                    pause.pause()
                    //call=undefined
                    setcalli(false)
                  }

                  
                
                  //seticall(false)
                  //RNExitApp.exitApp()
                }
                //call=null
               } */
  
               //Alert.alert(`${navigationRef.getCurrentRoute().name}`)
               if(navigationRef.getCurrentRoute().name==="Video" || navigationRef.getCurrentRoute().name==="Audio"){
                if(navigationRef.canGoBack()){
                  navigationRef.goBack()

                }
                 
                   
               }
               remoteRTCMessage.current={
                 rtcMessage:null,
                 callerId:null,
               }
               
               
            
           
               /* remoteRTCMessage.current = data.rtcMessage;
               otherUserId.current = data.callerId; */
           
             });
          
          }
          
          
          

          /* const a = await AsyncStorage.getItem("callnotif")
          const c= await AsyncStorage.getItem("video")
          const d= JSON.parse(c)
         
          const b= JSON.parse(a)
          if(b===true){
            setss(false)
            navigationRef.navigate("Video",d)
          } */

        }else{
          //dispatch(signOut())
          authContext.signOut()
        }
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      
    };

    if(appStateVisible==="open"){
      bootstrapAsync();
      setsoc(socket.current)
    } 
      


    return ()=>{
      //socket.current.close()
    }
  }, [state.userId]);
  let x 
  let y
  let z
  useEffect(()=>{
   /*  let results=[]
 if(inchatref.current.length!==0 && onlines.length!==0 && inchatref.current.length>=onlines.length){

    results = inchatref.current.filter(({ userId: id1 }) => !onlines.some(({ userId: id2 }) => id2 === id1))
 }else{
   results = onlines?.filter(({ userId: id1 }) => !inchatref.current.some(({ userId: id2 }) => id2 === id1))

 }
 if(results.length!==0){
  inchatref.current.forEach((item)=>{
    if(item.userId===)


  })
 } */
  },[onlines])
useEffect(() => {
 
 const d= Dimensions.addEventListener("change",(e)=>{
     width =e.screen.width
     if(e.screen.height>e.screen.width){
      mode="portrait"
     }else{
      mode="landscape"
     }
  

   })


  /* Orientation.lockToPortrait()
    lasto.current="PORTRAIT" 
    Orientation.addDeviceOrientationListener((e)=>{
     clearTimeout(x)
    //clearTimeout(y)
      if(e==="PORTRAIT" && lasto.current!=="PORTRAIT" ){
        
        opacity.value=1
        setss(true)
      setTimeout(() => {
        StatusBar.setBackgroundColor("black")
        SystemNavigationBar.setNavigationColor("black")
        
      }, 10);
          
  
        
        Orientation.lockToPortrait()
   

        lasto.current="PORTRAIT" 
        setnavbar(n)
      
      
      }else if(e==="LANDSCAPE-LEFT" && lasto.current!=="LANDSCAPE-LEFT" ){
if(cam.current===false){
  
  opacity.value=1
  setss(true)

setTimeout(() => {
StatusBar.setBackgroundColor("transparent")
SystemNavigationBar.setNavigationColor("transparent")

}, 10);

    


  lasto.current="LANDSCAPE-LEFT" 
  setnavbar(0)
  Orientation.lockToLandscape()


}
       
      
      }
      opacity.value=withDelay(0,withTiming(0,{duration:750,
        
      },()=>{
        //opacity.value=1
      }))
     /* y= setTimeout(() => {
      if(lasto.current=="PORTRAIT"){
        StatusBar.setBackgroundColor("black",true)
        SystemNavigationBar.setNavigationColor("black",)
      
      }
      }, 500); 
     x= setTimeout(() => {
        setss(false)
      }, 650);
    }) */

    return ()=>{
      d.remove()
      Orientation.removeAllListeners()
      //setss(false)
    }
}, [])
const sty = useAnimatedStyle(()=>{
  return{
    opacity:opacity.value
  }
})
useEffect(()=>{
//Alert.alert(ss.toString())

},[ss])


  const SlideTransition = {
    cardStyleInterpolator: ({ current, next, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0,1],
                outputRange: [layouts.screen.width, -1],
              }),
            },
            {
              translateX: next
                ? next.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -layouts.screen.width],
                  })
                : 1,
            },
          ],
        },
      };
    },
  };
  const config = {
    screens: {
      Video:'Video',
      Chatid:"Chatid",
      Chat:"Chat"
    },
  };
  const linking = {
    prefixes: ['mychat://'],
    config,
  };


  {/* <View style={{position:"absolute",backgroundColor:"green",top:0,bottom:0,right:0,left:0,zIndex:1}}>
<View style={{flex:1,flexDirection:"column"}} >
  <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>

  <Text style={{}} >{call?.callerName? call.callerName:"ee"}</Text>

  </View>
  <View style={{backgroundColor:"green",flex:1,flexDirection:"row"}}>
<View style={{backgroundColor:"green",flex:1}}>
  <TouchableOpacity style={{flex:1,justifyContent:"center",alignItems:"center"}}
  onPress={()=>{
    navigationRef.navigate("Video",{otherid:call.callerId,call:"notification",info:call})
  }}
  
  >
    <Text>Cevapla</Text>
  </TouchableOpacity>
</View>
<View style={{backgroundColor:"red",flex:1}}>
  <TouchableOpacity style={{flex:1,alignItems:"center",justifyContent:"center"}}
    onPress={()=>{
  socket.current.emit("endCall",call.callerId)
  setTimeout(() => {
    
    pause.pause()
  },0 );
    }}
  
  >
    <Text>Reddet</Text>
  </TouchableOpacity>
</View>
</View>

</View>
      </View> */} 
async function decline(){
  //let a = await AsyncStorage.getItem("caller")
  let a = storage.getString("caller")
  let b= JSON.parse(a)
  socket.current.emit("endCall",b.otherid) 
  storage.delete("caller")
  storage.delete("callnotif")
  setss(false)
  setcalli(false)
  pause.pause()
  //await AsyncStorage.removeItem("caller")
  

  /* ocket.current.emit("endCall",call.callerId) 
  pause.pause() */
 
}
async function answer(){
  //let a = await AsyncStorage.getItem("caller")
  let a = storage.getString("caller")
  let b= JSON.parse(a)

  navigationRef.navigate(calltype,b)
  //await AsyncStorage.removeItem("caller")
  storage.delete("caller")
  //navigationRef.navigate("Video",{otherid:call.callerId,call:"notification",info:call})

}

     /*  const g= Gesture.Pan()
   
      .onStart((e)=>{
   
   console.log(e)
   
      }).onChange((e)=>{
      
        if(width*width1.current/2-ballwidth.current/2-6<=Math.abs(e.translationX)){
          if(e.translationX>0){
            tx.value=width*width1.current/2-ballwidth.current/2-6
            color.value="green"
            return
          }else{
            tx.value=-(width*width1.current/2-ballwidth.current/2-6)
            color.value="red"
            return
          }
        }
        tx.value=e.translationX
        color.value="white"
        
        
       

      }).onEnd((e)=>{
       if(color.value==="green"){
runOnJS(answer)()
       }else if(color.value==="red"){
runOnJS(decline)()
       }
tx.value=0 
color.value="white"

      }) */
      function lay(event){
        let w =event.nativeEvent.layout.width
        let d=5000
        let m 
        if(Dimensions.get("screen").height>Dimensions.get("screen").width){
          m="portrait"
        }else{
          d=d*2
          m="landscape"
          console.log("okokokok")
        }
        tx.value=-width
        tx.value=withRepeat(
          withSequence(
            // split duration of 500ms to 250ms
            withTiming(w, {duration: d,easing:Easing.linear}),
            withTiming(-width, {duration: 0}),
            //withTiming(-width, {duration: 1000,easing:Easing.linear}),
          )
       ,-1)
      }
      const kst = useAnimatedStyle(()=>{
        return{
          
          transform:[{translateX:tx.value}]
        }
      })
      const kst1 = useAnimatedStyle(()=>{
        return{
          borderColor:color.value,
          
        }
      })

      const st = useAnimatedStyle(()=>{
        return{
          transform:[{translateX:tx.value}]
          
        }
      })

  function SS(){
    
    return(
      <Animated.View entering={SlideInUp} exiting={SlideOutUp} style={{flex:1,flexDirection:"column",position:"absolute",top:StatusBar.currentHeight,height:100,backgroundColor:"#292929",zIndex:2,right:10,left:10,borderRadius:15}}>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <Text style={{color:"white",fontSize:20,fontWeight:"300"}}>{remoteRTCMessage.current.callerName} {remoteRTCMessage.current.type} arıyor</Text>
        </View>
       <View style={{flexDirection:"row",flex:2}} >
        <View style={{flex:1,borderBottomLeftRadius:15}}>
      <TouchableNativeFeedback style={{flex:1,justifyContent:"center",alignItems:"center",borderBottomLeftRadius:15}} onPress={()=>{
        InCallManager.stopRingtone()
        //Alert.alert(`${remoteRTCMessage.current.callerId}`)
        socket.current.emit("endCall",remoteRTCMessage.current.callerId)

        seticall(false)
  //Linking.openURL("Video",{otherid:rtcm.current.otherid})
      }}
      background={TouchableNativeFeedback.Ripple("grey",true)}
      >
   <View style={{flex:1,backgroundColor:"#292929",justifyContent:"center",alignItems:"center",borderBottomLeftRadius:15}}>
   <Decline width={40} height={40} style={{color:"red"}} ></Decline>

       
      </View>
      </TouchableNativeFeedback>
      </View>

      <View style={{flex:1}}>

      <TouchableNativeFeedback style={{flex:1,backgroundColor:"red",justifyContent:"center",alignItems:"center"}}onPress={()=>{
        if(remoteRTCMessage.current.callerId){
          InCallManager.stopRingtone()
          seticall(false)
         navigationRef.navigate(remoteRTCMessage.current.callType,{otherid:remoteRTCMessage.current.callerId,call:"outchat",other:remoteRTCMessage.current.callerName})
         // Linking.openURL(`my://Chatview/Video/?otherid=${remoteRTCMessage.current.callerId}&&call=outchat`)
        }
        
        
      }}>
      <View style={{flex:1,backgroundColor:"#292929",alignItems:"center",justifyContent:"center",borderBottomRightRadius:15}}> 
      <Decline width={40} height={40} style={{color:"green",transform:[{rotate:"230deg"}]}} ></Decline>

      </View>
  
      </TouchableNativeFeedback>
      </View>
      </View>
  
     
</Animated.View>


    )
    
  }
 
  if(state.isLoading){

    return(
      <View style={{flex:1,backgroundColor:"black"}}>

      </View>
    )
  }
  return (
   
    
    <GestureHandlerRootView onLayout={()=>{
 
    }} style={{flex:1,backgroundColor:"black"}}>

      <NavigationContainer  linking={linking} ref={navigationRef} theme={{colors:{background:"black"}}}>
     
      

      <Stack.Navigator  screenOptions={{headerShown:false,animation:"slide_from_right",animationDuration:100,gestureEnabled:false,contentStyle:{opacity:1,backgroundColor:"transparent"}}} >
      {state.userToken == null ? (
          <><Stack.Screen  name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Resetpassword" component={Resetpassword} />
          <Stack.Screen name="Pincode" component={Pincode} />
          <Stack.Screen name="Newpassword" component={Newpassword}/>
          </>
        ) : (
          <><Stack.Screen name="Chat" component={Chat} options={{animation:"fade",animationEnabled:false}} >
          </Stack.Screen>
          <Stack.Screen name="Chatid" component={Chatid} options={{cardStyle:{backgroundColor:"red"},presentation:"transparentModal",cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} />
          <Stack.Screen name="Photo" component={Photo} options={{animation:"none",cardStyle:{backgroundColor:"black"},presentation:"transparentModal",animationEnabled:true}} />
          <Stack.Screen name="Video" component={Videocall} options={{cardStyle:{backgroundColor:"transparent"},presentation:"transparentModal",animationEnabled:true,animation:"slide_from_bottom"}}/>
          <Stack.Screen name="Audio" component={Audiocall} options={{cardStyle:{backgroundColor:"transparent"},orientation:"portrait",presentation:"transparentModal",animationEnabled:true,animation:"slide_from_bottom"}}/>
          <Stack.Screen name="Allpeople" component={Allpeople}/>
          <Stack.Screen name="Takephoto" component={Take} options={{cardStyle:{backgroundColor:"black"},orientation:"portrait",presentation:"transparentModal",contentStyle:{backgroundColor:"black"},cardStyleInterpolator:CardStyleInterpolators.forBottomSheetAndroid,animation:"slide_from_bottom"}}/>
          <Stack.Screen name="Draw" component={Draw} options={{cardStyle:{backgroundColor:"black"},orientation:"portrait",presentation:"transparentModal",contentStyle:{backgroundColor:"black"},cardStyleInterpolator:CardStyleInterpolators.forBottomSheetAndroid,animation:"slide_from_bottom"}}/>

          </>
        )}
       
         
        
      </Stack.Navigator>
      <Portal>
           <Dialog style={{backgroundColor:"#5B3E98",borderRadius:20}} onDismiss={()=>setIsVisible(false)} visible={visible}>
            <Dialog.Content>
              <Text style={{color:"white",fontSize:23,fontWeight:"300"}} variant="bodyMedium">Arka plan bildirimini kapat istermisiniz ?</Text>
           
           
            </Dialog.Content>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-end",paddingBottom:10}}>
              <View style={{borderRadius:15,backgroundColor:"transparent",justifyContent:"center",alignItems:"center"}}>
              <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple("grey",true)}  onPress={async()=>{
                //await AsyncStorage.setItem("bnp","true")
                storage.set("bnp",JSON.stringify("true"))
                setIsVisible(false)}}>
              <View style={{backgroundColor:"#222222",paddingHorizontal:10,paddingVertical:5,justifyContent:"center",alignItems:"center",borderRadius:15}}>
              <Text style={{fontSize:18,fontWeight:"300",color:"white"}}>Hayır</Text>
              </View>
              </TouchableNativeFeedback>
              </View>

              <View style={{borderRadius:15,backgroundColor:"transparent",justifyContent:"center",alignItems:"center",marginHorizontal:10}}>
              <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple("grey",true)}  onPress={async()=>{
                /* await AsyncStorage.setItem("bnp","false").then(()=>{
                  pause.disNotCh()
  
                }) */
                menuopens.current=true
                storage.set("bnp",JSON.stringify("false"))
                pause.disNotCh()
                

  
                
                setIsVisible(false)}}>
              <View style={{backgroundColor:"#222222",paddingHorizontal:10,paddingVertical:5,justifyContent:"center",alignItems:"center",borderRadius:15}}>
              <Text style={{fontSize:18,fontWeight:"300",color:"white"}}>Evet</Text>
              </View>              
              </TouchableNativeFeedback>
              </View>
              
           

            </View>
            
          </Dialog>
         </Portal>
      {
        ss && <Animated.View style={[{position:"absolute",top:0,bottom:0,right:0,left:0,zIndex:2,backgroundColor:"black",justifyContent:"center",alignItems:"center"}]}>
<ActivityIndicator size={100} color="#6538c6" ></ActivityIndicator>
        </Animated.View>
      }
      {/* {ss && <Animated.View style={[{position:"absolute",top:0,bottom:0,right:0,left:0,zIndex:2,backgroundColor:"black"},sty]}>

</Animated.View>} */}
{/* {calli && <Animated.View style={[{position:"absolute",flexDirection:"column",backgroundColor:"black",top:0,bottom:0,right:0,left:0,zIndex:3,alignItems:"center"}]}>
  <View style={{flex:3,justifyContent:"center",alignItems:"center",alignSelf:"flex-end"}}>

  <Animated.Text onLayout={(event)=>lay(event)}  style={[{fontSize:34,fontWeight:"300",color:"white",width:"100%"},st]} >{ `${callername} ${calltype==="Video"? "görüntülü":"sesli"} arıyor ...`} </Animated.Text>

  </View>
  <Animated.View style={[kst1,{flexDirection:"row",justifyContent:"space-evenly",alignItems:"center",flex:1,width:"100%",paddingBottom:0}]}>
    
     <View style={{backgroundColor:"black",borderRadius:50,width:100,height:100}}>
     <TouchableNativeFeedback
     onPress={()=>{
      decline()
     }}
     background={TouchableNativeFeedback.Ripple("grey",true)}
     >
     <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
<Decline width={height/11} height={height/11} style={{color:"red",backgroundColor:"#202020",borderRadius:height/10}} ></Decline>
</View>

     </TouchableNativeFeedback>
     </View>
     <View style={{backgroundColor:"black",borderRadius:50,width:100,height:100}}>
     <TouchableNativeFeedback
     onPress={()=>{
      answer()
     }}
     background={TouchableNativeFeedback.Ripple("grey",true)}
     >
     <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
<Decline width={height/11} height={height/11} style={{color:"green",backgroundColor:"#202020",borderRadius:height/10,transform:[{rotate:"230deg"}]}} ></Decline>
</View>

     </TouchableNativeFeedback>
     </View>
{/* <GestureDetector gesture={g}>
    <Animated.View style={[kst,{borderWidth:6,backgroundColor:"blue",height:ballwidth.current,width:ballwidth.current,justifyContent:"center",borderRadius:ballwidth.current}]}>

    </Animated.View>
</GestureDetector> 

</Animated.View>
</Animated.View> } */}
      {icall &&<SS></SS>} 
      </NavigationContainer>

      </GestureHandlerRootView>

  );
}